"use client";

import {
  BarChart3,
  BookOpen,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  Database,
  Eye,
  Layers3,
  Lock,
  Search,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import type { ComponentType } from "react";
import { useEffect, useMemo, useState } from "react";
import { contentStats, nounEntries, testPackages, type NounType } from "@/lib/content";

type View = "dashboard" | "materi" | "flipcard" | "tes" | "admin";
type Filter = "all" | NounType;
type OptionKey = "A" | "B" | "C" | "D";

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

const storageKey = "tbi-uncommon-nouns-progress-v1";

const views: Array<{ id: View; label: string; icon: ComponentType<{ size?: number }> }> = [
  { id: "dashboard", label: "Dashboard", icon: BarChart3 },
  { id: "materi", label: "Materi", icon: BookOpen },
  { id: "flipcard", label: "Flipcard", icon: Layers3 },
  { id: "tes", label: "Tes", icon: ClipboardCheck },
  { id: "admin", label: "SuperAdmin", icon: ShieldCheck },
];

const nounTypeLabel: Record<NounType, string> = {
  uncountable: "Uncountable",
  countable: "Countable",
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

function Dashboard({
  progress,
  onJump,
}: {
  progress: ProgressState;
  onJump: (view: View) => void;
}) {
  const submittedCount = Object.keys(progress.submitted).length;
  const draftCount = Object.keys(progress.drafts).filter((slug) => !progress.submitted[slug]).length;
  const nextCard = nounEntries.find((entry) => !progress.viewedCards.includes(entry.id));
  const nextPackage = testPackages.find((item) => !progress.submitted[item.slug]);

  return (
    <div className="space-y-8">
      <section className="dashboard-hero">
        <div className="max-w-3xl">
          <p className="eyebrow">Persiapantubel TBI</p>
          <h1>TBI - Uncommon Nouns</h1>
          <p>
            Latihan focused untuk uncommon uncountable nouns dan countable nouns dengan materi,
            flipcard, tes paket, dan progres belajar yang tersimpan di browser.
          </p>
        </div>
        <div className="hero-mark" aria-hidden="true">
          <Sparkles size={28} />
          <span>200</span>
          <small>Noun Bank</small>
        </div>
      </section>

      <div className="grid gap-4 lg:grid-cols-3">
        <StatBlock
          label="Flipcard Dibuka"
          value={progress.viewedCards.length}
          total={nounEntries.length}
          tone="teal"
        />
        <StatBlock label="Tes Submit" value={submittedCount} total={testPackages.length} tone="ink" />
        <StatBlock label="Draft Tes" value={draftCount} total={testPackages.length} tone="amber" />
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
      </div>
    </div>
  );
}

function Materi() {
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");

  const rows = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return nounEntries.filter((entry) => {
      const typeMatch = filter === "all" || entry.nounType === filter;
      const queryMatch =
        !normalized ||
        entry.displayNoun.toLowerCase().includes(normalized) ||
        entry.meaning.toLowerCase().includes(normalized) ||
        entry.topic.toLowerCase().includes(normalized);
      return typeMatch && queryMatch;
    });
  }, [filter, query]);

  return (
    <div className="space-y-6">
      <header className="section-header">
        <div>
          <p className="eyebrow">Materi</p>
          <h2>Daftar noun alfabetik</h2>
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
            placeholder="Cari noun, arti, atau topik"
          />
        </div>
      </header>

      <div className="segmented" aria-label="Filter materi">
        {(["all", "uncountable", "countable"] as const).map((item) => (
          <button
            key={item}
            type="button"
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
  );
}

function Flipcard({
  progress,
  setProgress,
}: {
  progress: ProgressState;
  setProgress: (progress: ProgressState) => void;
}) {
  const [filter, setFilter] = useState<Filter>("all");
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const cards = useMemo(
    () => nounEntries.filter((entry) => filter === "all" || entry.nounType === filter),
    [filter],
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

  if (!card) return null;

  return (
    <div className="space-y-6">
      <header className="section-header">
        <div>
          <p className="eyebrow">Flipcard</p>
          <h2>Active recall noun bank</h2>
        </div>
        <span className="font-mono text-sm text-[var(--muted)]">
          {index + 1}/{cards.length}
        </span>
      </header>

      <div className="segmented" aria-label="Filter flipcard">
        {(["all", "uncountable", "countable"] as const).map((item) => (
          <button
            key={item}
            type="button"
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
        aria-label={`Balik kartu ${card.displayNoun}`}
      >
        <span className="flip-face flip-front">
          <TypeBadge type={card.nounType} />
          <strong>{card.displayNoun}</strong>
          <small>{card.topic}</small>
        </span>
        <span className="flip-face flip-back">
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
  );
}

function TestPanel({
  progress,
  setProgress,
}: {
  progress: ProgressState;
  setProgress: (progress: ProgressState) => void;
}) {
  const [selectedSlug, setSelectedSlug] = useState(testPackages[0]?.slug ?? "");
  const selectedPackage = testPackages.find((item) => item.slug === selectedSlug) ?? testPackages[0];
  const submitted = selectedPackage ? progress.submitted[selectedPackage.slug] : undefined;
  const draft = selectedPackage ? progress.drafts[selectedPackage.slug] : undefined;
  const [answerCache, setAnswerCache] = useState<Record<string, Record<string, OptionKey>>>({});

  if (!selectedPackage) return null;

  const answers = submitted?.answers ?? answerCache[selectedPackage.slug] ?? draft?.answers ?? {};

  const saveDraft = (nextAnswers: Record<string, OptionKey>) => {
    if (submitted) return;
    const next = {
      ...progress,
      drafts: {
        ...progress.drafts,
        [selectedPackage.slug]: { answers: nextAnswers },
      },
    };
    setProgress(next);
    writeProgress(next);
  };

  const chooseAnswer = (questionId: string, key: OptionKey) => {
    const nextAnswers = { ...answers, [questionId]: key };
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

  return (
    <div className="grid gap-6 xl:grid-cols-[320px_minmax(0,1fr)]">
      <aside className="package-list" aria-label="Daftar paket tes">
        {testPackages.map((item) => {
          const isSubmitted = Boolean(progress.submitted[item.slug]);
          const isDraft = Boolean(progress.drafts[item.slug]) && !isSubmitted;
          return (
            <button
              key={item.slug}
              type="button"
              className={selectedSlug === item.slug ? "active" : ""}
              onClick={() => setSelectedSlug(item.slug)}
            >
              <span>
                <strong>{item.title}</strong>
                <small>{nounTypeLabel[item.nounType]} - 10 soal</small>
              </span>
              {isSubmitted ? <CheckCircle2 aria-hidden="true" /> : isDraft ? <Sparkles aria-hidden="true" /> : null}
            </button>
          );
        })}
      </aside>

      <section className="test-surface">
        <header className="section-header">
          <div>
            <p className="eyebrow">Tes</p>
            <h2>{selectedPackage.title}</h2>
          </div>
          {submitted ? (
            <span className="result-pill">
              <Lock size={16} aria-hidden="true" />
              {submitted.score}/10
            </span>
          ) : null}
        </header>

        <div className="space-y-5">
          {selectedPackage.questions.map((question, questionIndex) => {
            const selected = answers[question.id];
            const isWrong = submitted && selected && selected !== question.answerKey;
            const isUnanswered = submitted && !selected;

            return (
              <article className="question-block" key={question.id}>
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

        {!submitted ? (
          <div className="submit-bar">
            <span className="font-mono text-sm text-[var(--muted)]">
              {Object.keys(answers).length}/10 terjawab
            </span>
            <button className="primary-button" type="button" onClick={submit}>
              <ClipboardCheck size={18} aria-hidden="true" />
              Final submit
            </button>
          </div>
        ) : null}
      </section>
    </div>
  );
}

function AdminPanel({ progress }: { progress: ProgressState }) {
  const submittedCount = Object.keys(progress.submitted).length;
  const draftCount = Object.keys(progress.drafts).filter((slug) => !progress.submitted[slug]).length;

  return (
    <div className="space-y-6">
      <header className="section-header">
        <div>
          <p className="eyebrow">SuperAdmin</p>
          <h2>Content operations</h2>
        </div>
        <Database className="text-[var(--accent-teal)]" aria-hidden="true" />
      </header>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatBlock label="Uncountable" value={contentStats.uncountable} total={100} tone="teal" />
        <StatBlock label="Countable" value={contentStats.countable} total={100} tone="amber" />
        <StatBlock label="Questions" value={contentStats.questions} total={200} tone="ink" />
        <StatBlock label="Packages" value={contentStats.packages} total={20} tone="teal" />
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

  const currentView = {
    dashboard: <Dashboard progress={progress} onJump={setView} />,
    materi: <Materi />,
    flipcard: <Flipcard progress={progress} setProgress={setProgress} />,
    tes: <TestPanel progress={progress} setProgress={setProgress} />,
    admin: <AdminPanel progress={progress} />,
  }[view];

  return (
    <div className="min-h-dvh bg-[var(--paper)] text-[var(--ink)]">
      <div className="mx-auto flex min-h-dvh w-full max-w-[1440px] flex-col lg:flex-row">
        <aside className="app-sidebar">
          <div>
            <p className="brand-kicker">Persiapantubel</p>
            <strong>TBI Nouns</strong>
          </div>
          <nav aria-label="Navigasi utama">
            {views.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-label={item.label}
                  className={view === item.id ? "active" : ""}
                  onClick={() => setView(item.id)}
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
    </div>
  );
}
