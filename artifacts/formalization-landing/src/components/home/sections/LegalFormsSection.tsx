import { BarChart3, Building2, Globe, Landmark, User, Users } from "lucide-react";

import { SectionHeader } from "@/components/home/SectionHeader";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
    description: "تناسب المشاريع التي تحتاج إلى هيكل تمويلي وإداري أكبر من البدايات البسيطة.",
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

export function LegalFormsSection() {
  return (
    <section id="legal-forms" className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="الشكل القانوني"
          title="اختار الشكل القانوني اللي بريّحك"
          description={
            <p>
              كل مشروع إله ثوب بيناسبه. تعرّف على الأشكال القانونية واختار اللي
              بيعطي مشروعك المرونة والحماية.
            </p>
          }
        />

        <Accordion type="single" collapsible className="mt-12 space-y-3">
          {legalForms.map((form, index) => (
            <AccordionItem
              key={form.title}
              value={`form-${index}`}
              className="rounded-2xl border border-border bg-card px-5"
            >
              <AccordionTrigger className="py-5 text-right hover:no-underline">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/8 text-primary">
                    <form.Icon className="h-5 w-5" />
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-accent">
                      {form.eyebrow}
                    </p>
                    <h3 className="text-lg font-bold text-foreground">
                      {form.title}
                    </h3>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-5">
                <p className="text-base leading-relaxed text-muted-foreground">
                  {form.description}
                </p>
                <div className="mt-3 rounded-xl bg-secondary/55 p-3 text-sm leading-relaxed text-foreground/80">
                  {form.detail}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <p className="mx-auto mt-10 max-w-2xl text-center text-lg font-semibold leading-relaxed text-foreground/70">
          وإذا مشروعك من البيت — وضعك مختلف شوي، وعنده مساره.
        </p>
      </div>
    </section>
  );
}
