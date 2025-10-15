import { Button } from "./ui/button";
import { useState } from "react";

interface ActionCardProps {
  number: number;
  title: string;
  status: "pending" | "in-progress" | "completed";
  urgent?: boolean;
  primaryAction: {
    label: string;
    icon: string;
    onClick: () => void;
  };
  secondaryActions?: {
    label: string;
    onClick: () => void;
  }[];
  onMarkDone?: () => void;
  referenceNumber?: string;
  onReferenceChange?: (ref: string) => void;
}

export function ActionCard({
  number,
  title,
  status,
  urgent = false,
  primaryAction,
  secondaryActions,
  onMarkDone,
  referenceNumber,
  onReferenceChange
}: ActionCardProps) {
  const [showRefInput, setShowRefInput] = useState(false);

  const getStatusIcon = () => {
    if (status === "completed") return "✅";
    if (status === "in-progress") return "🔄";
    return "❌";
  };

  return (
    <div 
      className={`bg-white rounded-2xl p-5 shadow-md border transition-all hover:shadow-lg ${
        urgent ? "border-l-4 border-l-[#DC2626]" : "border-gray-200"
      }`}
    >
      <div className="flex items-start gap-3 mb-4">
        <span className="text-2xl">{getStatusIcon()}</span>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-800">
            {number}. {title}
          </h3>
        </div>
      </div>

      <div className="space-y-3">
        <button
          onClick={primaryAction.onClick}
          className="w-full bg-gradient-to-br from-[#DC2626] to-[#991B1B] text-white py-4 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 active:scale-98"
        >
          <span className="text-xl mr-2">{primaryAction.icon}</span>
          {primaryAction.label}
        </button>

        {secondaryActions && secondaryActions.length > 0 && (
          <div className="flex gap-2 flex-wrap">
            {secondaryActions.map((action, idx) => (
              <button
                key={idx}
                onClick={action.onClick}
                className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {action.label}
              </button>
            ))}
            {onMarkDone && (
              <button
                onClick={onMarkDone}
                className="px-4 py-2 text-sm text-green-600 hover:bg-green-50 rounded-lg transition-colors"
              >
                MARK DONE ✓
              </button>
            )}
          </div>
        )}

        {status === "completed" && referenceNumber && (
          <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
            Reference: {referenceNumber}
          </div>
        )}

        {showRefInput && status !== "completed" && (
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Enter reference number..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              value={referenceNumber || ""}
              onChange={(e) => onReferenceChange?.(e.target.value)}
            />
          </div>
        )}

        {!showRefInput && status !== "completed" && onReferenceChange && (
          <button
            onClick={() => setShowRefInput(true)}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Add Reference #
          </button>
        )}
      </div>
    </div>
  );
}
