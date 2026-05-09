# Content Curation Guide

Project: Website-TBI-Uncommon-Uncountable-and-Countable-Noun
Date: 2026-05-09
Status: Updated guide for common noun classification MVP

## 1. Purpose

This guide defines how to curate the active 200 common uncountable nouns, 200 common countable nouns, and 400 A/B classification questions without relying on leaked, copyrighted, or unverifiable exam content.

## 2. Source Hierarchy

Use sources in this order:

1. Official TOEFL, TOEIC, and IELTS sample/prep materials for test format, topic style, and difficulty signal.
2. Learner dictionaries and grammar references for countability, plural form, and usage validation.
3. Persiapantubel tutor expertise and past internal teaching notes.
4. Original examples and original questions written for this product.

Avoid:

- Leaked test questions.
- Copying full official passages/questions/options.
- Claiming "appeared in TOEFL/TOEIC/IELTS" without structured source evidence.
- Unverified internet word lists.

## 3. Definition Of "Common"

A noun qualifies for the current common list if it meets at least two criteria:

- Commonly appears in school, home, food, travel, work, technology, nature, or everyday conversation.
- Has a countability pattern students can apply in TBI grammar questions.
- Frequently confuses Indonesian learners because Indonesian does not mark countability in the same way.
- Can be explained with a natural Indonesian meaning and a natural quantity/plural form.
- Is not narrowly specialized to a technical, legal, scientific, or professional field.

Avoid active-list nouns that are mainly advanced, obscure, or domain-specific. Put those in a future advanced/uncommon set instead.

Historical archive note:

- The previous specialized/uncommon seed list is preserved in `docs/archive/specialized-content-2026-05-09.ts.txt`.
- Archived content must not be imported into the active website unless a future advanced module is explicitly planned.

Advanced noun candidates can still be tracked separately if they meet at least two criteria:

- Has countability behavior that differs from Indonesian intuition.
- Appears in academic, business, administrative, scientific, or test-prep contexts.
- Has an irregular or non-obvious plural form.
- Is commonly misused with articles, plural suffixes, much/many, few/little, or quantity expressions.
- Has countable and uncountable meanings that must be distinguished by context.

## 4. Uncountable Noun Entry Checklist

Each uncountable noun should include:

- Noun.
- Indonesian meaning.
- Topic.
- Difficulty.
- Common mistake.
- Safe quantity expression when applicable.
- Original example sentence.
- Indonesian usage note.
- Structured source fields:
  - `sourceType`: `official_sample`, `licensed_material`, `dictionary`, `grammar_reference`, `internal_note`, or `tutor_review`.
  - `sourceName`.
  - `urlOrCitation`.
  - `accessedAt` for web sources.
  - `claimAllowed`: `true` only when the source supports the exact claim shown.
  - `sourceNote`: short validation note.

Quality checks:

- Do not add `s` plural unless explaining an exceptional countable meaning.
- Do not use `a/an` before the noun unless it is part of a countable alternate phrase.
- Include a quantity expression for concrete mass/group nouns when useful.
- Explain dual-use nouns clearly, e.g. `experience` general vs a specific experience.

## 5. Countable Noun Entry Checklist

Each countable noun should include:

- Singular form.
- Plural form.
- Indonesian meaning.
- Plural type.
- Topic.
- Difficulty.
- Original example sentence.
- Indonesian usage note.
- Structured source fields:
  - `sourceType`: `official_sample`, `licensed_material`, `dictionary`, `grammar_reference`, `internal_note`, or `tutor_review`.
  - `sourceName`.
  - `urlOrCitation`.
  - `accessedAt` for web sources.
  - `claimAllowed`: `true` only when the source supports the exact claim shown.
  - `sourceNote`: short validation note.

Plural type values:

- `regular`: rule-based plural, e.g. `proposal` -> `proposals`.
- `irregular`: e.g. `criterion` -> `criteria`.
- `zero`: same singular/plural where relevant.
- `foreign`: Latin/Greek or borrowed plural patterns.
- `compound`: plural marker inside a compound noun.

## 6. Question Design

### 6.1 General Rules

- Each question has exactly four options: A, B, C, D.
- Exactly one option is correct.
- Explanation must be in Indonesian.
- Explanation must teach the rule, not only say the answer.
- Do not reveal answer keys before submit.
- Do not write trick questions with ambiguous accepted answers.
- Use original sentences.

### 6.2 Uncountable Question Templates

Valid templates:

- Choose the grammatically correct sentence.
- Choose the correct quantity expression.
- Choose the noun that is uncountable in the sentence.
- Complete the sentence with `much`, `many`, `a few`, `a little`, or similar.
- Identify the sentence with an incorrect plural form.

Example pattern, not final content:

- Prompt: "Which sentence uses the noun correctly?"
- Correct concept: `information` is uncountable.
- Wrong-option concepts: `an information`, `informations`, wrong agreement.

### 6.3 Countable Question Templates

Valid templates:

- Choose the correct plural form.
- Choose the correct singular/plural agreement.
- Complete the sentence with the correct noun form.
- Identify the countable noun in context.
- Choose the sentence with correct article usage.

Example pattern, not final content:

- Prompt: "Choose the correct plural form of the noun."
- Correct concept: irregular plural or uncommon plural pattern.
- Wrong-option concepts: over-regularized plural, singular form, misspelling.

## 7. Package Design

Initial packages:

- `uncountable-01` to `uncountable-10`.
- `countable-01` to `countable-10`.

Each package:

- 10 questions.
- Balanced difficulty.
- No duplicate noun within the same package unless testing different meanings.
- One dominant concept per question.
- Indonesian explanation for each item.

Recommended difficulty mix per package:

- 4 core.
- 4 medium.
- 2 advanced.

## 8. Review Workflow

Before publish:

1. Validate noun status and plural form.
2. Check Indonesian meaning.
3. Check example sentence originality.
4. Check answer key uniqueness.
5. Check explanation quality.
6. Check ambiguity.
7. Check package balance.
8. Mark as reviewed.

After publish:

- Preserve attempt snapshots.
- Changes affect future attempts only.
- If a question is wrong, archive or correct it and consider SuperAdmin reset policy for impacted attempts.

## 9. Initial Content Production Next Action

The next content task should create:

- `noun-entries.csv` with 400 reviewed noun rows.
- `noun-meanings.csv` with at least 400 primary meaning rows, or a documented `content-bundle.csv` that contains the same normalized fields.
- `test-packages.csv` with 40 packages.
- `questions.csv` with 400 questions.
- `question-options.csv` with 800 options.

Each noun/meaning row should include structured source fields, but not copied official exam text.
