import { ReactNode } from "react";
import { layouts, typography, buttons } from "../styles/designSystem";

interface QuestionScreenProps {
  icon: ReactNode;
  title: string;
  subtitle: string;
  children: ReactNode;
  onBack: () => void;
  questionNumber: number;
  totalQuestions: number;
}

export function QuestionScreen({
  icon,
  title,
  subtitle,
  children,
  onBack,
  questionNumber,
  totalQuestions
}: QuestionScreenProps) {
  return (
    <div className={layouts.screen + " py-8 px-4"}>
      <div className={layouts.container}>
        <div className="text-center mb-8">
          {icon}
          <h2 className={typography.heading.h2 + " mb-2"}>{title}</h2>
          <p className={typography.body.small}>{subtitle}</p>
        </div>

        {children}

        <div className="mt-4 text-center">
          <button
            onClick={onBack}
            className={buttons.text}
            aria-label="Go back"
          >
            ← Back
          </button>
        </div>

        <p className="text-center text-sm text-gray-600 font-medium mt-4">
          Question {questionNumber} of {totalQuestions}
        </p>
      </div>
    </div>
  );
}
