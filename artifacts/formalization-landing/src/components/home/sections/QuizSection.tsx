import { PathQuiz } from "@/components/home/PathQuiz";
import { SectionConnector } from "@/components/home/SectionConnector";
import { SectionHeader } from "@/components/home/SectionHeader";

type QuizSectionProps = {
  onNavigate: (id: string) => void;
};

export function QuizSection({ onNavigate }: QuizSectionProps) {
  return (
    <section id="find-path" className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="اختبار تشخيصي"
          title="أربع أسئلة تكشف أين أنت"
          description={
            <p>
              أجب حسب وضعك الحالي، وخذ خريطة طريق أولية تساعدك على معرفة الخطوة
              التالية من دون تعقيد إضافي.
            </p>
          }
        />

        <div className="mt-12">
          <PathQuiz onNavigate={onNavigate} />
        </div>

        <SectionConnector
          text="إذا اتضح لك مسارك، صار الوقت تفكّ الاشتباك بين التسجيل والترخيص."
          buttonLabel="افهم الفرق الآن"
          targetId="reg-vs-license"
          onNavigate={onNavigate}
        />
      </div>
    </section>
  );
}
