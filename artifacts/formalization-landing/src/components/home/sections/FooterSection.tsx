import { ArrowLeft, ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  GOVERNMENT_PLATFORMS,
  LAST_UPDATED,
  RESEARCH_LINKS,
} from "@/components/home/content";

type FooterSectionProps = {
  onNavigate: (id: string) => void;
};

export function FooterSection({ onNavigate }: FooterSectionProps) {
  return (
    <footer
      id="footer"
      className="bg-primary py-20 text-primary-foreground md:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-sm font-semibold text-primary-foreground/80">
              قبل أن تغادر الصفحة
            </p>
            <h2 className="mt-3 text-3xl font-bold md:text-5xl">
              اجعل خطوتك القادمة أوضح
            </h2>
            <p className="mt-5 max-w-2xl text-justify-ar text-lg leading-relaxed text-primary-foreground/84">
              إذا لم تكن جاهزاً تبدأ اليوم، هذا عادي. المهم أن تكون الخطوة
              التالية مبنية على فهم أوضح، لا على تخمين أو ضغط.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                size="lg"
                className="h-14 rounded-full px-8"
                onClick={() => onNavigate("find-path")}
              >
                ابدأ من الاختبار
                <ArrowLeft className="ms-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-14 rounded-full border-white/18 bg-white/8 px-8 text-white hover:bg-white/12 hover:text-white"
                onClick={() => onNavigate("survey")}
              >
                شارك رأيك
              </Button>
            </div>
          </div>

          <div className="grid gap-5">
            <div className="rounded-3xl border border-white/12 bg-white/8 p-6">
              <p className="text-sm font-semibold text-primary-foreground/80">
                آخر تحديث
              </p>
              <p className="mt-2 text-xl font-bold">{LAST_UPDATED}</p>
              <p className="mt-3 text-sm leading-relaxed text-primary-foreground/82">
                يفضّل مراجعة التعليمات الرسمية مباشرة عند اتخاذ قرار فعلي، لأن
                المتطلبات الإجرائية قابلة للتغيير.
              </p>
            </div>

            <div className="rounded-3xl border border-white/12 bg-white/8 p-6">
              <p className="text-sm font-semibold text-primary-foreground/80">
                إخلاء مسؤولية
              </p>
              <p className="mt-3 text-justify-ar text-sm leading-loose text-primary-foreground/82">
                هذه الصفحة إرشادية وتعليمية. لا تقدّم استشارة قانونية، ولا تعد
                بنتائج تجارية أو تمويلية، ولا تغني عن مراجعة الجهة الرسمية
                المختصة بحسب نوع النشاط والموقع والشكل القانوني.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-6 border-t border-white/12 pt-10 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/12 bg-white/8 p-6">
            <p className="text-sm font-semibold text-primary-foreground/80">
              روابط الجهات الرسمية
            </p>
            <div className="mt-4 grid gap-3">
              {GOVERNMENT_PLATFORMS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-sm font-semibold text-white hover:bg-white/10"
                >
                  <span>{link.name}</span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/12 bg-white/8 p-6">
            <p className="text-sm font-semibold text-primary-foreground/80">
              المراجع المستخدمة
            </p>
            <div className="mt-4 grid gap-3">
              {RESEARCH_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-sm font-semibold text-white hover:bg-white/10"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
