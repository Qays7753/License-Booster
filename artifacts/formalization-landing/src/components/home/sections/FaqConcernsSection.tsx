import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionHeader } from "@/components/home/SectionHeader";

const concerns = [
  {
    q: "أخاف أن أدخل في التزامات لا أستطيع تحملها",
    a: "هذا خوف طبيعي. المطلوب ليس القفز إلى كل شيء دفعة واحدة، بل معرفة ما الذي ينطبق على حالتك فعلاً حتى تخطط على أساس واضح.",
  },
  {
    q: "أشعر أن الإجراءات كثيرة جداً وسأضيع بينها",
    a: "كثير من الناس يتوهون لأنهم يبدؤون من السؤال الخاطئ. إذا عرفت أولاً هل مشكلتك في التسجيل، أم في الترخيص، أم في الموقع، تختصر نصف الطريق.",
  },
  {
    q: "أخاف أن يخسر المشروع مرونته إذا أصبح منظماً",
    a: "قد تتغير بعض العفوية، لكن المقابل هو وضوح أكثر في التعامل مع العملاء والجهات والعقود، وهذا غالباً ما يوفر وقتاً لاحقاً لا العكس.",
  },
  {
    q: "أنا خارج عمّان وأفترض أن الخطوات أصعب",
    a: "التفاصيل قد تختلف، لكن الأهم أنك تراجع الجهة المحلية الصحيحة بدل ما تبني القرار على افتراضات أو على تجربة شخص في محافظة ثانية.",
  },
];

const faqs = [
  {
    q: "هل التسجيل وحده يكفي لبدء العمل؟",
    a: "ليس دائماً. في أنشطة كثيرة يبقى الترخيص ومتطلبات الموقع أو الموافقات القطاعية جزءاً أساسياً قبل التشغيل الكامل.",
  },
  {
    q: "ما الفرق العملي بين التسجيل والترخيص؟",
    a: "التسجيل يخص الكيان نفسه، أما الترخيص فيخص مزاولة النشاط في موقع محدد وضمن شروط محددة. لهذا كثير من الناس ينجزون الأولى ويظنون أن الملف اكتمل.",
  },
  {
    q: "هل المشروع المنزلي يمكن أن يسير في مسار نظامي؟",
    a: "في بعض الحالات نعم، لكن ليس كل نشاط يصلح للمنزل بالطريقة نفسها. نوع النشاط والموقع هما من يحددان ذلك.",
  },
  {
    q: "من أين أبدأ إذا كان لدي شركاء؟",
    a: "ابدأ بالشكل القانوني، لأن وجود الشركاء يغيّر طريقة الملكية والمسؤولية واتخاذ القرار من أول خطوة.",
  },
  {
    q: "هل الترخيص يضمن مبيعات أو ثقة أعلى فوراً؟",
    a: "لا. لكنه يجعل المشروع أكثر جاهزية للتعامل الجدي، ويزيل بعض العوائق التي تمنع العمل مع جهات وعملاء أكبر.",
  },
  {
    q: "هل يكفي أن أقرأ هذه المعلومات وأقرر؟",
    a: "هذه القراءة ترتب البداية، لكنها لا تغني عن فتح الرابط الرسمي المناسب أو مراجعة الجهة المختصة عند الحاجة.",
  },
];

export function FaqConcernsSection() {
  return (
    <section id="faq" className="bg-secondary py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="مخاوف وأسئلة"
          title="الأسئلة اللي بتأخرّك"
          description={
            <p>
              خلينا نجاوب على اللي بيقلقك قبل ما تاخد قرار، من التكاليف
              للإجراءات للمواقع.
            </p>
          }
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
            <div className="mb-5">
              <p className="text-sm font-semibold text-amber-700">مخاوف شائعة</p>
              <h3 className="text-2xl font-bold text-foreground">
                لماذا يتأخر القرار؟
              </h3>
            </div>

            <Accordion type="single" collapsible className="space-y-3">
              {concerns.map((item, index) => (
                <AccordionItem
                  key={item.q}
                  value={`concern-${index}`}
                  className="rounded-2xl border border-border px-5"
                >
                  <AccordionTrigger className="py-5 text-right text-lg font-bold text-foreground hover:text-primary hover:no-underline">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 text-base leading-relaxed text-muted-foreground">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
            <div className="mb-5">
              <p className="text-sm font-semibold text-primary">أسئلة عملية</p>
              <h3 className="text-2xl font-bold text-foreground">
                ماذا يلزم أن تعرف قبل أي خطوة؟
              </h3>
            </div>

            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((item, index) => (
                <AccordionItem
                  key={item.q}
                  value={`faq-${index}`}
                  className="rounded-2xl border border-border px-5"
                >
                  <AccordionTrigger className="py-5 text-right text-lg font-bold text-foreground hover:text-primary hover:no-underline">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 text-base leading-relaxed text-muted-foreground">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
        <p className="mx-auto mt-10 max-w-2xl text-center text-lg font-semibold leading-relaxed text-foreground/70">
          وبعدما يخف التردد، يبقى خلط واحد لازم ينفك بسرعة: ما الذي يبدأ
          بالتسجيل، وما الذي يكتمل بالترخيص.
        </p>
      </div>
    </section>
  );
}
