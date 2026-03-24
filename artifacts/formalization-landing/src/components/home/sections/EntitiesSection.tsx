import { ArrowUpRight, BookOpenText, Building2, Layers3, MapPinned, Search } from "lucide-react";

import { GOVERNMENT_PLATFORMS } from "@/components/home/content";
import { SectionConnector } from "@/components/home/SectionConnector";
import { SectionHeader } from "@/components/home/SectionHeader";

const typeStyles = {
  معلوماتي: {
    card: "border-amber-200 bg-amber-50/70",
    icon: "bg-amber-100 text-amber-700",
    badge: "bg-amber-100 text-amber-800",
  },
  تنفيذي: {
    card: "border-primary/14 bg-card",
    icon: "bg-primary/8 text-primary",
    badge: "bg-primary/10 text-primary",
  },
};

const platformIcons = [BookOpenText, Building2, MapPinned, Search, Layers3];

type EntitiesSectionProps = {
  onNavigate: (id: string) => void;
};

export function EntitiesSection({ onNavigate }: EntitiesSectionProps) {
  return (
    <section id="entities" className="bg-secondary py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="منصات حكومية"
          title="منصات تبدأ منها مباشرة"
          description={
            <p>
              هذه المنصات الرسمية التي يمكنك البدء منها مباشرة. كل رابط ينقلك
              إلى الموقع الحكومي الرسمي.
            </p>
          }
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
          {GOVERNMENT_PLATFORMS.map((platform, index) => {
            const Icon = platformIcons[index % platformIcons.length];
            const style = typeStyles[platform.type];

            return (
              <article
                key={platform.name}
                className={`rounded-3xl border p-6 shadow-sm ${style.card}`}
              >
                <div className="mb-5 flex items-start justify-between gap-3">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${style.icon}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-bold ${style.badge}`}>
                    {platform.typeLabel}
                  </span>
                </div>

                <p className="text-sm font-semibold text-muted-foreground">
                  {platform.entity}
                </p>
                <h3 className="mt-2 text-xl font-bold text-foreground">
                  {platform.name}
                </h3>
                <p className="mt-3 text-justify-ar text-base leading-relaxed text-muted-foreground">
                  {platform.description}
                </p>
                <p className="mt-4 rounded-2xl bg-background/80 p-4 text-justify-ar text-sm leading-relaxed text-foreground/80">
                  {platform.useCase}
                </p>

                <a
                  href={platform.href}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/92"
                >
                  افتح المنصة
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </article>
            );
          })}
        </div>

        <div className="mt-8 rounded-3xl border border-primary/14 bg-primary/6 p-5 text-base leading-relaxed text-muted-foreground">
          الروابط تنقلك إلى المنصة الرسمية مباشرة. إذا كانت حالتك فيها تفاصيل
          خاصة، راجع الجهة المختصة.
        </div>

        <SectionConnector
          text="إذا أصبحت الصورة أوضح، فأعطنا دقيقة لنعرف هل أفادتك الصفحة فعلاً."
          buttonLabel="شارك في الاستبيان"
          targetId="survey"
          onNavigate={onNavigate}
        />
      </div>
    </section>
  );
}
