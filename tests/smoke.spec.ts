import { expect, test } from "@playwright/test";

test("student learning surfaces render and accept interaction", async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => window.localStorage.clear());
  await page.reload();

  await expect(page.getByRole("heading", { name: "TBI - Uncommon Nouns" })).toBeVisible();
  await expect(
    page.locator("section").filter({ hasText: "Flipcard Dibuka" }).getByText("0/200", { exact: true }),
  ).toBeVisible();

  await page.getByRole("button", { name: /Materi/ }).click();
  await page.getByLabel("Cari materi").fill("abrasion");
  await expect(page.getByRole("heading", { name: "abrasion" })).toBeVisible();

  await page.getByRole("button", { name: /Flipcard/ }).click();
  await expect(page.getByRole("button", { name: /Balik kartu abrasion/ })).toBeVisible();
  await page.getByRole("button", { name: "Balik kartu", exact: true }).click();
  await expect(page.getByText("pengikisan")).toBeVisible();

  await page.getByRole("button", { name: /^Tes$/ }).click();
  await page.getByRole("button", { name: /Uncountable Nouns 01/ }).click();
  await page.locator(".option-button").first().click();
  await expect(page.getByText(/1\/10 terjawab/)).toBeVisible();
});
