import { motion } from "framer-motion";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "center" | "start";
  tone?: "default" | "light";
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
  tone = "default",
  className,
}: SectionHeaderProps) {
  const isCentered = align === "center";
  const titleColor =
    tone === "light" ? "text-primary-foreground" : "text-foreground";
  const eyebrowColor =
    tone === "light" ? "text-primary-foreground/80" : "text-primary";
  const descriptionColor =
    tone === "light"
      ? "text-primary-foreground/82"
      : "text-muted-foreground";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className={cn(
        "max-w-3xl",
        isCentered ? "mx-auto text-center" : "text-right",
        className,
      )}
    >
      {eyebrow ? (
        <p className={cn("mb-3 text-sm font-semibold", eyebrowColor)}>
          {eyebrow}
        </p>
      ) : null}

      <h2
        className={cn(
          "text-3xl font-bold leading-tight md:text-5xl",
          titleColor,
        )}
      >
        {title}
      </h2>

      {description ? (
        <div
          className={cn(
            "mt-4 text-justify-ar text-lg leading-relaxed md:text-xl",
            descriptionColor,
            isCentered ? "mx-auto" : "",
          )}
        >
          {description}
        </div>
      ) : null}
    </motion.div>
  );
}
