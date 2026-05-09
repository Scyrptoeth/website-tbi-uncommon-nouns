import { expect, test } from "@playwright/test";
import { contentStats, highRiskClassificationTerms, nounEntries, testPackages } from "../src/lib/content";

test("content bank keeps the reviewed classification shape", () => {
  expect(contentStats).toEqual({
    uncountableCount: 200,
    countableCount: 200,
    totalEntries: 400,
    totalQuestions: 400,
    totalPackages: 40,
  });

  expect(new Set(nounEntries.map((entry) => entry.id)).size).toBe(nounEntries.length);
  expect(new Set(nounEntries.map((entry) => entry.displayNoun.toLowerCase())).size).toBe(nounEntries.length);

  for (const term of highRiskClassificationTerms) {
    const entry = nounEntries.find((item) => item.displayNoun === term);
    expect(entry, `${term} must exist`).toBeTruthy();
    expect(entry?.classificationHint, `${term} needs explicit classification context`).toBeTruthy();
  }

  for (const entry of nounEntries.filter((item) => item.nounType === "uncountable")) {
    expect(entry.quantityExpression, `${entry.displayNoun} needs a quantity expression`).toBeTruthy();
    expect(entry.commonMistake).not.toContain("*");
    expect(entry.commonMistake).not.toMatch(/\bnewss\b|\binformations\b|\badvices\b/);
  }

  for (const entry of nounEntries.filter((item) => item.nounType === "countable")) {
    expect(entry.singularForm, `${entry.displayNoun} needs a singular form`).toBeTruthy();
    expect(entry.pluralForm, `${entry.displayNoun} needs a plural form`).toBeTruthy();
  }
});

test("test packages stay mixed and use only A/B classification options", () => {
  for (const item of testPackages) {
    expect(item.questions).toHaveLength(10);
    expect(item.packageType).toBe("mixed");
    expect(item.questions.filter((question) => question.answerKey === "A")).toHaveLength(5);
    expect(item.questions.filter((question) => question.answerKey === "B")).toHaveLength(5);

    for (const question of item.questions) {
      expect(question.options.map((option) => option.key)).toEqual(["A", "B"]);
      expect(question.options.map((option) => option.text)).toEqual([
        "Uncountable Noun",
        "Countable Noun",
      ]);
      expect(question.explanation).toContain("Jawaban yang tepat");
    }
  }

  expect(testPackages.flatMap((item) => item.questions).map((question) => question.nounId)).toHaveLength(
    new Set(testPackages.flatMap((item) => item.questions).map((question) => question.nounId)).size,
  );
});
