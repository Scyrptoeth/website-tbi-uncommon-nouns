# Prompt Analysis - Website TBI Uncommon Uncountable and Countable Noun

Date: 2026-05-09
Status: Completed analysis and clarification
Project: Website-TBI-Uncommon-Uncountable-and-Countable-Noun
Owner: Bimbel Persiapantubel

## 1. Executive Reading

The prompt asks Codex to prepare a new Persiapantubel learning website for TBI noun mastery. The core learning domain is uncommon uncountable nouns and uncommon countable nouns, prioritized for TOEFL, TOEIC, and IELTS-style contexts. The expected product follows the pattern of Website TBI Regular & Irregular Verbs: Materi, Flipcard, Tes, progress tracking, strong UI/UX, and eventual integration into the Persiapantubel ecosystem.

The user explicitly clarified that this session is limited to brainstorming/ready-to-develop work. Therefore, this run creates project documentation and project skills only. It does not scaffold a Next.js repo, install packages, commit, push, or deploy.

## 2. Clear Requirements

- Product name/project: Website-TBI-Uncommon-Uncountable-and-Countable-Noun.
- User-facing title from the prompt: TBI - Uncommon Uncountable Noun.
- Recommended clearer public title: TBI - Uncommon Nouns, because the app covers both uncountable and countable nouns.
- Audience: students of Bimbel Persiapantubel preparing for TBI.
- Main tools:
  - Materi.
  - Flipcard.
  - Tes.
- Initial content target:
  - 100 uncommon uncountable nouns with Indonesian meanings.
  - 100 uncommon countable nouns with singular form, plural form, and Indonesian meanings.
  - 100 uncountable-noun questions, split into 10 packages of 10 questions.
  - 100 countable-noun questions, split into 10 packages of 10 questions.
- Test behavior:
  - Four options: A, B, C, D.
  - Indonesian answer key and explanation.
  - Score: correct +1, wrong 0, unanswered 0.
  - Students cannot repeat a submitted package.
  - Students see wrong numbers, correct answers, and explanations after submit.
- Progress:
  - Track accessed flipcards.
  - Track completed tests.
  - Show unaccessed flipcards and uncompleted tests.
- UI/UX:
  - Aesthetic, mobile-first, comfortable animation.
  - Avoid AI slop.
  - Use UI/UX Pro Max and Taste UI principles.
- Documentation path:
  - `/Users/persiapantubel/Desktop/codex/persiapantubel/Website TBI Uncommon Uncountable and Countable Noun`.
- Required skills to create:
  - `start-website-tbi-uncommon-uncountable-and-countable-noun`.
  - `update-website-tbi-uncommon-uncountable-and-countable-noun`.

## 3. Critical Ambiguities Resolved

### 3.1 Scope

The prompt says the session is brainstorming, but also asks to run the refined prompt and create skills. The user clarified that the intended scope is:

- Create documentation.
- Create start/update skills.
- Do not create a code repo yet.

### 3.2 Product Title

The prompt gives "TBI - Uncommon Uncountable Noun" as a name, but the product covers both uncountable and countable nouns. Recommended decision:

- Use "TBI - Uncommon Nouns" as the student-facing title.
- Keep "Website-TBI-Uncommon-Uncountable-and-Countable-Noun" as the formal project name.

### 3.3 "Pernah Keluar" Claim

The prompt prioritizes nouns that have appeared in TOEFL, TOEIC, or IELTS. That is pedagogically useful but must be handled carefully:

- Do not claim a noun appeared in a real exam unless supported by official sample/prep material, licensed material, or internal source notes.
- Do not use leaked or copyrighted test questions.
- Use official sample questions and test-prep descriptions as format references.
- Use learner dictionaries and grammar references for countability and plural validation.

### 3.4 Login And Persistent Progress

The prompt does not explicitly define authentication for this project, but persistent progress across devices requires identity. Because this project is part of the Persiapantubel ecosystem and mirrors Website TBI Regular & Irregular Verbs, the recommended production-ready direction is:

- Use the same registered WhatsApp number + password pattern as the existing TBI verbs project.
- Allow a future single ecosystem entry point.
- Use database-backed progress instead of localStorage-only progress.

### 3.5 "Kata Kerja" Typo

The prompt says "pastikan semua kata kerja disusun secara alfabetik". For this noun project, interpret that as:

- Sort all noun entries alphabetically by display noun.

## 4. Main Risks

- Content accuracy risk: countable/uncountable status can change by meaning and context.
- Copyright risk: real TOEFL/TOEIC/IELTS content must not be copied from protected or leaked materials.
- Product scope risk: if SuperAdmin/CMS is omitted, content updates become manual and fragile.
- Progress risk: local-only progress cannot support the ecosystem vision.
- UI risk: a generic card-grid learning app will not meet the anti-AI-slop requirement.
- Assessment risk: "cannot repeat" must lock only after final submit, not when opening a package.

## 5. Success Criteria For This Session

- A refined prompt exists and is ready for future execution.
- A grand design exists in the project documentation folder.
- Content curation rules exist to guide the future 200 noun entries and 200 questions.
- Two project skills exist under the local skills directory.
- Skill references include session memory, lessons learned, and recommended next actions.
- Skills validate successfully with the skill-creator validator.

