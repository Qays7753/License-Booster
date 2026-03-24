import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type HomeNavItem = {
  id: string;
  label: string;
};

type TopNavProps = {
  items: HomeNavItem[];
  activeSection: string;
  isScrolled: boolean;
  onNavigate: (id: string) => void;
};

export function TopNav({
  items,
  activeSection,
  isScrolled,
  onNavigate,
}: TopNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const wasOpenRef = useRef(false);
  const isHero = !isScrolled && activeSection === "top";
  const baseTextColor = isHero ? "text-white" : "text-foreground";
  const mutedTextColor = isHero ? "text-white/85" : "text-muted-foreground";
  const visibleItems = items.slice(0, 5);

  const handleNavigate = (id: string) => {
    setIsOpen(false);
    onNavigate(id);
  };

  useEffect(() => {
    if (isOpen) {
      const focusable = menuRef.current?.querySelectorAll<HTMLElement>(
        'button, [href], [tabindex]:not([tabindex="-1"])',
      );
      requestAnimationFrame(() => focusable?.[0]?.focus());
      wasOpenRef.current = true;
      return;
    }

    if (wasOpenRef.current) {
      toggleRef.current?.focus();
      wasOpenRef.current = false;
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;

      if (event.key === "Escape") {
        setIsOpen(false);
        return;
      }

      if (event.key !== "Tab") return;

      const focusable = menuRef.current?.querySelectorAll<HTMLElement>(
        'button, [href], [tabindex]:not([tabindex="-1"])',
      );

      if (!focusable || focusable.length === 0) {
        event.preventDefault();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey) {
        if (active === first) {
          event.preventDefault();
          last.focus();
        }
      } else if (active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 px-4 pt-4 md:px-6">
        <div
          className={cn(
            "mx-auto flex max-w-7xl items-center justify-between rounded-full border px-4 py-3 shadow-sm transition-all duration-300 md:px-5",
            isHero
              ? "border-white/15 bg-white/8 backdrop-blur-md"
              : "border-border/80 bg-background/94 backdrop-blur-xl",
          )}
        >
          <button
            type="button"
            onClick={() => handleNavigate("top")}
            className={cn("text-right transition-colors", baseTextColor)}
          >
            <span className="block text-sm font-semibold text-accent">
              الأردن
            </span>
            <span className="block text-lg font-bold md:text-xl">
              مسار الترخيص
            </span>
          </button>

          <nav className="hidden items-center gap-1 lg:flex">
            {visibleItems.map((item) => {
              const isActive = activeSection === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavigate(item.id)}
                  className={cn(
                    "relative overflow-hidden rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                    isActive
                      ? isHero
                        ? "text-white"
                        : "text-primary-foreground"
                      : cn(
                          mutedTextColor,
                          isHero
                            ? "hover:bg-white/10 hover:text-white"
                            : "hover:bg-secondary hover:text-foreground",
                        ),
                  )}
                >
                  {isActive ? (
                    <motion.span
                      layoutId="nav-active-pill"
                      className={cn(
                        "absolute inset-0 rounded-full",
                        isHero ? "bg-white/16" : "bg-primary",
                      )}
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  ) : null}
                  <span className="relative z-10">{item.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <Button
              type="button"
              onClick={() => handleNavigate("find-path")}
              className="rounded-full px-5"
            >
              ابدأ من الاختبار
              <ArrowLeft className="ms-2 h-4 w-4" />
            </Button>
          </div>

          <button
            type="button"
            ref={toggleRef}
            onClick={() => setIsOpen((value) => !value)}
            className={cn(
              "inline-flex h-11 w-11 items-center justify-center rounded-full border md:hidden",
              isHero
                ? "border-white/20 text-white"
                : "border-border text-foreground",
            )}
            aria-label={isOpen ? "إغلاق القائمة" : "فتح القائمة"}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {isOpen ? (
          <>
            <motion.button
              type="button"
              aria-label="إغلاق القائمة"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="fixed inset-0 z-30 bg-black/40 md:hidden"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              ref={menuRef}
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="fixed inset-x-4 top-20 z-40 rounded-3xl border border-border bg-background/98 p-4 shadow-2xl backdrop-blur-xl md:hidden"
              role="dialog"
              aria-modal="true"
              aria-label="التنقل السريع"
            >
              <div className="space-y-2">
                {visibleItems.map((item) => {
                  const isActive = activeSection === item.id;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleNavigate(item.id)}
                      className={cn(
                        "relative flex w-full items-center justify-between overflow-hidden rounded-2xl px-4 py-3 text-right text-base font-semibold transition-colors",
                        isActive
                          ? "text-primary-foreground"
                          : "bg-secondary text-foreground hover:bg-secondary/80",
                      )}
                    >
                      {isActive ? (
                        <motion.span
                          layoutId="nav-active-pill-mobile"
                          className="absolute inset-0 rounded-2xl bg-primary"
                          transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        />
                      ) : null}
                      <span className="relative z-10">{item.label}</span>
                      <ArrowLeft className="relative z-10 h-4 w-4" />
                    </button>
                  );
                })}
              </div>

              <Button
                type="button"
                onClick={() => handleNavigate("find-path")}
                className="mt-4 h-12 w-full rounded-2xl"
              >
                ابدأ من الاختبار
              </Button>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}
