# TBI - Noun Classifier

Website pembelajaran Persiapantubel untuk mengenali common uncountable nouns dan countable nouns.

## Scope

- 200 common uncountable nouns.
- 200 common countable nouns.
- 40 paket tes.
- 400 soal klasifikasi pilihan A/B.
- 200 advanced/specialized challenge nouns dari arsip lama, disusun menjadi 20 paket Tantangan mixed.
- Materi, Flipcard, Tes, Tantangan, progress chart, dan ringkasan SuperAdmin.
- Progress demo tersimpan di browser localStorage.
- Content QA guard untuk noun ambigu, mixed package, dan pola jawaban Tantangan.
- Accessibility, keyboard, content-shape, dan visual regression tests.

## Scripts

```bash
npm run dev
npm run typecheck
npm run lint
npm run build
npm run test:content
npm run test:a11y
npm run test:visual
```

Visual regression snapshots are calibrated for the local macOS workspace. On other platforms, visual tests are skipped to avoid false failures from font and rendering differences.

## Production Notes

Rilis ini memakai seed data di source agar bisa langsung deploy tanpa secret database. Dataset specialized lama tetap disimpan sebagai arsip non-eksekusi di `docs/archive/`, lalu subset normalized-nya diaktifkan sebagai paket `Tantangan` melalui `src/lib/challenge-content.ts`. Fase berikutnya memindahkan progress, auth Nomor WA, SuperAdmin CMS, dan attempt history ke PostgreSQL sesuai grand design.

## Current Architecture Notes

- Content QA report: `docs/content-qa-report-2026-05-09.md`.
- Authenticated storage and SuperAdmin roadmap: `docs/persistence-and-admin-roadmap.md`.
- Advanced/uncommon module strategy: `docs/advanced-module-strategy.md`.
