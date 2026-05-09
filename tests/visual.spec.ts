import { expect, test, type Page } from "@playwright/test";

test.skip(process.platform !== "darwin", "Visual baselines are calibrated for the local macOS workspace.");

const screenshotOptions = {
  animations: "disabled" as const,
  fullPage: true,
  maxDiffPixelRatio: 0.015,
};

async function resetState(page: Page) {
  await page.goto("/");
  await page.evaluate(() => window.localStorage.clear());
  await page.reload();
}

test("dashboard visual baseline", async ({ page }) => {
  await resetState(page);
  await expect(page).toHaveScreenshot("dashboard.png", screenshotOptions);
});

test("materi and flipcard visual baselines", async ({ page }) => {
  await resetState(page);
  await page.getByRole("button", { name: /Pencarian/ }).click();
  await page.getByLabel("Cari seluruh noun").fill("access");
  await expect(page).toHaveScreenshot("search-access.png", screenshotOptions);

  await page.getByRole("button", { name: /Materi/ }).click();
  await expect(page).toHaveScreenshot("materi-access.png", screenshotOptions);

  await page.getByRole("button", { name: /Flipcard/ }).click();
  await page.getByRole("button", { name: /Balik kartu access/ }).click();
  await expect(page).toHaveScreenshot("flipcard-back.png", screenshotOptions);
});

test("test package visual baseline", async ({ page }) => {
  await resetState(page);
  await page.getByRole("button", { name: /^Tes$/ }).click();
  await page.getByRole("button", { name: /Noun Classification 01/ }).click();
  await page.getByRole("button", { name: /A Uncountable Noun/ }).first().click();
  await expect(page).toHaveScreenshot("test-package.png", screenshotOptions);
});

test("integrated advanced package visual baseline", async ({ page }) => {
  await resetState(page);
  await page.getByRole("button", { name: /^Tes$/ }).click();
  for (const range of ["11 sampai 20", "21 sampai 30", "31 sampai 40", "41 sampai 50"]) {
    await page.getByLabel(`Tampilkan paket ${range}`).click();
  }
  await page.getByRole("button", { name: /Noun Classification 41/ }).click();
  await page.getByRole("button", { name: /A Uncountable Noun/ }).first().click();
  await expect(page).toHaveScreenshot("advanced-package.png", screenshotOptions);
});
