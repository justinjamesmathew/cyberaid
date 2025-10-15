import { ArrowLeft, Edit2 } from "lucide-react";
import { useState } from "react";

interface ConfirmationScreenProps {
  onBack: () => void;
  onConfirm: (data: any) => void;
  extractedData: {
    fraudType: string;
    transactionId: string;
    amount: string;
    dateTime: string;
    recipientUPI: string;
    bank: string;
    description: string;
  };
}

export function ConfirmationScreen({ onBack, onConfirm, extractedData }: ConfirmationScreenProps) {
  const [data, setData] = useState(extractedData);
  const [editing, setEditing] = useState<string | null>(null);

  const handleConfirm = () => {
    onConfirm(data);
  };

  const FieldCard = ({ 
    label, 
    value, 
    field, 
    confidence 
  }: { 
    label: string; 
    value: string; 
    field: string; 
    confidence?: number;
  }) => (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-green-600">✓</span>
          <span className="font-semibold text-gray-700">{label}</span>
        </div>
        <button
          onClick={() => setEditing(field)}
          className="text-gray-400 hover:text-gray-600 p-1"
        >
          <Edit2 className="w-4 h-4" />
        </button>
      </div>
      {editing === field ? (
        <div className="space-y-2">
          <input
            type="text"
            value={value}
            onChange={(e) => setData({ ...data, [field]: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            autoFocus
          />
          <button
            onClick={() => setEditing(null)}
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            Done
          </button>
        </div>
      ) : (
        <div className="text-gray-900">{value}</div>
      )}
      {confidence && (
        <div className="text-xs text-gray-500 mt-1">Confidence: {confidence}%</div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="font-bold text-lg">Confirm Details</h1>
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <span className="text-xl">❓</span>
          </button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-6 space-y-6">
        {/* Status Bar */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <span>⏱️</span>
            <span className="text-gray-600">10 mins elapsed</span>
          </div>
          <div className="flex items-center gap-2">
            <span>⚡</span>
            <span className="text-gray-600">3h 50m left</span>
          </div>
        </div>

        {/* AI Analysis Result */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🤖</span>
            <div>
              <div className="font-semibold text-blue-900 mb-1">AI Analysis Complete</div>
              <div className="text-sm text-blue-800">
                We've extracted these details from your input. Please verify and edit if needed.
              </div>
            </div>
          </div>
        </div>

        {/* Extracted Fields */}
        <div className="space-y-4">
          <FieldCard
            label="Fraud Type"
            value={data.fraudType}
            field="fraudType"
            confidence={94}
          />
          <FieldCard
            label="Transaction ID"
            value={data.transactionId}
            field="transactionId"
          />
          <FieldCard
            label="Amount"
            value={data.amount}
            field="amount"
          />
          <FieldCard
            label="Date & Time"
            value={data.dateTime}
            field="dateTime"
          />
          <FieldCard
            label="Recipient UPI"
            value={data.recipientUPI}
            field="recipientUPI"
          />
          <FieldCard
            label="Bank Name"
            value={data.bank}
            field="bank"
          />
          <FieldCard
            label="Description"
            value={data.description}
            field="description"
          />
        </div>

        {/* Missing Fields Notice */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-5">
          <div className="flex items-start gap-3">
            <span className="text-2xl">⚠️</span>
            <div>
              <div className="font-semibold text-yellow-900 mb-1">Optional: Additional Evidence</div>
              <div className="text-sm text-yellow-800">
                You can add bank statement screenshots later to strengthen your case.
              </div>
            </div>
          </div>
        </div>

        {/* Confirm Button */}
        <button
          onClick={handleConfirm}
          className="w-full bg-gradient-to-br from-[#DC2626] to-[#991B1B] text-white py-5 px-6 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
        >
          ✓ Confirm & Continue
        </button>

        <button className="w-full text-gray-600 hover:text-gray-800 py-3">
          This doesn't look right
        </button>
      </div>
    </div>
  );
}
