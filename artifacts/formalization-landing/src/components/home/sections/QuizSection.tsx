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
          eyebrow="اكتشف وضعك"
          title="أربع أسئلة تكشف أين أنت"
          description={
            <p>
              جاوب بصدق عن وضعك الحالي — مش عن اللي تتمنى يكون عليه.
            </p>
          }
        />

        <div className="mt-12">
          <PathQuiz onNavigate={onNavigate} />
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-center text-lg font-semibold leading-relaxed text-foreground/70">
          وأنت عارف وين واقف، خلينا نفك أي تردد عندك قبل ما تبدأ.
        </p>
      </div>
    </section>
  );
}
