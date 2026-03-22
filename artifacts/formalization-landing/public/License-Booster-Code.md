# License Booster — كامل كود المشروع

## هيكل المشروع

```
License-Booster/
├── artifacts/
│   ├── formalization-landing/          ← الصفحة الرئيسية (React + Vite)
│   │   ├── src/
│   │   │   ├── pages/Home.tsx          ← كامل محتوى الصفحة
│   │   │   ├── App.tsx                 ← إعداد التطبيق والراوتر
│   │   │   └── index.css              ← الألوان والتصميم
│   │   └── vite.config.ts             ← إعداد Vite والبروكسي
│   └── api-server/                    ← الـ API (Express)
│       └── src/
│           ├── app.ts                  ← إعداد Express
│           └── routes/
│               ├── index.ts            ← تجميع الروابط
│               └── survey.ts           ← API الاستبيان
└── lib/db/src/schema/
    └── survey.ts                       ← بنية قاعدة البيانات
```

---

## 1. الصفحة الرئيسية — `src/pages/Home.tsx`

```tsx
import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useSpring, useInView } from "framer-motion";
import { ChevronDown, ArrowLeft, ArrowRight, Check, X } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

// --- مكوّن العداد المتحرك ---
function Counter({ from, to, duration = 2, suffix = "" }: { from: number, to: number, duration?: number, suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(from);

  useEffect(() => {
    if (!inView) return;
    let startTime: number;
    let animationFrame: number;
    const startCount = from;
    const endCount = to;
    const updateCounter = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(startCount + (endCount - startCount) * easeOutExpo));
      if (progress < 1) {
        animationFrame = requestAnimationFrame(updateCounter);
      }
    };
    animationFrame = requestAnimationFrame(updateCounter);
    return () => cancelAnimationFrame(animationFrame);
  }, [inView, from, to, duration]);

  return <span ref={ref} className="tabular-nums inline-block" dir="ltr">{count.toLocaleString('en-US')}{suffix}</span>;
}

const ENCOURAGEMENTS = [
  "رائع! إجابتك مهمة جداً 💪",
  "ممتاز! استمر، أنت في منتصف الطريق 🌟",
  "أحسنت! كل خطوة تقربك أكثر 🎯",
  "جيد جداً! سؤال واحد فقط تبقى ✨",
  "تقريباً انتهينا! 🏁",
];

const QUESTION_ICONS = ["🧠", "🚧", "💭", "🎯", "🔄", "📊"];

// --- مكوّن قسم الاستبيان ---
function SurveySection() {
  const [surveyStep, setSurveyStep] = useState(1);
  const [surveyAnswers, setSurveyAnswers] = useState<Record<number, string>>({});
  const [surveyCompleted, setSurveyCompleted] = useState(false);
  const [showEncouragement, setShowEncouragement] = useState(false);
  const [encouragementText, setEncouragementText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const questions = [
    {
      question: "هل تعرف الفرق بين تسجيل المشروع وترخيصه؟",
      subtitle: "لا يوجد إجابة خاطئة — فقط أخبرنا بصدق",
      options: [
        { text: "نعم، واضح لديّ الفرق تماماً", emoji: "✅" },
        { text: "أعرف بشكل عام لكن ليس بالتفصيل", emoji: "🤔" },
        { text: "لا أعرف الفرق", emoji: "❓" },
      ],
    },
    {
      question: "ما أكبر عائق يمنعك من تسجيل مشروعك؟",
      subtitle: "اختر الأقرب لواقعك",
      options: [
        { text: "التكلفة والرسوم", emoji: "💸" },
        { text: "تعقيد الإجراءات وكثرة الجهات", emoji: "🌀" },
        { text: "لا أعرف من أين أبدأ", emoji: "🗺️" },
        { text: "الخوف من الالتزامات الضريبية", emoji: "😰" },
        { text: "أعتقد أن مشروعي لا يحتاج تسجيلاً", emoji: "🤷" },
      ],
    },
    {
      question: "هل فكرت في تسجيل مشروعك خلال السنة الماضية؟",
      subtitle: "إجابتك تساعدنا نفهم أين أنت في المسار",
      options: [
        { text: "نعم وبدأت بالفعل", emoji: "🚀" },
        { text: "نعم لكن لم أبدأ بعد", emoji: "⏳" },
        { text: "لم أفكر في ذلك", emoji: "💤" },
      ],
    },
    {
      question: "بعد اطلاعك على هذه المعلومات، ما احتمال أن تتخذ خطوة نحو التسجيل؟",
      subtitle: "صراحتك تساعدنا نحسّن المحتوى",
      options: [
        { text: "مرتفع جداً — سأبدأ قريباً", emoji: "🔥" },
        { text: "مرتفع — أفكر جدياً", emoji: "💡" },
        { text: "غير متأكد بعد", emoji: "🌤️" },
        { text: "منخفض — ما زلت أتردد", emoji: "🌧️" },
      ],
    },
    {
      question: "ما الذي تغيّر في فهمك بعد زيارة هذه الصفحة؟",
      subtitle: "رأيك يُشكّل المحتوى القادم",
      options: [
        { text: "فهمت الفرق بين التسجيل والترخيص", emoji: "💡" },
        { text: "عرفت من أين أبدأ", emoji: "🗺️" },
        { text: "شعرت أن الخطوة ممكنة وأبسط مما توقعت", emoji: "😌" },
        { text: "لم يتغير شيء كبير", emoji: "😐" },
      ],
    },
    {
      question: "كيف تصف وضع مشروعك حالياً؟",
      subtitle: "آخر سؤال — شكراً على صبرك!",
      options: [
        { text: "مسجل ومرخص بالكامل", emoji: "🏆" },
        { text: "مسجل جزئياً والملف غير مكتمل", emoji: "📋" },
        { text: "غير مسجل وأعمل حالياً", emoji: "⚡" },
        { text: "ما زلت في مرحلة التفكير والتخطيط", emoji: "🌱" },
      ],
    },
  ];

  const submitSurvey = async (answers: Record<number, string>) => {
    setIsSubmitting(true);
    try {
      await fetch("/api/survey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          q1: answers[1], q2: answers[2], q3: answers[3],
          q4: answers[4], q5: answers[5], q6: answers[6],
        }),
      });
    } catch {
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAnswer = async (answer: string) => {
    setSelectedOption(answer);
    const newAnswers = { ...surveyAnswers, [surveyStep]: answer };
    setSurveyAnswers(newAnswers);
    await new Promise(r => setTimeout(r, 280));
    setSelectedOption(null);
    if (surveyStep < questions.length) {
      if (surveyStep < ENCOURAGEMENTS.length) {
        setEncouragementText(ENCOURAGEMENTS[surveyStep - 1]);
        setShowEncouragement(true);
        setTimeout(() => setShowEncouragement(false), 1800);
      }
      setSurveyStep(prev => prev + 1);
    } else {
      await submitSurvey(newAnswers);
      setSurveyCompleted(true);
    }
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  if (surveyCompleted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl shadow-xl p-8 md:p-14 text-center border border-border relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-primary/5 pointer-events-none" />
        <div className="relative z-10">
          <div className="text-7xl mb-6 animate-bounce">🎉</div>
          <h3 className="text-3xl md:text-4xl font-extrabold mb-4 text-foreground">شكراً جزيلاً على مشاركتك!</h3>
          <p className="text-lg md:text-xl text-muted-foreground mb-3 max-w-lg mx-auto leading-relaxed">
            إجاباتك وصلت بنجاح وستساعدنا على تقديم محتوى أفضل وأكثر فائدة لأصحاب المشاريع في الأردن.
          </p>
          <p className="text-base text-accent font-semibold mb-10">أنت جزء من التغيير 💪</p>
          <Button
            size="lg"
            className="text-lg h-14 px-10 rounded-full bg-accent hover:bg-accent/90 text-white shadow-lg"
            onClick={() => scrollToSection("find-path")}
          >
            اكتشف مسارك المناسب ←
          </Button>
        </div>
      </motion.div>
    );
  }

  const currentQ = questions[surveyStep - 1];
  const progressPct = ((surveyStep - 1) / questions.length) * 100;

  return (
    <div className="relative">
      {showEncouragement && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="absolute -top-14 left-0 right-0 text-center z-20"
        >
          <span className="inline-block bg-primary text-primary-foreground font-bold text-base px-5 py-2.5 rounded-full shadow-lg">
            {encouragementText}
          </span>
        </motion.div>
      )}

      <div className="bg-white rounded-3xl shadow-xl border border-border overflow-hidden">
        <div className="gradient-primary p-5 md:p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{QUESTION_ICONS[surveyStep - 1]}</span>
              <span className="text-sm font-bold text-primary-foreground/90">سؤال {surveyStep} من {questions.length}</span>
            </div>
            {surveyStep > 1 && (
              <button
                onClick={() => setSurveyStep(prev => prev - 1)}
                className="text-sm font-semibold text-primary-foreground/70 hover:text-primary-foreground flex items-center gap-1 transition-colors"
              >
                <ArrowRight className="w-4 h-4" /> رجوع
              </button>
            )}
          </div>
          <div className="w-full bg-white/20 rounded-full h-2.5">
            <motion.div
              className="bg-accent h-2.5 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPct}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>
          <div className="flex justify-between mt-1.5">
            {questions.map((_, i) => (
              <div key={i} className={`w-2 h-2 rounded-full transition-all duration-300 ${i < surveyStep - 1 ? "bg-accent" : i === surveyStep - 1 ? "bg-white" : "bg-white/30"}`} />
            ))}
          </div>
        </div>

        <motion.div
          key={surveyStep}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="p-6 md:p-10"
        >
          <p className="text-sm text-accent font-semibold mb-2 text-center">{currentQ.subtitle}</p>
          <h3 className="text-2xl md:text-3xl font-extrabold mb-8 text-center text-foreground leading-relaxed">
            {currentQ.question}
          </h3>
          <div className="flex flex-col gap-3">
            {currentQ.options.map((opt, idx) => (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleAnswer(opt.text)}
                className={`p-4 md:p-5 rounded-2xl border-2 transition-all text-right font-semibold text-base md:text-lg flex items-center gap-4 group
                  ${selectedOption === opt.text ? "border-accent bg-accent/10 scale-[1.02]" : "border-border bg-background hover:border-accent/60 hover:bg-accent/5"}`}
              >
                <span className="text-2xl shrink-0 group-hover:scale-110 transition-transform">{opt.emoji}</span>
                <span className="flex-1 text-foreground">{opt.text}</span>
                <ArrowLeft className={`w-4 h-4 shrink-0 transition-all text-muted-foreground group-hover:text-accent group-hover:-translate-x-1 ${selectedOption === opt.text ? "text-accent" : ""}`} />
              </motion.button>
            ))}
          </div>
          <p className="text-center text-sm text-muted-foreground mt-6">
            اضغط على أي خيار للانتقال للسؤال التالي تلقائياً
          </p>
        </motion.div>
      </div>
    </div>
  );
}

// ============================================================
// الصفحة الرئيسية Home()
// ============================================================
export default function Home() {
  useEffect(() => {
    document.documentElement.dir = "rtl";
    document.documentElement.lang = "ar";
  }, []);

  const [showMobileCta, setShowMobileCta] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const handleScroll = () => setShowMobileCta(window.scrollY > 500);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const fadeUpVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const [quizStep, setQuizStep] = useState(1);
  const [quizAnswers, setQuizAnswers] = useState({ type: "", location: "", team: "", stage: "" });

  const handleQuizAnswer = (field: string, value: string) => {
    setQuizAnswers(prev => ({ ...prev, [field]: value }));
    setTimeout(() => setQuizStep(prev => prev + 1), 300);
  };

  const resetQuiz = () => {
    setQuizStep(1);
    setQuizAnswers({ type: "", location: "", team: "", stage: "" });
  };

  const renderQuizResult = () => {
    const { stage, location } = quizAnswers;
    let title = "", desc = "", bgColor = "bg-primary", borderColor = "border-primary";

    if (stage === "formal") {
      title = "مشروعك في المسار الصحيح!";
      desc = "تأكد من تجديد تراخيصك وتحديث بياناتك دورياً.";
      bgColor = "bg-success text-success-foreground"; borderColor = "border-success";
    } else if (stage === "partial") {
      title = "أنت في منتصف الطريق.";
      desc = "الخطوة التالية هي مراجعة ما تبقى من متطلبات الترخيص لنشاطك.";
      bgColor = "bg-accent text-accent-foreground"; borderColor = "border-accent";
    } else if (stage === "planning" && location === "home_only") {
      title = "تخطيط سليم لمشروع منزلي مستقبلي";
      desc = "مشروعك المنزلي المستقبلي يحتاج إلى فهم مسار الرخصة المنزلية أولاً قبل البدء.";
      bgColor = "bg-blue-600 text-white"; borderColor = "border-blue-600";
    } else if (stage === "informal" && location !== "home_only") {
      title = "مشروعك يحتاج إلى تسجيل رسمي";
      desc = "ابدأ بتحديد الشكل القانوني المناسب لنشاطك.";
      bgColor = "bg-primary text-primary-foreground"; borderColor = "border-primary";
    } else {
      title = "التسجيل هو أول خطوة";
      desc = "حدد شكلك القانوني المناسب وتأكد من متطلبات ترخيص نشاطك.";
      bgColor = "bg-primary text-primary-foreground"; borderColor = "border-primary";
    }

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`p-8 md:p-12 rounded-3xl ${bgColor} border-2 ${borderColor} text-center shadow-xl`}
      >
        <h3 className="text-2xl md:text-4xl font-bold mb-4">{title}</h3>
        <p className="text-lg md:text-2xl mb-8 opacity-90 max-w-2xl mx-auto">{desc}</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" className="w-full sm:w-auto text-lg h-14 px-8 rounded-xl font-bold bg-white text-foreground hover:bg-white/90" onClick={() => scrollToSection('what-changes')}>
            افهم الخطوات التفصيلية
          </Button>
          <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg h-14 px-8 rounded-xl bg-transparent border-white/50 text-white hover:bg-white/10 hover:border-white" onClick={resetQuiz}>
            أعد الاختبار
          </Button>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden relative">

      {/* شريط التقدم */}
      <motion.div className="fixed top-0 right-0 h-[3px] bg-accent z-50 origin-right" style={{ scaleX, width: "100%" }} />

      {/* HERO */}
      <section className="relative pt-20 pb-32 md:pt-32 md:pb-48 overflow-hidden gradient-primary text-primary-foreground">
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl text-center">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-8">
            <motion.h1 variants={fadeUpVariant} className="text-4xl md:text-5xl lg:text-7xl font-extrabold leading-tight">
              مشروعك يستحق أن يكون واضحاً ومحميّاً وقابلاً للنمو
            </motion.h1>
            <motion.p variants={fadeUpVariant} className="text-lg md:text-2xl text-primary-foreground/90 max-w-3xl mx-auto">
              التسجيل والترخيص ليسا عبئاً إضافياً فقط. إنهما خطوة تنظّم شغلك وتفتح لك فرصاً أوسع.
            </motion.p>
            <motion.p variants={fadeUpVariant} className="text-base md:text-xl font-medium text-accent opacity-90 max-w-2xl mx-auto">
              صحيح أنك تبيع اليوم، لكن التنظيم هو ما يساعدك على البيع الأكبر لاحقاً.
            </motion.p>
            <motion.div variants={fadeUpVariant} className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
              <Button size="lg" className="w-full sm:w-auto text-lg h-14 px-8 rounded-xl bg-accent hover:bg-accent/90 text-white" onClick={() => scrollToSection('find-path')}>
                اكتشف مسارك
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg h-14 px-8 rounded-xl border-2 border-white/30 text-white hover:bg-white/10 bg-transparent" onClick={() => scrollToSection('reg-vs-license')}>
                افهم الفرق بين التسجيل والترخيص
              </Button>
              <Button size="lg" variant="ghost" className="w-full sm:w-auto text-lg h-14 px-8 rounded-xl text-white/80 hover:text-white" onClick={() => scrollToSection('cta')}>
                ابدأ بخطوة واضحة
              </Button>
            </motion.div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="block w-full h-[60px] md:h-[100px]" style={{ transform: 'rotate(180deg)' }}>
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="hsl(var(--primary))"></path>
          </svg>
        </div>
      </section>

      {/* STATS */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[
              { num: 98, suffix: "%", desc: "من مشاريع الأردن مشاريع صغيرة أو متناهية الصغر" },
              { num: 60, suffix: "%", desc: "من القطاع الخاص الأردني يعمل في هذه المشاريع" },
              { num: 50, suffix: "%", desc: "من الناتج المحلي الإجمالي تساهم فيه المشاريع الصغيرة" },
              { num: 11000, suffix: "+", desc: "مشروع تستهدف الوصول إليه ودعمه" }
            ].map((stat, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} className="text-center">
                <div className="text-4xl md:text-6xl font-extrabold text-accent mb-4 flex items-center justify-center gap-1">
                  <Counter from={0} to={stat.num} suffix={stat.suffix} />
                </div>
                <p className="text-sm md:text-base text-white/80 leading-relaxed font-medium">{stat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* QUIZ SECTION */}
      <section className="py-20 md:py-32 bg-background relative" id="find-path">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant} className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">اكتشف المسار المناسب لمشروعك</h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">أجب على 4 أسئلة بسيطة واحصل على توصية مخصصة لحالتك</p>
          </motion.div>

          <div className="bg-card rounded-3xl shadow-xl border border-border overflow-hidden">
            {quizStep <= 4 && (
              <div className="bg-secondary/50 border-b border-border/50 p-4 md:p-6 flex items-center justify-between">
                <div className="flex gap-2">
                  {[1, 2, 3, 4].map(step => (
                    <div key={step} className={`h-2.5 rounded-full transition-all duration-300 ${step === quizStep ? 'w-8 bg-accent' : step < quizStep ? 'w-4 bg-primary' : 'w-4 bg-border'}`} />
                  ))}
                </div>
                <span className="text-sm font-bold text-muted-foreground">الخطوة {quizStep} من 4</span>
              </div>
            )}
            <div className="p-6 md:p-10">
              {quizStep === 1 && (
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                  <h3 className="text-2xl md:text-3xl font-bold mb-8 text-center">ما وصف مشروعك الأقرب؟</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {[
                      { icon: "🍳", label: "مشروع طعام وتموينات", value: "food" },
                      { icon: "🛍️", label: "تجارة وبيع مباشر", value: "trade" },
                      { icon: "💻", label: "خدمات رقمية وتقنية", value: "digital" },
                      { icon: "✂️", label: "حرفة أو خدمة يدوية", value: "craft" },
                      { icon: "🏠", label: "مشروع منزلي", value: "home" },
                      { icon: "📦", label: "تصنيع أو إنتاج", value: "manufacturing" }
                    ].map(opt => (
                      <button key={opt.value} onClick={() => handleQuizAnswer("type", opt.value)} className={`p-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-4 text-center hover:shadow-md ${quizAnswers.type === opt.value ? 'border-accent bg-accent/5' : 'border-border bg-background hover:border-accent/50'}`}>
                        <span className="text-4xl">{opt.icon}</span>
                        <span className="font-bold text-lg">{opt.label}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
              {quizStep === 2 && (
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                  <button onClick={() => setQuizStep(1)} className="text-muted-foreground hover:text-foreground mb-6 flex items-center gap-2 text-sm font-bold">
                    <ArrowRight className="w-4 h-4" /> رجوع
                  </button>
                  <h3 className="text-2xl md:text-3xl font-bold mb-8 text-center">هل مشروعك يعمل من المنزل؟</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { label: "نعم، من المنزل بالكامل", value: "home_only" },
                      { label: "لديّ موقع خارج البيت", value: "external" },
                      { label: "أعمل من الاثنين", value: "both" }
                    ].map(opt => (
                      <button key={opt.value} onClick={() => handleQuizAnswer("location", opt.value)} className={`p-6 rounded-2xl border-2 transition-all text-center hover:shadow-md ${quizAnswers.location === opt.value ? 'border-accent bg-accent/5' : 'border-border bg-background hover:border-accent/50'}`}>
                        <span className="font-bold text-lg">{opt.label}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
              {quizStep === 3 && (
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                  <button onClick={() => setQuizStep(2)} className="text-muted-foreground hover:text-foreground mb-6 flex items-center gap-2 text-sm font-bold">
                    <ArrowRight className="w-4 h-4" /> رجوع
                  </button>
                  <h3 className="text-2xl md:text-3xl font-bold mb-8 text-center">هل لديك موظفون أو شركاء؟</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { label: "أعمل وحدي بالكامل", value: "solo" },
                      { label: "أحياناً أستعين بمساعدة", value: "occasional" },
                      { label: "لدي موظفون بشكل دائم", value: "staff" },
                      { label: "لدي شركاء في المشروع", value: "partners" }
                    ].map(opt => (
                      <button key={opt.value} onClick={() => handleQuizAnswer("team", opt.value)} className={`p-6 rounded-2xl border-2 transition-all text-center hover:shadow-md ${quizAnswers.team === opt.value ? 'border-accent bg-accent/5' : 'border-border bg-background hover:border-accent/50'}`}>
                        <span className="font-bold text-lg">{opt.label}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
              {quizStep === 4 && (
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                  <button onClick={() => setQuizStep(3)} className="text-muted-foreground hover:text-foreground mb-6 flex items-center gap-2 text-sm font-bold">
                    <ArrowRight className="w-4 h-4" /> رجوع
                  </button>
                  <h3 className="text-2xl md:text-3xl font-bold mb-8 text-center">ما المرحلة التي أنت فيها؟</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { label: "أفكر في بدء مشروع جديد", value: "planning" },
                      { label: "أعمل بالفعل دون تسجيل", value: "informal" },
                      { label: "مسجل جزئياً لكن ناقص", value: "partial" },
                      { label: "مسجل ومرخص بالكامل", value: "formal" }
                    ].map(opt => (
                      <button key={opt.value} onClick={() => handleQuizAnswer("stage", opt.value)} className={`p-6 rounded-2xl border-2 transition-all text-center hover:shadow-md ${quizAnswers.stage === opt.value ? 'border-accent bg-accent/5' : 'border-border bg-background hover:border-accent/50'}`}>
                        <span className="font-bold text-lg">{opt.label}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
              {quizStep > 4 && renderQuizResult()}
            </div>
          </div>
        </div>
      </section>

      {/* SURVEY SECTION */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-[#EEF2FF] to-[#F5F7FF]" id="survey">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant} className="text-center mb-14">
            <span className="inline-block bg-accent/10 text-accent font-bold text-sm px-4 py-1.5 rounded-full mb-4">📊 استبيان قصير</span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-foreground mb-5">رأيك يصنع الفرق</h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-lg mx-auto">
              6 أسئلة بسيطة — إجاباتك تساعدنا نفهم واقع أصحاب المشاريع ونطور محتوى أفيد لك ولغيرك
            </p>
            <div className="flex items-center justify-center gap-6 mt-6 text-sm text-muted-foreground">
              <span>⏱️ أقل من دقيقتين</span>
              <span>🔒 مجهول الهوية تماماً</span>
              <span>💡 بدون تسجيل</span>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            <SurveySection />
          </motion.div>
        </div>
      </section>

      {/* CTA FOOTER */}
      <section className="py-20 md:py-32 gradient-primary text-primary-foreground text-center" id="cta">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="space-y-8">
            <motion.h2 variants={fadeUpVariant} className="text-3xl md:text-6xl font-extrabold mb-6">
              الخطوة الأولى أسهل مما تتخيل
            </motion.h2>
            <motion.p variants={fadeUpVariant} className="text-xl md:text-2xl text-primary-foreground/90 max-w-2xl mx-auto">
              المهم ليس أن تبدأ بسرعة فقط، بل أن تبدأ بشكل صحيح يناسب نشاطك وموقعك وطبيعة مشروعك.
            </motion.p>
            <motion.div variants={fadeUpVariant} className="pt-8 pb-12">
              <Button size="lg" className="text-xl h-16 px-12 rounded-full bg-accent hover:bg-accent/90 text-white shadow-xl" onClick={() => scrollToSection('find-path')}>
                ابدأ مسارك الآن
              </Button>
            </motion.div>
            <motion.div variants={fadeUpVariant} className="border-t border-white/20 pt-10">
              <p className="text-sm md:text-base text-primary-foreground/60 leading-loose max-w-3xl mx-auto">
                هذه الصفحة إرشادية وتعليمية. التفاصيل القانونية والإجرائية الدقيقة تختلف بحسب نوع النشاط والموقع والشكل القانوني ووجود عمّال أو شركاء. يُنصح بمراجعة الجهات الرسمية المختصة للحصول على معلومات دقيقة تناسب حالتك.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* زر موبايل ثابت */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: showMobileCta ? 0 : 100 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-md border-t border-border shadow-xl z-40"
      >
        <Button className="w-full h-14 bg-accent hover:bg-accent/90 text-white text-lg font-bold rounded-xl" onClick={() => scrollToSection('find-path')}>
          اكتشف مسارك <ArrowLeft className="mr-2 w-5 h-5" />
        </Button>
      </motion.div>

    </div>
  );
}
```

---

## 2. إعداد التطبيق — `src/App.tsx`

```tsx
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
```

---

## 3. التصميم والألوان — `src/index.css`

```css
@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&family=Tajawal:wght@400;500;700&display=swap');
@import "tailwindcss";
@import "tw-animate-css";
@plugin "@tailwindcss/typography";

@custom-variant dark (&:is(.dark *));

@theme inline {
  --font-sans: 'Tajawal', sans-serif;
  --font-display: 'Cairo', sans-serif;
  --color-primary: hsl(var(--primary));
  --color-accent: hsl(var(--accent));
  --radius-lg: var(--radius);
}

:root {
  /* الخلفية الدافئة */
  --background: 60 20% 98%;
  --foreground: 210 28% 24%;
  --border: 60 10% 90%;
  --ring: 28 80% 52%;

  /* البطاقات */
  --card: 0 0% 100%;
  --card-foreground: 210 28% 24%;

  /* الأزرق الداكن الرئيسي */
  --primary: 210 60% 27%;
  --primary-foreground: 60 20% 98%;

  /* الرمادي الفاتح */
  --secondary: 60 10% 96%;
  --secondary-foreground: 210 28% 24%;
  --muted-foreground: 210 15% 45%;

  /* العنبر الذهبي */
  --accent: 28 80% 52%;
  --accent-foreground: 60 20% 98%;

  /* الأخضر */
  --success: 145 63% 42%;
  --success-foreground: 60 20% 98%;

  --destructive: 0 84% 60%;
  --radius: 1rem;
}

@layer base {
  html { scroll-behavior: smooth; }
  body {
    @apply font-sans antialiased bg-background text-foreground;
    direction: rtl;
    line-height: 1.8;
  }
  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-display);
    @apply font-bold tracking-tight;
    line-height: 1.4;
  }
}

@layer utilities {
  .gradient-primary { @apply bg-gradient-to-br from-primary to-[#113a57]; }
  .gradient-accent { @apply bg-gradient-to-r from-accent to-[#d67015]; }
  .glass-effect { @apply bg-white/80 backdrop-blur-md border border-white/20 shadow-xl; }
}
```

---

## 4. إعداد Vite — `vite.config.ts`

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

const port = Number(process.env.PORT);
const basePath = process.env.BASE_PATH!;

export default defineConfig({
  base: basePath,
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
    },
    dedupe: ["react", "react-dom"],
  },
  server: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
    proxy: {
      // توجيه استدعاءات API إلى خادم Express
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
      },
    },
  },
});
```

---

## 5. خادم API — `api-server/src/app.ts`

```ts
import express, { type Express } from "express";
import cors from "cors";
import router from "./routes";

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", router);

export default app;
```

---

## 6. مسارات API — `routes/survey.ts`

```ts
import { Router } from "express";
import { db, surveyResponsesTable } from "@workspace/db";

const surveyRouter = Router();

// حفظ إجابة الاستبيان
surveyRouter.post("/survey", async (req, res) => {
  try {
    const { q1, q2, q3, q4, q5, q6 } = req.body;
    const userAgent = req.headers["user-agent"] ?? null;

    await db.insert(surveyResponsesTable).values({
      q1Awareness: q1 ?? null,
      q2Barrier: q2 ?? null,
      q3Considered: q3 ?? null,
      q4Intent: q4 ?? null,
      q5Change: q5 ?? null,
      q6Status: q6 ?? null,
      userAgent,
    });

    res.json({ success: true });
  } catch (err) {
    console.error("Survey insert error:", err);
    res.status(500).json({ success: false, error: "Failed to save response" });
  }
});

// عرض جميع الإجابات
surveyRouter.get("/survey/results", async (_req, res) => {
  try {
    const results = await db.select().from(surveyResponsesTable).orderBy(surveyResponsesTable.submittedAt);
    res.json({ success: true, count: results.length, data: results });
  } catch (err) {
    console.error("Survey results error:", err);
    res.status(500).json({ success: false, error: "Failed to fetch results" });
  }
});

export default surveyRouter;
```

---

## 7. بنية قاعدة البيانات — `lib/db/src/schema/survey.ts`

```ts
import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const surveyResponsesTable = pgTable("survey_responses", {
  id: serial("id").primaryKey(),
  q1Awareness: text("q1_awareness"),   // هل تعرف الفرق؟
  q2Barrier: text("q2_barrier"),       // أكبر عائق؟
  q3Considered: text("q3_considered"), // هل فكرت في التسجيل؟
  q4Intent: text("q4_intent"),         // احتمال اتخاذ خطوة؟
  q5Change: text("q5_change"),         // ماذا تغير في فهمك؟
  q6Status: text("q6_status"),         // وضع مشروعك الحالي؟
  userAgent: text("user_agent"),
  submittedAt: timestamp("submitted_at").defaultNow(),
});

export const insertSurveyResponseSchema = createInsertSchema(surveyResponsesTable).omit({
  id: true,
  submittedAt: true,
});

export type InsertSurveyResponse = z.infer<typeof insertSurveyResponseSchema>;
export type SurveyResponse = typeof surveyResponsesTable.$inferSelect;
```

---

## معلومات تشغيل المشروع

### المتطلبات
- Node.js 20+
- pnpm
- PostgreSQL

### تشغيل محلياً
```bash
# تثبيت المكتبات
pnpm install

# إضافة متغير قاعدة البيانات
echo "DATABASE_URL=postgresql://user:pass@localhost:5432/dbname" > .env

# تشغيل الصفحة (على منفذ 3000)
pnpm --filter @workspace/formalization-landing run dev

# تشغيل الـ API (على منفذ 8080)
pnpm --filter @workspace/api-server run dev
```

### الألوان الرئيسية
| اللون | القيمة |
|---|---|
| الأزرق الداكن (Primary) | `hsl(210, 60%, 27%)` |
| العنبر الذهبي (Accent) | `hsl(28, 80%, 52%)` |
| الخلفية الدافئة | `hsl(60, 20%, 98%)` |

### الخطوط
- **العناوين:** Cairo
- **النصوص:** Tajawal
