import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Monitor,
  Package,
  Sprout,
  Utensils,
  Users,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";

type QuizAnswers = {
  type: string;
  location: string;
  team: string;
  stage: string;
};

type QuizResult = {
  title: string;
  summary: string;
  status: string;
  steps: string[];
  nextTarget: string;
};

const GOVERNMENT_PLATFORMS = {
  daleel: {
    label: "افتح دليل الخدمات",
    href: "https://daleel.mit.gov.jo",
  },
  mola: {
    label: "افتح منصة الرخص المهنية",
    href: "https://eservices.mola.gov.jo",
  },
  sanad: {
    label: "افتح منصة سند",
    href: "https://sanad.gov.jo",
  },
} as const;

const QUESTION_STEPS = [
  {
    key: "type",
    title: "ما القطاع الأقرب لمشروعك؟",
    options: [
      {
        label: "صناعة وإنتاج",
        value: "industry",
        Icon: Package,
        iconClassName: "bg-amber-100 text-amber-700",
      },
      {
        label: "زراعة",
        value: "agriculture",
        Icon: Sprout,
        iconClassName: "bg-emerald-100 text-emerald-700",
      },
      {
        label: "خدمات",
        value: "services",
        Icon: Monitor,
        iconClassName: "bg-cyan-100 text-cyan-700",
      },
      {
        label: "سياحة وضيافة",
        value: "tourism",
        Icon: Utensils,
        iconClassName: "bg-orange-100 text-orange-700",
      },
    ],
  },
  {
    key: "location",
    title: "أين يعمل المشروع فعلياً؟",
    options: [
      { label: "من المنزل بالكامل", value: "home_only" },
      { label: "من موقع خارج المنزل", value: "external" },
      { label: "جزء من البيت وجزء من موقع آخر", value: "both" },
    ],
  },
  {
    key: "team",
    title: "من يعمل في المشروع معك؟",
    options: [
      { label: "أعمل وحدي بالكامل", value: "solo" },
      { label: "أستعين بمساعدة متقطعة", value: "occasional" },
      { label: "لدي موظفون بشكل مستمر", value: "staff" },
      { label: "لدي شركاء في المشروع", value: "partners" },
    ],
  },
  {
    key: "stage",
    title: "ما المرحلة التي وصلت إليها؟",
    options: [
      { label: "ما زلت أخطط ولم أبدأ بعد", value: "planning" },
      { label: "أعمل حالياً بدون ترخيص مكتمل", value: "informal" },
      { label: "بدأت التسجيل لكن الملف غير مكتمل", value: "partial" },
      { label: "مسجل ومرخص بالكامل", value: "formal" },
    ],
  },
] as const;

const typeLabels: Record<string, string> = {
  industry: "نشاط صناعي أو إنتاجي",
  agriculture: "نشاط زراعي",
  services: "نشاط خدمات",
  tourism: "نشاط سياحي وضيافة",
};

const locationLabels: Record<string, string> = {
  home_only: "من المنزل بالكامل",
  external: "من موقع خارج المنزل",
  both: "بين المنزل وموقع آخر",
};

const teamLabels: Record<string, string> = {
  solo: "تديره بمفردك",
  occasional: "مع مساعدة متقطعة",
  staff: "مع موظفين بشكل مستمر",
  partners: "مع شركاء",
};

const stageLabels: Record<string, string> = {
  planning: "في مرحلة التخطيط",
  informal: "يعمل بدون ترخيص مكتمل",
  partial: "بدأ التسجيل لكن الملف غير مكتمل",
  formal: "مسجل ومرخص بالكامل",
};

function buildQuizResult(answers: QuizAnswers): QuizResult {
  const isHomeOnly = answers.location === "home_only";
  const hasPartners = answers.team === "partners";

  if (answers.stage === "formal") {
    return {
      title: "وضعك بالسليم ومشروعك مرخص بالكامل",
      summary: "هلأ بدك تتأكد إنك عم تستفيد من هالرخصة بأحسن طريقة.",
      status: "جاهزية ممتازة",
      steps: [
        "خطوتك الأولى حالياً هي تجديد رخصك بوقتها، واستكشاف فرص العطاءات والدعم اللي صارت متاحة إلك.",
      ],
      nextTarget: "entities",
    };
  }

  if (answers.stage === "partial") {
    return {
      title: "قطعت نص الطريق بتسجيل مشروعك",
      summary: "بس لسا ناقصك الموافقة النهائية لتشتغل براحة بال.",
      status: "استكمال الملف",
      steps: [
        "خطوتك الأولى هي استكمال استخراج رخصة المهن من البلدية أو الأمانة اللي تابع إلها موقعك.",
      ],
      nextTarget: hasPartners ? "legal-forms" : "entities",
    };
  }

  if (answers.stage === "planning" && isHomeOnly) {
    return {
      title: "أنت لسا بمرحلة التخطيط ومشروعك من البيت",
      summary: "وهاد أحسن وقت ترتّب فيه ملفك قبل ما تكبر.",
      status: "تخطيط أولي",
      steps: [
        "خطوتك الأولى هي تتأكد إذا كان نشاطك ينفع يترخّص من المنزل ولا لأ.",
      ],
      nextTarget: "home-based",
    };
  }

  if (answers.stage === "planning") {
    return {
      title: "عندك مكان تجاري بالمخطط بس لسه ما افتتحت رسمياً",
      summary: "هالوقت ذهبي تخلص فيه الإجراءات.",
      status: "بداية محسوبة",
      steps: ["خطوتك الأولى هي تستفسر عن متطلبات الموقع التجاري من البلدية."],
      nextTarget: hasPartners ? "legal-forms" : "entities",
    };
  }

  return {
    title: "أنت شغال ومبيعاتك موجودة، بس ملفك ناقص",
    summary: "والفراغ هاد بيقلقك حتى لو ما بيظهر.",
    status: "ترخيص تدريجي",
    steps: ["خطوتك الأولى هي تعرف شو بالظبط ناقصك عشان تكمل الملف."],
    nextTarget: hasPartners ? "legal-forms" : "entities",
  };
}

function getPrimaryAction(answers: QuizAnswers) {
  if (answers.stage === "partial") {
    return GOVERNMENT_PLATFORMS.mola;
  }

  if (answers.stage === "planning" && answers.location === "home_only") {
    return GOVERNMENT_PLATFORMS.daleel;
  }

  if (answers.stage === "planning") {
    return GOVERNMENT_PLATFORMS.daleel;
  }

  return GOVERNMENT_PLATFORMS.sanad;
}

type PathQuizProps = {
  onNavigate: (id: string) => void;
};

export function PathQuiz({ onNavigate }: PathQuizProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({
    type: "",
    location: "",
    team: "",
    stage: "",
  });
  const questionHeadingRef = useRef<HTMLHeadingElement>(null);
  const resultHeadingRef = useRef<HTMLHeadingElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const currentStep = QUESTION_STEPS[stepIndex];
  const result = buildQuizResult(answers);
  const primaryAction = getPrimaryAction(answers);

  useEffect(() => {
    const target =
      stepIndex < QUESTION_STEPS.length
        ? questionHeadingRef.current
        : resultHeadingRef.current;

    if (!target) {
      return;
    }

    const timer = window.setTimeout(() => target.focus(), 0);
    return () => window.clearTimeout(timer);
  }, [stepIndex]);

  useEffect(() => {
    if (stepIndex < QUESTION_STEPS.length) {
      return;
    }

    const timer = window.setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 120);

    return () => window.clearTimeout(timer);
  }, [stepIndex]);

  const handleAnswer = (field: string, value: string) => {
    setAnswers((current) => ({ ...current, [field]: value }));
    setTimeout(() => {
      setStepIndex((current) => current + 1);
    }, 180);
  };

  const resetQuiz = () => {
    setAnswers({
      type: "",
      location: "",
      team: "",
      stage: "",
    });
    setStepIndex(0);
  };

  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-xl">
      {stepIndex < QUESTION_STEPS.length ? (
        <>
          <div className="border-b border-border bg-secondary/60 p-5 md:p-6">
            <div>
              <p className="text-sm font-semibold text-primary">
                اختبار إرشادي من أربع خطوات
              </p>
              <p className="text-sm text-muted-foreground">
                أجب بسرعة لتحصل على مسار أولي يناسب وضعك الحالي.
              </p>
            </div>

            <div className="mb-6 mt-5 flex items-center justify-between">
              <p className="text-lg font-bold text-foreground">
                سؤال {stepIndex + 1} من {QUESTION_STEPS.length}
              </p>
              <div className="flex gap-1.5">
                {QUESTION_STEPS.map((_, i) => (
                  <div
                    key={i}
                    className={`h-2 w-8 rounded-full transition-all ${
                      i <= stepIndex ? "bg-primary" : "bg-border"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="p-6 md:p-10">
            {stepIndex > 0 ? (
              <button
                type="button"
                onClick={() => setStepIndex((current) => current - 1)}
                className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
              >
                <ArrowRight className="h-4 w-4" />
                رجوع
              </button>
            ) : null}

            <motion.div
              key={currentStep.key}
              initial={{ opacity: 0, x: -18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25 }}
            >
              <h3
                ref={questionHeadingRef}
                tabIndex={-1}
                className="mb-3 text-2xl font-bold text-foreground outline-none md:text-3xl"
              >
                {currentStep.title}
              </h3>
              <p className="mb-8 text-base leading-relaxed text-muted-foreground">
                أجب وفق وضعك الحالي، وليس وفق ما تتمنى أن يكون عليه المشروع لاحقاً.
              </p>

              <div
                className={`grid gap-4 ${
                  stepIndex === 0
                    ? "sm:grid-cols-2 lg:grid-cols-3"
                    : "md:grid-cols-2"
                }`}
              >
                {currentStep.options.map((option) => {
                  const hasIcon = "Icon" in option && "iconClassName" in option;
                  const Icon = hasIcon ? option.Icon : null;
                  const iconClassName = hasIcon ? option.iconClassName : "";
                  const isSelected =
                    answers[currentStep.key as keyof QuizAnswers] === option.value;

                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => handleAnswer(currentStep.key, option.value)}
                      className={`rounded-2xl border-2 p-5 text-right transition-all hover:-translate-y-0.5 hover:shadow-md ${
                        isSelected
                          ? "border-accent bg-accent/8"
                          : "border-border bg-background hover:border-accent/45"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <p className="text-lg font-bold text-foreground">
                            {option.label}
                          </p>
                        </div>

                        {Icon ? (
                          <div
                            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${iconClassName}`}
                          >
                            <Icon className="h-6 w-6" />
                          </div>
                        ) : (
                          <ArrowLeft className="mt-1 h-5 w-5 shrink-0 text-muted-foreground" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="p-6 md:p-10"
        >
          <div
            ref={resultRef}
            className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6 md:p-8"
          >
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-emerald-800">
                {result.status}
              </span>
              <span className="text-sm font-semibold text-emerald-800/80">
                خريطة طريق أولية
              </span>
            </div>

            <h3
              ref={resultHeadingRef}
              tabIndex={-1}
              className="text-2xl font-bold text-foreground outline-none md:text-4xl"
            >
              {result.title}
            </h3>
            <p className="mt-4 max-w-3xl text-justify-ar text-lg leading-relaxed text-foreground/85">
              {result.summary}
            </p>

            <div className="mt-6 rounded-2xl border border-emerald-200 bg-white p-5">
              <p className="text-sm font-semibold text-emerald-700">
                خطوتك الأولى
              </p>
              <p className="mt-2 text-base leading-relaxed text-muted-foreground">
                {result.steps[0]}
              </p>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button asChild type="button" className="h-12 rounded-full px-6">
                <a
                  href={primaryAction.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`افتح ${primaryAction.label}`}
                >
                  {primaryAction.label}
                  <ExternalLink className="ms-2 h-4 w-4" />
                </a>
              </Button>
              <button
                type="button"
                className="text-sm font-semibold text-foreground/70 underline underline-offset-4 hover:text-foreground"
                onClick={() => onNavigate(result.nextTarget)}
              >
                أو راجع القسم الأقرب لحالتك داخل الصفحة
              </button>
            </div>
          </div>

          <div className="mt-6 rounded-3xl border border-border bg-secondary/45 p-5">
            <p className="text-sm leading-relaxed text-muted-foreground">
              بنيت النتيجة بناءً على هذه الإجابات:{" "}
              <span className="font-semibold text-foreground">
                {typeLabels[answers.type]}
              </span>
              ،{" "}
              <span className="font-semibold text-foreground">
                {locationLabels[answers.location]}
              </span>
              ،{" "}
              <span className="font-semibold text-foreground">
                {teamLabels[answers.team]}
              </span>
              ،{" "}
              <span className="font-semibold text-foreground">
                {stageLabels[answers.stage]}
              </span>
              .
            </p>
          </div>

          <button
            type="button"
            className="mt-4 text-sm font-semibold text-muted-foreground underline underline-offset-4 hover:text-foreground"
            onClick={resetQuiz}
          >
            أعد الاختبار
          </button>
        </motion.div>
      )}
    </div>
  );
}
