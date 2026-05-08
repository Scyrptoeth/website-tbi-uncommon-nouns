# Grand Design Website TBI Uncommon Uncountable and Countable Noun

Date: 2026-05-09
Status: Implemented MVP with common noun classification pivot
Formal project name: Website-TBI-Uncommon-Uncountable-and-Countable-Noun
Recommended public title: TBI - Noun Classifier
Owner: Bimbel Persiapantubel

## 1. Executive Summary

Website TBI Uncommon Uncountable and Countable Noun is a focused web learning product for Bimbel Persiapantubel students preparing for Tes Bahasa Inggris. The current MVP helps students recognize common uncountable nouns and common countable nouns across varied everyday contexts before moving into harder test-prep noun behavior.

The product has three core tools:

1. Materi: structured noun reference and self-study.
2. Flipcard: active recall practice with progress tracking.
3. Tes: package-based multiple-choice assessment with scoring and Indonesian explanations.

The project should be designed production-ready from the start. Content should be manageable through SuperAdmin workflows, progress should persist by student account, and the architecture should be compatible with the future Ekosistem Persiapantubel.

Current implementation companion docs:

- `docs/content-qa-report-2026-05-09.md`
- `docs/persistence-and-admin-roadmap.md`
- `docs/advanced-module-strategy.md`

## 2. Product Positioning

### 2.1 Target Users

- Primary: Bimbel Persiapantubel students preparing for TBI.
- Secondary: Persiapantubel admins or tutors who curate and maintain noun/question content.

### 2.2 Product Character

The product should feel like a calm, focused learning cockpit. It should not feel like a marketing landing page, a generic flashcard clone, or an enterprise dashboard. Students should immediately see what to learn, what remains unfinished, and what to do next.

### 2.3 Ecosystem Fit

This project should be architected as part of the future Ekosistem Persiapantubel alongside:

- Website TBI Regular & Irregular Verbs.
- Cloud Storage Siswa Persiapantubel.
- Future Persiapantubel learning tools.

Recommended identity direction:

- Shared Persiapantubel brand signal.
- Similar login model and student identity model.
- Separate product module today, ecosystem-compatible routes and data later.

## 3. Key Product Decisions

- Use "TBI - Noun Classifier" as the current public title because the active learning goal is classifying whether a noun is uncountable or countable.
- Keep the formal project/documentation name as Website-TBI-Uncommon-Uncountable-and-Countable-Noun.
- Keep the original specialized/uncommon seed list archived in source control and out of the student UI.
- Use database-backed student progress. LocalStorage-only progress is not enough for ecosystem readiness.
- Use registered WhatsApp number + password authentication, aligned with the existing TBI verbs project.
- Use PostgreSQL as operational storage.
- Use Excel/CSV only for import/export and administrative review, not production storage.
- Lock tests only after final submit, not when opened.
- Store draft attempts before final submit.
- Make content living: nouns, meanings, packages, questions, options, and students can be added, archived, or corrected.
- Keep structured source evidence, but do not claim real exam appearance unless supported by official/licensed/internal evidence.

## 4. Content Scope

### 4.1 Initial Content Target

- 100 common uncountable nouns.
- 100 common countable nouns.
- 200 A/B classification questions.
- 20 total test packages:
  - 20 mixed classification packages.
  - 10 questions per package.

### 4.2 Noun Entry Fields

Common fields:

- `id`.
- `displayNoun`.
- `nounType`: `uncountable` or `countable`.
- `primaryMeaningText`: Indonesian meaning used for the first Materi/Flipcard release.
- `difficulty`: recommended values `core`, `medium`, `advanced`.
- `topic`: academic, business, travel, science, legal, administration, daily-life, abstract concept, etc.
- `usageNote`: short Indonesian explanation.
- `exampleSentence`: original sentence, not copied from protected exams.
- `sourceType`: `official_sample`, `licensed_material`, `dictionary`, `grammar_reference`, `internal_note`, or `tutor_review`.
- `sourceName`: short source label, e.g. `Cambridge Dictionary`, `ETS TOEFL prep`, or `Persiapantubel tutor review`.
- `urlOrCitation`: URL, book/material citation, or internal reference id.
- `accessedAt`: date checked for web sources.
- `claimAllowed`: boolean. `true` only when the source supports the exact claim being shown to students/admins.
- `sourceNote`: short validation note. Do not use this as a substitute for the structured source fields above.
- `status`: draft, published, archived.

Implementation note:

- The normalized database can store one or more meanings in `noun_meanings`.
- The content import can still accept `primaryMeaningText` for the first release and create the primary `noun_meanings` row automatically.
- If a noun has materially different meanings with different countability, create separate meaning rows or separate noun entries with explicit usage notes.

Uncountable-specific fields:

- `quantityExpression`: e.g. "a piece of", "an item of", "a bit of", "a body of", "a strand of".
- `commonMistake`: e.g. "do not use *informations*".
- `countableAlternative`: optional, e.g. "a suitcase" for "luggage".

Countable-specific fields:

- `singularForm`.
- `pluralForm`.
- `pluralType`: regular, irregular, zero plural, foreign plural, compound plural.
- `articleNote`: optional.
- `commonMistake`.

### 4.3 Content Integrity Rules

- Prioritize official TOEFL/TOEIC/IELTS sample and prep materials for format awareness.
- Validate noun countability and plural form against learner dictionaries or grammar references.
- Never copy leaked or copyrighted test questions.
- Use original example sentences and original Indonesian explanations.
- If a noun is both countable and uncountable depending on meaning, create separate entries or explicit usage notes.
- Keep a review status before publish.

## 5. Learning Tools

### 5.1 Materi

Purpose:

- Help students understand noun status, meaning, plural form, quantity expression, and common mistakes.

Recommended UI:

- Top area: product name, progress summary, search.
- Segmented control: All, Uncountable, Countable.
- Sort: alphabetical by display noun by default.
- Filter: topic, difficulty, not yet seen.
- Content layout:
  - Desktop: dense table/list hybrid.
  - Mobile: compact rows with expandable detail.
- Avoid oversized landing-page hero.
- Keep reading text at 16px+ and line length controlled.

Student-facing data:

- Uncountable row: noun, meaning, quantity expression, mistake note.
- Countable row: singular, plural, meaning, plural note.

### 5.2 Flipcard

Purpose:

- Train active recall by showing the noun first, then asking students to recall type, meaning, and plural/quantity behavior.

Recommended behavior:

- One card per noun.
- Front side:
  - The noun.
  - Optional mode label hidden or visible depending on practice mode.
- Back side:
  - If uncountable: "Uncountable Noun", meaning, usage note, quantity expression.
  - If countable: "Countable Noun", singular, plural, meaning, plural note.
- Actions:
  - Flip.
  - Next.
  - Previous.
  - Mark difficult/bookmark in later phase.
  - Filter unaccessed cards.
- Progress writes when a student first opens/views the card front side.
- Optional later metric: track `firstFlippedAt` or flip count separately. The main progress chart should use opened/viewed cards so students are not punished for briefly reviewing a known card.

Animation:

- Use transform/opacity only.
- Keep duration around 180-250ms.
- Respect `prefers-reduced-motion`.
- Maintain stable card dimensions to avoid layout shift.

### 5.3 Tes

Purpose:

- Evaluate whether students can recognize and apply countable/uncountable rules in test-like contexts.

Package structure:

- `uncountable-01` through `uncountable-10`.
- `countable-01` through `countable-10`.
- 10 questions per package.

Question types:

- Choose the grammatically correct sentence.
- Choose the correct noun classification.
- Choose the correct plural form.
- Choose the correct quantity expression.
- Complete the sentence with the correct option.
- Detect common mistakes such as incorrect pluralization of uncountable nouns.

Attempt lifecycle:

1. Not started.
2. Draft: package opened and answers saved/resumable.
3. Submitted: final score locked.
4. Reset: SuperAdmin reset creates a new allowed attempt while preserving history.

Scoring:

- Correct: +1.
- Wrong: 0.
- Unanswered: 0.

Result review:

- Score and percentage.
- Wrong numbers.
- Unanswered numbers.
- Correct answer per question.
- Student answer per question.
- Indonesian explanation.

## 6. Progress Design

Progress should answer three questions:

1. What have I already studied?
2. What have I not opened yet?
3. What should I do next?

Student dashboard widgets:

- Flipcard progress: accessed vs not accessed.
- Test progress: not started vs draft vs submitted.
- Latest draft test shortcut.
- Next unaccessed noun shortcut.
- Weak area summary after enough attempts exist.

Implementation principle:

- Progress denominator should use active published content.
- Archived content should not punish student progress.
- Progress chart must include labels and numeric values, not only color.

## 7. Roles And Permissions

### 7.1 Student

Can:

- Login with registered WhatsApp number and password.
- Open Materi, Flipcard, and published Tes packages.
- Save draft answers.
- Submit final answers once per package.
- View own progress and own result review.
- Change own password.
- Logout.

Cannot:

- Self-register.
- Change registered WhatsApp number.
- Access SuperAdmin routes.
- See other students' progress.
- See answer keys before final submit.
- Repeat a submitted package without SuperAdmin reset.

### 7.2 SuperAdmin

Can:

- Manage students and status.
- Reset student password.
- Reset a submitted attempt per package.
- Manage noun entries.
- Manage test packages.
- Manage questions and options.
- Publish/unpublish/archive content.
- Import/export content.
- View progress and score summaries.
- View audit logs.

Must:

- Be protected by server-side role checks.
- Trigger audit logs for sensitive actions.
- Use confirmations for resets, archives, and destructive changes.

## 8. Recommended Technical Architecture

### 8.1 Stack Direction

- Next.js App Router.
- TypeScript.
- PostgreSQL.
- Drizzle ORM by default.
- Custom auth with registered WhatsApp number + password hash.
- Tailwind CSS with custom design tokens.
- Zod for input validation.
- Vitest for unit tests.
- Playwright for browser verification.
- axe or equivalent accessibility checks for key screens.

### 8.2 App Structure

Recommended route groups:

- `/login`.
- `/app`.
- `/app/materi`.
- `/app/flipcard`.
- `/app/tes`.
- `/app/tes/[slug]`.
- `/app/change-password`.
- `/admin`.
- `/admin/students`.
- `/admin/content`.
- `/admin/import`.
- `/admin/audit`.

### 8.3 Data Model Targets

Core tables:

- `users`.
- `student_profiles`.
- `sessions`.
- `login_attempts`.
- `noun_entries`.
- `noun_meanings`.
- `noun_sources`.
- `test_packages`.
- `questions`.
- `question_options`.
- `attempts`.
- `attempt_question_snapshots`.
- `attempt_answers`.
- `flipcard_progress`.
- `import_batches`.
- `content_import_rows`.
- `admin_audit_logs`.

Important invariants:

- Phone numbers are normalized.
- Passwords are hashed.
- Sessions store token hashes, not raw tokens.
- Submitted attempts are immutable.
- Attempt snapshots preserve question state at attempt time.
- Published content is separate from draft content.
- Audit logs never store secrets.

## 9. Security And Privacy

- Never store plaintext passwords.
- Never commit `.env`, database URLs, tokens, imported credential files, or production secrets.
- Use server-side auth/role checks for every protected route and mutation.
- Use generic login error messages.
- Rate-limit or progressively lock suspicious login attempts.
- Revoke sessions after password change/reset.
- Mask phone numbers in logs and admin summaries where possible.
- Do not put full imported student credential values in project memory.

## 10. UI/UX Direction

### 10.1 Visual Direction

Recommended product character:

- Calm learning cockpit.
- Dense but readable.
- High trust.
- Progress-oriented.

Recommended typography:

- Body: Atkinson Hyperlegible or another accessibility-oriented font.
- Numeric/code labels: DM Mono.
- Avoid Inter as a default choice unless intentionally justified later.

Recommended palette:

- Background: soft neutral near-white.
- Text: deep ink.
- Primary: deep teal or forest green for learning/navigation.
- Accent: warm coral/amber for attention and next action.
- Semantic red only for errors/wrong answers.
- Semantic green only for success/correct answers.

Avoid:

- Blue-purple gradients.
- Generic centered hero.
- Decorative orb backgrounds.
- Card-inside-card layouts.
- Over-rounded generic buttons.
- Low-contrast gray text.

### 10.2 Interaction Requirements

- Mobile-first layout.
- Minimum touch targets around 44px.
- Keyboard-reachable actions.
- Visible focus states.
- Stable card/quiz dimensions.
- No text overlap on mobile.
- Motion-safe animation with reduced-motion support.
- Quiz option states must clearly distinguish selected, correct, wrong, and unanswered.

## 11. SuperAdmin Design

MVP SuperAdmin:

- Student list with search/filter.
- Add/edit/deactivate/reactivate student.
- Reset password.
- Reset submitted attempt.
- Import students/content with preview.
- View package status and scores.

Content SuperAdmin:

- Noun bank CRUD.
- Test package CRUD.
- Question CRUD.
- Option CRUD with exactly one correct answer.
- Publish state management.
- Import/export CSV/XLSX.
- Audit history for sensitive and content-changing actions.

Admin UX guardrails:

- Do not load all content into one giant page.
- Use tabs or segmented navigation by task.
- Use paginated tables and package-first question editing.
- Keep destructive actions explicit and auditable.

## 12. Import And Export Strategy

Supported import sources:

- CSV.
- XLSX.

Recommended templates:

- `noun-entries.csv`.
- `noun-meanings.csv`.
- `test-packages.csv`.
- `questions.csv`.
- `question-options.csv`.
- `content-bundle.csv`.
- `students.csv`.

Import behavior:

- Dry-run by default.
- Preview row-level validation.
- No overwrite by default.
- Confirm step before write.
- Mask sensitive values.
- Store import batch metadata.
- Never store plaintext passwords.

Export behavior:

- Export content templates and published content.
- Do not export student passwords.
- Include stable identifiers for update workflows.

## 13. Implementation Roadmap

### Phase 0 - Content And Repo Preparation

- Approve public title and domain/repository name.
- Curate initial 200 noun entries.
- Curate 200 original questions.
- Define import templates.
- Decide whether to fork/adapt the existing TBI verbs architecture.

### Phase 1 - Foundation

- Scaffold Next.js App Router app.
- Set up TypeScript, Tailwind, linting, tests.
- Define design tokens.
- Add PostgreSQL/Drizzle schema.
- Build custom WhatsApp-number auth.
- Add seed/import foundation.

### Phase 2 - Student Learning MVP

- Student dashboard.
- Materi.
- Flipcard and progress.
- Tes package list.
- Draft attempt, autosave/resume, final submit, score review.
- Change password and logout.

### Phase 3 - SuperAdmin MVP

- Student management.
- Password reset.
- Attempt reset.
- Basic content visibility/publish controls.
- Import students/content.
- Audit logs.

### Phase 4 - Content CMS

- Noun bank CRUD.
- Package/question/option CRUD.
- Content import/export.
- Review workflow.
- Content quality checks.

### Phase 5 - Analytics And Ecosystem

- Weak-area analytics.
- Difficult noun review.
- Student recommendations.
- Ecosystem navigation.
- Future shared auth/session strategy.

## 14. Verification Plan

For documentation:

- Check consistency between prompt analysis, refined prompt, grand design, and skills.
- Confirm no secrets are stored.
- Confirm official/reference links are recorded.

For future code:

- `npm run typecheck`.
- `npm run lint`.
- `npm run test`.
- `npm run build 2>&1 | tail -25`.
- Browser verification for student and admin routes.
- Accessibility checks for login, dashboard, Materi, Flipcard, Tes, and admin pages.
- Mobile viewport checks for text overlap and stable controls.
- Database migration review before applying to production.
- Secret scan before commit/deploy.

## 15. Reference Direction

Use these as reference categories, not as copied content sources:

- ETS official TOEFL iBT prep resources for TOEFL preparation context:
  https://www.br.ets.org/toefl/test-takers/ibt/prepare.html
- ETS official TOEIC preparation materials and sample-test references:
  https://www.ets.org/content/ets-org/language-master/in/home/toeic/test-takers/prepare.html
- IELTS official Academic sample test questions:
  https://ielts.org/take-a-test/preparation-resources/sample-test-questions/academic-test
- Cambridge Grammar on countable and uncountable nouns:
  https://dictionary.cambridge.org/us/grammar/british-grammar/nouns-countable-and-uncountable
- W3C WCAG 2.2:
  https://www.w3.org/TR/WCAG22/

## 16. Recommended Next Action

Start with Phase 0:

1. Approve public title: recommended `TBI - Uncommon Nouns`.
2. Decide repository name and local project root.
3. Curate a verified 200-entry noun bank using the content curation guide.
4. Draft 20 test packages with original questions and Indonesian explanations.
5. Then scaffold the Next.js app using the project start skill.
