import { useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ArrowLeft } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

export default function Home() {
  // Enforce RTL direction for the page
  useEffect(() => {
    document.documentElement.dir = "rtl";
    document.documentElement.lang = "ar";
  }, []);

  const fadeUpVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative relative pt-20 pb-32 md:pt-32 md:pb-48 overflow-hidden gradient-primary text-primary-foreground">
        {/* Background Overlay */}
        <div className="absolute inset-0 z-0 opacity-20 mix-blend-overlay">
          <img
            src={`${import.meta.env.BASE_URL}images/hero-bg.png`}
            alt="Hero Background"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="space-y-8"
          >
            <motion.h1 
              variants={fadeUpVariant}
              className="text-4xl md:text-5xl lg:text-7xl font-extrabold leading-tight md:leading-[1.2] text-balance"
            >
              مشروعك يستحق أن يكون واضحاً ومحميّاً وقابلاً للنمو
            </motion.h1>
            
            <motion.p 
              variants={fadeUpVariant}
              className="text-lg md:text-2xl font-sans text-primary-foreground/90 max-w-3xl mx-auto leading-relaxed"
            >
              التسجيل والترخيص ليسا عبئاً إضافياً فقط. إنهما خطوة تنظّم شغلك وتفتح لك فرصاً أوسع.
            </motion.p>
            
            <motion.p 
              variants={fadeUpVariant}
              className="text-base md:text-xl font-medium text-accent opacity-90 max-w-2xl mx-auto"
            >
              صحيح أنك تبيع اليوم، لكن التنظيم هو ما يساعدك على البيع الأكبر لاحقاً.
            </motion.p>

            <motion.div 
              variants={fadeUpVariant}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8"
            >
              <Button 
                size="lg" 
                className="w-full sm:w-auto text-lg h-14 px-8 rounded-xl bg-accent hover:bg-accent/90 text-white shadow-[0_0_20px_rgba(230,126,34,0.4)] transition-all hover:-translate-y-1"
                onClick={() => scrollToSection('what-changes')}
              >
                اعرف المسار المناسب لمشروعك
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="w-full sm:w-auto text-lg h-14 px-8 rounded-xl border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 transition-all bg-transparent"
                onClick={() => scrollToSection('reg-vs-license')}
              >
                افهم الفرق بين التسجيل والترخيص
              </Button>
              <Button 
                size="lg" 
                variant="ghost" 
                className="w-full sm:w-auto text-lg h-14 px-8 rounded-xl text-white/80 hover:text-white hover:bg-white/5 transition-all"
                onClick={() => scrollToSection('cta')}
              >
                ابدأ بخطوة واضحة
              </Button>
            </motion.div>

            <motion.div variants={fadeUpVariant} className="pt-8">
              <p className="text-sm md:text-base text-primary-foreground/60 max-w-2xl mx-auto bg-black/10 p-4 rounded-lg backdrop-blur-sm">
                هذه الصفحة إرشادية. التفاصيل الدقيقة تختلف بحسب النشاط، والموقع، والشكل القانوني، ووجود عمّال أو شركاء.
              </p>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Bottom Curve */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="block w-full h-[60px] md:h-[100px]" style={{ transform: 'rotate(180deg)' }}>
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="hsl(var(--secondary))"></path>
          </svg>
        </div>
      </section>

      {/* 2. BENEFITS SECTION */}
      <section className="py-20 md:py-32 bg-secondary" id="benefits">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariant}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">ماذا يكسب مشروعك عندما يصبح منظماً؟</h2>
            <div className="h-1.5 w-24 bg-accent mx-auto rounded-full"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: "🏢",
                title: "اعتراف رسمي يجعل مشروعك أوضح",
                desc: "عندما يصبح مشروعك مسجلاً، يصبح له حضور رسمي أوضح، وتصبح الملكية والإدارة والمسؤوليات معرّفة بشكل أفضل."
              },
              {
                icon: "🌐",
                title: "وصول أوسع إلى السوق والعملاء",
                desc: "التنظيم يساعد مشروعك على الوصول إلى الأسواق والعملاء بشكل أوسع، ويبعده عن البقاء داخل دائرة ضيقة من التعاملات المحدودة."
              },
              {
                icon: "💰",
                title: "قدرة أفضل على الوصول للتمويل",
                desc: "التسجيل يجعل المشروع أقرب إلى الخدمات المالية والتمويلية، ويعزز الشمول المالي وفرص الحصول على دعم."
              },
              {
                icon: "⚖️",
                title: "تنظيم أوضح للقرارات والحقوق",
                desc: "يوضح طريقة التملك والإدارة، وآلية اتخاذ القرار، ونطاق المسؤولية القانونية والضريبية."
              },
              {
                icon: "📈",
                title: "تحسين الإنتاجية وظروف العمل",
                desc: "التنظيم يحسّن الإنتاجية وظروف العمل، ويدخل العاملين ضمن مظلة أكثر حماية وأماناً واستقراراً."
              },
              {
                icon: "🛡️",
                title: "حماية أكبر من كلفة البقاء غير الرسمي",
                desc: "عدم التسجيل ليس وضعاً محايداً. هو قد يعني غياب الحماية القانونية وضعف الوصول إلى الخدمات في وقت الحاجة."
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card rounded-2xl p-8 shadow-sm border border-border/50 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group"
              >
                <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-300 origin-bottom-right">{benefit.icon}</div>
                <h3 className="text-xl md:text-2xl font-bold text-foreground mb-4 leading-snug">{benefit.title}</h3>
                <p className="text-muted-foreground text-base md:text-lg leading-relaxed">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. CONCERNS SECTION */}
      <section className="py-20 md:py-32 bg-background relative" id="concerns">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpVariant}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">نسمع مخاوفك ونجيب عليها</h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              لسنا هنا لتخويفك، بل لمساعدتك على فهم الطريق بوضوح وتقليل مساحة المجهول.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="bg-card rounded-3xl shadow-lg border border-border overflow-hidden"
          >
            <Accordion type="single" collapsible className="w-full">
              {[
                {
                  q: "أنا أبيع الآن، فلماذا أغيّر شيئاً؟",
                  a: "صحيح أنك قد تبيع اليوم بدون تسجيل، لكن هذا يبقي مشروعك داخل سقف منخفض. التنظيم لا يغيّر اسمك فقط؛ بل يفتح لك فرص بيع أوسع، ويقربك من تعاملات أكبر."
                },
                {
                  q: "البداية مكلفة وأنا بالكاد ألحق",
                  a: "نعم، الرسوم والتكاليف والإجراءات قد تكون عبئاً حقيقياً. لكن التأجيل له كلفة أيضاً: صفقات لا تدخلها، وتمويل أصعب، وسوق أضيق. الفكرة أن ترى الصورة كاملة قبل أن تؤجل قرارك."
                },
                {
                  q: "أخاف أن أدخل في التزامات كثيرة",
                  a: "الفرق بين القلق والاطمئنان هو الوضوح. التنظيم لا يعني أن كل المشاريع تتحمل الالتزامات نفسها، بل يعني أن تعرف ما الذي ينطبق على حالتك أنت تحديداً لتتمكن من التخطيط براحة."
                },
                {
                  q: "أنا لا أفهم الفرق بين التسجيل والترخيص",
                  a: "هذا التباس شائع وأنت لست وحدك فيه. التسجيل خطوة مهمة لكنه لا يكفي وحده دائماً. بعض الأنشطة تحتاج أيضاً إلى رخصة مهن أو موافقات إضافية، وسنوضح ذلك في القسم التالي."
                },
                {
                  q: "الإجراءات طويلة والوقت ليس في صالحي",
                  a: "وقتك رأس مالك فعلاً. ما نعرفه أن التعقيد وكثرة الجهات من أسباب العزوف، لذلك تهدف هذه الصفحة إلى اختصار الالتباس، لا زيادته، لتبدأ من النقطة الصحيحة."
                }
              ].map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-b last:border-0 px-6 py-2">
                  <AccordionTrigger className="text-lg md:text-xl font-bold text-foreground text-right hover:text-primary hover:no-underline [&[data-state=open]]:text-primary py-6">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-base md:text-lg text-muted-foreground leading-relaxed pb-6 pe-4">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* 4. REGISTRATION vs LICENSE SECTION */}
      <section className="py-20 md:py-32 bg-primary text-primary-foreground relative" id="reg-vs-license">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpVariant}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">ما الفرق بين التسجيل والترخيص؟</h2>
            <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto">
              هذه من أهم الرسائل التي يجب أن تتذكرها: التسجيل بداية، والترخيص استكمال ضروري لبعض الأنشطة.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 mb-12">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/20"
            >
              <div className="text-6xl mb-6">📋</div>
              <h3 className="text-3xl font-bold mb-4">التسجيل</h3>
              <p className="text-lg md:text-xl leading-relaxed text-primary-foreground/90">
                خطوة قانونية تمنح مشروعك هوية رسمية. تحدد الشكل القانوني، والملكية، والمسؤوليات. <br/><br/>
                <span className="font-bold text-accent">هي البداية، لكنها ليست النهاية.</span>
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/20"
            >
              <div className="text-6xl mb-6">📜</div>
              <h3 className="text-3xl font-bold mb-4">الترخيص</h3>
              <p className="text-lg md:text-xl leading-relaxed text-primary-foreground/90">
                إذن العمل المطلوب لبعض الأنشطة من الجهات المختصة. قد يشمل رخصة مهن، أو موافقات إضافية.<br/><br/>
                <span className="font-bold text-accent">يُطلب بحسب نوع النشاط والموقع.</span>
              </p>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-accent/20 border-2 border-accent text-white p-6 md:p-8 rounded-2xl flex flex-col md:flex-row items-start md:items-center gap-6"
          >
            <div className="bg-accent text-white rounded-full w-12 h-12 flex items-center justify-center shrink-0">
              <span className="text-2xl font-bold">!</span>
            </div>
            <p className="text-lg md:text-xl font-medium leading-relaxed">
              قد يصدق بعض أصحاب المشاريع أن التسجيل وحده يكفي — لكن بعض الأنشطة تحتاج إلى استكمالات قانونية إضافية. <span className="font-bold border-b-2 border-white/40 pb-1">لا تتوقف عند أول خطوة وتظن أن الملف اكتمل.</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* 5. HOME-BASED BUSINESS SECTION */}
      <section className="py-20 md:py-32 bg-[#FDF8F5]" id="home-based">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="w-full md:w-1/3 flex justify-center"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-accent/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="text-[120px] md:text-[180px] relative z-10 drop-shadow-2xl">🏠</div>
              </div>
            </motion.div>
            
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="w-full md:w-2/3 space-y-6"
            >
              <motion.h2 variants={fadeUpVariant} className="text-3xl md:text-5xl font-bold text-foreground leading-tight">
                بدأت من البيت؟<br/>هذا لا يجعل مشروعك أقل جدية
              </motion.h2>
              
              <motion.p variants={fadeUpVariant} className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                الأعمال المنزلية لها مزايا حقيقية: انخفاض الكلفة والمرونة وإمكانية اختبار الفكرة. لكن هذه المزايا لا تلغي الحاجة إلى فهم المسار الصحيح لتطويرها.
              </motion.p>
              
              <motion.div variants={fadeUpVariant} className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
                {["هل نشاطك يدخل ضمن الرخصة المنزلية؟", "ما الشروط المطلوبة تحديداً؟", "ما الذي يجب استكماله قبل التوسع؟"].map((q, i) => (
                  <div key={i} className="bg-white p-5 rounded-2xl shadow-sm border border-accent/20 text-center flex items-center justify-center">
                    <span className="font-bold text-foreground text-lg">{q}</span>
                  </div>
                ))}
              </motion.div>
              
              <motion.div variants={fadeUpVariant} className="mt-8 p-5 bg-accent/10 border-r-4 border-accent rounded-l-xl">
                <p className="text-lg font-medium text-foreground">
                  مشروعك ليس أقل قيمة لأنه بدأ من البيت. المهم أن تعرف المسار الذي يناسبه حتى يتحرك بأمان ويكبر بدون تعطيل.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 6. WHAT CHANGES SECTION */}
      <section className="py-20 md:py-32 bg-background" id="what-changes">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpVariant}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">ماذا يتغير عملياً بعد التنظيم؟</h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              التنظيم لا يعني متاهة مجهولة، لكنه أيضاً ليس خطوة واحدة للجميع.
            </p>
          </motion.div>

          <div className="space-y-6 md:space-y-8 relative before:absolute before:inset-0 before:ml-[50%] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-1 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
            {[
              {
                title: "اختيار الشكل القانوني",
                desc: "ينتقل مشروعك إلى شكل قانوني أوضح يناسب نشاطك وحجمه (مثل مؤسسة فردية أو شركة ذات مسؤولية محدودة)."
              },
              {
                title: "استكمال الرخصة",
                desc: "تستكمل الرخصة أو الموافقات المطلوبة بحسب نشاطك وموقعك لضمان عملك ضمن الإطار القانوني السليم."
              },
              {
                title: "الالتزامات المناسبة لك",
                desc: "تبدأ الالتزامات التي تنطبق على حالتك: مثل الرقم الضريبي، أو شمول العمال بالضمان الاجتماعي إذا وجدوا."
              }
            ].map((step, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="relative flex items-center justify-between md:justify-normal md:even:flex-row-reverse group"
              >
                {/* Number Circle */}
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-background border-4 border-accent text-accent font-display font-bold text-2xl z-10 shrink-0 mx-auto absolute left-4 md:left-1/2 md:-translate-x-1/2 shadow-lg group-hover:scale-110 transition-transform">
                  {index + 1}
                </div>
                
                {/* Content Card */}
                <div className="w-[calc(100%-5rem)] md:w-[calc(50%-3rem)] ms-auto md:ms-0 p-6 md:p-8 bg-card rounded-2xl shadow-sm border border-border group-hover:shadow-md transition-shadow">
                  <h3 className="text-2xl font-bold text-primary mb-3">{step.title}</h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
             <p className="text-base md:text-lg text-muted-foreground bg-secondary inline-block px-6 py-3 rounded-full border border-border">
              ملاحظة: ما يتغير يختلف بحسب شكلك القانوني ورأس مالك ووجود عمال وطبيعة نشاطك.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 7. FAQ SECTION */}
      <section className="py-20 md:py-32 bg-secondary" id="faq">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpVariant}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">أسئلة شائعة</h2>
            <div className="h-1.5 w-24 bg-primary mx-auto rounded-full"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Accordion type="single" collapsible className="w-full space-y-4">
              {[
                {
                  q: "هل التسجيل وحده يكفي حتى أبدأ العمل؟",
                  a: "ليس دائماً. التسجيل يمنح المشروع هوية قانونية، لكن بعض الأنشطة تحتاج أيضاً إلى رخصة مهن أو موافقات إضافية. الأمر يعتمد على نوع نشاطك وموقعه والجهة المختصة."
                },
                {
                  q: "ما الفرق بين المنشأة الفردية والشركة ذات المسؤولية المحدودة؟",
                  a: "المنشأة الفردية أبسط وأقل تكلفة في البداية، لكن صاحبها يتحمل المسؤولية الكاملة شخصياً. الشركة ذات المسؤولية المحدودة تفصل بين مسؤولية الشركة ومسؤولية صاحبها، لكنها تتطلب إجراءات أكثر. الخيار يعتمد على طبيعة نشاطك وحجمه ومستوى المخاطرة."
                },
                {
                  q: "هل المشروع المنزلي يمكن ترخيصه؟",
                  a: "بعض الأنشطة المنزلية لها مسار ترخيص خاص، لكن الأهلية والشروط تختلف بحسب نوع النشاط والموقع والضوابط المعمول بها. لا يمكن الجزم بأن كل نشاط منزلي يمكن ترخيصه من المنزل دون التحقق من الشروط المحددة."
                },
                {
                  q: "ماذا يحدث إذا بقيت بدون تسجيل؟",
                  a: "عدم التسجيل ليس وضعاً محايداً. قد يعني صعوبة في الوصول إلى الخدمات المالية، وضعف في التعامل مع جهات أكبر، وغياب للحماية القانونية عند أي خلاف، واستبعاداً من بعض الفرص والخدمات الرسمية."
                },
                {
                  q: "هل التسجيل يضمن حصولي على تمويل؟",
                  a: "لا يضمن ذلك تلقائياً، لكنه يجعل مشروعك أقرب إلى الخدمات المالية والتمويلية ويعزز شمولك المالي. المشروع المنظم يكون في موقع أفضل للطلب والتقدم للتمويل مقارنة بمشروع يعمل في الظل."
                },
                {
                  q: "من أين أبدأ إذا أردت تنظيم مشروعي؟",
                  a: "الخطوة الأولى هي تحديد نوع نشاطك والشكل القانوني المناسب له، ثم التعرف على الجهة المختصة بنشاطك سواء كانت وزارة الصناعة والتجارة أو البلدية أو غيرها. من المهم أن تسير في المسار الصحيح منذ البداية لتجنب التعقيدات اللاحقة."
                }
              ].map((faq, index) => (
                <AccordionItem key={index} value={`faq-${index}`} className="bg-card border border-border rounded-2xl px-6 data-[state=open]:border-primary/30 transition-colors">
                  <AccordionTrigger className="text-lg md:text-xl font-bold text-foreground hover:text-primary hover:no-underline py-5 text-right">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-base md:text-lg text-muted-foreground leading-relaxed pb-5 pe-2">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* 8. CTA / FOOTER SECTION */}
      <section className="py-20 md:py-32 gradient-primary text-primary-foreground text-center" id="cta">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="space-y-8"
          >
            <motion.h2 variants={fadeUpVariant} className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-6 text-balance">
              الخطوة الأولى أسهل مما تتخيل
            </motion.h2>
            
            <motion.p variants={fadeUpVariant} className="text-xl md:text-2xl text-primary-foreground/90 max-w-2xl mx-auto leading-relaxed">
              المهم ليس أن تبدأ بسرعة فقط، بل أن تبدأ بشكل صحيح يناسب نشاطك وموقعك وطبيعة مشروعك.
            </motion.p>
            
            <motion.div variants={fadeUpVariant} className="pt-8 pb-12">
              <Button 
                size="lg" 
                className="w-full sm:w-auto text-xl h-16 px-12 rounded-full bg-accent hover:bg-accent/90 text-white shadow-[0_10px_30px_rgba(230,126,34,0.3)] transition-all hover:-translate-y-2 hover:shadow-[0_15px_40px_rgba(230,126,34,0.4)]"
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                ابدأ مسارك الآن
              </Button>
            </motion.div>

            <motion.div variants={fadeUpVariant} className="border-t border-white/20 pt-10 mt-10">
              <p className="text-sm md:text-base text-primary-foreground/60 leading-loose max-w-3xl mx-auto">
                هذه الصفحة إرشادية وتعليمية. التفاصيل القانونية والإجرائية الدقيقة تختلف بحسب نوع النشاط والموقع والشكل القانوني ووجود عمّال أو شركاء. يُنصح بمراجعة الجهات الرسمية المختصة للحصول على معلومات دقيقة تناسب حالتك.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
