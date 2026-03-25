import { ScenarioCarousel } from "@/components/home/ScenarioCarousel";
import { SectionHeader } from "@/components/home/SectionHeader";

export function ScenarioSection() {
  return (
    <section className="bg-background py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="قصص من الواقع"
          title="قصص قريبة من السوق الأردني"
          description={
            <p>
              مطبخ منزلي، مصمم، وورشة خياطة. هيك بدأوا، وهيك الترخيص فرّق
              بشغلهم ونقلهم لمرحلة ثانية.
            </p>
          }
        />

        <div className="mt-12">
          <ScenarioCarousel />
        </div>
        <p className="mx-auto mt-10 max-w-2xl text-center text-lg font-semibold leading-relaxed text-foreground/70">
          وكل يوم تأخير إله ثمن — مش بالضرورة كبير، بس حقيقي.
        </p>
      </div>
    </section>
  );
}
