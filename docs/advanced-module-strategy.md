# Advanced / Uncommon Module Strategy

Date: 2026-05-09
Status: Phase A challenge practice implemented; full advanced CMS deferred

## Product Decision

Keep the active common module focused on beginner classification, while exposing the archived specialized/uncommon noun dataset only through a clearly separated `Tantangan` practice surface.

The current MVP should stay focused on common noun classification:

- A = Uncountable Noun.
- B = Countable Noun.
- 40 common mixed packages.
- 20 advanced `Tantangan` mixed packages.
- Beginner-friendly contexts.

The current `Tantangan` release is a static Phase A practice module. The full database-backed advanced module, with review states and SuperAdmin content workflow, remains deferred.

## Why Not Mix The Archive Into Common Tes

The old dataset is useful, but it targets a different learning level:

- more domain-specific vocabulary;
- higher ambiguity and source-review burden;
- stronger need for structured evidence;
- higher chance students memorize rare words without mastering countability basics.

Mixing it into the active common module would weaken the pedagogy of the current product. Therefore, the archive is normalized into `src/lib/challenge-content.ts` and shown only under the `Tantangan` sidebar.

## Proposed Advanced Module Shape

Current Phase A label:

- `Tantangan`

Current surface:

- Sidebar view inside the static MVP.

Current package strategy:

- 20 mixed packages.
- Each package includes both uncountable and countable nouns.
- Every ambiguous noun must include context in the prompt.
- Every entry uses structured source metadata with `claimAllowed=false`.

Suggested content metadata:

- `module`: `common` or `advanced`
- `status`: `draft`, `review`, `published`, `archived`
- `difficulty`: `core`, `medium`, `advanced`
- `sourceType`
- `sourceName`
- `urlOrCitation`
- `accessedAt`
- `claimAllowed`
- `sourceNote`

## Import Rule

Do not import `docs/archive/specialized-content-2026-05-09.ts.txt` directly into runtime code.

Current Phase A uses a normalized static module:

- `src/lib/challenge-content.ts`
- 100 advanced uncountable rows.
- 100 advanced countable rows.
- 20 mixed packages.
- Deterministic non-alternating answer order.

Before any future database import:

1. Convert archive rows into the normalized content template.
2. Review countability by meaning and context.
3. Replace technical/domain-heavy items that do not fit TBI learning goals.
4. Add original examples and explanations.
5. Keep `claimAllowed=false` unless exact source evidence supports a stronger claim.
6. Publish only after tutor approval.

## Acceptance Criteria Before Full Database Module

- Common module content QA is complete.
- Static `Tantangan` challenge practice is verified with content, accessibility, visual, and E2E tests.
- Authenticated progress exists.
- SuperAdmin content review workflow exists.
- Content import/export workflow exists.
- Advanced entries have structured source evidence.
- The UI clearly separates beginner/common and advanced/uncommon practice.
