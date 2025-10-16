import { ReactNode } from "react";
import { layouts, typography, cards, buttons, progress, animations } from "../styles/designSystem";

interface ActionStepScreenProps {
  stepNumber: number;
  totalSteps: number;
  title: string;
  description: string;
  icon: string;
  children: ReactNode;
  onNext?: () => void;
  onSkip?: () => void;
  nextLabel?: string;
  showProgress?: boolean;
}

export function ActionStepScreen({
  stepNumber,
  totalSteps,
  title,
  description,
  icon,
  children,
  onNext,
  onSkip,
  nextLabel = "Continue to Next Step",
  showProgress = true
}: ActionStepScreenProps) {
  const progressPercentage = (stepNumber / totalSteps) * 100;

  return (
    <div className={layouts.screen}>
      <div className={layouts.container + " px-6 py-8"}>
        {/* Progress Indicator */}
        {showProgress && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className={typography.body.small + " font-semibold"}>
                Step {stepNumber} of {totalSteps}
              </span>
              <span className={typography.body.small + " text-gray-600"}>
                {Math.round(progressPercentage)}% Complete
              </span>
            </div>
            <div className={progress.container}>
              <div
                className={progress.barOrange}
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        )}

        {/* Header */}
        <div className={"text-center mb-8 " + animations.slideUp}>
          <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-4">
            <span className="text-4xl">{icon}</span>
          </div>
          <h1 className={typography.heading.h1 + " mb-3"}>{title}</h1>
          <p className={typography.body.base + " text-gray-600"}>{description}</p>
        </div>

        {/* Content */}
        <div className={animations.slideUp}>
          {children}
        </div>

        {/* Navigation */}
        {(onNext || onSkip) && (
          <div className="mt-8 space-y-3">
            {onNext && (
              <button
                onClick={onNext}
                className={buttons.primary.base + " flex items-center justify-center gap-2"}
              >
                {nextLabel}
                <span>→</span>
              </button>
            )}
            {onSkip && (
              <button
                onClick={onSkip}
                className={buttons.text + " w-full text-center"}
              >
                I'll do this later
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
