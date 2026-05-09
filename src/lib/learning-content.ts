import { challengeNounEntries, challengePackages } from "./challenge-content";
import { nounEntries, testPackages, type NounEntry, type TestPackage } from "./content";

const integratedChallengePackages: TestPackage[] = challengePackages.map((item, index) => {
  const order = testPackages.length + index + 1;
  const slug = `classification-${String(order).padStart(2, "0")}`;

  return {
    ...item,
    slug,
    title: `Noun Classification ${String(order).padStart(2, "0")}`,
    order,
    questions: item.questions.map((question) => ({
      ...question,
      id: `${slug}-${question.nounId}`,
      packageSlug: slug,
    })),
  };
});

export const learningNounEntries: NounEntry[] = [...nounEntries, ...challengeNounEntries];

export const learningPackages: TestPackage[] = [...testPackages, ...integratedChallengePackages];

const learningUncountableCount = learningNounEntries.filter((entry) => entry.nounType === "uncountable").length;
const learningCountableCount = learningNounEntries.filter((entry) => entry.nounType === "countable").length;

export const learningStats = {
  uncountableCount: learningUncountableCount,
  countableCount: learningCountableCount,
  totalEntries: learningNounEntries.length,
  totalQuestions: learningPackages.reduce((total, item) => total + item.questions.length, 0),
  totalPackages: learningPackages.length,
};

const findDuplicates = (values: string[]) => {
  const seen = new Set<string>();
  const duplicates = new Set<string>();

  for (const value of values) {
    if (seen.has(value)) duplicates.add(value);
    seen.add(value);
  }

  return [...duplicates];
};

const duplicateIds = findDuplicates(learningNounEntries.map((entry) => entry.id));
const duplicateQuestionIds = findDuplicates(learningPackages.flatMap((item) => item.questions.map((question) => question.id)));
const incompletePackages = learningPackages.filter((item) => item.questions.length !== 10);
const missingPackageSequence = learningPackages.filter((item, index) => item.order !== index + 1);

if (
  learningStats.uncountableCount !== 300 ||
  learningStats.countableCount !== 300 ||
  learningStats.totalEntries !== 600 ||
  learningStats.totalQuestions !== 600 ||
  learningStats.totalPackages !== 60 ||
  incompletePackages.length > 0 ||
  missingPackageSequence.length > 0
) {
  throw new Error(
    "Integrated TBI learning content must contain 300 uncountable entries, 300 countable entries, 600 questions, and 60 complete sequential packages.",
  );
}

if (duplicateIds.length > 0 || duplicateQuestionIds.length > 0) {
  throw new Error(
    `Integrated TBI learning content must not contain duplicate ids. Duplicate noun ids: ${duplicateIds.join(", ") || "-"}; duplicate question ids: ${duplicateQuestionIds.join(", ") || "-"}`,
  );
}
