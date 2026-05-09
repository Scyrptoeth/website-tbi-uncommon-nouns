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
  await page.getByRole("button", { name: /Materi/ }).click();
  await page.getByLabel("Cari materi").fill("access");
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

test("challenge package visual baseline", async ({ page }) => {
  await resetState(page);
  await page.getByRole("button", { name: "Tantangan", exact: true }).click();
  await page.getByRole("button", { name: /Tantangan 01/ }).click();
  await page.getByRole("button", { name: /A Uncountable Noun/ }).first().click();
  await expect(page).toHaveScreenshot("challenge-package.png", screenshotOptions);
});
