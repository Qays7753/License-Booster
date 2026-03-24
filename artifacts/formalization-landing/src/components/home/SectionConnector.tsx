import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

type SectionConnectorProps = {
  text: string;
  buttonLabel: string;
  targetId: string;
  onNavigate: (id: string) => void;
};

export function SectionConnector({
  text,
  buttonLabel,
  targetId,
  onNavigate,
}: SectionConnectorProps) {
  return (
    <div className="mx-auto mt-10 max-w-3xl rounded-3xl bg-secondary/70 px-6 py-8 text-center">
      <p className="mx-auto max-w-2xl text-lg leading-relaxed text-foreground/80">
        {text}
      </p>
      <Button
        type="button"
        className="mt-5 rounded-full px-6"
        onClick={() => onNavigate(targetId)}
      >
        {buttonLabel}
        <ArrowLeft className="ms-2 h-4 w-4" />
      </Button>
    </div>
  );
}
