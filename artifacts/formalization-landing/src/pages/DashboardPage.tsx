import { useEffect, useState } from "react";
import { Link } from "wouter";
import {
  ArrowRight,
  BarChart3,
  CalendarDays,
  CircleAlert,
  Clock3,
  Eye,
  RefreshCcw,
  ShieldCheck,
  TrendingUp,
  Users,
} from "lucide-react";

type BreakdownRow = {
  label: string;
  count: number;
  percentage: number;
};

type AnalyticsSummary = {
  totalVisits: number;
  todayVisits: number;
  thisWeekVisits: number;
  surveyResponses: number;
  completionRate: number;
};

type AnalyticsResponse = {
  summary: AnalyticsSummary;
  breakdowns: Record<BreakdownKey, BreakdownRow[]>;
  lastUpdated: string;
};

type BreakdownKey =
  | "source"
  | "baseline"
  | "clarity_gain"
  | "readiness"
  | "next_action"
  | "segment";

const BREAKDOWN_META: Record<
  BreakdownKey,
  { title: string; description: string; accent: string }
> = {
  source: {
    title: "مصدر الوصول",
    description: "من أين جاء الزوار إلى الصفحة؟",
    accent: "from-sky-500 to-cyan-400",
  },
  baseline: {
    title: "مستوى البداية",
    description: "ما الذي كان يعرفه المستخدم قبل الدخول؟",
    accent: "from-violet-500 to-indigo-400",
  },
  clarity_gain: {
    title: "مكسب الوضوح",
    description: "ما القيمة التي حصل عليها من المحتوى؟",
    accent: "from-emerald-500 to-teal-400",
  },
  readiness: {
    title: "الاستعداد",
    description: "إلى أي مدى يشعر أنه جاهز للخطوة التالية؟",
    accent: "from-amber-500 to-orange-400",
  },
  next_action: {
    title: "الخطوة التالية",
    description: "ما الإجراء الذي نواه بعد القراءة؟",
    accent: "from-fuchsia-500 to-pink-400",
  },
  segment: {
    title: "نوع الجمهور",
    description: "كيف يصف الزائر وضع مشروعه الآن؟",
    accent: "from-slate-700 to-slate-500",
  },
};

const STAT_CARDS = [
  {
    key: "totalVisits",
    label: "إجمالي الزيارات",
    icon: Eye,
    tone: "from-slate-900 to-slate-700",
  },
  {
    key: "todayVisits",
    label: "زيارات اليوم",
    icon: CalendarDays,
    tone: "from-sky-600 to-cyan-500",
  },
  {
    key: "thisWeekVisits",
    label: "زيارات هذا الأسبوع",
    icon: Clock3,
    tone: "from-emerald-600 to-teal-500",
  },
  {
    key: "surveyResponses",
    label: "إجابات الاستبيان",
    icon: Users,
    tone: "from-amber-600 to-orange-500",
  },
  {
    key: "completionRate",
    label: "معدل الإكمال",
    icon: TrendingUp,
    tone: "from-fuchsia-600 to-pink-500",
  },
] as const;

const EMPTY_SUMMARY: AnalyticsSummary = {
  totalVisits: 0,
  todayVisits: 0,
  thisWeekVisits: 0,
  surveyResponses: 0,
  completionRate: 0,
};

const numberFormatter = new Intl.NumberFormat("ar-JO");
const percentFormatter = new Intl.NumberFormat("ar-JO", {
  maximumFractionDigits: 1,
});
const dateFormatter = new Intl.DateTimeFormat("ar-JO", {
  dateStyle: "full",
  timeStyle: "short",
});

function formatNumber(value: number) {
  return numberFormatter.format(value);
}

function formatPercent(value: number) {
  return `${percentFormatter.format(value)}%`;
}

function StatIcon({
  icon: Icon,
  tone,
}: {
  icon: typeof Eye;
  tone: string;
}) {
  return (
    <div
      className={`flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br ${tone} text-white shadow-sm`}
    >
      <Icon className="h-5 w-5" />
    </div>
  );
}

export default function DashboardPage() {
  const [analytics, setAnalytics] = useState<AnalyticsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // TODO: Add authentication before deploying to production
  useEffect(() => {
    const abortController = new AbortController();
    const previousDir = document.documentElement.getAttribute("dir");
    const previousLang = document.documentElement.getAttribute("lang");
    const previousTitle = document.title;

    document.documentElement.setAttribute("dir", "rtl");
    document.documentElement.setAttribute("lang", "ar");
    document.title = "لوحة التحكم | ترخيص المشروع";

    async function loadAnalytics() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/analytics", {
          signal: abortController.signal,
        });

        if (!response.ok) {
          throw new Error(`Analytics request failed with ${response.status}`);
        }

        const payload = (await response.json()) as AnalyticsResponse;
        setAnalytics(payload);
      } catch (err) {
        if (abortController.signal.aborted) {
          return;
        }

        setError(
          err instanceof Error
            ? err.message
            : "تعذر تحميل بيانات لوحة التحكم",
        );
      } finally {
        if (!abortController.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadAnalytics();

    return () => {
      abortController.abort();

      if (previousDir === null) {
        document.documentElement.removeAttribute("dir");
      } else {
        document.documentElement.setAttribute("dir", previousDir);
      }

      if (previousLang === null) {
        document.documentElement.removeAttribute("lang");
      } else {
        document.documentElement.setAttribute("lang", previousLang);
      }

      document.title = previousTitle;
    };
  }, []);

  const summary = analytics?.summary ?? EMPTY_SUMMARY;
  const lastUpdated = analytics?.lastUpdated
    ? dateFormatter.format(new Date(analytics.lastUpdated))
    : "لم يتم التحديث بعد";

  const summaryCards = STAT_CARDS.map((card) => {
    const value =
      card.key === "completionRate"
        ? formatPercent(summary[card.key])
        : formatNumber(summary[card.key]);

    return {
      ...card,
      value,
    };
  });

  const breakdownKeys: BreakdownKey[] = [
    "source",
    "baseline",
    "clarity_gain",
    "readiness",
    "next_action",
    "segment",
  ];

  return (
    <main
      dir="rtl"
      lang="ar"
      className="min-h-screen bg-[radial-gradient(circle_at_top_right,_rgba(15,23,42,0.10),_transparent_34%),linear-gradient(180deg,_#fbfaf7_0%,_#f4efe7_100%)] text-slate-900"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/90 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:text-slate-950 hover:shadow-md"
          >
            <span>العودة إلى الصفحة الرئيسية</span>
            <ArrowRight className="h-4 w-4" />
          </Link>

          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700">
            <ShieldCheck className="h-4 w-4" />
            <span>لوحة محلية متصلة بالخادم على المنفذ 8080</span>
          </div>
        </div>

        <section className="overflow-hidden rounded-3xl border border-white/70 bg-[#0f172a] text-white shadow-[0_24px_90px_rgba(15,23,42,0.18)]">
          <div className="grid gap-8 px-6 py-8 lg:grid-cols-[1.25fr_0.75fr] lg:px-10 lg:py-10">
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium text-slate-200">
                <BarChart3 className="h-4 w-4" />
                <span>إحصاءات الزيارات والاستبيان</span>
              </div>

              <div className="space-y-3">
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                  لوحة تحكم عربية لقراءة الأداء بسرعة
                </h1>
                <p className="max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                  تعرض هذه الصفحة ملخص الزيارات، نسبة الإكمال، وتوزيع الإجابات
                  على مستوى الأسئلة الستة، مع أشرطة بسيطة قابلة للقراءة من دون
                  أي مكتبة رسوم.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 text-sm">
                <span className="rounded-full bg-white/10 px-3 py-1.5 text-slate-200">
                  المصدر: GET /api/analytics
                </span>
                <span className="rounded-full bg-white/10 px-3 py-1.5 text-slate-200">
                  آخر تحديث: {lastUpdated}
                </span>
              </div>
            </div>

            <div className="grid gap-3 rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur">
              <div className="rounded-2xl bg-white/10 p-4">
                <p className="text-sm text-slate-300">معدل الإكمال</p>
                <div className="mt-2 flex items-end gap-3">
                  <span className="text-4xl font-bold">
                    {formatPercent(summary.completionRate)}
                  </span>
                  <span className="pb-1 text-sm text-slate-300">
                    من الزيارات المؤكدة
                  </span>
                </div>
                <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-l from-emerald-400 to-cyan-400 transition-all"
                    style={{ width: `${Math.min(summary.completionRate, 100)}%` }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-xs text-slate-300">اليوم</p>
                  <p className="mt-2 text-2xl font-bold">
                    {formatNumber(summary.todayVisits)}
                  </p>
                </div>
                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-xs text-slate-300">الأسبوع</p>
                  <p className="mt-2 text-2xl font-bold">
                    {formatNumber(summary.thisWeekVisits)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {loading ? (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="h-28 animate-pulse rounded-3xl border border-slate-200/80 bg-white/80 p-5 shadow-sm"
              />
            ))}
          </div>
        ) : error ? (
          <div className="rounded-3xl border border-rose-200 bg-rose-50 px-5 py-4 text-rose-800 shadow-sm">
            <div className="flex flex-wrap items-start gap-3">
              <CircleAlert className="mt-0.5 h-5 w-5 shrink-0" />
              <div className="space-y-2">
                <p className="font-semibold">تعذر تحميل البيانات</p>
                <p className="text-sm leading-6 text-rose-700">{error}</p>
                <button
                  type="button"
                  onClick={() => window.location.reload()}
                  className="inline-flex items-center gap-2 rounded-full bg-rose-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-rose-800"
                >
                  <RefreshCcw className="h-4 w-4" />
                  <span>إعادة المحاولة</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
              {summaryCards.map((card) => {
                const Icon = card.icon;

                return (
                  <article
                    key={card.key}
                    className="rounded-3xl border border-white/80 bg-white/95 p-5 shadow-[0_10px_30px_rgba(15,23,42,0.06)]"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-slate-500">
                          {card.label}
                        </p>
                        <p className="text-3xl font-bold text-slate-950">
                          {card.value}
                        </p>
                      </div>
                      <StatIcon icon={Icon} tone={card.tone} />
                    </div>
                  </article>
                );
              })}
            </section>

            <section className="grid gap-5 xl:grid-cols-2">
              {breakdownKeys.map((key) => {
                const meta = BREAKDOWN_META[key];
                const rows = analytics?.breakdowns?.[key] ?? [];
                const totalCount = rows.reduce((sum, row) => sum + row.count, 0);
                const maxCount = Math.max(...rows.map((row) => row.count), 0) || 1;

                return (
                  <article
                    key={key}
                    className="rounded-3xl border border-slate-200/80 bg-white/95 p-5 shadow-[0_10px_30px_rgba(15,23,42,0.06)]"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div className="space-y-1">
                        <h2 className="text-xl font-bold text-slate-950">
                          {meta.title}
                        </h2>
                        <p className="text-sm leading-6 text-slate-500">
                          {meta.description}
                        </p>
                      </div>

                      <div className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">
                        {formatNumber(totalCount)} إجابة
                      </div>
                    </div>

                    <div className="mt-5 space-y-4">
                      {rows.length === 0 ? (
                        <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-6 text-sm text-slate-500">
                          لا توجد بيانات كافية بعد لهذا القسم.
                        </div>
                      ) : (
                        rows.map((row) => {
                          const width = Math.max(
                            row.count === 0 ? 0 : (row.count / maxCount) * 100,
                            row.count > 0 ? 4 : 0,
                          );

                          return (
                            <div key={row.label} className="space-y-2">
                              <div className="flex items-center justify-between gap-3 text-sm">
                                <span className="font-medium text-slate-800">
                                  {row.label}
                                </span>
                                <span className="text-slate-500">
                                  {formatNumber(row.count)} · {formatPercent(row.percentage)}
                                </span>
                              </div>

                              <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                                <div
                                  className={`h-full rounded-full bg-gradient-to-l ${meta.accent} transition-all`}
                                  style={{ width: `${width}%` }}
                                  aria-hidden="true"
                                />
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </article>
                );
              })}
            </section>
          </>
        )}
      </div>
    </main>
  );
}
