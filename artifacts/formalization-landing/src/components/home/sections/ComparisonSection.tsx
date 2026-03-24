import { motion } from "framer-motion";
import { FileCheck2, FileText } from "lucide-react";

import { SectionHeader } from "@/components/home/SectionHeader";

export function ComparisonSection() {
  return (
    <section
      id="reg-vs-license"
      className="bg-primary py-20 text-primary-foreground md:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          tone="light"
          eyebrow="فك الاشتباك"
          title="التسجيل والترخيص.. فك الاشتباك"
          description={
            <p>
              باختصار: التسجيل هو إنك تعطي مشروعك اسم وهوية رسمية. والترخيص هو
              الإذن اللي بخليك تشتغل عالأرض قانونياً.
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

      </div>

      <div className="px-4 py-16 text-center sm:px-6 md:py-20 lg:px-8">
        <p className="mx-auto max-w-4xl text-2xl font-bold leading-relaxed text-white md:text-4xl">
          أكبر تأخير بيصير لما تبدأ من الخطوة الغلط.
        </p>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg font-semibold leading-relaxed text-primary-foreground/70">
          هلأ بعد ما وضح الفرق، خلينا نشوف أي شكل قانوني بيلبّي طبيعة شغلك.
        </p>
      </div>
    </section>
  );
}
