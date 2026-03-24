import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock3,
  Download,
  ExternalLink,
  FileCheck2,
  Monitor,
  Package,
  Receipt,
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
  tone: string;
  steps: string[];
  authorities: QuizAuthority[];
  timeframe: string;
  cost: string;
  nextTarget: string;
};

type AuthorityLink = {
  label: string;
  href: string;
  tone: "primary" | "fallback";
};

type QuizAuthority = {
  title: string;
  description: string;
  links: AuthorityLink[];
};

const GOVERNMENT_PLATFORMS = {
  daleel: {
    name: "دليل الخدمات — وزارة الصناعة والتجارة والتموين",
    href: "https://daleel.mit.gov.jo",
  },
  ccd: {
    name: "دائرة مراقبة الشركات — الخدمات الإلكترونية",
    href: "https://ccd.gov.jo",
  },
  mola: {
    name: "نظام الرخص المهنية — وزارة الإدارة المحلية",
    href: "https://eservices.mola.gov.jo",
  },
  amman: {
    name: "أمانة عمّان الكبرى — الخدمات الإلكترونية",
    href: "https://e-services.ammancity.gov.jo",
  },
  sanad: {
    name: "منصة سند",
    href: "https://sanad.gov.jo",
  },
} as const;

const STEP_LABELS = [
  "نوع المشروع",
  "الموقع",
  "الفريق",
  "المرحلة",
];

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
      { label: "أعمل حالياً بدون تنظيم مكتمل", value: "informal" },
      { label: "بدأت التسجيل لكن الملف غير مكتمل", value: "partial" },
      { label: "مسجل ومرخص بالكامل", value: "formal" },
    ],
  },
];

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
  informal: "يعمل بدون تنظيم مكتمل",
  partial: "بدأ التسجيل لكن الملف غير مكتمل",
  formal: "مسجل ومرخص بالكامل",
};

const toneClasses: Record<string, string> = {
  primary: "border-primary/20 bg-primary text-primary-foreground",
  accent: "border-accent/20 bg-accent text-accent-foreground",
  success: "border-emerald-300 bg-emerald-600 text-white",
};

function buildAuthorityLinks(
  entries: Array<{ label: string; href: string }>,
): AuthorityLink[] {
  const seen = new Set<string>();

  return entries
    .filter((entry) => {
      if (seen.has(entry.href)) {
        return false;
      }

      seen.add(entry.href);
      return true;
    })
    .map((entry, index) => ({
      label: entry.label,
      href: entry.href,
      tone: index === 0 ? "primary" : "fallback",
    }));
}

function createAuthority(
  title: string,
  description: string,
  links: Array<{ label: string; href: string }>,
): QuizAuthority {
  return {
    title,
    description,
    links: buildAuthorityLinks(links),
  };
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function buildQuizResult(answers: QuizAnswers): QuizResult {
  const projectLabel = typeLabels[answers.type] ?? "المشروع";
  const locationLabel = locationLabels[answers.location] ?? "الموقع الحالي";
  const teamLabel = teamLabels[answers.team] ?? "بنية الفريق الحالية";
  const stageLabel = stageLabels[answers.stage] ?? "المرحلة الحالية";

  const isHomeOnly = answers.location === "home_only";
  const hasPartners = answers.team === "partners";
  const needsSectorReview =
    answers.type === "industry" ||
    answers.type === "agriculture" ||
    answers.type === "tourism";

  const authorities = new Map<string, QuizAuthority>();

  if (answers.stage !== "formal") {
    authorities.set(
      "registration",
      createAuthority(
        "التسجيل والكيان القانوني",
        "وزارة الصناعة والتجارة والتموين ودائرة مراقبة الشركات بحسب الشكل القانوني واسم المشروع عند الحاجة.",
        [
          {
            label: GOVERNMENT_PLATFORMS.daleel.name,
            href: GOVERNMENT_PLATFORMS.daleel.href,
          },
          {
            label: GOVERNMENT_PLATFORMS.ccd.name,
            href: GOVERNMENT_PLATFORMS.ccd.href,
          },
          {
            label: GOVERNMENT_PLATFORMS.sanad.name,
            href: GOVERNMENT_PLATFORMS.sanad.href,
          },
        ],
      ),
    );
  }

  if (isHomeOnly) {
    authorities.set(
      "home-license",
      createAuthority(
        "الرخصة والموقع",
        "أمانة عمّان الكبرى أو البلدية المختصة بالموقع عند الحاجة إلى رخصة المهن ومتطلبات الموقع.",
        [
          {
            label: GOVERNMENT_PLATFORMS.amman.name,
            href: GOVERNMENT_PLATFORMS.amman.href,
          },
          {
            label: GOVERNMENT_PLATFORMS.mola.name,
            href: GOVERNMENT_PLATFORMS.mola.href,
          },
          {
            label: GOVERNMENT_PLATFORMS.sanad.name,
            href: GOVERNMENT_PLATFORMS.sanad.href,
          },
        ],
      ),
    );
  } else {
    authorities.set(
      "municipality",
      createAuthority(
        "الرخصة والموقع",
        "أمانة عمّان الكبرى أو البلدية المختصة بالموقع عند الحاجة إلى رخصة المهن ومتطلبات الموقع.",
        [
          {
            label: GOVERNMENT_PLATFORMS.amman.name,
            href: GOVERNMENT_PLATFORMS.amman.href,
          },
          {
            label: GOVERNMENT_PLATFORMS.mola.name,
            href: GOVERNMENT_PLATFORMS.mola.href,
          },
          {
            label: GOVERNMENT_PLATFORMS.sanad.name,
            href: GOVERNMENT_PLATFORMS.sanad.href,
          },
        ],
      ),
    );
  }

  if (needsSectorReview) {
    authorities.set(
      "sector",
      createAuthority(
        "الجهة القطاعية",
        "الجهة القطاعية المختصة بالنشاط نفسه مثل الصحة أو السلامة الغذائية أو الموافقات الفنية المرتبطة بالإنتاج.",
        [
          {
            label: GOVERNMENT_PLATFORMS.sanad.name,
            href: GOVERNMENT_PLATFORMS.sanad.href,
          },
        ],
      ),
    );
  }

  if (answers.stage === "formal") {
    return {
      title: "ملفك أقرب إلى الصيانة الدورية منه إلى البداية من الصفر",
      summary: `${projectLabel} ${locationLabel} و${teamLabel}. بما أنك ${stageLabel}، فالأولوية الآن هي المراجعة الدورية والتأكد من أن الرخص والبيانات ما تزال متسقة مع الواقع الفعلي.`,
      status: "جاهزية جيدة",
      tone: "success",
      steps: [
        "راجع تواريخ انتهاء السجل والرخصة وأي موافقات مرتبطة بالموقع أو النشاط.",
        "حدّث الملف إذا تغيّر العنوان أو النشاط أو عدد العاملين أو الشركاء.",
        "تأكد من أن الالتزامات التشغيلية الجارية واضحة لديك، خصوصاً ما يتعلق بالموقع والرخص والتجديدات الدورية.",
      ],
      authorities: Array.from(authorities.values()),
      timeframe: "عدة ساعات إلى أيام للمراجعة والتجديد، بحسب ما إذا كانت البيانات محدثة من الأصل.",
      cost: "غالباً رسوم تجديد أو تعديل فقط، لكنها تختلف حسب الجهة والنشاط.",
      nextTarget: "entities",
    };
  }

  if (answers.stage === "partial") {
    return {
      title: "أنت في منتصف الطريق بالفعل",
      summary: `${projectLabel} ${locationLabel} و${teamLabel}. بما أنك ${stageLabel}، فالأقرب أن تحدد ما هو الناقص تحديداً: هل هو رخصة موقع، موافقة قطاعية، أو استكمال ملف الجهة المسؤولة عن التسجيل.`,
      status: "استكمال الملف",
      tone: "accent",
      steps: [
        "احصر المستندات أو الموافقات الناقصة قبل أي خطوة جديدة حتى لا تكرر الإجراءات.",
        "ابدأ بما يوقفك فعلياً: موقع النشاط، الموافقات القطاعية، أو استكمال بيانات التسجيل.",
        "إن كان لديك شركاء أو عمال، فراجع المتطلبات المرافقة مبكراً حتى لا تتحول إلى تأخير لاحق.",
      ],
      authorities: Array.from(authorities.values()),
      timeframe: "غالباً من عدة أيام إلى بضعة أسابيع لأن جزءاً من الملف قائم أصلاً.",
      cost: "عادة أقل من البدء من الصفر، لأن التركيز يكون على الاستكمال أو التعديل لا على فتح ملف جديد بالكامل.",
      nextTarget: hasPartners ? "legal-forms" : "what-changes",
    };
  }

  if (answers.stage === "planning" && isHomeOnly) {
    return {
      title: "ابدأ من أهلية النشاط المنزلي قبل أي التزام آخر",
      summary: `${projectLabel} ${locationLabel} و${teamLabel}. بما أنك ${stageLabel}، فالمسار الأنسب يبدأ بالتحقق مما إذا كان النشاط مناسباً للعمل من المنزل وما الشروط الواقعية قبل فتح أي ملف رسمي.`,
      status: "تخطيط أولي",
      tone: "primary",
      steps: [
        "تأكد أولاً من أن النشاط يمكن أن يعمل من المنزل وفق الشروط المحلية ونوع المشروع نفسه.",
        "بعد وضوح أهلية الموقع، حدّد الشكل القانوني الأنسب إذا قررت الانتقال إلى التسجيل.",
        "احتفظ بتقدير عملي للوقت والكلفة بدل افتراض أن كل نشاط منزلي يحتاج المسار نفسه.",
      ],
      authorities: Array.from(authorities.values()),
      timeframe: "من أيام إلى عدة أسابيع بحسب سرعة التحقق من أهلية النشاط المنزلي واستيفاء الشروط.",
      cost: "كلفة منخفضة إلى متوسطة في البداية، لكن الرسوم الدقيقة تعتمد على النشاط والموقع ولا يُفترض أنها موحدة.",
      nextTarget: "home-based",
    };
  }

  if (answers.stage === "planning") {
    return {
      title: "أفضل وقت لترتيب المسار هو قبل توسع الالتزامات",
      summary: `${projectLabel} ${locationLabel} و${teamLabel}. بما أنك ${stageLabel}، فالمكسب الحقيقي الآن هو اختيار الشكل القانوني والمسار الصحيح من البداية بدلاً من تعديل المسار لاحقاً.`,
      status: "بداية محسوبة",
      tone: "primary",
      steps: [
        "حدّد ما إذا كان الأنسب لك مؤسسة فردية أم شكلاً قانونياً آخر، خاصة إذا كان لديك شركاء.",
        "راجع مبكراً متطلبات الموقع والنشاط قبل استئجار موقع أو شراء تجهيزات غير لازمة.",
        "ابنِ تقديراً أولياً للوقت والكلفة والجهات المعنية حتى تتحول الفكرة إلى خطة واضحة لا إلى قلق مفتوح.",
      ],
      authorities: Array.from(authorities.values()),
      timeframe: "التحضير الجيد قد يتم خلال أيام، لكن اكتمال المسار يعتمد على النشاط والموقع والموافقات المطلوبة.",
      cost: "غالباً تبدأ برسوم تسجيل أساسية، ثم قد تظهر رسوم إضافية مرتبطة بالموقع أو بالموافقات حسب النشاط.",
      nextTarget: hasPartners ? "legal-forms" : "reg-vs-license",
    };
  }

  return {
    title: "الأولوية الآن هي تحويل العمل القائم إلى ملف منظم",
    summary: `${projectLabel} ${locationLabel} و${teamLabel}. بما أنك ${stageLabel}، فالأهم هو ترتيب الملف على مراحل: تحديد الجهة المسؤولة عن التسجيل، ثم مراجعة الموقع، ثم استكمال أي رخص أو موافقات لازمة دون افتراض أن الخطوة واحدة للجميع.`,
    status: "تنظيم تدريجي",
    tone: "primary",
    steps: [
      "ابدأ بتحديد ما إذا كانت المشكلة الأساسية في التسجيل نفسه أم في الترخيص أو في متطلبات الموقع.",
      "رتّب الملف بحسب ما يوقف التشغيل أو التوسع: السجل، الرخصة، الموافقات القطاعية، أو التزامات العمال.",
      "لا تفترض أن عليك إنجاز كل شيء دفعة واحدة؛ المهم أن تتقدم بخطوات صحيحة ومتصلة بحالة مشروعك الفعلية.",
    ],
    authorities: Array.from(authorities.values()),
    timeframe: "عادة من عدة أيام للتسجيل الأولي إلى عدة أسابيع عند الحاجة إلى موافقات أو رخص إضافية.",
    cost: "رسوم أساسية للتسجيل، وقد تضاف رسوم مرتبطة بالموقع أو النشاط أو التعديلات المطلوبة على الملف.",
    nextTarget: hasPartners ? "legal-forms" : "what-changes",
  };
}

function buildPrintableMarkup(result: QuizResult) {
  const stepsMarkup = result.steps
    .map((step) => `<li>${escapeHtml(step)}</li>`)
    .join("");
  const authoritiesMarkup = result.authorities
    .map(
      (authority) => `
        <li>
          <strong>${escapeHtml(authority.title)}</strong>
          <br />
          <span>${escapeHtml(authority.description)}</span>
          <br />
          <small>${authority.links
            .map(
              (link) =>
                `${escapeHtml(link.label)}: ${escapeHtml(link.href)}`,
            )
            .join("<br />")}</small>
        </li>
      `,
    )
    .join("");

  return `
    <!DOCTYPE html>
    <html lang="ar" dir="rtl">
      <head>
        <meta charset="UTF-8" />
        <title>نتيجة المسار الإرشادي</title>
        <style>
          body {
            font-family: "Segoe UI", Tahoma, Arial, sans-serif;
            margin: 0;
            padding: 40px 32px;
            background: #f7f4ee;
            color: #20353d;
            line-height: 1.8;
          }
          .sheet {
            max-width: 860px;
            margin: 0 auto;
            background: #ffffff;
            border: 1px solid #e4ddd0;
            border-radius: 28px;
            padding: 32px;
          }
          .kicker {
            color: #dd6b4d;
            font-weight: 700;
            font-size: 14px;
            margin-bottom: 8px;
          }
          h1 {
            font-size: 30px;
            margin: 0 0 12px;
          }
          p {
            margin: 0 0 12px;
          }
          .meta {
            display: grid;
            gap: 12px;
            margin: 24px 0;
          }
          .meta-card {
            background: #f7f4ee;
            border-radius: 18px;
            padding: 16px 18px;
          }
          h2 {
            font-size: 20px;
            margin: 28px 0 12px;
          }
          ul {
            margin: 0;
            padding-right: 20px;
          }
          li {
            margin-bottom: 10px;
          }
          .note {
            margin-top: 28px;
            font-size: 14px;
            color: #5b6b72;
          }
        </style>
      </head>
      <body>
        <div class="sheet">
          <div class="kicker">نتيجة إرشادية قابلة للحفظ PDF</div>
          <h1>${escapeHtml(result.title)}</h1>
          <p>${escapeHtml(result.summary)}</p>

          <div class="meta">
            <div class="meta-card"><strong>الحالة:</strong> ${escapeHtml(result.status)}</div>
            <div class="meta-card"><strong>الإطار الزمني التقريبي:</strong> ${escapeHtml(result.timeframe)}</div>
            <div class="meta-card"><strong>قراءة أولية للكلفة:</strong> ${escapeHtml(result.cost)}</div>
          </div>

          <h2>الخطوات الأرجح لحالتك</h2>
          <ul>${stepsMarkup}</ul>

          <h2>الجهات التي تحتاج التحقق منها</h2>
          <ul>${authoritiesMarkup}</ul>

          <p class="note">
            هذه النتيجة إرشادية، والتحقق النهائي يبقى من الجهة المختصة.
          </p>
        </div>
      </body>
    </html>
  `;
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

  const currentStep = QUESTION_STEPS[stepIndex];
  const result = buildQuizResult(answers);

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

  const exportResult = () => {
    const printWindow = window.open("", "_blank", "width=900,height=1100");

    if (!printWindow) {
      return;
    }

    printWindow.document.open();
    printWindow.document.write(buildPrintableMarkup(result));
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-xl">
      {stepIndex < QUESTION_STEPS.length ? (
        <>
          <div className="border-b border-border bg-secondary/60 p-5 md:p-6">
            <div className="mb-5 flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-primary">
                  اختبار إرشادي من أربع خطوات
                </p>
                <p className="text-sm text-muted-foreground">
                  أجب بسرعة لتحصل على مسار أولي يناسب وضعك الحالي.
                </p>
              </div>
              <div className="rounded-full bg-background px-4 py-2 text-sm font-bold text-foreground">
                {stepIndex + 1} / {QUESTION_STEPS.length}
              </div>
            </div>

            <div className="mb-4 h-2.5 rounded-full bg-background">
              <motion.div
                className="h-2.5 rounded-full bg-accent"
                animate={{
                  width: `${((stepIndex + 1) / QUESTION_STEPS.length) * 100}%`,
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </div>

            <div className="grid gap-3 md:grid-cols-4">
              {STEP_LABELS.map((label, index) => {
                const isActive = index === stepIndex;
                const isDone = index < stepIndex;

                return (
                  <div
                    key={label}
                    className={`rounded-2xl border px-4 py-3 text-sm transition-colors ${
                      isActive
                        ? "border-accent bg-accent/10 text-foreground"
                        : isDone
                          ? "border-primary/20 bg-primary/8 text-foreground"
                          : "border-border bg-background text-muted-foreground"
                    }`}
                  >
                    <div className="mb-1 flex items-center justify-between gap-2">
                      <span className="font-bold">{label}</span>
                      {isDone ? (
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                      ) : (
                        <span className="text-xs font-semibold">
                          0{index + 1}
                        </span>
                      )}
                    </div>
                    <p className="text-xs leading-relaxed">
                      {isDone
                        ? "تم اختيار الإجابة"
                        : isActive
                          ? "أجب عن هذه الخطوة الآن"
                          : "خطوة لاحقة"}
                    </p>
                  </div>
                );
              })}
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
            className={`rounded-3xl border p-6 md:p-8 ${
              toneClasses[result.tone]
            }`}
          >
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold opacity-80">
                  {result.status}
                </p>
                <h3
                  ref={resultHeadingRef}
                  tabIndex={-1}
                  className="mt-1 text-2xl font-bold outline-none md:text-4xl"
                >
                  {result.title}
                </h3>
              </div>
              <div className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold">
                خريطة طريق أولية
              </div>
            </div>

            <p className="max-w-3xl text-justify-ar text-lg leading-relaxed opacity-90">
              {result.summary}
            </p>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            <div className="rounded-3xl border border-border bg-secondary/55 p-5">
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Clock3 className="h-5 w-5" />
              </div>
              <h4 className="mb-2 text-lg font-bold text-foreground">
                الإطار الزمني التقريبي
              </h4>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {result.timeframe}
              </p>
            </div>

            <div className="rounded-3xl border border-border bg-secondary/55 p-5">
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-accent/12 text-accent">
                <Receipt className="h-5 w-5" />
              </div>
              <h4 className="mb-2 text-lg font-bold text-foreground">
                قراءة أولية للكلفة
              </h4>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {result.cost}
              </p>
            </div>

            <div className="rounded-3xl border border-border bg-secondary/55 p-5">
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                <FileCheck2 className="h-5 w-5" />
              </div>
              <h4 className="mb-2 text-lg font-bold text-foreground">
                تذكير مهم
              </h4>
              <p className="text-sm leading-relaxed text-muted-foreground">
                هذه النتيجة تنظّم التفكير وتختصر البداية، لكنها لا تُغني عن
                التحقق من الجهة المختصة.
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
              <h4 className="mb-5 text-xl font-bold text-foreground">
                الخطوات الأرجح لحالتك
              </h4>
              <div className="space-y-4">
                {result.steps.map((step, index) => (
                  <div key={step} className="flex items-start gap-4">
                    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                      {index + 1}
                    </div>
                    <p className="text-base leading-relaxed text-muted-foreground">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
              <h4 className="mb-5 text-xl font-bold text-foreground">
                الجهات التي تحتاج التحقق منها
              </h4>
              <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                هذه الجهات التي يُحتمل أن تحتاج مراجعتها. اضغط على أي رابط لفتح
                الموقع الرسمي مباشرة.
              </p>
              <div className="space-y-4">
                {result.authorities.map((authority) => (
                  <div
                    key={authority.title}
                    className="rounded-2xl border border-border bg-secondary/55 p-4"
                  >
                    <p className="text-base font-bold text-foreground">
                      {authority.title}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {authority.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {authority.links.map((link) => (
                        <a
                          key={link.href}
                          href={link.href}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`افتح ${link.label}`}
                          title={link.label}
                          className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
                            link.tone === "primary"
                              ? "border-primary/20 bg-primary text-primary-foreground hover:bg-primary/90"
                              : "border-border bg-background text-foreground hover:bg-secondary"
                          }`}
                        >
                          <span>
                            {link.tone === "primary"
                              ? "افتح المنصة ←"
                              : "زيارة الموقع ←"}
                          </span>
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
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

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button
              type="button"
              className="h-12 rounded-full px-6"
              onClick={() => onNavigate(result.nextTarget)}
            >
              تابع إلى الخطوات الأنسب
              <ArrowLeft className="ms-2 h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="outline"
              className="h-12 rounded-full px-6"
              onClick={exportResult}
            >
              طباعة أو حفظ النتيجة PDF
              <Download className="ms-2 h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              className="h-12 rounded-full px-6"
              onClick={resetQuiz}
            >
              أعد الاختبار
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
