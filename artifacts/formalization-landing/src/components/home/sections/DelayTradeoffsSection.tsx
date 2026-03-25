import { Banknote, Globe, Info, ShieldCheck } from "lucide-react";

import { SectionHeader } from "@/components/home/SectionHeader";

const tradeoffs = [
  {
    Icon: Globe,
    title: "سوق أضيق",
    description:
      "التأجيل لا يوقف المشروع، لكنه قد يبقيه داخل دائرة أضيق من العملاء والفرص.",
    example:
      "مثال: شركة عقارات أعجبها عملك وطلبت عرض سعر رسمي — لما اكتشفوا إنك ما عندك سجل تجاري، تواصلوا مع منافس لديه كيان واضح وأكملوا معه الصفقة.",
  },
  {
    Icon: ShieldCheck,
    title: "حقوق أقل وضوحاً",
    description:
      "كلما بقي المشروع بدون ترخيص، بقيت العقود والحقوق والصفة القانونية أقل وضوحاً عند الحاجة.",
    example:
      "مثال: مورد تأخر بالتسليم ورفض التعويض — كل الاتفاق كان على رسائل واتساب بدون عقد رسمي، فما كان عندك ورقة تثبت فيها حقك أمام أي جهة.",
  },
  {
    Icon: Banknote,
    title: "فرص تمويل أصعب",
    description:
      "التمويل ليس مضموناً أصلاً، لكن بقاء المشروع غير منظم يجعل التقديم عليه أصعب عادة.",
    example:
      "مثال: برنامج دعم حكومي للمشاريع الصغيرة فتح باب التقديم لمدة أسبوعين — لما حاولت تتقدم اكتشفت إن أول شرط هو سجل تجاري ساري، وأُغلق الباب قبل ما تجهز الأوراق.",
  },
  {
    Icon: Info,
    title: "قرارات توسع مؤجلة",
    description:
      "فتح موقع جديد أو التعامل مع جهة أكبر يصبح أبطأ عندما تكون الأساسيات غير مكتملة.",
    example:
      "مثال: جهة محلية نظّمت معرضاً تجارياً وطلبت من المشاركين كيان قانوني وفاتورة رسمية — فاتت الفرصة لأن الوقت لم يكن كافياً لاستكمال التسجيل قبل الموعد.",
  },
] as const;

export function DelayTradeoffsSection() {
  return (
    <section className="bg-secondary py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="كلفة الانتظار"
          title="كل يوم تأخير إله ثمن"
          description={
            <p>
              مش بالضرورة ثمن كبير — بس فرص بتضيع وأسئلة بتزيد.
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

        <p className="mx-auto mt-10 max-w-2xl text-center text-lg font-semibold leading-relaxed text-foreground/70">
          صار الوقت تعرف الخطوات — وهي أبسط مما تتوقع.
        </p>
      </div>
    </section>
  );
}
