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
        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/12 bg-white/8 p-5 text-center backdrop-blur-md">
            <FileText className="mx-auto h-7 w-7 text-accent" />
            <h3 className="mt-3 text-xl font-bold">التسجيل</h3>
            <p className="mt-2 text-sm leading-relaxed text-primary-foreground/80">
              تعطي مشروعك اسم وهوية رسمية
            </p>
          </div>
          <div className="rounded-2xl border border-white/12 bg-white/8 p-5 text-center backdrop-blur-md">
            <FileCheck2 className="mx-auto h-7 w-7 text-accent" />
            <h3 className="mt-3 text-xl font-bold">الترخيص</h3>
            <p className="mt-2 text-sm leading-relaxed text-primary-foreground/80">
              الإذن اللي بخليك تشتغل قانونياً من موقع محدد
            </p>
          </div>
        </div>

      </div>

      <div className="px-4 py-16 text-center sm:px-6 md:py-20 lg:px-8">
        <p className="mx-auto max-w-4xl text-2xl font-bold leading-relaxed text-white md:text-4xl">
          أكبر تأخير بيصير لما تبدأ من الخطوة الغلط.
        </p>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg font-semibold leading-relaxed text-primary-foreground/70">
          الآن بعد ما وضح الفرق، خلينا نشوف أي شكل قانوني بيلبّي طبيعة شغلك.
        </p>
      </div>
    </section>
  );
}
