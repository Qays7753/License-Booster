import { PathQuiz } from "@/components/home/PathQuiz";
import { SectionHeader } from "@/components/home/SectionHeader";

type QuizSectionProps = {
  onNavigate: (id: string) => void;
};

export function QuizSection({ onNavigate }: QuizSectionProps) {
  return (
    <section id="find-path" className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="٤ أسئلة فقط"
          title="٤ أسئلة بتدلك على مسارك"
          description={
            <p>
              ما تضيّع وقتك بالبحث العشوائي. جاوب عالأسئلة وبندلّك على خطوتك
              الأولى والجهة اللي لازم تقصدها.
            </p>
          }
        />

        <div className="mt-12">
          <PathQuiz onNavigate={onNavigate} />
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-center text-lg font-semibold leading-relaxed text-foreground/70">
          بعدما صار مسارك أقرب، طبيعي يبقى عندك تردد عملي قبل أن تتحرك.
        </p>
      </div>
    </section>
  );
}
