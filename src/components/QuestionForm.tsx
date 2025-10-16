import { ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { buttons, inputs, cards, typography, animations } from "../styles/designSystem";

interface QuestionFormProps {
  children: ReactNode;
  onSubmit: () => void;
  submitLabel?: string;
  error?: string;
  secondaryButton?: {
    label: string;
    onClick: () => void;
  };
}

export function QuestionForm({
  children,
  onSubmit,
  submitLabel = "Continue",
  error,
  secondaryButton
}: QuestionFormProps) {
  return (
    <div className={cards.primary + " " + animations.slideUp}>
      <div>
        {children}
        {error && <p className={typography.error + " mt-2"}>{error}</p>}
      </div>

      {/* Spacer between input and buttons */}
      <div className="h-6"></div>

      <div className="space-y-3">
        <button
          onClick={onSubmit}
          className={buttons.input.primary + " flex items-center justify-center gap-2"}
        >
          {submitLabel}
          <ChevronRight className="w-5 h-5" />
        </button>

        {secondaryButton && (
          <button
            onClick={secondaryButton.onClick}
            className={buttons.input.secondary}
          >
            {secondaryButton.label}
          </button>
        )}
      </div>
    </div>
  );
}
