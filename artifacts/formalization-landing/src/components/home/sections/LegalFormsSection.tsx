import { BarChart3, Building2, Globe, Landmark, User, Users } from "lucide-react";

import { SectionConnector } from "@/components/home/SectionConnector";
import { SectionHeader } from "@/components/home/SectionHeader";

const legalForms = [
  {
    Icon: User,
    title: "المؤسسة الفردية",
    eyebrow: "مناسب للأعمال الفردية الصغيرة",
    description: "الأبسط في البداية عندما يكون المشروع باسم شخص واحد ولا توجد شراكة معقدة.",
    detail: "المسؤولية تبقى مرتبطة بصاحب المشروع شخصياً.",
    accent: "border-primary",
  },
  {
    Icon: Users,
    title: "شركة التضامن أو التوصية البسيطة",
    eyebrow: "عندما يوجد أكثر من شريك",
    description: "تعطي وضوحاً أكبر في الأدوار بين الشركاء، لكنها تحتاج فهماً جيداً للمسؤوليات.",
    detail: "مهمة خصوصاً إذا كانت أدوار الشركاء مختلفة.",
    accent: "border-accent",
  },
  {
    Icon: Building2,
    title: "الشركة ذات المسؤولية المحدودة",
    eyebrow: "شائعة لدى المشاريع النامية",
    description: "تفصل بين مسؤولية الشركة ومسؤولية الشركاء بقدر مساهماتهم، وغالباً تكون خياراً عملياً.",
    detail: "ملائمة عندما تريد وضوحاً أكبر في المسؤولية وهيكل العمل.",
    accent: "border-emerald-500",
  },
  {
    Icon: BarChart3,
    title: "الشركة المساهمة الخاصة",
    eyebrow: "للهياكل الأكبر نسبياً",
    description: "تناسب المشاريع التي تحتاج إلى هيكل تمويلي وتنظيمي أكبر من البدايات البسيطة.",
    detail: "ليست المسار الأسهل للمشاريع الصغيرة جداً.",
    accent: "border-amber-500",
  },
  {
    Icon: Globe,
    title: "الشركة المساهمة العامة",
    eyebrow: "للهياكل الكبيرة",
    description: "مرتبطة عادةً بالمشاريع الأكبر والأكثر تعقيداً في الحوكمة والتمويل والامتثال.",
    detail: "نادراً ما تكون نقطة بداية لمشروع صغير أو منزلي.",
    accent: "border-primary",
  },
  {
    Icon: Landmark,
    title: "فرع الشركة الأجنبية",
    eyebrow: "إذا كانت الشركة الأم خارج الأردن",
    description: "مسار مختلف عن مسارات المنشآت المحلية، ويعتمد على وضع الشركة الأجنبية داخل المملكة.",
    detail: "يحتاج مراجعة خاصة لأنه ليس امتداداً مباشراً لمسارات المشاريع المحلية الصغيرة.",
    accent: "border-accent",
  },
] as const;

type LegalFormsSectionProps = {
  onNavigate: (id: string) => void;
};

export function LegalFormsSection({ onNavigate }: LegalFormsSectionProps) {
  return (
    <section id="legal-forms" className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="الأشكال القانونية"
          title="أي شكل قانوني يشبه وضعك؟"
          description={
            <p>
              لا يوجد شكل واحد يناسب الجميع. وجود شريك، وحجم المسؤولية، وطبيعة
              النشاط، كلها تغيّر الاختيار من البداية.
            </p>
          }
        />

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {legalForms.map((form) => (
            <article
              key={form.title}
              className={`rounded-3xl border border-border border-r-4 bg-card p-6 shadow-sm ${form.accent}`}
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/8 text-primary">
                <form.Icon className="h-6 w-6" />
              </div>
              <p className="text-sm font-semibold text-accent">{form.eyebrow}</p>
              <h3 className="mt-2 text-2xl font-bold text-foreground">
                {form.title}
              </h3>
              <p className="mt-4 text-justify-ar text-base leading-relaxed text-muted-foreground">
                {form.description}
              </p>
              <div className="mt-5 rounded-2xl bg-secondary/55 p-4 text-sm leading-relaxed text-foreground/80">
                {form.detail}
              </div>
            </article>
          ))}
        </div>

        <SectionConnector
          text="إذا وضحت الصورة القانونية، صارت الخطوات العملية أسهل بكثير في الترتيب."
          buttonLabel="استعرض الطريق العملي"
          targetId="what-changes"
          onNavigate={onNavigate}
        />
      </div>
    </section>
  );
}
