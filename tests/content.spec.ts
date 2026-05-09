import { expect, test } from "@playwright/test";
import { challengeNounEntries, challengePackages, challengeStats } from "../src/lib/challenge-content";
import { contentStats, highRiskClassificationTerms, nounEntries, testPackages } from "../src/lib/content";
import { learningNounEntries, learningPackages, learningStats } from "../src/lib/learning-content";

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

test("advanced challenge content reactivates archived nouns as mixed packages", () => {
  expect(challengeStats).toEqual({
    uncountableCount: 100,
    countableCount: 100,
    totalEntries: 200,
    totalQuestions: 200,
    totalPackages: 20,
  });

  expect(new Set(challengeNounEntries.map((entry) => entry.id)).size).toBe(challengeNounEntries.length);
  expect(new Set(challengeNounEntries.map((entry) => entry.displayNoun.toLowerCase())).size).toBe(
    challengeNounEntries.length,
  );

  for (const item of challengePackages) {
    expect(item.questions).toHaveLength(10);
    expect(item.packageType).toBe("mixed");
    expect(item.questions.filter((question) => question.answerKey === "A")).toHaveLength(5);
    expect(item.questions.filter((question) => question.answerKey === "B")).toHaveLength(5);

    const answerSequence = item.questions.map((question) => question.answerKey).join("");
    expect(answerSequence).not.toBe("ABABABABAB");
    expect(answerSequence).not.toBe("BABABABABA");
    expect(answerSequence.startsWith("AAAAA")).toBe(false);
    expect(answerSequence.startsWith("BBBBB")).toBe(false);

    for (const question of item.questions) {
      expect(question.options.map((option) => option.key)).toEqual(["A", "B"]);
      expect(question.options.map((option) => option.text)).toEqual([
        "Uncountable Noun",
        "Countable Noun",
      ]);
      expect(question.prompt).toMatch(/^Tentukan jenis noun berikut: ".+"\.$/);
      expect(question.prompt).not.toContain("Dalam konteks");
      expect(question.explanation).toContain("Jawaban yang tepat");
    }
  }

  expect(challengePackages.flatMap((item) => item.questions).map((question) => question.nounId)).toHaveLength(
    new Set(challengePackages.flatMap((item) => item.questions).map((question) => question.nounId)).size,
  );
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

test("learning packages integrate common and advanced content as packages 1 through 60", () => {
  expect(learningStats).toEqual({
    uncountableCount: 300,
    countableCount: 300,
    totalEntries: 600,
    totalQuestions: 600,
    totalPackages: 60,
  });

  expect(learningNounEntries).toHaveLength(nounEntries.length + challengeNounEntries.length);
  expect(learningPackages.map((item) => item.order)).toEqual(Array.from({ length: 60 }, (_, index) => index + 1));
  expect(learningPackages.map((item) => item.title)).toEqual(
    Array.from({ length: 60 }, (_, index) => `Noun Classification ${String(index + 1).padStart(2, "0")}`),
  );

  for (const item of learningPackages) {
    expect(item.questions).toHaveLength(10);
    expect(item.questions.filter((question) => question.answerKey === "A")).toHaveLength(5);
    expect(item.questions.filter((question) => question.answerKey === "B")).toHaveLength(5);
  }

  expect(learningPackages[40].questions[0].prompt).toBe('Tentukan jenis noun berikut: "abrasion".');
  expect(learningPackages.flatMap((item) => item.questions).map((question) => question.nounId)).toHaveLength(
    new Set(learningPackages.flatMap((item) => item.questions).map((question) => question.nounId)).size,
  );
});
