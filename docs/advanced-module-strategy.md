# Advanced / Uncommon Module Strategy

Date: 2026-05-09
Status: Decision recorded, implementation deferred

## Product Decision

Keep the archived specialized/uncommon noun dataset hidden from the active student UI for now.

The current MVP should stay focused on common noun classification:

- A = Uncountable Noun.
- B = Countable Noun.
- 40 mixed packages.
- Beginner-friendly contexts.

The specialized/uncommon dataset should become a separate advanced module only after the common classification foundation is stable and reviewed.

## Why Not Import The Archive Now

The old dataset is useful, but it targets a different learning level:

- more domain-specific vocabulary;
- higher ambiguity and source-review burden;
- stronger need for structured evidence;
- higher chance students memorize rare words without mastering countability basics.

Mixing it into the active common module would weaken the pedagogy of the current product.

## Proposed Advanced Module Shape

Future module label:

- `Advanced / Uncommon Nouns`

Suggested route:

- `/advanced`

Suggested package strategy:

- 10 to 20 mixed packages.
- Each package includes both uncountable and countable nouns.
- Every ambiguous noun must include context in the prompt.
- Every entry must pass tutor review before publish.

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

Do not import `docs/archive/specialized-content-2026-05-09.ts.txt` directly into production content.

Before any import:

1. Convert archive rows into the normalized content template.
2. Review countability by meaning and context.
3. Replace technical/domain-heavy items that do not fit TBI learning goals.
4. Add original examples and explanations.
5. Keep `claimAllowed=false` unless exact source evidence supports a stronger claim.
6. Publish only after tutor approval.

## Acceptance Criteria Before Building This Module

- Common module content QA is complete.
- Authenticated progress exists.
- SuperAdmin content review workflow exists.
- Content import/export workflow exists.
- Advanced entries have structured source evidence.
- The UI clearly separates beginner/common and advanced/uncommon practice.
