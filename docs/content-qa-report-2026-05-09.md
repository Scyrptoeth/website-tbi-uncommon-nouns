# Content QA Report - Common Noun Classification

Date: 2026-05-09
Status: Implemented in active source

## Scope

This QA pass reviewed the active common noun bank in `src/lib/content.ts` for binary classification fairness:

- 100 common uncountable nouns.
- 100 common countable nouns.
- 200 A/B classification questions.
- 20 mixed packages.

The old specialized/uncommon noun list remains archived in `docs/archive/specialized-content-2026-05-09.ts.txt` and is not part of this active QA scope.

## Implemented Corrections

- Added explicit classification context for high-risk dual-use nouns:
  - `cereal`
  - `class`
  - `coffee`
  - `dish`
  - `email`
  - `food`
  - `glass`
  - `hair`
  - `ice`
  - `light`
  - `medicine`
  - `paper`
  - `room`
  - `tea`
  - `work`
- Updated question prompts so context appears directly in ambiguous A/B classification questions.
- Updated explanations so students see why the contextual answer is valid.
- Replaced uncountable common-mistake text that previously generated artificial plural examples through a heuristic.
- Changed `research` quantity expression from `a piece of research` to `a research project` for more natural learner-level phrasing.
- Improved plural heuristic support for `-sh` countable nouns, such as `toothbrushes`.

## Guardrails Added

- Active content throws at build time if:
  - count is not exactly 100 uncountable + 100 countable;
  - total questions are not exactly 200;
  - total packages are not exactly 20;
  - high-risk dual-use nouns are missing an explicit classification context.
- `tests/content.spec.ts` verifies:
  - exact content counts;
  - unique IDs;
  - high-risk terms have context;
  - all uncountable nouns have quantity expressions;
  - all countable nouns have singular and plural forms;
  - each package stays mixed with 5 A and 5 B answer keys;
  - options remain exactly A/B.

## Residual Risk

- Some common English nouns remain meaning-sensitive by nature. The active MVP now handles the highest-risk items through context, but a tutor should still periodically review classroom feedback.
- No item claims appearance in TOEFL, TOEIC, or IELTS. `claimAllowed` remains `false` for the active seed data.

## Next Content Step

Create a tutor review checklist before adding new nouns:

- Is the noun mostly unambiguous for beginner classification?
- If not, does the prompt include a clear context?
- Is the Indonesian meaning tied to that context?
- Is the plural form or quantity expression natural?
- Does the entry avoid unsupported exam-appearance claims?
