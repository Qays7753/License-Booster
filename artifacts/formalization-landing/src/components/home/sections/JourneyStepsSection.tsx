import { SectionHeader } from "@/components/home/SectionHeader";

const journeySteps = [
  {
    title: "حدد طبيعة النشاط والشكل القانوني",
    description:
      "ابدأ من فهم ما إذا كنت تحتاج مؤسسة فردية أو شكلاً آخر، خصوصاً إذا كان عندك شركاء أو التزامات تشغيلية مختلفة.",
  },
  {
    title: "تحقق من متطلبات الموقع",
    description:
      "الموقع ليس تفصيلاً ثانوياً. طبيعته قد تغيّر المسار بالكامل، خاصة في المشاريع المنزلية أو الأنشطة التي تستقبل عملاء.",
  },
  {
    title: "سجّل لدى الجهة المختصة",
    description:
      "بعد وضوح الشكل القانوني والمعلومات الأساسية، تأتي خطوة التسجيل الأساسية للكيان أو الاسم التجاري عند الحاجة.",
  },
  {
    title: "استكمل الرخص والموافقات",
    description:
      "بعض الأنشطة تحتاج رخصة مهن أو موافقات قطاعية أو متطلبات إضافية قبل التشغيل الكامل، وهذه المرحلة تختلف حسب النشاط.",
  },
  {
    title: "رتّب ما يستمر بعد البداية",
    description:
      "إذا وُجد عمال أو تجديدات دورية أو متطلبات تشغيل، فهي جزء من الترخيص نفسه وليست تفصيلاً متأخراً.",
  },
] as const;

export function JourneyStepsSection() {
  return (
    <section id="what-changes" className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="خطوات المسار"
          title="كيف بيمشي المسار عادة؟"
          description={
            <p>
              خطوات واضحة ومجربة بتبدأ من تحديد نشاطك وبتنتهي بحصولك على رخصتك.
              امشِها صح من البداية.
            </p>
          }
        />

        <div className="mt-14">
          <img
            src="/images/journey-path.png"
            alt="رسم توضيحي يوضح مراحل الطريق العملي لترخيص المشروع"
            className="w-full rounded-3xl"
            width="900"
            height="300"
            loading="lazy"
          />
        </div>
        <div className="mt-14 space-y-0">
          {journeySteps.map((step, index) => (
            <div
              key={step.title}
              className="relative flex gap-4 pb-8 last:pb-0 md:gap-6"
            >
              {index < journeySteps.length - 1 && (
                <div className="absolute bottom-0 right-[18px] top-10 w-0.5 bg-primary/15 md:right-[22px]" />
              )}
              <div className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground md:h-11 md:w-11 md:text-base">
                {index + 1}
              </div>
              <div className="pt-1">
                <h3 className="text-lg font-bold text-foreground md:text-xl">
                  {step.title}
                </h3>
                <p className="mt-2 text-base leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-center text-lg font-semibold leading-relaxed text-foreground/70">
          والآن لم يعد ينقصك إلا أن تعرف أين تبدأ بحسب الجهة التي تخدم حالتك.
        </p>
      </div>
    </section>
  );
}
