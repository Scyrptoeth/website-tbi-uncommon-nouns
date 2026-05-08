# TBI - Noun Classifier

Website pembelajaran Persiapantubel untuk mengenali common uncountable nouns dan countable nouns.

## Scope

- 100 common uncountable nouns.
- 100 common countable nouns.
- 20 paket tes.
- 200 soal klasifikasi pilihan A/B.
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

Rilis ini memakai seed data di source agar bisa langsung deploy tanpa secret database. Dataset specialized lama disimpan di `docs/archive/` dan tidak dirender di website. Fase berikutnya memindahkan progress, auth Nomor WA, SuperAdmin CMS, dan attempt history ke PostgreSQL sesuai grand design.
