import {
  Banknote,
  FileText,
  Globe,
  Scale,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";

import { SectionHeader } from "@/components/home/SectionHeader";

type BenefitItem = {
  Icon: typeof ShieldCheck;
  title: string;
  description: string;
  example?: string;
  tone: "primary" | "accent" | "emerald" | "amber";
  featured?: boolean;
};

const benefits: BenefitItem[] = [
  {
    Icon: ShieldCheck,
    title: "الناس بتعرف مين أنت رسمياً",
    description:
      "عندما يترخّص المشروع، تصبح الملكية والمسؤولية والتعاملات أقل غموضاً من قبل.",
    example:
      "مثال: خلاف صغير مع شريك أو مورد يختلف كثيراً عندما تكون الأدوار والصفة القانونية واضحة من البداية.",
    tone: "primary",
    featured: true,
  },
  {
    Icon: Globe,
    title: "عملاء جدد بيتعاملوا معك بثقة",
    description:
      "الترخيص يساعد مشروعك يشتغل مع جهات ما تعرفك معرفة شخصية، لكنها تحتاج جهة واضحة وفاتورة وعقداً مفهوماً.",
    example:
      "مثال: عرض توريد من شركة أكبر يحتاج فاتورة رسمية وعقداً باسم كيان واضح، وبدون ترخيص يضيع العرض قبل أن يبدأ.",
    tone: "accent",
    featured: true,
  },
  {
    Icon: Banknote,
    title: "باب التمويل بينفتح",
    description:
      "التسجيل لا يضمن تمويلاً، لكنه يضع المشروع في موقع أفضل للتقديم على خدمة مالية أو برنامج دعم.",
    example:
      "مثال: برنامج تمويلي يطلب مشروعاً مرخّصاً قبل دراسة الطلب، لا مجرد نشاط شغّال على الأرض.",
    tone: "emerald",
  },
  {
    Icon: Scale,
    title: "القرارات بتصير أوضح",
    description:
      "وجود شركاء أو توسع في العمل يحتاج طريقة أوضح لتحديد من يقرر، ومن يوقّع، وما حدود المسؤولية.",
    tone: "primary",
  },
  {
    Icon: FileText,
    title: "فواتير وعقود باسم مشروعك",
    description:
      "الفواتير والعقود والمراسلات تكون أقوى عندما تصدر من كيان مفهوم، لا من وضع رمادي.",
    tone: "amber",
  },
  {
    Icon: TrendingUp,
    title: "التوسع بيصير مبني على أساس",
    description:
      "بدل ما يتوسع الشغل فوق أساس مرتبك، تبدأ تبني مشروعاً يمكن مراجعته وتطويره بخطوات محسوبة.",
    tone: "emerald",
  },
];

const toneClasses = {
  primary:
    "border-primary/12 bg-primary/6 text-primary",
  accent:
    "border-accent/12 bg-accent/8 text-accent",
  emerald:
    "border-emerald-200 bg-emerald-50 text-emerald-700",
  amber:
    "border-amber-200 bg-amber-50 text-amber-700",
};

export function BenefitsSection() {
  const [showAll, setShowAll] = useState(false);
  const featured = benefits.filter((item) => item.featured);
  const regular = benefits.filter((item) => !item.featured);

  return (
    <section id="benefits" className="bg-[#f2ede3] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="لأن الوضوح يصنع فرقاً"
          title="ليش يهمك تعرف وين واقف مشروعك؟"
          description={
            <p>
              ستة تغييرات بسيطة بس تأثيرها كبير على قرارك اليومي: صورتك عند
              العميل بتصير أوضح، التمويل بيجيك أسرع، والتعاملات بتصير مهنية
              بدون ما تتعب.
            </p>
          }
        />

        {/* TODO: Optional illustration — "before vs after" formalization concept */}
        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {featured.map((benefit) => (
            <article
              key={benefit.title}
              className="rounded-3xl border border-border bg-card p-7 shadow-sm"
            >
              <div
                className={`mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border ${toneClasses[benefit.tone]}`}
              >
                <benefit.Icon className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">
                {benefit.title}
              </h3>
              <p className="mt-3 text-justify-ar text-base leading-relaxed text-muted-foreground">
                {benefit.description}
              </p>
              <p className="mt-4 border-r-4 border-accent pe-4 text-sm leading-relaxed text-foreground/82">
                {benefit.example}
              </p>
            </article>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setShowAll((v) => !v)}
          className="mx-auto mt-6 flex items-center gap-3 rounded-full border border-primary/30 bg-primary/6 px-6 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary/12"
        >
          <span className="text-primary/40 tracking-tighter">››››</span>
          {showAll ? "إخفاء الفوائد" : "اعرض المزيد من الفوائد"}
          <span className="text-primary/40 tracking-tighter">‹‹‹‹</span>
        </button>

        {showAll ? (
          <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {regular.map((benefit) => (
              <article
                key={benefit.title}
                className="rounded-3xl border border-border bg-card p-6 shadow-sm"
              >
                <div
                  className={`mb-5 flex h-11 w-11 items-center justify-center rounded-2xl border ${toneClasses[benefit.tone]}`}
                >
                  <benefit.Icon className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold text-foreground">
                  {benefit.title}
                </h3>
                <p className="mt-3 text-justify-ar text-base leading-relaxed text-muted-foreground">
                  {benefit.description}
                </p>
              </article>
            ))}
          </div>
        ) : null}

        <p className="mx-auto mt-10 max-w-2xl text-center text-lg font-semibold leading-relaxed text-foreground/70">
          صار الوقت تعرف بالضبط أين يقف مشروعك اليوم
        </p>
      </div>
    </section>
  );
}
