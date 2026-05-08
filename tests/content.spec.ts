import { expect, test } from "@playwright/test";
import { contentStats, nounEntries, testPackages } from "../src/lib/content";

const highRiskTerms = [
  "cereal",
  "class",
  "coffee",
  "dish",
  "email",
  "food",
  "glass",
  "hair",
  "ice",
  "light",
  "medicine",
  "paper",
  "room",
  "tea",
  "work",
];

test("content bank keeps the reviewed classification shape", () => {
  expect(contentStats).toEqual({
    uncountableCount: 100,
    countableCount: 100,
    totalEntries: 200,
    totalQuestions: 200,
    totalPackages: 20,
  });

  expect(new Set(nounEntries.map((entry) => entry.id)).size).toBe(nounEntries.length);

  for (const term of highRiskTerms) {
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
});
