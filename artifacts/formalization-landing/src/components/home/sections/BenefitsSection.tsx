import {
  Banknote,
  FileText,
  Globe,
  Scale,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

import { SectionHeader } from "@/components/home/SectionHeader";
import { SectionConnector } from "@/components/home/SectionConnector";

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
    title: "الصورة تصبح أوضح",
    description:
      "عندما يتنظّم الملف، تصبح الملكية والمسؤولية والتعاملات أقل غموضاً من قبل.",
    example:
      "مثال: خلاف صغير مع شريك أو مورد يختلف كثيراً عندما تكون الأدوار والصفة القانونية واضحة من البداية.",
    tone: "primary",
    featured: true,
  },
  {
    Icon: Globe,
    title: "العميل ما يعود شخصياً فقط",
    description:
      "التنظيم يساعد مشروعك يشتغل مع جهات ما تعرفك معرفة شخصية، لكنها تحتاج جهة واضحة وفاتورة وعقداً مفهوماً.",
    example:
      "مثال: عرض توريد من شركة أكبر يحتاج فاتورة رسمية وعقداً باسم كيان واضح، وبدون تنظيم يضيع العرض قبل أن يبدأ.",
    tone: "accent",
    featured: true,
  },
  {
    Icon: Banknote,
    title: "التمويل يصبح أقرب",
    description:
      "التسجيل لا يضمن تمويلاً، لكنه يضع المشروع في موقع أفضل للتقديم على خدمة مالية أو برنامج دعم.",
    example:
      "مثال: برنامج تمويلي يطلب ملفاً واضحاً قبل دراسة الطلب، لا مجرد نشاط شغّال على الأرض.",
    tone: "emerald",
  },
  {
    Icon: Scale,
    title: "القرار يصبح أهدأ",
    description:
      "وجود شركاء أو توسع في العمل يحتاج طريقة أوضح لتحديد من يقرر، ومن يوقّع، وما حدود المسؤولية.",
    tone: "primary",
  },
  {
    Icon: FileText,
    title: "التعاملات تصبح مهنية",
    description:
      "الفواتير والعقود والمراسلات تكون أقوى عندما تصدر من كيان مفهوم، لا من وضع رمادي.",
    tone: "amber",
  },
  {
    Icon: TrendingUp,
    title: "النمو يصبح قابلاً للترتيب",
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

type BenefitsSectionProps = {
  onNavigate: (id: string) => void;
};

export function BenefitsSection({ onNavigate }: BenefitsSectionProps) {
  const featured = benefits.filter((item) => item.featured);
  const regular = benefits.filter((item) => !item.featured);

  return (
    <section id="benefits" className="bg-[#f2ede3] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="قبل أي إجراء"
          title="ما الذي يختلف عندما تنظّم ملفك؟"
          description={
            <p>
              الفكرة ليست وعوداً كبيرة. الفكرة أن مشروعك يصبح أوضح، وأسهل في
              التقديم، وأقرب للتعامل الجدي عندما يأتي الوقت المناسب.
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

        <SectionConnector
          text="الآن بعد أن اتضح لماذا التنظيم يفرق، يبقى السؤال الأهم: أين مشروعك بالضبط؟"
          buttonLabel="ابدأ الاختبار التشخيصي"
          targetId="find-path"
          onNavigate={onNavigate}
        />
      </div>
    </section>
  );
}
