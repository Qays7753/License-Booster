import { SurveySection as SurveyFormSection } from "@/components/home/SurveySection";
import { SectionHeader } from "@/components/home/SectionHeader";

type SurveySectionBlockProps = {
  onNavigate: (id: string) => void;
};

export function SurveySectionBlock({ onNavigate }: SurveySectionBlockProps) {
  return (
    <section
      id="survey"
      className="bg-[linear-gradient(180deg,#f7f4ee_0%,#eef4f4_100%)] py-20 md:py-28"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="استبيان قصير"
          title="ساعدنا نفهم إذا الصفحة وضّحت الصورة"
          description={
            <p>
              6 أسئلة خفيفة بدون بيانات شخصية — نستخدمها لتحسين المحتوى ومعرفة
              إذا المعلومات توصل بالشكل الصحيح.
            </p>
          }
        />

        <div className="mt-12">
          <SurveyFormSection onNavigate={onNavigate} />
        </div>
      </div>
    </section>
  );
}
