import { useState } from "react";
import { ChevronRight, AlertCircle, CheckCircle2 } from "lucide-react";

interface DetailsCollectionScreenProps {
  fraudScenario: string;
  urgencyLevel: string;
  nextStepsPreview: string[];
  onComplete: (details: TransactionDetails) => void;
  onBack: () => void;
}

export interface TransactionDetails {
  // Personal Information
  yourName: string;
  yourPhone: string;
  yourEmail: string;

  // Bank & Account
  bankName: string;
  accountNumber: string; // Last 4 digits only for security

  // Transaction Details
  transactionId: string;
  amountLost: string;
  transactionDate: string;
  transactionTime: string;

  // Recipient Information (if applicable)
  recipientUPI?: string;
  recipientAccount?: string;
  recipientName?: string;

  // Additional Context
  description: string;
}

export function DetailsCollectionScreen({
  fraudScenario,
  urgencyLevel,
  nextStepsPreview,
  onComplete,
  onBack
}: DetailsCollectionScreenProps) {
  const [step, setStep] = useState<"preview" | "collect">("preview");

  const [details, setDetails] = useState<TransactionDetails>({
    yourName: "",
    yourPhone: "",
    yourEmail: "",
    bankName: "",
    accountNumber: "",
    transactionId: "",
    amountLost: "",
    transactionDate: "",
    transactionTime: "",
    recipientUPI: "",
    recipientAccount: "",
    recipientName: "",
    description: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: keyof TransactionDetails, value: string) => {
    setDetails(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Required fields
    if (!details.yourName.trim()) newErrors.yourName = "Your name is required for complaints";
    if (!details.yourPhone.trim()) newErrors.yourPhone = "Phone number needed for bank to contact you";
    if (!details.bankName.trim()) newErrors.bankName = "Bank name is required";
    if (!details.transactionId.trim()) newErrors.transactionId = "Transaction ID helps track the fraud";
    if (!details.amountLost.trim()) newErrors.amountLost = "Amount is needed for the complaint";
    if (!details.transactionDate.trim()) newErrors.transactionDate = "Date helps establish timeline";
    if (!details.transactionTime.trim()) newErrors.transactionTime = "Time is crucial for urgent cases";

    // Phone validation (basic)
    if (details.yourPhone && !/^\d{10}$/.test(details.yourPhone.replace(/\s/g, ""))) {
      newErrors.yourPhone = "Enter valid 10-digit phone number";
    }

    // Email validation (if provided)
    if (details.yourEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(details.yourEmail)) {
      newErrors.yourEmail = "Enter valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onComplete(details);
    }
  };

  const urgencyColors = {
    critical: "bg-red-50 border-red-200 text-red-800",
    urgent: "bg-orange-50 border-orange-200 text-orange-800",
    high: "bg-yellow-50 border-yellow-200 text-yellow-800",
    standard: "bg-blue-50 border-blue-200 text-blue-800"
  };

  if (step === "preview") {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <button
              onClick={onBack}
              className="text-gray-600 hover:text-gray-800 mb-4 flex items-center gap-2"
            >
              ← Back to Questions
            </button>
            <h1 className="text-2xl font-bold mb-2">Fraud Identified</h1>
            <p className="text-gray-600">We've identified your situation. Here's what we'll do next.</p>
          </div>

          {/* Fraud Scenario Card */}
          <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200 mb-6">
            <div className="flex items-start gap-4">
              <div className="text-4xl">🎯</div>
              <div className="flex-1">
                <h2 className="font-bold text-xl mb-2">{fraudScenario}</h2>
                <div className={`inline-block px-3 py-1 rounded-full text-sm font-semibold border ${urgencyColors[urgencyLevel as keyof typeof urgencyColors]}`}>
                  {urgencyLevel.toUpperCase()} PRIORITY
                </div>
              </div>
            </div>
          </div>

          {/* Next Steps Preview */}
          <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200 mb-6">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <span>📋</span>
              Your Action Plan Preview
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Here are the actions you'll need to take. We'll help you with each one.
            </p>
            <div className="space-y-3">
              {nextStepsPreview.slice(0, 5).map((action, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0 w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <div className="text-sm text-gray-700">{action}</div>
                </div>
              ))}
              {nextStepsPreview.length > 5 && (
                <div className="text-sm text-gray-500 italic pl-9">
                  + {nextStepsPreview.length - 5} more actions
                </div>
              )}
            </div>
          </div>

          {/* Information Needed Card */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-2xl p-6 mb-6">
            <div className="flex items-start gap-3 mb-4">
              <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-lg text-blue-900 mb-2">
                  Before We Start: Gather Your Information
                </h3>
                <p className="text-blue-800 text-sm mb-3">
                  To execute these actions effectively, you'll need:
                </p>
                <ul className="space-y-2 text-sm text-blue-800">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600" />
                    <span>Transaction ID (from your UPI app or bank statement)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600" />
                    <span>Exact amount that was debited</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600" />
                    <span>Date and time of the incident</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600" />
                    <span>Bank name and account details</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600" />
                    <span>Recipient UPI ID or account (if known)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <button
            onClick={() => setStep("collect")}
            className="w-full bg-gradient-to-br from-red-600 to-red-700 text-white py-4 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
          >
            I Have My Information - Continue
            <ChevronRight className="w-5 h-5" />
          </button>

          <p className="text-center text-sm text-gray-500 mt-4">
            Don't have all details? Fill what you have - we'll help you find the rest.
          </p>
        </div>
      </div>
    );
  }

  // Details Collection Form
  return (
    <div className="min-h-screen bg-gray-50 p-6 pb-32">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => setStep("preview")}
            className="text-gray-600 hover:text-gray-800 mb-4 flex items-center gap-2"
          >
            ← Back to Preview
          </button>
          <h1 className="text-2xl font-bold mb-2">Enter Transaction Details</h1>
          <p className="text-gray-600">We'll use this information to help you file complaints and contact your bank.</p>
        </div>

        <div className="space-y-6">
          {/* Personal Information */}
          <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <span>👤</span>
              Your Information
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Your Full Name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  value={details.yourName}
                  onChange={(e) => handleChange("yourName", e.target.value)}
                  placeholder="As per bank account"
                  className={`w-full px-4 py-3 border ${errors.yourName ? 'border-red-300' : 'border-gray-300'} rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent`}
                />
                {errors.yourName && (
                  <p className="text-red-600 text-xs mt-1">{errors.yourName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Your Phone Number <span className="text-red-600">*</span>
                </label>
                <input
                  type="tel"
                  value={details.yourPhone}
                  onChange={(e) => handleChange("yourPhone", e.target.value)}
                  placeholder="10-digit mobile number"
                  className={`w-full px-4 py-3 border ${errors.yourPhone ? 'border-red-300' : 'border-gray-300'} rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent`}
                />
                {errors.yourPhone && (
                  <p className="text-red-600 text-xs mt-1">{errors.yourPhone}</p>
                )}
                <p className="text-xs text-gray-500 mt-1">Bank will use this to contact you</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Your Email (Optional)
                </label>
                <input
                  type="email"
                  value={details.yourEmail}
                  onChange={(e) => handleChange("yourEmail", e.target.value)}
                  placeholder="your.email@example.com"
                  className={`w-full px-4 py-3 border ${errors.yourEmail ? 'border-red-300' : 'border-gray-300'} rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent`}
                />
                {errors.yourEmail && (
                  <p className="text-red-600 text-xs mt-1">{errors.yourEmail}</p>
                )}
              </div>
            </div>
          </div>

          {/* Bank Information */}
          <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <span>🏦</span>
              Bank Details
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Bank Name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  value={details.bankName}
                  onChange={(e) => handleChange("bankName", e.target.value)}
                  placeholder="e.g., HDFC Bank, SBI, ICICI"
                  className={`w-full px-4 py-3 border ${errors.bankName ? 'border-red-300' : 'border-gray-300'} rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent`}
                />
                {errors.bankName && (
                  <p className="text-red-600 text-xs mt-1">{errors.bankName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Account Number (Last 4 digits)
                </label>
                <input
                  type="text"
                  value={details.accountNumber}
                  onChange={(e) => handleChange("accountNumber", e.target.value)}
                  placeholder="XXXX1234"
                  maxLength={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">For verification only - never share full account number</p>
              </div>
            </div>
          </div>

          {/* Transaction Details */}
          <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <span>💳</span>
              Transaction Details
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Transaction ID / UPI Ref No. <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  value={details.transactionId}
                  onChange={(e) => handleChange("transactionId", e.target.value)}
                  placeholder="e.g., 123456789012"
                  className={`w-full px-4 py-3 border ${errors.transactionId ? 'border-red-300' : 'border-gray-300'} rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent font-mono`}
                />
                {errors.transactionId && (
                  <p className="text-red-600 text-xs mt-1">{errors.transactionId}</p>
                )}
                <p className="text-xs text-gray-500 mt-1">Find this in your UPI app or bank SMS</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Amount Lost <span className="text-red-600">*</span>
                </label>
                <div className="flex gap-2">
                  <span className="px-4 py-3 bg-gray-100 border border-gray-300 rounded-xl font-semibold text-gray-700">₹</span>
                  <input
                    type="text"
                    value={details.amountLost}
                    onChange={(e) => handleChange("amountLost", e.target.value)}
                    placeholder="5000"
                    className={`flex-1 px-4 py-3 border ${errors.amountLost ? 'border-red-300' : 'border-gray-300'} rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent`}
                  />
                </div>
                {errors.amountLost && (
                  <p className="text-red-600 text-xs mt-1">{errors.amountLost}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Date <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="date"
                    value={details.transactionDate}
                    onChange={(e) => handleChange("transactionDate", e.target.value)}
                    className={`w-full px-4 py-3 border ${errors.transactionDate ? 'border-red-300' : 'border-gray-300'} rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent`}
                  />
                  {errors.transactionDate && (
                    <p className="text-red-600 text-xs mt-1">{errors.transactionDate}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Time <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="time"
                    value={details.transactionTime}
                    onChange={(e) => handleChange("transactionTime", e.target.value)}
                    className={`w-full px-4 py-3 border ${errors.transactionTime ? 'border-red-300' : 'border-gray-300'} rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent`}
                  />
                  {errors.transactionTime && (
                    <p className="text-red-600 text-xs mt-1">{errors.transactionTime}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Recipient Information */}
          <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <span>🎯</span>
              Recipient Details (If Known)
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Recipient UPI ID
                </label>
                <input
                  type="text"
                  value={details.recipientUPI}
                  onChange={(e) => handleChange("recipientUPI", e.target.value)}
                  placeholder="scammer@paytm or merchant@upi"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent font-mono"
                />
                <p className="text-xs text-gray-500 mt-1">The UPI ID money was sent to</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Recipient Account Number
                </label>
                <input
                  type="text"
                  value={details.recipientAccount}
                  onChange={(e) => handleChange("recipientAccount", e.target.value)}
                  placeholder="If transferred to bank account"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent font-mono"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Recipient Name (as shown)
                </label>
                <input
                  type="text"
                  value={details.recipientName}
                  onChange={(e) => handleChange("recipientName", e.target.value)}
                  placeholder="Name shown in transaction"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Additional Description */}
          <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <span>📝</span>
              Additional Details
            </h3>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Brief Description of What Happened
              </label>
              <textarea
                value={details.description}
                onChange={(e) => handleChange("description", e.target.value)}
                placeholder="e.g., Scanned QR code to pay ₹50 for groceries, but ₹5000 was deducted instead..."
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
              />
              <p className="text-xs text-gray-500 mt-1">This helps provide context in your complaint</p>
            </div>
          </div>
        </div>

        {/* Fixed Bottom CTA */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-6 shadow-lg">
          <div className="max-w-3xl mx-auto">
            <button
              onClick={handleSubmit}
              className="w-full bg-gradient-to-br from-red-600 to-red-700 text-white py-4 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
            >
              Continue to Action Plan
              <ChevronRight className="w-5 h-5" />
            </button>
            <p className="text-center text-xs text-gray-500 mt-2">
              All information is stored locally on your device
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
