# Refined Prompt - Website TBI Uncommon Uncountable and Countable Noun

Date: 2026-05-09
Status: Historical initial refined prompt plus current Phase A execution prompt.

## Current Phase A Refined Prompt

```text
Use the Website TBI Noun Classifier start context. Implement only the safe static Phase A scope.

Keep the existing common learning flow intact:
- 200 common uncountable nouns.
- 200 common countable nouns.
- 40 mixed Noun Classification packages.
- Materi, Flipcard, and Tes remain package-consistent.

Reactivate the archived specialized/uncommon noun set as a separated Tantangan practice surface:
- Use 100 archived uncountable nouns and 100 archived countable nouns.
- Normalize them into a runtime content module without importing the archive text file directly.
- Build 20 Tantangan packages, 10 questions per package.
- Every Tantangan package must be mixed, with 5 Uncountable answers and 5 Countable answers.
- Do not create obvious answer patterns such as strict A/B alternation or grouped first-half answer keys.
- Keep A = Uncountable Noun and B = Countable Noun.
- Include contextual prompts and Indonesian explanations.
- Keep claimAllowed=false and do not claim real TOEFL/TOEIC/IELTS appearance.

Add a new sidebar item:
- Label: Tantangan.
- Clicking it opens a package sub-sidebar.
- Clicking a package shows its 10 mixed challenge questions.
- Draft, submit, score, answer review, and lock behavior follow the existing Tes behavior.

Add a scroll-to-top button:
- One-click return to top.
- Accessible label.
- Respect prefers-reduced-motion.

Do not implement SuperAdmin noun/package/question CRUD in this phase.
Reason: real CRUD requires database, authentication, authorization, validation, attempt snapshots, and audit logs.

Update tests and documentation, then verify with typecheck, lint, build, content tests, accessibility tests, E2E tests, visual regression, and browser/live checks. Commit, push, deploy to Vercel, and update project memory only after verification passes.
```

## Historical Initial Refined Prompt

```text
Use /start-dev, ui-ux-pro-max, taste-ui, and skill-creator as applicable.

Create a ready-to-develop grand design for a new Persiapantubel learning product:

Formal project name:
Website-TBI-Uncommon-Uncountable-and-Countable-Noun

Recommended public product title:
TBI - Uncommon Nouns

Owner:
Bimbel Persiapantubel

Audience:
Students of Bimbel Persiapantubel preparing for Tes Bahasa Inggris (TBI), especially TOEFL, TOEIC, and IELTS-style grammar/vocabulary questions.

Session boundary:
This session is brainstorming and project preparation only. Create documentation and project skills. Do not scaffold the app, install dependencies, create a git repo, commit, push, or deploy.

Documentation folder:
/Users/persiapantubel/Desktop/codex/persiapantubel/Website TBI Uncommon Uncountable and Countable Noun

Product goal:
Build a focused learning website that helps students master uncommon uncountable nouns and uncommon countable nouns that are high-value for TOEFL, TOEIC, and IELTS-style English tests.

Core learning tools:
1. Materi
   - Show 100 uncommon uncountable nouns with Indonesian meanings.
   - Show 100 uncommon countable nouns with singular form, plural form, and Indonesian meanings.
   - Sort alphabetically.
   - Support search, filter, and scan-friendly layout.

2. Flipcard
   - Show one noun at a time.
   - Front side: noun prompt.
   - Back side:
     - If uncountable: label "Uncountable Noun", meaning, usage note, and safe quantity expression when useful.
     - If countable: label "Countable Noun", singular form, plural form, meaning, and irregular plural note when relevant.
   - Track which flipcards have been accessed.
   - Use comfortable transform/opacity-based flip animation and respect prefers-reduced-motion.

3. Tes
   - 100 uncountable-noun questions in 10 packages of 10.
   - 100 countable-noun questions in 10 packages of 10.
   - Each question has four options: A, B, C, D.
   - Each question has one correct answer and Indonesian explanation.
   - Score: correct +1, wrong 0, unanswered 0.
   - Draft attempts can be saved/resumed before final submit.
   - A package locks only after final submit.
   - After submit, show score, wrong numbers, unanswered numbers, correct answers, and explanations.
   - Students cannot repeat a submitted package unless reset by SuperAdmin.

Progress:
- Show a visual progress chart for:
  - flipcards accessed/not accessed;
  - tests not started/draft/submitted;
  - recommended next actions for the student.
- Progress should persist by student account, not only local browser storage.

Ecosystem direction:
- Design as part of the future Ekosistem Persiapantubel.
- Align with Website TBI Regular & Irregular Verbs and Cloud Storage Siswa Persiapantubel where appropriate.
- Prefer registered WhatsApp number + password authentication for cross-device progress and future ecosystem integration.

Admin direction:
- Include a SuperAdmin design from the start.
- SuperAdmin should manage students, password resets, noun bank, questions, packages, publish states, import/export, attempt resets, and audit logs.

Content integrity:
- Do not claim that a noun or question appeared in a real TOEFL/TOEIC/IELTS exam unless supported by official sample/prep material, licensed material, or explicit internal source notes.
- Do not use leaked test questions.
- Use official sample/prep pages for format reference.
- Use learner dictionaries and grammar references to validate countability, plural forms, meanings, and usage notes.

UI/UX direction:
- Product character: serious, calm, student-focused learning cockpit.
- Avoid generic AI-generated UI patterns, blue-purple gradients, and decorative card-heavy landing pages.
- Mobile-first, accessible, keyboard-friendly, WCAG 2.2 AA-oriented.
- Use stable dimensions for flipcards, quiz options, and progress widgets.
- Use readable typography, high contrast, clear focus states, and purposeful animation only.

Output:
1. Prompt analysis.
2. Grand design / PRD technical document.
3. Content curation framework.
4. Recommended roadmap and next actions.
5. Create a start skill:
   /start-website-tbi-uncommon-uncountable-and-countable-noun
6. Create an update skill:
   /update-website-tbi-uncommon-uncountable-and-countable-noun
7. Validate the created skill files.
```
