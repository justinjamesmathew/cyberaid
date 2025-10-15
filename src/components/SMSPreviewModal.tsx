import { X } from "lucide-react";
import { useState } from "react";
import { generateScenarioContent } from "../utils/scenarioContent";

interface SMSPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  caseDetails: {
    bank: string;
    transactionId: string;
    amount: string;
    date: string;
    name: string;
    mobile: string;
  };
  smsNumber: string;
  fraudScenario?: string;
}

export function SMSPreviewModal({ isOpen, onClose, caseDetails, smsNumber, fraudScenario }: SMSPreviewModalProps) {
  // Generate scenario-specific SMS template
  const scenarioContent = generateScenarioContent(
    fraudScenario || caseDetails.fraudType || "Financial Fraud",
    caseDetails
  );

  const defaultMessage = scenarioContent.smsTemplate;

  const [message, setMessage] = useState(defaultMessage);
  const [isEditing, setIsEditing] = useState(false);

  if (!isOpen) return null;

  const handleSend = () => {
    window.open(`sms:${smsNumber}?body=${encodeURIComponent(message)}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-white rounded-t-3xl md:rounded-2xl w-full md:max-w-xl max-h-[90vh] overflow-hidden shadow-2xl animate-in slide-in-from-bottom md:slide-in-from-bottom-0 md:fade-in duration-300">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="font-bold text-xl">💬 SMS Preview</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="text-sm text-gray-600 mb-4">
            To: {smsNumber} (Bank Fraud)
          </div>

          {isEditing ? (
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full h-64 p-4 border border-gray-300 rounded-xl font-mono text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
            />
          ) : (
            <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-2xl p-5 mb-4 whitespace-pre-wrap font-mono text-sm shadow-inner">
              {message}
            </div>
          )}

          <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
            <span>Characters: {message.length}/160</span>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="text-blue-600 hover:text-blue-700"
            >
              ✏️ {isEditing ? "Done Editing" : "Edit Message"}
            </button>
          </div>

          <button
            onClick={handleSend}
            className="w-full bg-gradient-to-br from-[#DC2626] to-[#991B1B] text-white py-4 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            💬 SEND SMS
          </button>

          <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              ℹ️ Your SMS app will open with this message pre-filled. Just tap send.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
