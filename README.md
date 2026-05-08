# TBI - Uncommon Nouns

Website pembelajaran Persiapantubel untuk uncommon uncountable nouns dan countable nouns.

## Scope

- 100 uncommon uncountable nouns.
- 100 uncommon countable nouns.
- 20 paket tes.
- 200 soal pilihan ganda.
- Materi, Flipcard, Tes, progress chart, dan ringkasan SuperAdmin.
- Progress demo tersimpan di browser localStorage.

## Scripts

```bash
npm run dev
npm run typecheck
npm run lint
npm run build
```

## Production Notes

Rilis live pertama ini memakai seed data di source agar bisa langsung deploy tanpa secret database. Fase berikutnya memindahkan progress, auth Nomor WA, SuperAdmin CMS, dan attempt history ke PostgreSQL sesuai grand design.
