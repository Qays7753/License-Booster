import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { NAV_ITEMS, ACTIVE_SECTION_MAP } from "@/components/home/content";
import { TopNav } from "@/components/home/TopNav";
import { AnchorMoment } from "@/components/home/sections/AnchorMoment";
import { BenefitsSection } from "@/components/home/sections/BenefitsSection";
import { ComparisonSection } from "@/components/home/sections/ComparisonSection";
import { DelayTradeoffsSection } from "@/components/home/sections/DelayTradeoffsSection";
import { EntitiesSection } from "@/components/home/sections/EntitiesSection";
import { FaqConcernsSection } from "@/components/home/sections/FaqConcernsSection";
import { FooterSection } from "@/components/home/sections/FooterSection";
import { HeroSection } from "@/components/home/sections/HeroSection";
import { HomeBasedSection } from "@/components/home/sections/HomeBasedSection";
import { JourneyStepsSection } from "@/components/home/sections/JourneyStepsSection";
import { LegalFormsSection } from "@/components/home/sections/LegalFormsSection";
import { QuizSection } from "@/components/home/sections/QuizSection";
import { ScenarioSection } from "@/components/home/sections/ScenarioSection";
import { StatsSection } from "@/components/home/sections/StatsSection";
import { SurveySectionBlock } from "@/components/home/sections/SurveySection";

const OBSERVED_SECTION_IDS = [
  "top",
  "benefits",
  "find-path",
  "faq",
  "reg-vs-license",
  "legal-forms",
  "home-based",
  "what-changes",
  "entities",
  "survey",
  "footer",
];

const PHASES = ["افهم", "قيّم وضعك", "تحرّك"] as const;

const PHASE_MAP: Record<string, number> = {
  top: 0,
  benefits: 0,
  "find-path": 1,
  faq: 1,
  "reg-vs-license": 1,
  "legal-forms": 2,
  "home-based": 2,
  "what-changes": 2,
  entities: 2,
  survey: 2,
  footer: 2,
};

export default function Home() {
  useEffect(() => {
    document.documentElement.dir = "rtl";
    document.documentElement.lang = "ar";
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    void fetch("/api/analytics", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        referrer: document.referrer || "direct",
        user_agent: navigator.userAgent,
      }),
      signal: controller.signal,
    }).catch(() => {
      console.warn("Page visit tracking failed.");
    });

    return () => controller.abort();
  }, []);

  const [showMobileCta, setShowMobileCta] = useState(false);
  const [isNavSolid, setIsNavSolid] = useState(false);
  const [activeSection, setActiveSection] = useState("top");
  const [currentPhase, setCurrentPhase] = useState(0);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 28,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsNavSolid(window.scrollY > 36);
      setShowMobileCta(window.scrollY > 720);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const elements = OBSERVED_SECTION_IDS
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element));

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((left, right) => right.intersectionRatio - left.intersectionRatio);

        if (visibleEntries[0]) {
          const nextId = ACTIVE_SECTION_MAP[visibleEntries[0].target.id] ?? "top";
          setActiveSection(nextId);
          setCurrentPhase(PHASE_MAP[visibleEntries[0].target.id] ?? 0);
        }
      },
      {
        threshold: [0.2, 0.4, 0.65],
        rootMargin: "-20% 0px -55% 0px",
      },
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <motion.div
        className="fixed right-0 top-0 z-50 h-[3px] origin-right bg-accent"
        style={{ scaleX, width: "100%" }}
      />

      <TopNav
        items={[...NAV_ITEMS]}
        activeSection={activeSection}
        isScrolled={isNavSolid}
        onNavigate={scrollToSection}
      />

      <div className="fixed inset-x-0 top-[72px] z-30 border-b border-border/50 bg-background/90 px-4 py-2 backdrop-blur-md md:hidden">
        <div className="flex items-center justify-between gap-2">
          {PHASES.map((phase, i) => (
            <div key={phase} className="flex flex-1 items-center gap-2">
              <div
                className={`h-1.5 flex-1 rounded-full transition-colors ${
                  i <= currentPhase ? "bg-primary" : "bg-border"
                }`}
              />
              <span
                className={`whitespace-nowrap text-xs font-semibold transition-colors ${
                  i === currentPhase
                    ? "text-primary"
                    : "text-muted-foreground/50"
                }`}
              >
                {phase}
              </span>
            </div>
          ))}
        </div>
      </div>

      <main className="pt-[40px] md:pt-0">
        <HeroSection onNavigate={scrollToSection} />
        <StatsSection />
        <BenefitsSection />
        <AnchorMoment />
        <QuizSection onNavigate={scrollToSection} />
        <FaqConcernsSection />
        <ComparisonSection />
        <LegalFormsSection />
        <HomeBasedSection />
        <ScenarioSection />
        <DelayTradeoffsSection />
        <JourneyStepsSection />
        <EntitiesSection />
        <SurveySectionBlock onNavigate={scrollToSection} />
      </main>

      <FooterSection onNavigate={scrollToSection} />

      <motion.div
        initial={{ y: 100 }}
        animate={{ y: showMobileCta ? 0 : 100 }}
        transition={{ type: "spring", stiffness: 290, damping: 30 }}
        className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/94 p-4 shadow-[0_-12px_30px_rgba(0,0,0,0.08)] backdrop-blur-xl md:hidden"
      >
        <Button
          className="h-12 w-full rounded-xl text-base"
          onClick={() => scrollToSection("find-path")}
        >
          اعرف مسارك
          <ArrowLeft className="ms-2 h-4 w-4" />
        </Button>
      </motion.div>
    </div>
  );
}
