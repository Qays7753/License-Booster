import { Banknote, Globe, Info, ShieldCheck } from "lucide-react";

import { SectionConnector } from "@/components/home/SectionConnector";
import { SectionHeader } from "@/components/home/SectionHeader";

const tradeoffs = [
  {
    Icon: Globe,
    title: "سوق أضيق",
    description:
      "التأجيل لا يوقف المشروع، لكنه قد يبقيه داخل دائرة أضيق من العملاء والفرص.",
    example:
      "مثال: عميل مؤسسي جاهز يطلب عقداً وفاتورة، فيتوجه إلى جهة أخرى لأن ملفك غير واضح.",
  },
  {
    Icon: ShieldCheck,
    title: "حقوق أقل وضوحاً",
    description:
      "كلما بقي الملف مرتبكاً، بقيت العقود والحقوق والصفة القانونية أقل وضوحاً عند الحاجة.",
    example:
      "مثال: مورد يختلف معك على دفعة أو تسليم، وتكتشف أن كل الاتفاق مبني على رسائل متفرقة فقط.",
  },
  {
    Icon: Banknote,
    title: "فرص تمويل أصعب",
    description:
      "التمويل ليس مضموناً أصلاً، لكن بقاء المشروع غير منظم يجعل التقديم عليه أصعب عادة.",
    example:
      "مثال: بنك لا يستطيع فتح ملف تمويل لنشاط بلا سجل، والبرنامج ينتهي قبل أن تجهز البداية.",
  },
  {
    Icon: Info,
    title: "قرارات توسع مؤجلة",
    description:
      "فتح موقع جديد أو التعامل مع جهة أكبر يصبح أبطأ عندما تكون الأساسيات غير مكتملة.",
    example:
      "مثال: فرصة معرض أو توريد تمر، لأنك ما زلت تحاول تعرف من أي جهة تبدأ أصلاً.",
  },
] as const;

type DelayTradeoffsSectionProps = {
  onNavigate: (id: string) => void;
};

export function DelayTradeoffsSection({ onNavigate }: DelayTradeoffsSectionProps) {
  return (
    <section className="bg-secondary py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="أثر التأجيل"
          title="الفرص التي لا تنتظرك"
          description={
            <p>
              ليس المقصود التخويف، بل تذكيرك أن التأجيل المستمر له كلفة فرصة
              حقيقية، حتى لو لم تظهر فوراً.
            </p>
          }
        />

        <div className="-mx-4 mt-12 overflow-x-auto px-4">
          <div className="flex min-w-max gap-4 lg:grid lg:min-w-0 lg:grid-cols-4 lg:gap-0">
            {tradeoffs.map((item, index) => (
              <article
                key={item.title}
                className={`w-[18rem] shrink-0 rounded-3xl border border-border bg-card p-6 shadow-sm lg:w-auto lg:rounded-none lg:border-y-0 lg:border-l-0 lg:border-r lg:last:border-r-0 ${
                  index === 0 ? "lg:rounded-r-3xl" : ""
                } ${index === tradeoffs.length - 1 ? "lg:rounded-l-3xl" : ""}`}
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-700">
                  <item.Icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-foreground/82">
                  {item.example}
                </p>
              </article>
            ))}
          </div>
        </div>

        <SectionConnector
          text="إذا أصبح أثر التأجيل أوضح، فلتكن الخطوة التالية عملية ومباشرة."
          buttonLabel="استعرض الطريق العملي"
          targetId="what-changes"
          onNavigate={onNavigate}
        />
      </div>
    </section>
  );
}
