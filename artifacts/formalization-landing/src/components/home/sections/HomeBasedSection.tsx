import { CheckCircle2 } from "lucide-react";

import { SectionHeader } from "@/components/home/SectionHeader";

const points = [
  "هل يسمح نوع النشاط فعلاً بالعمل من المنزل؟",
  "هل توجد اشتراطات مرتبطة بالموقع أو الجيران أو السلامة؟",
  "متى يصبح الانتقال من البيت إلى موقع آخر خطوة ضرورية؟",
];

export function HomeBasedSection() {
  return (
    <section id="home-based" className="bg-[#fcf6ef] py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-8">
        <div className="rounded-3xl border border-accent/18 bg-white p-6 shadow-lg">
          <img
            src="/images/home-based.png"
            alt="رسم توضيحي يمثل العمل من المنزل"
            className="w-full rounded-2xl"
            width="480"
            height="480"
            loading="lazy"
          />
          <h3 className="mt-5 text-3xl font-bold text-foreground">
            مشروعك من البيت؟ إله ترخيص
          </h3>
          <p className="mt-4 text-justify-ar text-lg leading-relaxed text-muted-foreground">
            شغلك من البيت ما بيمنعك تكون رسمي. في رخص مخصصة للمهن المنزلية
            بتحميك وبتخليك تشتغل براحتك.
          </p>

          <div className="mt-6 space-y-3">
            {points.map((point) => (
              <div
                key={point}
                className="flex items-start gap-3 rounded-2xl bg-secondary/55 p-4"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <p className="text-base leading-relaxed text-foreground/80">
                  {point}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <SectionHeader
            align="start"
            eyebrow="المشروع المنزلي"
            title="إذا شغلك من البيت، اعرف ما يلزمك قبل أن تبدأ"
            description={
              <p>
                إذا كان مشروعك من المنزل، فالسؤال الأول ليس من يديره بل أين
                يُدار، وهل يسمح النشاط بالموقع الحالي. وفي حالات كثيرة تواجه بعض
                النساء قيوداً إضافية في الوقت والحركة والالتزامات اليومية، وهذا
                يجعل وضوح الخطوات أهم لا أكثر تعقيداً.
              </p>
            }
          />

          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
            <p className="text-sm font-semibold text-primary">
              إذا كنتِ تديرين مشروعاً من المنزل
            </p>
            <p className="mt-3 text-justify-ar text-base leading-relaxed text-muted-foreground">
              الترخيص لا ينبغي أن يُعرض عليكِ كعبء إضافي، بل كطريقة تحمي الجهد
              وتعطي المشروع مساراً أوضح يمكن التعامل معه خطوة بخطوة.
            </p>
          </div>

          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
            <p className="text-sm font-semibold text-accent">الخلاصة</p>
            <p className="mt-3 text-justify-ar text-base leading-relaxed text-muted-foreground">
              المشروع المنزلي يحتاج أسئلة عملية أكثر من أي شيء آخر: هل النشاط
              مناسب؟ ما اشتراطات الموقع؟ ومتى يصبح التوسع خارج البيت قراراً
              منطقياً؟
            </p>
          </div>
          <p className="mt-10 text-center text-lg font-semibold leading-relaxed text-foreground/70">
            ناس مثلك بدأوا من نفس المكان — شوف كيف مشت أمورهم.
          </p>
        </div>
      </div>
    </section>
  );
}
