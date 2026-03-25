import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
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
          eyebrow="أنت لست وحدك"
          title="98% من المشاريع بالأردن صغيرة ومتناهية الصغر... وأنت جزء منهم"
          description={
            <p>
              السوق مش مليان شركات ضخمة بس، مليان ناس مثلك ابتدأت من مكان صغير
              وبنفس التساؤلات.
            </p>
          }
        />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {SOURCE_FACTS.map((fact) => (
            <article
              key={fact.title}
              className="rounded-3xl border border-border bg-card p-7 shadow-sm"
            >
              <div className="mb-6">
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

              <p className="text-base leading-relaxed text-muted-foreground">
                {fact.description}
              </p>
            </article>
          ))}
        </div>

        <p className="mx-auto mt-8 max-w-2xl text-center text-lg font-semibold leading-relaxed text-foreground/70">
          طيب، شو بيتغير فعلاً لما وضع مشروعك يصير أوضح؟
        </p>
      </div>
    </section>
  );
}
