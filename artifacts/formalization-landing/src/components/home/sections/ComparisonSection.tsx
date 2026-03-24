import { motion } from "framer-motion";
import { FileCheck2, FileText } from "lucide-react";

import { SectionHeader } from "@/components/home/SectionHeader";

const comparisonRows = [
  {
    label: "الهوية",
    without: "اسم موجود في السوق، لكن بلا ملف واضح يعرّف المشروع عند الحاجة.",
    with: "الكيان والمسؤولية وحدود النشاط أوضح عند التعامل مع الآخرين.",
  },
  {
    label: "التمويل",
    without: "الخيارات أضيق، وإثبات الجدية أصعب عادة.",
    with: "تظهر فرصة أكبر للتقديم على خدمات مالية أو برامج دعم عندما تنطبق الشروط.",
  },
  {
    label: "العقود والفوترة",
    without: "كل شيء يعتمد أكثر على المعرفة الشخصية أو الترتيبات غير الرسمية.",
    with: "إصدار مستندات واضحة يصبح أسهل في المراجعة والاعتماد.",
  },
  {
    label: "التوسع",
    without: "كل خطوة جديدة تبدأ وكأنها من الصفر.",
    with: "التوسع يصبح مبنياً على ملف يمكن مراجعته وتطويره بدل بقائه ضبابياً.",
  },
];

export function ComparisonSection() {
  return (
    <section
      id="reg-vs-license"
      className="bg-primary py-20 text-primary-foreground md:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          tone="light"
          eyebrow="قبل أن تبدأ"
          title="أين يختلط التسجيل بالترخيص؟"
          description={
            <p>
              التسجيل يعرّف الكيان، والترخيص يسمح بالمزاولة. كثير من التعطيل
              يبدأ عندما تتعامل مع الخطوتين كأنهما شيء واحد.
            </p>
          }
        />

        <div className="mx-auto mt-12 max-w-2xl">
          <img
            src="/images/reg-vs-license.png"
            alt="رسم توضيحي يوضح الفرق بين التسجيل والترخيص"
            className="mx-auto w-full rounded-3xl"
            width="800"
            height="400"
            loading="lazy"
          />
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <motion.article
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="rounded-3xl border border-white/12 bg-white/8 p-7 backdrop-blur-md"
          >
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/12 text-accent">
              <FileText className="h-7 w-7" />
            </div>
            <h3 className="text-3xl font-bold">التسجيل</h3>
            <p className="mt-4 text-justify-ar text-lg leading-relaxed text-primary-foreground/84">
              يخص الكيان القانوني للمشروع: الاسم، الشكل القانوني، الملكية،
              والمسؤولية.
            </p>
          </motion.article>

          <motion.article
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: 0.15, duration: 0.5, ease: "easeOut" }}
            className="rounded-3xl border border-white/12 bg-white/8 p-7 backdrop-blur-md"
          >
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/12 text-accent">
              <FileCheck2 className="h-7 w-7" />
            </div>
            <h3 className="text-3xl font-bold">الترخيص</h3>
            <p className="mt-4 text-justify-ar text-lg leading-relaxed text-primary-foreground/84">
              يخص مزاولة النشاط فعلياً من موقع محدد، وما يرافق ذلك من موافقات
              ومتطلبات مرتبطة بالنشاط والمكان.
            </p>
          </motion.article>
        </div>

        <div className="mt-10 space-y-4">
          {comparisonRows.map((row) => (
            <div
              key={row.label}
              className="grid gap-3 rounded-3xl border border-white/10 bg-white/8 p-4 md:grid-cols-[1fr_220px_1fr]"
            >
              <div className="rounded-2xl border border-white/12 bg-white/8 p-4">
                <p className="text-sm font-semibold text-primary-foreground/80">
                  بدون تنظيم مكتمل
                </p>
                <p className="mt-2 text-justify-ar text-base leading-relaxed text-primary-foreground/84">
                  {row.without}
                </p>
              </div>

              <div className="flex items-center justify-center rounded-2xl border border-white/12 bg-primary/45 px-4 py-6 text-center text-base font-bold">
                {row.label}
              </div>

              <div className="rounded-2xl bg-emerald-100/95 p-4 text-emerald-950">
                <p className="text-sm font-semibold">عند التنظيم</p>
                <p className="mt-2 text-justify-ar text-base leading-relaxed">{row.with}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 py-16 text-center sm:px-6 md:py-20 lg:px-8">
        <p className="mx-auto max-w-4xl text-2xl font-bold leading-relaxed text-white md:text-4xl">
          أكبر تأخير لا يحدث عند الرخصة. يحدث عندما تبدأ من الخطوة الخاطئة.
        </p>
      </div>
    </section>
  );
}
