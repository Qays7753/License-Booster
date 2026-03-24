import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { LAST_UPDATED } from "@/components/home/content";

type HeroSectionProps = {
  onNavigate: (id: string) => void;
};

export function HeroSection({ onNavigate }: HeroSectionProps) {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-primary pb-24 pt-32 text-primary-foreground md:pb-28 md:pt-40"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.14),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(221,107,77,0.22),transparent_32%),linear-gradient(to_bottom,hsl(var(--primary)),hsl(var(--primary)))]" />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-8">
        <div>
          <p className="mb-4 text-sm font-semibold text-primary-foreground/80">
            رخّص مشروعك وتوسّع
          </p>
          <h1 className="max-w-3xl text-4xl font-extrabold leading-tight md:text-6xl xl:text-7xl">
            مشروعك موجود
            <span className="block text-accent">بس مشروعك مو مُرخّص؟</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-primary-foreground/84 md:text-2xl">
            الترخيص مو بس ورقة رسمية — هو اللي بيفتحلك باب التمويل، بيخلّي
            عملاءك يثقوا أكثر، وبيخلي قراراتك أوضح.
          </p>

          <div className="mt-8 flex flex-col items-start gap-3">
            <Button
              size="lg"
              className="h-14 w-full rounded-full px-8 text-lg sm:w-auto"
              onClick={() => onNavigate("find-path")}
            >
              ابدأ الاختبار
              <ArrowLeft className="ms-2 h-4 w-4" />
            </Button>
            <button
              type="button"
              onClick={() => onNavigate("benefits")}
              className="text-sm font-semibold text-primary-foreground/70 underline underline-offset-4 hover:text-primary-foreground/90"
            >
              أو اقرأ عن الفوائد أولاً
            </button>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {[
              { title: "آخر تحديث", value: LAST_UPDATED },
              {
                title: "بدون بيانات شخصية",
                value: "الاستبيان لا يطلب اسماً أو رقماً",
              },
              { title: "روابط مباشرة", value: "منصات حكومية تبدأ منها فوراً" },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-white/14 bg-white/8 p-4 backdrop-blur-md"
              >
                <p className="text-sm font-semibold text-primary-foreground/80">
                  {item.title}
                </p>
                <p className="mt-2 text-base font-bold text-white">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="overflow-hidden rounded-3xl border border-white/14 bg-[#f9f3ea] p-5 text-foreground shadow-2xl">
            <div className="rounded-3xl bg-[#efe7da] p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.7, ease: "easeOut" }}
              >
                <img
                  src="/images/hero-illustration.png"
                  alt="رسم توضيحي يرمز إلى ترتيب ملف ترخيص المشروع"
                  className="h-full w-full rounded-3xl"
                  width="520"
                  height="340"
                  loading="eager"
                />
              </motion.div>
            </div>

            <div className="mt-5 rounded-3xl bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold text-accent">الفكرة الأساسية</p>
              <p className="mt-2 text-lg font-bold leading-relaxed">
                كثير من التعطيل يبدأ من خلط بسيط: هل المطلوب تسجيل، أم ترخيص، أم
                الاثنان معاً؟
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
