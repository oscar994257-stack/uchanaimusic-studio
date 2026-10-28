# Website update — 2026-10-28

## Work deletion controls

The inline Works delete control no longer treats a read-only form, revision view or release selection as proof that deletion is forbidden. Published perspectives can make fields read-only while Studio still authorizes deletion. The control now follows the installed Sanity Delete action: check delete permissions and the actual operation availability, using the same release context for permission checks and execution. Connection failures remain blocked with a visible reason.

Changing documents clears stale confirmation/error/deleting state. Operation errors and synchronous exceptions restore a retryable state; success clears the local busy state. Sanity's reference-aware confirmation and server-side authorization remain in place. No cloud documents are deleted by this update and no account permissions are expanded.

Validation: TypeScript, production build, and mocked component regression checks for read-only published documents, draft-only documents, confirmation, retry after errors, switching documents while deleting, missing/loading permissions, disconnection, missing documents and release permission context. The regression test never connects to Sanity. Authenticated deletion of a real owner's work was intentionally not performed.
