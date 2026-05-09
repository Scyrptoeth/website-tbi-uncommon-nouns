"use client";

import {
  ArrowUp,
  BarChart3,
  BookOpen,
  CheckCircle2,
  CircleDashed,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  Database,
  Eye,
  Layers3,
  Lock,
  Search,
  ShieldCheck,
  Shuffle,
  Sparkles,
} from "lucide-react";
import type { ComponentType } from "react";
import { useEffect, useMemo, useState } from "react";
import {
  contentStats,
  nounEntries,
  testPackages,
  type NounEntry,
  type NounType,
  type TestPackage,
} from "@/lib/content";
import { challengePackages, challengeStats } from "@/lib/challenge-content";

type View = "dashboard" | "materi" | "flipcard" | "tes" | "tantangan" | "admin";
type Filter = "all" | NounType;
type OptionKey = "A" | "B";

type AttemptState = {
  answers: Record<string, OptionKey>;
  submittedAt?: string;
  score?: number;
};

type ProgressState = {
  viewedCards: string[];
  drafts: Record<string, AttemptState>;
  submitted: Record<string, AttemptState>;
};

const emptyProgress: ProgressState = {
  viewedCards: [],
  drafts: {},
  submitted: {},
};

const storageKey = "tbi-common-noun-classifier-progress-v2";

const views: Array<{ id: View; label: string; icon: ComponentType<{ size?: number }> }> = [
  { id: "dashboard", label: "Dashboard", icon: BarChart3 },
  { id: "materi", label: "Materi", icon: BookOpen },
  { id: "flipcard", label: "Flipcard", icon: Layers3 },
  { id: "tes", label: "Tes", icon: ClipboardCheck },
  { id: "tantangan", label: "Tantangan", icon: Shuffle },
  { id: "admin", label: "SuperAdmin", icon: ShieldCheck },
];

const nounTypeLabel: Record<NounType, string> = {
  uncountable: "Uncountable",
  countable: "Countable",
};

const packageTypeLabel = {
  mixed: "Klasifikasi campuran",
};

const nounEntryById = new Map(nounEntries.map((entry) => [entry.id, entry]));

const getPackageEntries = (item: TestPackage): NounEntry[] =>
  item.questions
    .map((question) => nounEntryById.get(question.nounId))
    .filter((entry): entry is NounEntry => Boolean(entry));

const scrollToTop = () => {
  if (typeof window === "undefined") return;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
};

const readProgress = (): ProgressState => {
  if (typeof window === "undefined") return emptyProgress;
  try {
    const raw = window.localStorage.getItem(storageKey);
    if (!raw) return emptyProgress;
    const parsed = JSON.parse(raw) as ProgressState;
    return {
      viewedCards: Array.isArray(parsed.viewedCards) ? parsed.viewedCards : [],
      drafts: parsed.drafts ?? {},
      submitted: parsed.submitted ?? {},
    };
  } catch {
    return emptyProgress;
  }
};

const writeProgress = (progress: ProgressState) => {
  window.localStorage.setItem(storageKey, JSON.stringify(progress));
};

const percent = (value: number, total: number) => Math.round((value / Math.max(total, 1)) * 100);

const countSubmittedPackages = (packages: TestPackage[], progress: ProgressState) =>
  packages.filter((item) => progress.submitted[item.slug]).length;

const countDraftPackages = (packages: TestPackage[], progress: ProgressState) =>
  packages.filter((item) => progress.drafts[item.slug] && !progress.submitted[item.slug]).length;

function StatBlock({
  label,
  value,
  total,
  tone,
}: {
  label: string;
  value: number;
  total: number;
  tone: "teal" | "amber" | "ink";
}) {
  const colors = {
    teal: "bg-[var(--accent-teal)]",
    amber: "bg-[var(--accent-amber)]",
    ink: "bg-[var(--ink)]",
  };

  return (
    <section className="panel p-5" aria-label={label}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="eyebrow">{label}</p>
          <p className="mt-3 font-mono text-3xl font-semibold text-[var(--ink)]">
            {value}
            <span className="text-base text-[var(--muted)]">/{total}</span>
          </p>
        </div>
        <span className="font-mono text-sm text-[var(--muted)]">{percent(value, total)}%</span>
      </div>
      <div className="mt-5 h-2 bg-[var(--line)]" aria-hidden="true">
        <div className={`h-full ${colors[tone]}`} style={{ width: `${percent(value, total)}%` }} />
      </div>
    </section>
  );
}

function TypeBadge({ type }: { type: NounType }) {
  return (
    <span className={`badge ${type === "uncountable" ? "badge-teal" : "badge-amber"}`}>
      {nounTypeLabel[type]}
    </span>
  );
}

function PackageStatusIcon({
  item,
  progress,
}: {
  item: TestPackage;
  progress: ProgressState;
}) {
  const isSubmitted = Boolean(progress.submitted[item.slug]);
  const isDraft = Boolean(progress.drafts[item.slug]) && !isSubmitted;

  if (isSubmitted) return <CheckCircle2 aria-hidden="true" />;
  if (isDraft) return <CircleDashed aria-hidden="true" />;
  return null;
}

const packageStatusLabel = (item: TestPackage, progress: ProgressState) => {
  if (progress.submitted[item.slug]) return "sudah submit";
  if (progress.drafts[item.slug]) return "belum selesai";
  return "belum mulai";
};

function PackageRail({
  label,
  packages,
  selectedSlug,
  collapsed,
  progress,
  subtitle,
  onSelect,
  onToggle,
}: {
  label: string;
  packages: TestPackage[];
  selectedSlug: string;
  collapsed: boolean;
  progress: ProgressState;
  subtitle: (item: TestPackage) => string;
  onSelect: (slug: string) => void;
  onToggle: () => void;
}) {
  return (
    <aside className={`package-rail ${collapsed ? "is-collapsed" : ""}`} aria-label={label}>
      <div className="package-rail-header">
        <div>
          <p className="eyebrow">Paket</p>
          <strong>{collapsed ? "Paket" : "Pilih paket"}</strong>
        </div>
        <button
          className="rail-toggle"
          type="button"
          aria-expanded={!collapsed}
          aria-label={collapsed ? `Expand ${label}` : `Collapse ${label}`}
          onClick={onToggle}
        >
          {collapsed ? <ChevronRight size={18} aria-hidden="true" /> : <ChevronLeft size={18} aria-hidden="true" />}
        </button>
      </div>

      <div className="package-list">
        {packages.map((item) => {
          const isActive = selectedSlug === item.slug;
          return (
            <button
              key={item.slug}
              type="button"
              aria-current={isActive ? "true" : undefined}
              aria-label={`${item.title}, ${subtitle(item)}, ${packageStatusLabel(item, progress)}`}
              title={`${item.title} - ${subtitle(item)}`}
              className={isActive ? "active" : ""}
              onClick={() => {
                onSelect(item.slug);
                scrollToTop();
              }}
            >
              <span className="package-compact-number" aria-hidden="true">
                {String(item.order).padStart(2, "0")}
              </span>
              <span className="package-copy">
                <strong>{item.title}</strong>
                <small>{subtitle(item)}</small>
              </span>
              <PackageStatusIcon item={item} progress={progress} />
            </button>
          );
        })}
      </div>
    </aside>
  );
}

function Dashboard({
  progress,
  onJump,
}: {
  progress: ProgressState;
  onJump: (view: View) => void;
}) {
  const submittedCount = countSubmittedPackages(testPackages, progress);
  const draftCount = countDraftPackages(testPackages, progress);
  const challengeSubmittedCount = countSubmittedPackages(challengePackages, progress);
  const nextCard = nounEntries.find((entry) => !progress.viewedCards.includes(entry.id));
  const nextPackage = testPackages.find((item) => !progress.submitted[item.slug]);
  const nextChallengePackage = challengePackages.find((item) => !progress.submitted[item.slug]);

  return (
    <div className="space-y-8">
      <section className="dashboard-hero">
        <div className="max-w-3xl">
          <p className="eyebrow">Persiapantubel TBI</p>
          <h1>TBI - Noun Classifier</h1>
          <p>
            Latihan focused untuk mengenali common uncountable nouns dan countable nouns dengan
            materi, flipcard, tes klasifikasi, dan progres belajar yang tersimpan di browser.
          </p>
        </div>
        <div className="hero-mark" aria-hidden="true">
          <Sparkles size={28} />
          <span>{contentStats.totalEntries}</span>
          <small>Noun Bank</small>
        </div>
      </section>

      <div className="grid gap-4 lg:grid-cols-4">
        <StatBlock
          label="Flipcard Dibuka"
          value={progress.viewedCards.length}
          total={nounEntries.length}
          tone="teal"
        />
        <StatBlock label="Tes Submit" value={submittedCount} total={testPackages.length} tone="ink" />
        <StatBlock label="Draft Tes" value={draftCount} total={testPackages.length} tone="amber" />
        <StatBlock label="Tantangan Submit" value={challengeSubmittedCount} total={challengePackages.length} tone="amber" />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <button className="action-row" type="button" onClick={() => onJump("flipcard")}>
          <span>
            <span className="eyebrow">Kartu berikutnya</span>
            <strong>{nextCard ? nextCard.displayNoun : "Semua kartu sudah dibuka"}</strong>
          </span>
          <ChevronRight aria-hidden="true" />
        </button>
        <button className="action-row" type="button" onClick={() => onJump("tes")}>
          <span>
            <span className="eyebrow">Paket berikutnya</span>
            <strong>{nextPackage ? nextPackage.title : "Semua paket sudah submit"}</strong>
          </span>
          <ChevronRight aria-hidden="true" />
        </button>
        <button className="action-row" type="button" onClick={() => onJump("tantangan")}>
          <span>
            <span className="eyebrow">Tantangan berikutnya</span>
            <strong>{nextChallengePackage ? nextChallengePackage.title : "Semua tantangan sudah submit"}</strong>
          </span>
          <ChevronRight aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

function Materi({ progress }: { progress: ProgressState }) {
  const [selectedSlug, setSelectedSlug] = useState(testPackages[0]?.slug ?? "");
  const [packageRailCollapsed, setPackageRailCollapsed] = useState(false);
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  const selectedPackage = testPackages.find((item) => item.slug === selectedSlug) ?? testPackages[0];
  const packageEntries = useMemo(
    () => (selectedPackage ? getPackageEntries(selectedPackage) : []),
    [selectedPackage],
  );

  const rows = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return packageEntries.filter((entry) => {
      const typeMatch = filter === "all" || entry.nounType === filter;
      const queryMatch =
        !normalized ||
        entry.displayNoun.toLowerCase().includes(normalized) ||
        entry.meaning.toLowerCase().includes(normalized) ||
        entry.topic.toLowerCase().includes(normalized);
      return typeMatch && queryMatch;
    });
  }, [filter, packageEntries, query]);

  if (!selectedPackage) return null;

  return (
    <div className={`learning-layout ${packageRailCollapsed ? "package-collapsed" : ""}`}>
      <PackageRail
        label="Daftar paket materi"
        packages={testPackages}
        selectedSlug={selectedPackage.slug}
        collapsed={packageRailCollapsed}
        progress={progress}
        subtitle={(item) => `${packageTypeLabel[item.packageType]} - ${item.questions.length} noun`}
        onSelect={(slug) => {
          setSelectedSlug(slug);
          setQuery("");
        }}
        onToggle={() => setPackageRailCollapsed((value) => !value)}
      />

      <div className="space-y-6">
        <header className="section-header">
          <div>
            <p className="eyebrow">Materi</p>
            <h2>{selectedPackage.title}</h2>
          </div>
          <div className="search-box">
            <Search size={18} aria-hidden="true" />
            <label className="sr-only" htmlFor="materi-search">
              Cari materi
            </label>
            <input
              id="materi-search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Cari noun dalam paket ini"
            />
          </div>
        </header>

        <div className="segmented" role="group" aria-label="Filter materi">
          {(["all", "uncountable", "countable"] as const).map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={filter === item}
              className={filter === item ? "active" : ""}
              onClick={() => setFilter(item)}
            >
              {item === "all" ? "Semua" : nounTypeLabel[item]}
            </button>
          ))}
        </div>

        <div className="noun-list">
          {rows.map((entry) => (
            <article className="noun-row" key={entry.id}>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3>{entry.displayNoun}</h3>
                  <TypeBadge type={entry.nounType} />
                  <span className="badge">{entry.topic}</span>
                </div>
                <p>{entry.meaning}</p>
              </div>
              <div className="noun-detail">
                {entry.nounType === "uncountable" ? (
                  <>
                    <span>Quantity</span>
                    <strong>{entry.quantityExpression}</strong>
                  </>
                ) : (
                  <>
                    <span>Plural</span>
                    <strong>{entry.pluralForm}</strong>
                  </>
                )}
              </div>
              <p className="usage-note">{entry.usageNote}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

function Flipcard({
  progress,
  setProgress,
}: {
  progress: ProgressState;
  setProgress: (progress: ProgressState) => void;
}) {
  const [selectedSlug, setSelectedSlug] = useState(testPackages[0]?.slug ?? "");
  const [packageRailCollapsed, setPackageRailCollapsed] = useState(false);
  const [filter, setFilter] = useState<Filter>("all");
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const selectedPackage = testPackages.find((item) => item.slug === selectedSlug) ?? testPackages[0];
  const packageEntries = useMemo(
    () => (selectedPackage ? getPackageEntries(selectedPackage) : []),
    [selectedPackage],
  );

  const cards = useMemo(
    () => packageEntries.filter((entry) => filter === "all" || entry.nounType === filter),
    [filter, packageEntries],
  );
  const card = cards[index] ?? cards[0];

  useEffect(() => {
    if (!card || progress.viewedCards.includes(card.id)) return;
    const next = { ...progress, viewedCards: [...progress.viewedCards, card.id] };
    setProgress(next);
    writeProgress(next);
  }, [card, progress, setProgress]);

  const move = (direction: -1 | 1) => {
    setIndex((current) => (current + direction + cards.length) % cards.length);
    setFlipped(false);
  };

  if (!selectedPackage || !card) return null;

  return (
    <div className={`learning-layout ${packageRailCollapsed ? "package-collapsed" : ""}`}>
      <PackageRail
        label="Daftar paket flipcard"
        packages={testPackages}
        selectedSlug={selectedPackage.slug}
        collapsed={packageRailCollapsed}
        progress={progress}
        subtitle={(item) => `${packageTypeLabel[item.packageType]} - ${item.questions.length} noun`}
        onSelect={(slug) => {
          setSelectedSlug(slug);
          setIndex(0);
          setFlipped(false);
        }}
        onToggle={() => setPackageRailCollapsed((value) => !value)}
      />

      <div className="space-y-6">
        <header className="section-header">
          <div>
            <p className="eyebrow">Flipcard</p>
            <h2>{selectedPackage.title}</h2>
          </div>
          <span className="font-mono text-sm text-[var(--muted)]">
            {index + 1}/{cards.length}
          </span>
        </header>

        <div className="segmented" role="group" aria-label="Filter flipcard">
          {(["all", "uncountable", "countable"] as const).map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={filter === item}
              className={filter === item ? "active" : ""}
              onClick={() => {
                setFilter(item);
                setIndex(0);
                setFlipped(false);
              }}
            >
              {item === "all" ? "Semua" : nounTypeLabel[item]}
            </button>
          ))}
        </div>

        <button
          type="button"
          className={`flipcard ${flipped ? "is-flipped" : ""}`}
          onClick={() => setFlipped((value) => !value)}
          aria-expanded={flipped}
          aria-label={`Balik kartu ${card.displayNoun}`}
        >
          <span className="flip-face flip-front" aria-hidden={flipped}>
            <strong>{card.displayNoun}</strong>
            <small>{card.topic}</small>
          </span>
          <span className="flip-face flip-back" aria-hidden={!flipped}>
            <TypeBadge type={card.nounType} />
            <strong>{card.meaning}</strong>
            <span>
              {card.nounType === "uncountable"
                ? `Quantity expression: ${card.quantityExpression}`
                : `Plural form: ${card.pluralForm}`}
            </span>
            <small>{card.commonMistake}</small>
          </span>
        </button>

        <div className="flex items-center justify-between gap-3">
          <button className="icon-button" type="button" onClick={() => move(-1)} aria-label="Kartu sebelumnya">
            <ChevronLeft aria-hidden="true" />
          </button>
          <button className="primary-button" type="button" onClick={() => setFlipped((value) => !value)}>
            <Eye size={18} aria-hidden="true" />
            Balik kartu
          </button>
          <button className="icon-button" type="button" onClick={() => move(1)} aria-label="Kartu berikutnya">
            <ChevronRight aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}

type AnswerNumberItem = {
  number: number;
  questionId: string;
};

function AnswerNumberGroup({
  label,
  items,
  tone,
}: {
  label: string;
  items: AnswerNumberItem[];
  tone: "done" | "pending";
}) {
  return (
    <div className="answer-number-group">
      <span>{label}</span>
      <div>
        {items.map((item) => (
          <a
            key={item.questionId}
            className={`answer-number ${tone}`}
            href={`#${item.questionId}`}
            aria-label={`Soal ${item.number} ${label.toLowerCase()}`}
          >
            {item.number}
          </a>
        ))}
      </div>
    </div>
  );
}

function AnswerProgressSummary({
  answeredItems,
  unansweredItems,
  total,
}: {
  answeredItems: AnswerNumberItem[];
  unansweredItems: AnswerNumberItem[];
  total: number;
}) {
  return (
    <section className="answer-progress-summary" aria-label="Ringkasan progres jawaban">
      <div className="answer-stats">
        <div>
          <span>Total soal</span>
          <strong>{total}</strong>
        </div>
        <div>
          <span>Sudah dijawab</span>
          <strong>{answeredItems.length}</strong>
        </div>
        <div>
          <span>Belum dijawab</span>
          <strong>{unansweredItems.length}</strong>
        </div>
      </div>
      <div className="answer-number-grid">
        <AnswerNumberGroup label="Nomor sudah dijawab" items={answeredItems} tone="done" />
        <AnswerNumberGroup label="Nomor belum dijawab" items={unansweredItems} tone="pending" />
      </div>
    </section>
  );
}

function TestPanel({
  progress,
  setProgress,
  packages = testPackages,
  packageRailLabel = "Daftar paket tes",
  eyebrow = "Tes",
  subtitle = (item: TestPackage) => `${packageTypeLabel[item.packageType]} - ${item.questions.length} soal`,
}: {
  progress: ProgressState;
  setProgress: (progress: ProgressState) => void;
  packages?: TestPackage[];
  packageRailLabel?: string;
  eyebrow?: string;
  subtitle?: (item: TestPackage) => string;
}) {
  const [selectedSlug, setSelectedSlug] = useState(packages[0]?.slug ?? "");
  const [packageRailCollapsed, setPackageRailCollapsed] = useState(false);
  const selectedPackage = packages.find((item) => item.slug === selectedSlug) ?? packages[0];
  const submitted = selectedPackage ? progress.submitted[selectedPackage.slug] : undefined;
  const draft = selectedPackage ? progress.drafts[selectedPackage.slug] : undefined;
  const [answerCache, setAnswerCache] = useState<Record<string, Record<string, OptionKey>>>({});

  if (!selectedPackage) return null;

  const answers = submitted?.answers ?? answerCache[selectedPackage.slug] ?? draft?.answers ?? {};

  const saveDraft = (nextAnswers: Record<string, OptionKey>) => {
    if (submitted) return;
    const nextDrafts = { ...progress.drafts };
    if (Object.keys(nextAnswers).length === 0) {
      delete nextDrafts[selectedPackage.slug];
    } else {
      nextDrafts[selectedPackage.slug] = { answers: nextAnswers };
    }

    const next = {
      ...progress,
      drafts: nextDrafts,
    };
    setProgress(next);
    writeProgress(next);
  };

  const chooseAnswer = (questionId: string, key: OptionKey) => {
    const nextAnswers = { ...answers };
    if (nextAnswers[questionId] === key) {
      delete nextAnswers[questionId];
    } else {
      nextAnswers[questionId] = key;
    }
    setAnswerCache((current) => ({ ...current, [selectedPackage.slug]: nextAnswers }));
    saveDraft(nextAnswers);
  };

  const submit = () => {
    const score = selectedPackage.questions.reduce(
      (sum, question) => sum + (answers[question.id] === question.answerKey ? 1 : 0),
      0,
    );
    const next = {
      ...progress,
      submitted: {
        ...progress.submitted,
        [selectedPackage.slug]: {
          answers,
          score,
          submittedAt: new Date().toISOString(),
        },
      },
    };
    setProgress(next);
    writeProgress(next);
  };

  const answeredItems = selectedPackage.questions
    .map((question, index) =>
      answers[question.id] ? { number: index + 1, questionId: `question-${question.id}` } : null,
    )
    .filter((item): item is AnswerNumberItem => item !== null);
  const unansweredItems = selectedPackage.questions
    .map((question, index) =>
      answers[question.id] ? null : { number: index + 1, questionId: `question-${question.id}` },
    )
    .filter((item): item is AnswerNumberItem => item !== null);

  return (
    <div className={`learning-layout ${packageRailCollapsed ? "package-collapsed" : ""}`}>
      <PackageRail
        label={packageRailLabel}
        packages={packages}
        selectedSlug={selectedPackage.slug}
        collapsed={packageRailCollapsed}
        progress={progress}
        subtitle={subtitle}
        onSelect={setSelectedSlug}
        onToggle={() => setPackageRailCollapsed((value) => !value)}
      />

      <section className="test-surface">
        <header className="section-header">
          <div>
            <p className="eyebrow">{eyebrow}</p>
            <h2>{selectedPackage.title}</h2>
          </div>
          {submitted ? (
            <span className="result-pill">
              <Lock size={16} aria-hidden="true" />
              {submitted.score}/10
            </span>
          ) : null}
        </header>

        {!submitted ? (
          <div className="test-navigator">
            <AnswerProgressSummary
              answeredItems={answeredItems}
              unansweredItems={unansweredItems}
              total={selectedPackage.questions.length}
            />
            <button className="primary-button" type="button" onClick={submit}>
              <ClipboardCheck size={18} aria-hidden="true" />
              Final submit
            </button>
          </div>
        ) : null}

        <div className="space-y-5">
          {selectedPackage.questions.map((question, questionIndex) => {
            const selected = answers[question.id];
            const isWrong = submitted && selected && selected !== question.answerKey;
            const isUnanswered = submitted && !selected;

            return (
              <article className="question-block" id={`question-${question.id}`} key={question.id}>
                <div className="question-title">
                  <span>{questionIndex + 1}</span>
                  <h3>{question.prompt}</h3>
                </div>
                <div className="option-grid">
                  {question.options.map((option) => {
                    const isSelected = selected === option.key;
                    const isCorrect = submitted && option.key === question.answerKey;
                    return (
                      <button
                        key={option.key}
                        type="button"
                        disabled={Boolean(submitted)}
                        aria-pressed={isSelected}
                        title={isSelected && !submitted ? "Klik ulang untuk membatalkan jawaban" : undefined}
                        className={[
                          "option-button",
                          isSelected ? "selected" : "",
                          isCorrect ? "correct" : "",
                          submitted && isSelected && !isCorrect ? "wrong" : "",
                        ].join(" ")}
                        onClick={() => chooseAnswer(question.id, option.key)}
                      >
                        <span>{option.key}</span>
                        <strong>{option.text}</strong>
                      </button>
                    );
                  })}
                </div>
                {submitted ? (
                  <div className="explanation">
                    <strong>
                      {isUnanswered
                        ? "Tidak dijawab"
                        : isWrong
                          ? `Jawabanmu ${selected}, kunci ${question.answerKey}`
                          : "Benar"}
                    </strong>
                    <p>{question.explanation}</p>
                  </div>
                ) : null}
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}

function AdminPanel({ progress }: { progress: ProgressState }) {
  const submittedCount = countSubmittedPackages(testPackages, progress);
  const draftCount = countDraftPackages(testPackages, progress);

  return (
    <div className="space-y-6">
      <header className="section-header">
        <div>
          <p className="eyebrow">SuperAdmin</p>
          <h2>Content operations</h2>
        </div>
        <Database className="text-[var(--accent-teal)]" aria-hidden="true" />
      </header>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <StatBlock
          label="Uncountable"
          value={contentStats.uncountableCount}
          total={contentStats.uncountableCount}
          tone="teal"
        />
        <StatBlock
          label="Countable"
          value={contentStats.countableCount}
          total={contentStats.countableCount}
          tone="amber"
        />
        <StatBlock
          label="Questions"
          value={contentStats.totalQuestions}
          total={contentStats.totalQuestions}
          tone="ink"
        />
        <StatBlock
          label="Packages"
          value={contentStats.totalPackages}
          total={contentStats.totalPackages}
          tone="teal"
        />
        <StatBlock
          label="Challenges"
          value={challengeStats.totalPackages}
          total={challengeStats.totalPackages}
          tone="amber"
        />
      </div>

      <section className="panel p-5">
        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <p className="eyebrow">Submitted</p>
            <strong className="font-mono text-3xl">{submittedCount}</strong>
          </div>
          <div>
            <p className="eyebrow">Draft</p>
            <strong className="font-mono text-3xl">{draftCount}</strong>
          </div>
          <div>
            <p className="eyebrow">Source policy</p>
            <strong className="block text-base">Structured evidence only</strong>
          </div>
        </div>
      </section>
    </div>
  );
}

export function LearningApp() {
  const [view, setView] = useState<View>("dashboard");
  const [progress, setProgress] = useState<ProgressState>(() => readProgress());
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const selectView = (nextView: View) => {
    setView(nextView);
    scrollToTop();
  };

  useEffect(() => {
    const updateScrollTopVisibility = () => setShowScrollTop(window.scrollY > 520);
    updateScrollTopVisibility();
    window.addEventListener("scroll", updateScrollTopVisibility, { passive: true });
    return () => window.removeEventListener("scroll", updateScrollTopVisibility);
  }, []);

  const currentView = {
    dashboard: <Dashboard progress={progress} onJump={selectView} />,
    materi: <Materi progress={progress} />,
    flipcard: <Flipcard progress={progress} setProgress={setProgress} />,
    tes: <TestPanel key="tes" progress={progress} setProgress={setProgress} />,
    tantangan: (
      <TestPanel
        key="tantangan"
        progress={progress}
        setProgress={setProgress}
        packages={challengePackages}
        packageRailLabel="Daftar paket tantangan"
        eyebrow="Tantangan"
        subtitle={(item) => `Advanced mixed - ${item.questions.length} soal`}
      />
    ),
    admin: <AdminPanel progress={progress} />,
  }[view];

  return (
    <div className="min-h-dvh bg-[var(--paper)] text-[var(--ink)]">
      <div className="mx-auto flex min-h-dvh w-full max-w-[1440px] flex-col lg:flex-row">
        <aside className={`app-sidebar ${sidebarCollapsed ? "is-collapsed" : ""}`}>
          <div className="sidebar-head">
            <div className="brand-block">
              <p className="brand-kicker">Persiapantubel</p>
              <strong>TBI Nouns</strong>
            </div>
            <button
              className="sidebar-toggle"
              type="button"
              aria-expanded={!sidebarCollapsed}
              aria-label={sidebarCollapsed ? "Expand sidebar utama" : "Collapse sidebar utama"}
              onClick={() => setSidebarCollapsed((value) => !value)}
            >
              {sidebarCollapsed ? <ChevronRight size={18} aria-hidden="true" /> : <ChevronLeft size={18} aria-hidden="true" />}
            </button>
          </div>
          <nav aria-label="Navigasi utama">
            {views.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-label={item.label}
                  aria-current={view === item.id ? "page" : undefined}
                  className={view === item.id ? "active" : ""}
                  onClick={() => selectView(item.id)}
                  title={item.label}
                >
                  <Icon size={18} aria-hidden="true" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        <main className="flex-1 px-4 py-5 sm:px-6 lg:px-8 lg:py-8">{currentView}</main>
      </div>
      <button
        className={`scroll-top-button ${showScrollTop ? "is-visible" : ""}`}
        type="button"
        aria-label="Kembali ke bagian atas"
        onClick={scrollToTop}
      >
        <ArrowUp size={20} aria-hidden="true" />
      </button>
    </div>
  );
}
