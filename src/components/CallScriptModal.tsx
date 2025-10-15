import { X, Copy, Check } from "lucide-react";
import { useState } from "react";
import { generateScenarioContent } from "../utils/scenarioContent";

interface CallScriptModalProps {
  isOpen: boolean;
  onClose: () => void;
  caseDetails: any;
  phoneNumber: string;
  fraudScenario?: string;
}

export function CallScriptModal({ isOpen, onClose, caseDetails, phoneNumber, fraudScenario }: CallScriptModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Generate scenario-specific script
  const scenarioContent = generateScenarioContent(
    fraudScenario || caseDetails.fraudType || "Financial Fraud",
    caseDetails
  );

  const script = scenarioContent.callScript;

  const handleCall = () => {
    window.open(`tel:${phoneNumber}`);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(script);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-white rounded-t-3xl md:rounded-2xl w-full md:max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl animate-in slide-in-from-bottom md:slide-in-from-bottom-0 md:fade-in duration-300">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="font-bold text-xl">📞 Call Script</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <p className="text-gray-700 mb-4">What to say on the call:</p>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-4 whitespace-pre-wrap font-mono text-sm">
            {script}
          </div>

          <button
            onClick={handleCopy}
            className="w-full mb-3 bg-white border border-gray-300 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
          >
            {copied ? (
              <>
                <Check className="w-5 h-5 text-green-600" />
                <span className="text-green-600">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-5 h-5" />
                <span>Copy Script</span>
              </>
            )}
          </button>

          <button
            onClick={handleCall}
            className="w-full bg-gradient-to-br from-[#DC2626] to-[#991B1B] text-white py-4 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            📞 CALL NOW
          </button>

          <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              💡 <strong>Tip:</strong> Stay calm and assertive. Ask for supervisor if needed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
