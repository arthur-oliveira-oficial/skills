# Backend

## Contents
- API design
- Errors
- Validation and boundaries
- Data and migrations
- Idempotency and concurrency
- Queues, jobs, and integrations
- Security (OWASP)
- Observability
- Configuration and deploy

## API design

- Follow the style already in use (REST, GraphQL, tRPC, gRPC). Consistency beats preference.
- REST: plural resources, methods with correct semantics (GET safe, PUT/DELETE idempotent, POST not), precise status codes (201 created, 204 no body, 400 invalid input, 401 unauthenticated, 403 forbidden, 404, 409 conflict, 422 business rule, 429 rate limit).
- Cursor pagination for growing lists; a maximum page size.
- Stable names for filters, sorting, and fields.
- Versioning or compatible evolution: add fields; don't rename or remove without a deprecation period.
- Contract described (OpenAPI, GraphQL schema, shared types) and tested.

## Errors

- One structured format; for HTTP prefer **RFC 9457 (Problem Details)**: `type`, `title`, `status`, `detail`, `instance` + a stable machine-readable code.
- Messages useful to the client, with no stack traces, SQL, or internal details.
- Distinguish client errors (4xx, don't retry; except 408 and 429, retried honoring `Retry-After`) from transient errors (5xx/503, retry with backoff only if the operation is idempotent).
- Don't swallow exceptions; log with context and rethrow or handle.

## Validation and boundaries

- Validate **at system boundaries** (HTTP input, queue messages, external API responses, files) with a schema (Zod, Pydantic, class-validator, etc.). Inside the domain, trust the types.
- Parse, don't validate: convert input into already-valid domain types.
- Don't add defensive validation for scenarios that can't happen internally.

## Data and migrations

- Migrations are versioned, reviewed, and reversible when possible.
- Breaking changes via **expand → migrate → contract**: add the new column/table; write to both; backfill in batches; read from the new one; remove the old one in a later deploy.
- Never mass `DROP`/`DELETE` without a verified backup, human confirmation, and a rollback plan.
- Indexes for new queries; check the plan (`EXPLAIN ANALYZE`). Lock-free index creation on large tables (`CREATE INDEX CONCURRENTLY` in Postgres; it cannot run inside a transaction, so put it in its own non-transactional migration).
- Database constraints (NOT NULL, UNIQUE, FK, CHECK) for invariants — the application is not the only guardian.
- Avoid N+1; measure.
- Short transactions; no network calls inside a transaction.

## Idempotency and concurrency

- Side-effecting operations (payment, sending, creation) accept an **idempotency key**; repeating the request doesn't duplicate the effect.
- Queue consumers assume **at-least-once** delivery: deduplicate by message ID.
- Concurrency: optimistic locks (version column) or pessimistic locks (`SELECT … FOR UPDATE`) depending on contention; unique constraints as the last barrier.
- **Transactional outbox** to publish events consistently with the database write.
- Explicitly test retries and parallel execution of critical operations.

## Queues, jobs, and integrations

- Timeouts on every external call; retry with exponential backoff + jitter only for transient errors; circuit breaker on unstable dependencies.
- Dead-letter queue with alerting.
- Reentrant jobs with persisted progress so they can resume.
- Incoming webhooks: verify the signature, respond fast, process asynchronously, deduplicate.
- Isolate external SDKs behind an adapter in your domain.

## Security (OWASP Top 10)

- **Access control:** authorization checked on the server for **every** endpoint and per resource (avoid IDOR: does this user own this ID?). Deny by default.
- **Injection:** parameterized queries/ORM; never concatenate input into SQL, shell, LDAP, or templates.
- **Authentication:** use established libraries; hash passwords with Argon2id/bcrypt; rate limit login and recovery; sessions with `HttpOnly`, `Secure`, `SameSite` cookies.
- **Secrets:** never in code or logs; environment variables or a vault; rotation possible.
- **Sensitive data:** encryption in transit (TLS) and at rest when required; collect the minimum; mask in logs.
- **SSRF:** validate/restrict URLs the server fetches.
- **Dependencies:** lockfile, auditing (`npm audit`, `pip-audit`, Dependabot), no abandoned packages.
- **Configuration:** restricted CORS, security headers, error messages without internal details, debug off in production.
- **Uploads:** validate type and size, store outside the webroot, generated names.
- Negative tests for every authorization rule.

**Adding authentication to an existing API — design checklist** (settle these in discovery, before code; list order is not asking order — ask first what changes the build most):
- **Ownership model:** single shared resource set (just close the door) vs. per-user data (owner column, per-resource checks on every route).
- **Existing data:** what happens to rows without an owner (assign, migrate, delete, keep shared) — this is a migration with a rollback.
- **Client type → mechanism:** browser on same site → session cookie (`HttpOnly`, `Secure`, `SameSite`, CSRF protection); browser SPA on another origin → cookie with `SameSite=None; Secure`, credentialed CORS for an explicit origin, and CSRF protection, or a bearer token kept in memory; mobile/CLI/service → bearer token or API key (rotation, revocation, storage); third parties → OAuth/OIDC via an established provider.
- **Status codes:** `401` when credentials are missing/invalid, `403` when authenticated but not allowed, `404` instead of `403` when revealing existence leaks data.
- **Lifecycle:** signup, login, logout, password reset, expiry/refresh, lockout/rate limit.
- **Secrets:** from env/secret manager, never in the repo; test credentials only in fixtures.

## Observability

- Structured (JSON) logs with level, correlation/request ID, and domain context; no PII or secrets.
- RED metrics (Rate, Errors, Duration) per endpoint and USE metrics for resources.
- Distributed tracing (OpenTelemetry) across services and queues.
- Honest health checks (liveness/readiness).
- Actionable alerts tied to SLOs, not to every error.

## Configuration and deploy (12-factor)

- Per-environment configuration via variables; the same artifact in every environment.
- Stateless processes; state in backing services.
- Feature flags to decouple deploy from release; remove dead flags.
- Gradual rollout (canary/percentage) for risky changes; tested rollback.
- Graceful shutdown: finish in-flight requests and jobs.
