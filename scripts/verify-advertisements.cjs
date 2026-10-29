const fs = require('node:fs'); const vm = require('node:vm'); const path = require('node:path'); const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..'); const ts = require(root + '/node_modules/typescript');
function load(name, mocks = {}, globals = {}) {
  const file = path.join(root, name); const exports = {};
  const requireModule = id => {
    if (id in mocks) return mocks[id];
    if (id.startsWith('.') || id.startsWith('@/')) {
      const base = id.startsWith('@/') ? path.join(root, id.slice(2)) : path.resolve(path.dirname(file), id);
      const target = ['.ts', '.tsx', '.js'].map(ext => base + ext).find(fs.existsSync);
      return load(path.relative(root, target), mocks, globals);
    }
    return require(require.resolve(id, { paths: [root] }));
  };
  const js = ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX } }).outputText;
  vm.runInNewContext(js, { exports, require: requireModule, Intl, URL, AbortController, console, ...globals }, { filename: file });
  return exports;
}
const flush = () => new Promise(setImmediate);

(async () => {
  const text = load('lib/ad-text.ts'); const limits = text.AD_TEXT_LIMITS;
  assert.equal(text.adCharacters('👨‍👩‍👧‍👦🇹🇼e\u0301❤️🎃').length, 5);
  assert.equal(text.validateAdText('字'.repeat(20), limits.title), true);
  assert.notEqual(text.validateAdText('字'.repeat(21), limits.title), true);
  assert.notEqual(text.validateAdText('標題\n換行', limits.title), true);
  assert.equal(text.validateAdText('🎵'.repeat(24), limits.advertiser), true);
  assert.notEqual(text.validateAdText('🎵'.repeat(25), limits.advertiser), true);
  assert.equal(text.validateAdText('🎃'.repeat(72), limits.body), true);
  assert.notEqual(text.validateAdText('🎃'.repeat(73), limits.body), true);
  assert.notEqual(text.validateAdText('一\n二\n三\n四', limits.body), true);
  assert.equal(text.adTextLines('x'.repeat(24) + '\r\ny\rz').length, 3);
  assert.notEqual(text.validateAdText('x'.repeat(23) + ' 🎃'.repeat(25), limits.body), true, 'spaces count too');
  assert.equal(text.displayAdText('字'.repeat(80), limits.body).length, 3);
  assert.equal(text.adCharacters(text.displayAdText('字'.repeat(80), limits.body)[2]).length, 24);
  console.log('PASS: title/name/body limits, punctuation/spaces, ZWJ emoji, flags, combining marks, CRLF and legacy overflow.');

  const ads = load('lib/advertisements.ts'); const now = Date.parse('2026-10-29T12:30:00Z');
  const ad = (id, slot = 1, extra = {}) => ({ _id: id, slot, placement: 'showcase', title: id, imageUrl: 'https://example.com/a.png', startsAt: '2026-10-29T12:00:00Z', endsAt: '2026-11-29T12:00:00Z', ...extra });
  const selected = ads.showcaseAdvertisements([ad('new'), ad('duplicate'), ad('second', 2), ad('third', 3), ad('fourth', 4), ad('fifth', 5), ad('sixth', 6, { placement: 'commission' })], now);
  assert.equal(selected.map(a => a._id).join(','), 'new,second,third,fourth');
  assert.equal(ads.showcaseAdvertisements([ad('alone', 4)], now)[0]._id, 'alone');
  assert.equal(ads.isAdvertisementActive(ad('video', 2, { mediaType: 'youtube', imageUrl: undefined, youtubeUrl: 'https://youtu.be/M7lc1UVf-VE' }), now), true);
  assert.equal(ads.isAdvertisementActive(ad('bad-video', 2, { mediaType: 'youtube', youtubeUrl: 'https://vimeo.com/abc' }), now), false);
  assert.equal(ads.isAdvertisementActive(ad('starts', 1, { startsAt: new Date(now).toISOString() }), now), true);
  assert.equal(ads.isAdvertisementActive(ad('ends', 1, { endsAt: new Date(now).toISOString() }), now), false);
  assert.equal(ads.isAdvertisementActive(ad('no-media', 1, { imageUrl: undefined }), now), false);
  console.log('PASS: four distinct placements, legacy slots excluded, sparse/one ad, image/YouTube validation and time boundaries.');

  const { adAdvanceDelay } = load('lib/ad-playback.ts');
  const base = { count: 2, paused: false, visible: true, videoState: 'idle', endedAt: null, now: 1000 };
  assert.equal(adAdvanceDelay(base), 5000);
  for (const videoState of ['playing', 'paused', 'buffering']) assert.equal(adAdvanceDelay({ ...base, videoState }), null);
  assert.equal(adAdvanceDelay({ ...base, videoState: 'ended', endedAt: 1000 }), 10000);
  assert.equal(adAdvanceDelay({ ...base, now: 10999, videoState: 'ended', endedAt: 1000 }), 1);
  assert.equal(adAdvanceDelay({ ...base, now: 11000, videoState: 'ended', endedAt: 1000 }), 0);
  for (const overrides of [{ count: 1 }, { count: 0 }, { paused: true }, { visible: false }]) assert.equal(adAdvanceDelay({ ...base, ...overrides }), null);
  assert.equal(adAdvanceDelay({ ...base, videoState: 'error' }), 5000);
  console.log('PASS: 5-second rotation; hold playing/paused/buffering; 10 seconds after end; one ad, hidden page, explicit pause and errors.');

  let listener, clean, latest = null, stopped = false, cleared = false; const requests = []; const handlers = {};
  const document = { hidden: false, addEventListener: (k, fn) => handlers[k] = fn, removeEventListener: k => delete handlers[k] };
  const window = { setInterval: (fn, delay) => { assert.equal(delay, 15000); handlers.poll = fn; return 1 }, clearInterval: () => cleared = true, addEventListener: (k, fn) => handlers[k] = fn, removeEventListener: k => delete handlers[k] };
  const react = { useState: () => [latest, fn => latest = typeof fn === 'function' ? fn(latest) : fn], useEffect: fn => clean = fn() };
  const client = { listen: (query, params, options) => { assert.match(query, /drafts/); assert.match(query, /versions/); assert.equal(options.visibility, 'query', 'wait until published changes are queryable'); return { subscribe: events => { listener = events; return { unsubscribe: () => stopped = true } } } } };
  const hook = load('lib/use-published-advertisements.ts', { react, './sanity': { client } }, { document, window, fetch: (url, options) => new Promise(resolve => requests.push({ url, options, resolve })) });
  hook.usePublishedAdvertisements([], 'zh'); assert.equal(requests.length, 1);
  listener.next(); assert.equal(requests.length, 1, 'publish during a read is queued');
  requests[0].resolve({ ok: true, json: async () => ({ advertisements: [{ _id: 'first' }] }) }); await flush();
  assert.equal(requests.length, 2); assert.equal(latest.advertisements[0]._id, 'first');
  requests[1].resolve({ ok: true, json: async () => ({ advertisements: [{ _id: 'published' }] }) }); await flush();
  assert.equal(latest.advertisements[0]._id, 'published');
  listener.error(new Error('stream unavailable')); handlers.poll(); requests[2].resolve({ ok: false }); await flush();
  assert.equal(latest.advertisements[0]._id, 'published', 'failures keep last successful data');
  listener.next(); requests[3].resolve({ ok: true, json: async () => ({ advertisements: [] }) }); await flush();
  assert.equal(latest.advertisements.length, 0, 'published removal clears ads');
  clean(); listener.next(); assert.equal(requests.length, 4); assert.equal(requests[0].options.signal.aborted, true); assert.equal(stopped && cleared, true);
  console.log('PASS: immediate publish listener, queued mutation while fetching, fallback polling, last-good preservation, empty clearing and cleanup.');

  let options, destroyed = false, readyStatus; const states = []; const effects = []; let refs = 0;
  const frame = {}; const host = { replaceChildren() {}, querySelector: () => null };
  class FakePlayer { constructor(element, value) { options = value; this.getIframe = () => frame; this.destroy = () => destroyed = true; FakePlayer.instance = this } }
  const componentReact = { useRef: value => ({ current: refs++ === 0 ? host : value }), useState: value => [value, next => readyStatus = next], useEffect: fn => effects.push(fn()) };
  const component = load('components/AdYouTubePlayer.tsx', { react: componentReact, '@/lib/ad-youtube-api': { loadAdYouTubeAPI: async () => ({ Player: FakePlayer }) } }, { document: { createElement: () => ({}) }, window: { location: { origin: 'http://localhost:3000' } } });
  component.AdYouTubePlayer({ videoId: 'M7lc1UVf-VE', title: 'Manual ad', lang: 'en', onState: state => states.push(state) }); await flush();
  assert.equal(options.playerVars.autoplay, 0); assert.equal(options.playerVars.controls, 1); assert.equal(options.playerVars.fs, 1);
  options.events.onReady({ target: FakePlayer.instance }); assert.equal(readyStatus, 'ready'); assert.equal(frame.allowFullscreen, true);
  for (const data of [1, 2, 3, 0]) options.events.onStateChange({ data });
  assert.equal(states.join(','), 'playing,paused,buffering,ended');
  effects[0](); assert.equal(destroyed, true); options.events.onStateChange({ data: 1 }); assert.equal(states.length, 4);
  console.log('PASS: real player component config has no autoplay, native controls/fullscreen, API state mapping and destroy/late-event cleanup.');
})().catch(error => { console.error(error); process.exitCode = 1 });
