import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

const scenarios = [
  {
    title: "مطبخ منزلي في الزرقاء",
    label: "أغذية منزلية",
    summary:
      "أم خالد بدأت تبيع معجنات من البيت وصارت تُطلب منها فاتورة رسمية. اكتشفت إن المطبخ المنزلي له مسار ترخيص خاص — بعد ما رخّصت، صارت تتعامل مع عملاء أكبر وقدرت تتوسع بشكل قانوني.",
  },
  {
    title: "خدمة تصميم رقمي في عمّان",
    label: "خدمات رقمية",
    summary:
      "مصمم ضاعت منه صفقة مع شركة لأنهم بعد اختياره طلبوا أوراقه الرسمية لاستكمال الإجراءات. بعد التسجيل، صار يتعامل مع عدة شركات والعلاقة أصبحت دائمة وواضحة.",
  },
  {
    title: "ورشة خياطة في إربد",
    label: "حرفة يدوية",
    summary:
      "صاحبة ورشة خياطة كانت تشتغل بدون رخصة مهن. حصلت على فرصة تمويل طلبوا منها إثبات الترخيص — بعد الترخيص قدرت تشتري المعدات التي تحتاجها وزادت حصتها السوقية.",
  },
];

export function ScenarioCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  const goNext = () =>
    setActiveIndex((current) => (current + 1) % scenarios.length);

  const goPrev = () =>
    setActiveIndex((current) =>
      current === 0 ? scenarios.length - 1 : current - 1,
    );

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-border bg-card p-5 text-sm leading-relaxed text-muted-foreground md:p-6">
        أمثلة توضيحية مبنية على أنماط شائعة في السوق، وليست تجارب شخصية محددة.
      </div>

      <div className="grid gap-6 md:hidden">
        <article
          key={activeIndex}
          className="rounded-3xl border border-border bg-card p-7 shadow-sm"
        >
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-accent">
                {scenarios[activeIndex].label}
              </p>
              <h3 className="text-2xl font-bold text-foreground">
                {scenarios[activeIndex].title}
              </h3>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/8 text-primary">
              <Quote className="h-6 w-6" />
            </div>
          </div>

          <p className="text-justify-ar text-base leading-relaxed text-muted-foreground">
            {scenarios[activeIndex].summary}
          </p>
        </article>

        <div className="flex items-center justify-between gap-3">
          <Button
            type="button"
            variant="outline"
            className="h-11 flex-1 rounded-full"
            onClick={goPrev}
          >
            <ArrowRight className="ms-2 h-4 w-4" />
            السابق
          </Button>
          <div className="flex items-center gap-2">
            {scenarios.map((scenario, index) => (
              <button
                key={scenario.title}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`انتقل إلى ${scenario.title}`}
                className={`h-2.5 rounded-full transition-all ${
                  index === activeIndex
                    ? "w-8 bg-accent"
                    : "w-2.5 bg-border hover:bg-primary/35"
                }`}
              />
            ))}
          </div>
          <Button
            type="button"
            variant="outline"
            className="h-11 flex-1 rounded-full"
            onClick={goNext}
          >
            التالي
            <ArrowLeft className="me-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="hidden gap-6 md:grid md:grid-cols-3">
        {scenarios.map((scenario) => (
          <article
            key={scenario.title}
            className="rounded-3xl border border-border bg-card p-7 shadow-sm"
          >
            <div className="mb-5 flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-accent">
                  {scenario.label}
                </p>
                <h3 className="text-2xl font-bold text-foreground">
                  {scenario.title}
                </h3>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/8 text-primary">
                <Quote className="h-6 w-6" />
              </div>
            </div>

            <p className="text-justify-ar text-base leading-relaxed text-muted-foreground">
              {scenario.summary}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
