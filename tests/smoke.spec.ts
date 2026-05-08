import { expect, test } from "@playwright/test";

test("student learning surfaces render and accept interaction", async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => window.localStorage.clear());
  await page.reload();

  await expect(page.getByRole("heading", { name: "TBI - Noun Classifier" })).toBeVisible();
  await expect(
    page.locator("section").filter({ hasText: "Flipcard Dibuka" }).getByText("0/200", { exact: true }),
  ).toBeVisible();

  await page.getByRole("button", { name: /Materi/ }).click();
  await page.getByLabel("Cari materi").fill("water");
  await expect(page.getByRole("heading", { name: "water" })).toBeVisible();

  await page.getByRole("button", { name: /Flipcard/ }).click();
  await expect(page.getByRole("button", { name: /Balik kartu access/ })).toBeVisible();
  await page.getByRole("button", { name: "Balik kartu", exact: true }).click();
  await expect(page.getByText("akses")).toBeVisible();

  await page.getByRole("button", { name: /^Tes$/ }).click();
  await page.getByRole("button", { name: /Noun Classification 01/ }).click();
  await expect(page.getByRole("button", { name: /A Uncountable Noun/ }).first()).toBeVisible();
  await expect(page.getByRole("button", { name: /B Countable Noun/ }).first()).toBeVisible();
  await page.locator(".option-button").first().click();
  await expect(page.getByText(/1\/10 terjawab/)).toBeVisible();
});
