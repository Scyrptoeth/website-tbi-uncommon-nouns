# Persistence And SuperAdmin Roadmap

Date: 2026-05-09
Status: Architecture-ready, implementation pending database/auth secrets

## Current Reality

The deployed MVP is intentionally static:

- Progress is stored in browser `localStorage`.
- There is no authenticated student identity.
- The SuperAdmin tab is a read-only operational summary.
- There are no Server Actions, Route Handlers, sessions, database tables, or admin-protected routes yet.

This is safe for the current demo release, but it is not sufficient for real student operations.

## Why This Was Not Implemented In This Pass

Authenticated storage and SuperAdmin operations require a real persistence provider and secrets such as `DATABASE_URL`. The repo has no committed `.env*` file and no safe secret source available in this task. Implementing fake auth or mock admin operations would create misleading behavior and security debt.

## Target Stack

- Next.js App Router.
- PostgreSQL through Neon or a Vercel Marketplace-compatible provider.
- Drizzle ORM by default.
- Server-only Data Access Layer.
- Custom auth with registered WhatsApp number + password hash.
- Zod validation for all write inputs.
- Audit logs for sensitive admin actions.

## Target Routes

Student:

- `/login`
- `/dashboard`
- `/materi`
- `/flipcard`
- `/tes`
- `/settings/password`

SuperAdmin:

- `/admin`
- `/admin/students`
- `/admin/students/[id]`
- `/admin/content/nouns`
- `/admin/content/packages`
- `/admin/imports`
- `/admin/audit-logs`

## Target Server Boundaries

All writes must run server-side:

- Login and logout.
- Password change.
- Flipcard view progress.
- Draft attempt save.
- Final submit.
- Attempt reset.
- Student active/inactive update.
- Password reset.
- Content import/export.
- Publish/archive content changes.

Never rely on hidden UI for authorization. Every Server Action and Route Handler must validate:

- authenticated user;
- role;
- ownership or admin permission;
- input shape;
- current attempt/content state.

## Target Tables

- `users`
- `student_profiles`
- `sessions`
- `login_attempts`
- `noun_entries`
- `noun_meanings`
- `noun_sources`
- `test_packages`
- `questions`
- `question_options`
- `attempts`
- `attempt_question_snapshots`
- `attempt_answers`
- `flipcard_progress`
- `import_batches`
- `content_import_rows`
- `admin_audit_logs`

## Attempt Lifecycle

1. Student opens a package.
2. Draft attempt is created or resumed.
3. Answers autosave as draft.
4. Final submit creates immutable result:
   - score;
   - submitted timestamp;
   - question/option/explanation snapshot;
   - selected answers.
5. Student can review result but cannot retry.
6. SuperAdmin can reset the package for that student while preserving audit/history.

## SuperAdmin Minimum Scope

Student operations:

- create/import students;
- set active/inactive;
- reset password;
- view progress and scores;
- reset submitted attempt per package.

Content operations:

- import noun/content bundle;
- validate content before publish;
- archive/unarchive content;
- export current content;
- preserve structured source evidence.

Audit operations:

- record actor, target, action, timestamp, and metadata for sensitive changes.

## Acceptance Criteria For Implementation Phase

- No plaintext passwords.
- No secrets committed.
- Auth, role, and ownership checks are enforced server-side.
- localStorage becomes a cache/enhancement only, not the source of truth.
- All test submissions are snapshot-based.
- SuperAdmin actions write audit logs.
- Build, lint, typecheck, E2E, and access-control tests pass before deployment.
