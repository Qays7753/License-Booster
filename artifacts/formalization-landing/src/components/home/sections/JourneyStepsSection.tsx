import { SectionHeader } from "@/components/home/SectionHeader";
import { SectionConnector } from "@/components/home/SectionConnector";
import { motion } from "framer-motion";

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
      "إذا وُجد عمال أو تجديدات دورية أو متطلبات تشغيل، فهي جزء من التنظيم نفسه وليست تفصيلاً متأخراً.",
  },
] as const;

type JourneyStepsSectionProps = {
  onNavigate: (id: string) => void;
};

export function JourneyStepsSection({ onNavigate }: JourneyStepsSectionProps) {
  return (
    <section id="what-changes" className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="الطريق العملي"
          title="كيف يمشي الطريق عادة؟"
          description={
            <p>
              ليس كل مشروع يمر بكل المحطات بالطريقة نفسها، لكن هذا التسلسل
              يساعدك تعرف من أين تبدأ، وماذا يأتي بعد ماذا.
            </p>
          }
        />

        <div className="mt-14">
          <img
            src="/images/journey-path.png"
            alt="رسم توضيحي يوضح مراحل الطريق العملي لتنظيم المشروع"
            className="w-full rounded-3xl"
            width="900"
            height="300"
            loading="lazy"
          />
        </div>
        <div className="mt-6 space-y-0">
          {journeySteps.map((step, index) => (
            <div key={step.title}>
              <motion.article
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: index * 0.12, duration: 0.4, ease: "easeOut" }}
                className="grid gap-4 rounded-3xl border border-border bg-card p-5 shadow-sm md:grid-cols-[80px_1fr] md:items-start md:p-6"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-justify-ar text-base leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </motion.article>
              {index < journeySteps.length - 1 && (
                <div className="mr-[27px] hidden h-6 w-0.5 bg-primary/20 md:block" />
              )}
            </div>
          ))}
        </div>

        <SectionConnector
          text="إذا صارت الخطوات مرتبة، افتح المنصة الأقرب لحالتك وابدأ من المصدر الرسمي."
          buttonLabel="استعرض المنصات الرسمية"
          targetId="entities"
          onNavigate={onNavigate}
        />
      </div>
    </section>
  );
}
