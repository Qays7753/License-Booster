import { ScenarioCarousel } from "@/components/home/ScenarioCarousel";
import { SectionHeader } from "@/components/home/SectionHeader";

export function ScenarioSection() {
  return (
    <section className="bg-background py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="قصص من الواقع"
          title="ثلاث قصص من السوق الأردني"
          description={
            <p>
              أحياناً توضح القصة القصيرة ما لا توضحه الفقرة العامة. هذه أمثلة
              تقرّب لك شكل الأسئلة التي تتكرر فعلاً على الأرض.
            </p>
          }
        />

        <div className="mt-12">
          <ScenarioCarousel />
        </div>
      </div>
    </section>
  );
}
