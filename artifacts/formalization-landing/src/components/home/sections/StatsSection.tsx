import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { ExternalLink } from "lucide-react";

import { SectionHeader } from "@/components/home/SectionHeader";
import { SOURCE_FACTS } from "@/components/home/content";

function Counter({
  from,
  to,
  duration = 1.8,
  suffix = "",
  decimals = 0,
}: {
  from: number;
  to: number;
  duration?: number;
  suffix?: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(from);

  useEffect(() => {
    if (!inView) return;

    let startTime: number;
    let animationFrame = 0;

    const updateCounter = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

      setCount(from + (to - from) * eased);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(updateCounter);
      }
    };

    animationFrame = requestAnimationFrame(updateCounter);
    return () => cancelAnimationFrame(animationFrame);
  }, [duration, from, inView, to]);

  const formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span ref={ref} className="tabular-nums" dir="ltr">
      {formatter.format(count)}
      {suffix}
    </span>
  );
}

export function StatsSection() {
  return (
    <section className="bg-background py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="الصورة قبل التفاصيل"
          title="قطاع ضخم، وخطوة ناقصة"
          description={
            <p>
              هذه المؤشرات لا تحسم قرارك، لكنها تضعه في سياق أوضح: أنت تتعامل مع
              سوق كبير، ومشاريع كثيرة ما تزال تبحث عن مسار أكثر ترتيباً.
            </p>
          }
        />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {SOURCE_FACTS.map((fact) => (
            <article
              key={fact.title}
              className="rounded-3xl border border-border bg-card p-7 shadow-sm"
            >
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <div className="text-5xl font-extrabold text-primary">
                    <Counter
                      from={0}
                      to={fact.value}
                      suffix={fact.suffix}
                      decimals={fact.decimals}
                    />
                  </div>
                  <p className="mt-3 text-xl font-bold text-foreground">
                    {fact.title}
                  </p>
                </div>
                <span className="rounded-full bg-secondary px-3 py-1 text-xs font-bold text-muted-foreground">
                  {fact.year}
                </span>
              </div>

              <p className="text-base leading-relaxed text-muted-foreground">
                {fact.description}
              </p>

              <a
                href={fact.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent/80"
              >
                {fact.sourceLabel}
                <ExternalLink className="h-4 w-4" />
              </a>
            </article>
          ))}
        </div>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          المؤشرات مبنية على مراجع منشورة في تاريخها. الأرقام قد تختلف في تقارير
          أحدث.
        </p>
      </div>
    </section>
  );
}
