import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

async function clearProgress(page: Page) {
  await page.goto("/");
  await page.evaluate(() => window.localStorage.clear());
  await page.reload();
}

async function expectNoSeriousA11yViolations(page: Page) {
  const results = await new AxeBuilder({ page }).analyze();
  const seriousViolations = results.violations.filter((violation) =>
    violation.impact === "critical" || violation.impact === "serious",
  );

  expect(
    seriousViolations.map((violation) => ({
      id: violation.id,
      impact: violation.impact,
      description: violation.description,
      nodes: violation.nodes.map((node) => node.target),
    })),
  ).toEqual([]);
}

test("core views have no serious axe violations", async ({ page }) => {
  await clearProgress(page);
  await expectNoSeriousA11yViolations(page);

  await page.getByRole("button", { name: /Materi/ }).click();
  await expect(page.getByRole("heading", { name: "Noun Classification 01" })).toBeVisible();
  await expectNoSeriousA11yViolations(page);

  await page.getByRole("button", { name: /Flipcard/ }).click();
  await expect(page.getByRole("heading", { name: "Noun Classification 01" })).toBeVisible();
  await expectNoSeriousA11yViolations(page);

  await page.getByRole("button", { name: /^Tes$/ }).click();
  await expect(page.getByRole("heading", { name: "Noun Classification 01" })).toBeVisible();
  await expectNoSeriousA11yViolations(page);
});

test("keyboard and ARIA state are exposed for navigation, filters, and flipcards", async ({ page }) => {
  await clearProgress(page);

  await expect(page.getByRole("button", { name: "Dashboard", exact: true })).toHaveAttribute("aria-current", "page");
  await page.getByRole("button", { name: "Materi", exact: true }).click();
  await expect(page.getByRole("button", { name: "Materi", exact: true })).toHaveAttribute("aria-current", "page");

  const search = page.getByLabel("Cari materi");
  await search.focus();
  await expect(search).toBeFocused();
  await expect(page.locator(".search-box")).toHaveCSS("outline-style", "solid");

  await expect(page.getByRole("button", { name: "Semua" })).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("button", { name: "Countable", exact: true }).click();
  await expect(page.getByRole("button", { name: "Countable", exact: true })).toHaveAttribute("aria-pressed", "true");

  await page.getByRole("button", { name: "Flipcard", exact: true }).click();
  const flipcard = page.getByRole("button", { name: /Balik kartu access/ });
  await expect(flipcard).toHaveAttribute("aria-expanded", "false");
  await expect(page.locator(".flip-front")).toHaveAttribute("aria-hidden", "false");
  await expect(page.locator(".flip-front .badge")).toHaveCount(0);
  await expect(page.locator(".flip-back")).toHaveAttribute("aria-hidden", "true");
  await flipcard.press("Enter");
  await expect(flipcard).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator(".flip-front")).toHaveAttribute("aria-hidden", "true");
  await expect(page.locator(".flip-back")).toHaveAttribute("aria-hidden", "false");
});

test("main sidebar and package rail expose collapse controls", async ({ page }) => {
  await clearProgress(page);

  await page.getByRole("button", { name: "Collapse sidebar utama" }).click();
  await expect(page.getByRole("button", { name: "Expand sidebar utama" })).toHaveAttribute("aria-expanded", "false");
  await page.getByRole("button", { name: "Expand sidebar utama" }).click();

  await page.getByRole("button", { name: "Tes", exact: true }).click();
  await expect(page.getByLabel("Tampilkan paket 11 sampai 20")).toBeEnabled();
  await page.getByLabel("Tampilkan paket 11 sampai 20").click();
  await expect(page.getByText("11-20", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Collapse Daftar paket tes" }).click();
  await expect(page.getByRole("button", { name: "Expand Daftar paket tes" })).toHaveAttribute("aria-expanded", "false");
});

test("reduced motion removes flip animation transforms", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await clearProgress(page);
  await page.getByRole("button", { name: /Flipcard/ }).click();

  await page.getByRole("button", { name: /Balik kartu access/ }).click();
  await expect(page.locator(".flip-front")).toHaveCSS("transform", "none");
  await expect(page.locator(".flip-back")).toHaveCSS("transform", "none");
});
