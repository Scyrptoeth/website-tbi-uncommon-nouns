import { expect, test } from "@playwright/test";

test("student learning surfaces render and accept interaction", async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => window.localStorage.clear());
  await page.reload();

  await expect(page.getByRole("heading", { name: "TBI - Noun Classifier" })).toBeVisible();
  await expect(
    page.getByText(
      "Kenali Uncountable Noun dan Countable Noun yang relevan untuk latihan TOEFL, TOEIC, dan IELTS melalui fasilitas Materi, Flipcard, dan Tes.",
    ),
  ).toBeVisible();
  await expect(page.getByAltText("Persiapantubel")).toBeVisible();
  await expect(page.getByText("TBI Nouns", { exact: true })).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Tantangan", exact: true })).toHaveCount(0);
  await expect(
    page.locator("section").filter({ hasText: "Flipcard Dibuka" }).getByText("0/600", { exact: true }),
  ).toBeVisible();
  if ((page.viewportSize()?.width ?? 0) >= 1024) {
    const sidebarTopBefore = await page.locator(".app-sidebar").evaluate((element) =>
      Math.round(element.getBoundingClientRect().top),
    );
    await page.evaluate(() => window.scrollTo(0, 900));
    const sidebarTopAfter = await page.locator(".app-sidebar").evaluate((element) =>
      Math.round(element.getBoundingClientRect().top),
    );
    expect(sidebarTopBefore).toBe(0);
    expect(sidebarTopAfter).toBe(0);
    await page.evaluate(() => window.scrollTo(0, 0));
  }

  await page.getByRole("button", { name: /Pencarian/ }).click();
  await expect(page.getByRole("heading", { name: "Daftar Noun" })).toBeVisible();
  await page.getByLabel("Cari seluruh noun").fill("access");
  await expect(page.getByRole("heading", { name: "access" })).toBeVisible();
  await expect(page.getByText("akses")).toBeVisible();

  await page.getByRole("button", { name: /Materi/ }).click();
  await expect(page.getByRole("heading", { name: "Noun Classification 01" })).toBeVisible();
  await expect(page.getByText("1-10", { exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "access" })).toBeVisible();
  for (const range of ["11 sampai 20", "21 sampai 30", "31 sampai 40", "41 sampai 50"]) {
    await page.getByLabel(`Tampilkan paket ${range}`).click();
  }
  await page.getByRole("button", { name: /Noun Classification 41/ }).click();
  await expect(page.getByRole("heading", { name: "abrasion" })).toBeVisible();

  await page.getByRole("button", { name: /Flipcard/ }).click();
  await expect(page.getByRole("heading", { name: "Noun Classification 01" })).toBeVisible();
  await expect(page.getByRole("button", { name: /Balik kartu access/ })).toBeVisible();
  await page.getByRole("button", { name: "Balik kartu", exact: true }).click();
  await expect(page.getByText("akses")).toBeVisible();

  await page.getByRole("button", { name: /^Tes$/ }).click();
  await page.getByRole("button", { name: /Noun Classification 01/ }).click();
  const navigatorPosition = await page
    .locator(".test-navigator")
    .evaluate((element) => getComputedStyle(element).position);
  if ((page.viewportSize()?.width ?? 0) >= 1024) {
    expect(navigatorPosition).toBe("sticky");
  }
  await expect(page.getByRole("button", { name: /A Uncountable Noun/ }).first()).toBeVisible();
  await expect(page.getByRole("button", { name: /B Countable Noun/ }).first()).toBeVisible();
  await page.locator(".option-button").first().click();
  await expect(page.getByText("Sudah dijawab", { exact: true })).toBeVisible();
  await expect(page.getByLabel("Soal 1 nomor sudah dijawab")).toBeVisible();
  await page.locator(".option-button").first().click();
  await expect(page.getByText("Belum dijawab", { exact: true })).toBeVisible();
  await expect(page.getByLabel("Soal 1 nomor belum dijawab")).toBeVisible();
  for (const range of ["11 sampai 20", "21 sampai 30", "31 sampai 40", "41 sampai 50"]) {
    await page.getByLabel(`Tampilkan paket ${range}`).click();
  }
  await page.getByRole("button", { name: /Noun Classification 41/ }).click();
  await expect(page.getByText('Tentukan jenis noun berikut: "abrasion".')).toBeVisible();
  await expect(page.getByText(/Dalam konteks science \(pengikisan\).*"abrasion"/)).toHaveCount(0);
});
