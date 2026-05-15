# UchanAIMusic Studio

Official website for **UchanAIMusic Studio｜AI Music, Anime MV & Creative Tools**.

Built with Next.js, React, TypeScript, Tailwind CSS, Framer Motion, Lucide React Icons, and Sanity CMS. The site is ready for GitHub and Vercel deployment.

## 1. Install

```bash
npm install
```

## 2. Local Development

```bash
npm run dev
```

Open:

- Website: `http://localhost:3000`
- Sanity Studio: `http://localhost:3000/studio`

## 3. Build

```bash
npm run build
```

## 4. Connect Sanity

This project is configured for:

- Project ID: `q1mcui2q`
- Dataset: `production`
- Studio path: `/studio`

Create `.env.local` from `.env.local.example`:

```bash
cp .env.local.example .env.local
```

For Windows PowerShell:

```powershell
Copy-Item .env.local.example .env.local
```

Then run `npm run dev` and open `http://localhost:3000/studio`.

The frontend reads Sanity content automatically. If a document does not exist yet, the site uses fallback content so the page never appears blank.

In Sanity Manage, add CORS origins for:

- `http://localhost:3000`
- `https://uchanaimusic-studio.vercel.app`

## 5. Add Works in Sanity

In Sanity Studio, create a document under **Works / Latest Works**.

Fill in:

- `title`
- `type`
- `category`
- `description`
- `youtubeUrl`
- `featured`
- `order`
- `publishedAt`

Save and publish the document. The homepage refreshes from Sanity with a short revalidation window.

## 6. YouTube Thumbnail URLs

Paste any supported YouTube URL into `youtubeUrl`:

- `https://www.youtube.com/watch?v=VIDEO_ID`
- `https://youtu.be/VIDEO_ID`
- `https://www.youtube.com/shorts/VIDEO_ID`

The site extracts the video ID with `extractYouTubeId(url)` and generates:

```txt
https://img.youtube.com/vi/{videoId}/maxresdefault.jpg
```

If `maxresdefault.jpg` is unavailable, the card falls back to:

```txt
https://img.youtube.com/vi/{videoId}/hqdefault.jpg
```

## 7. Upload to GitHub

```bash
git init
git add .
git commit -m "Initial UchanAIMusic Studio website"
git branch -M main
git remote add origin https://github.com/oscar994257-stack/uchanaimusic-studio.git
git push -u origin main
```

## 8. Deploy on Vercel

1. Open Vercel.
2. Import `oscar994257-stack/uchanaimusic-studio`.
3. Framework preset: **Next.js**.
4. Build command: `npm run build`.
5. Output directory: leave default.
6. Deploy.

Production URL:

```txt
https://uchanaimusic-studio.vercel.app
```

## 9. Vercel Environment Variables

Set these in Vercel Project Settings:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=q1mcui2q
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-05-15
NEXT_PUBLIC_SITE_URL=https://uchanaimusic-studio.vercel.app
```

Optional only if you later use private datasets or authenticated preview reads:

```env
SANITY_API_READ_TOKEN=
```

Do not commit real API tokens, passwords, or secrets.

## Content Types

Sanity schemas are included for:

- Site Settings
- Hero
- Works / Latest Works
- Subtitle Studio
- Tools & Apps
- Commission / Services
- Store / Downloads
- About
- Contact

## Assets

Local images are stored in:

```txt
public/images/
```

The official avatar is referenced as:

```txt
public/images/UchanAIMusic(2).png
```

The UI reference image is included as:

```txt
public/images/UchanAIMusic Studio.png
```
