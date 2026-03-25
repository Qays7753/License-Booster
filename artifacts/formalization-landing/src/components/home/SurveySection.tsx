import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";

const ENCOURAGEMENTS = [
  "إجابتك تساعدنا نفهم كيف يتحرك المحتوى.",
  "هذا السؤال يساعدنا في قياس وضوح المعلومات.",
  "تقريباً انتهينا.",
  "سؤال واحد بعد وانتهينا.",
  "شكراً — هذا آخر سؤال.",
];

/**
 * IMPORTANT: These survey questions are designed to measure page impact.
 * Each answer option maps to specific page content:
 * - Q2 option "الفرق بين التسجيل والترخيص" → maps to ComparisonSection
 * - Q2 option "الجهة اللي لازم أبدأ منها" → maps to EntitiesSection + Quiz results
 * - Q2 option "الخطوات تختلف حسب النوع والموقع" → maps to Quiz logic + LegalForms
 * - Q2 option "خطوات ناقصة" → maps to JourneySteps + Quiz results
 *
 * After any major content change, verify that each option still
 * corresponds to actual content on the page.
 *
 * TODO: Review and update after content enrichment from external references.
 */
const questions = [
  {
    question: "كيف وصلت إلى هذه الصفحة؟",
    subtitle: "يساعدنا نفهم كيف يتحرك المحتوى.",
    options: [
      { text: "شاهدت فيديو لصاحب مشروع على وسائل التواصل", emoji: "🎬" },
      { text: "أرسل إليّ أحدهم الرابط", emoji: "🔗" },
      { text: "بحثت بنفسي عن تسجيل أو ترخيص المشاريع", emoji: "🔍" },
      { text: "طريقة ثانية", emoji: "📌" },
    ],
  },
  {
    question: "قبل قراءة هذه الصفحة، كم كان واضحاً لك ما المطلوب لترخّص مشروعك؟",
    subtitle: "نقيس نقطة البداية، وليس مستوى المعرفة.",
    options: [
      { text: "ما كنت أعرف من أين أبدأ أصلاً", emoji: "🌫️" },
      { text: "كنت أعرف الفكرة العامة، لكن ليس التفاصيل", emoji: "🌤️" },
      { text: "كنت أعرف الخطوات بشكل جيد", emoji: "☀️" },
    ],
  },
  {
    question: "بعد القراءة، ما أكثر شيء أصبح واضحاً لك؟",
    subtitle: "اختر الأقرب — ولو لم يتغير شيء، فقل ذلك بصراحة.",
    options: [
      {
        text: "عرفت الفرق بين التسجيل والترخيص وأنهما خطوتان مختلفتان",
        emoji: "💡",
      },
      { text: "عرفت الجهة التي يلزم أن أبدأ منها لنوع مشروعي", emoji: "🏛️" },
      {
        text: "فهمت أن الخطوات تختلف حسب نوع المشروع والموقع",
        emoji: "🗂️",
      },
      {
        text: "اكتشفت أن لدي خطوات ناقصة لم أكن أعرف عنها",
        emoji: "🔎",
      },
      { text: "لم أشعر أن الصفحة أضافت شيئاً جديداً لي", emoji: "😐" },
    ],
  },
  {
    question: "بعد القراءة، كم تشعر أنك جاهز لبدء خطوة عملية؟",
    subtitle: "لا نقيس الحماس — نقيس الوضوح.",
    options: [
      { text: "جاهز وأعرف ما أول خطوة", emoji: "🟢" },
      { text: "أقرب من قبل، لكن ما زالت لدي أسئلة", emoji: "🟡" },
      { text: "ما زلت لا أشعر أنني جاهز", emoji: "🔴" },
      { text: "مشروعي مرخّص أصلاً", emoji: "✅" },
    ],
  },
  {
    question: "ما أول شيء قد تفعله بعد مغادرة هذه الصفحة؟",
    subtitle: "اختر الأقرب لنيّتك الفعلية.",
    options: [
      { text: "أفتح موقع الجهة المختصة التي ظهرت لي", emoji: "🏛️" },
      { text: "أسأل محامياً أو شخصاً لديه خبرة في حالتي", emoji: "🤝" },
      { text: "أشارك الصفحة مع شخص يحتاجها", emoji: "📤" },
      { text: "أعود لقراءة أقسام معينة بتركيز أكبر", emoji: "📖" },
      { text: "ليس لدي خطوة محددة حالياً", emoji: "⏸️" },
    ],
  },
  {
    question: "كيف تصف وضعك الآن؟",
    subtitle: "آخر سؤال — شكراً على وقتك.",
    options: [
      { text: "أفكر في بدء مشروع ولم أبدأ بعد", emoji: "🌱" },
      { text: "لدي مشروع شغّال بدون ترخيص مكتمل", emoji: "⚡" },
      { text: "بدأت التسجيل لكن الملف ناقص", emoji: "📋" },
      { text: "مسجل ومرخص", emoji: "🏁" },
    ],
  },
];

type SurveySectionProps = {
  onNavigate: (id: string) => void;
};

export function SurveySection({ onNavigate }: SurveySectionProps) {
  const [surveyStep, setSurveyStep] = useState(0);
  const [surveyAnswers, setSurveyAnswers] = useState<Record<number, string>>(
    {},
  );
  const [surveyCompleted, setSurveyCompleted] = useState(false);
  const [showEncouragement, setShowEncouragement] = useState(false);
  const [encouragementText, setEncouragementText] = useState("");
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const questionHeadingRef = useRef<HTMLHeadingElement>(null);
  const successHeadingRef = useRef<HTMLHeadingElement>(null);
  const hasInteracted = useRef(false);

  useEffect(() => {
    if (!hasInteracted.current) {
      return;
    }

    if (surveyCompleted) {
      successHeadingRef.current?.focus();
      return;
    }

    questionHeadingRef.current?.focus();
  }, [surveyCompleted, surveyStep]);

  const submitSurvey = async (answers: Record<number, string>) => {
    try {
      const response = await fetch("/api/survey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: answers[0],
          baseline: answers[1],
          clarity_gain: answers[2],
          readiness: answers[3],
          next_action: answers[4],
          segment: answers[5],
        }),
      });

      if (!response.ok) {
        console.warn("Survey submission returned a non-OK response.");
      }
    } catch {
      console.warn("Survey submission failed.");
    }
  };

  const handleAnswer = async (answer: string) => {
    hasInteracted.current = true;
    setSelectedOption(answer);
    const newAnswers = { ...surveyAnswers, [surveyStep]: answer };
    setSurveyAnswers(newAnswers);

    await new Promise((resolve) => setTimeout(resolve, 240));
    setSelectedOption(null);

    if (surveyStep < questions.length - 1) {
      if (surveyStep < ENCOURAGEMENTS.length) {
        setEncouragementText(ENCOURAGEMENTS[surveyStep]);
        setShowEncouragement(true);
        setTimeout(() => setShowEncouragement(false), 1500);
      }

      setSurveyStep((current) => current + 1);
      return;
    }

    await submitSurvey(newAnswers);
    setSurveyCompleted(true);
  };

  const currentQuestion = questions[surveyStep];
  const progressValue = (surveyStep / (questions.length - 1)) * 100;

  if (surveyCompleted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-3xl border border-border bg-card p-8 text-center shadow-xl md:p-12"
      >
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
          <CheckCircle2 className="h-10 w-10" />
        </div>
        <h3
          ref={successHeadingRef}
          tabIndex={-1}
          className="mb-4 text-3xl font-bold text-foreground outline-none md:text-4xl"
        >
          شكراً على وقتك.
        </h3>
        <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground">
          إجاباتك تساعدنا نعرف إذا المعلومات توصل بوضوح — وأين نحتاج نحسّن. لا
          نجمع أي بيانات شخصية.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button
            type="button"
            className="rounded-full px-6"
            onClick={() => onNavigate("find-path")}
          >
            ارجع إلى الاختبار التشخيصي
            <ArrowLeft className="ms-2 h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="outline"
            className="rounded-full px-6"
            onClick={() => {
              setSurveyAnswers({});
              setSurveyCompleted(false);
              setSurveyStep(0);
            }}
          >
            أعد الاستبيان
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="relative">
      {showEncouragement ? (
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="absolute -top-14 left-0 right-0 z-10 text-center"
        >
          <span className="inline-flex rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-lg">
            {encouragementText}
          </span>
        </motion.div>
      ) : null}

      <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-xl">
        <div className="border-b border-border bg-secondary/55 p-5 md:p-6">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-primary">
                سؤال {surveyStep + 1} من {questions.length}
              </p>
              <p className="text-sm text-muted-foreground">
                بدون بيانات شخصية أو معلومات اتصال.
              </p>
            </div>
            {surveyStep > 0 ? (
              <button
                type="button"
                onClick={() => setSurveyStep((current) => current - 1)}
                className="inline-flex items-center gap-1 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
              >
                <ArrowRight className="h-4 w-4" />
                رجوع
              </button>
            ) : null}
          </div>

          <div className="h-2.5 rounded-full bg-background">
            <motion.div
              className="h-2.5 rounded-full bg-accent"
              initial={{ width: 0 }}
              animate={{ width: `${progressValue}%` }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          </div>
        </div>

        <motion.div
          key={surveyStep}
          initial={{ opacity: 0, x: -18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.25 }}
          className="p-6 md:p-10"
        >
          <p className="mb-2 text-sm font-semibold text-accent">
            {currentQuestion.subtitle}
          </p>
          <h3
            ref={questionHeadingRef}
            tabIndex={-1}
            className="mb-8 text-2xl font-bold leading-relaxed text-foreground outline-none md:text-3xl"
          >
            {currentQuestion.question}
          </h3>

          <div className="space-y-3">
            {currentQuestion.options.map((option) => (
              <button
                key={option.text}
                type="button"
                onClick={() => handleAnswer(option.text)}
                className={`flex w-full items-center gap-4 rounded-2xl border-2 p-4 text-right transition-all hover:-translate-y-0.5 hover:shadow-md md:p-5 ${
                  selectedOption === option.text
                    ? "border-accent bg-accent/10"
                    : "border-border bg-background hover:border-accent/45"
                }`}
              >
                <span className="text-2xl">{option.emoji}</span>
                <span className="flex-1 text-base font-semibold text-foreground md:text-lg">
                  {option.text}
                </span>
                <ArrowLeft className="h-4 w-4 text-muted-foreground" />
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
