import { useState } from "react";
import { ChevronDown, ChevronUp, Copy, ExternalLink } from "lucide-react";

interface UPIDisputeCardProps {
  isExpanded: boolean;
  isCompleted: boolean;
  onToggle: () => void;
  onComplete: (data: { app: string; referenceNumber: string }) => void;
  caseDetails: any;
}

interface UPIApp {
  id: string;
  name: string;
  icon: string;
  steps: number;
}

interface DisputeStep {
  stepNumber: number;
  title: string;
  description: string;
  tips?: string[];
  screenshot?: string;
}

const upiApps: UPIApp[] = [
  { id: "phonepe", name: "PhonePe", icon: "📱", steps: 6 },
  { id: "googlepay", name: "Google Pay", icon: "💳", steps: 5 },
  { id: "paytm", name: "Paytm", icon: "💰", steps: 6 },
  { id: "other", name: "Other", icon: "📲", steps: 4 }
];

const disputeGuides: Record<string, DisputeStep[]> = {
  phonepe: [
    {
      stepNumber: 1,
      title: "Open PhonePe",
      description: "Tap the PhonePe icon on your home screen or app drawer",
      tips: ["Make sure you're logged in to your account"]
    },
    {
      stepNumber: 2,
      title: "Go to History",
      description: "Tap on 'History' at the bottom of the screen",
      tips: ["You'll see all your recent transactions here"]
    },
    {
      stepNumber: 3,
      title: "Find Transaction",
      description: "Search for your transaction using these details:",
      tips: [
        "Use the search icon to find quickly",
        "Filter by date if needed"
      ]
    },
    {
      stepNumber: 4,
      title: "Report Issue",
      description: "Tap on the transaction, then tap 'Report an Issue' or 'Help' button",
      tips: ["The button is usually at the bottom of the transaction details"]
    },
    {
      stepNumber: 5,
      title: "Select Issue Type",
      description: "Select 'Unauthorized Transaction' or 'Wrong amount charged'",
      tips: [
        "Provide details: 'I did not authorize this transaction. Money was debited without my consent.'",
        "Be clear and concise"
      ]
    },
    {
      stepNumber: 6,
      title: "Upload Evidence & Submit",
      description: "Upload your evidence and submit the dispute",
      tips: [
        "Include transaction screenshots",
        "Add any chat or communication proof",
        "Note your reference number after submission"
      ]
    }
  ],
  googlepay: [
    {
      stepNumber: 1,
      title: "Open Google Pay",
      description: "Launch the Google Pay app on your device"
    },
    {
      stepNumber: 2,
      title: "Go to Activity",
      description: "Tap your profile photo → Activity"
    },
    {
      stepNumber: 3,
      title: "Select Transaction",
      description: "Find and tap on your fraudulent transaction"
    },
    {
      stepNumber: 4,
      title: "Report Issue",
      description: "Tap 'Need help with this transaction?' → 'Report unauthorized transaction'"
    },
    {
      stepNumber: 5,
      title: "Submit Details",
      description: "Fill the form with reason, details, and attach evidence. Save the reference number.",
      tips: ["Include all available evidence"]
    }
  ],
  paytm: [
    {
      stepNumber: 1,
      title: "Open Paytm",
      description: "Launch the Paytm app"
    },
    {
      stepNumber: 2,
      title: "Go to Passbook",
      description: "Tap on 'Passbook' to see transaction history"
    },
    {
      stepNumber: 3,
      title: "Find Transaction",
      description: "Locate your fraudulent transaction"
    },
    {
      stepNumber: 4,
      title: "Tap on Transaction",
      description: "Open the transaction details"
    },
    {
      stepNumber: 5,
      title: "Raise Dispute",
      description: "Tap 'Raise Dispute' or 'Report Issue'"
    },
    {
      stepNumber: 6,
      title: "Complete Form",
      description: "Fill dispute form, attach evidence, and submit. Note the reference number."
    }
  ],
  other: [
    {
      stepNumber: 1,
      title: "Open Your UPI App",
      description: "Launch whichever UPI app you used for the transaction"
    },
    {
      stepNumber: 2,
      title: "Find Transaction History",
      description: "Look for options like 'History', 'Transactions', or 'Passbook'"
    },
    {
      stepNumber: 3,
      title: "Locate the Transaction",
      description: "Find the fraudulent transaction in your history"
    },
    {
      stepNumber: 4,
      title: "Report/Dispute",
      description: "Look for 'Report Issue', 'Dispute', or 'Help' options. Follow the app's process to file your dispute and save the reference number."
    }
  ]
};

export function UPIDisputeCard({
  isExpanded,
  isCompleted,
  onToggle,
  onComplete,
  caseDetails
}: UPIDisputeCardProps) {
  const [selectedApp, setSelectedApp] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [referenceNumber, setReferenceNumber] = useState("");

  const selectedAppData = upiApps.find(app => app.id === selectedApp);
  const totalSteps = selectedAppData?.steps || 1;
  const progressPercentage = (currentStep / totalSteps) * 100;

  const handleCopyTransactionId = () => {
    navigator.clipboard.writeText(caseDetails.transactionId);
  };

  const handleOpenApp = () => {
    const deepLinks: Record<string, string> = {
      phonepe: "phonepe://",
      googlepay: "googlepay://",
      paytm: "paytm://"
    };

    if (selectedApp && deepLinks[selectedApp]) {
      window.location.href = deepLinks[selectedApp];
    }
  };

  const handleMarkComplete = () => {
    if (referenceNumber.trim() && selectedApp) {
      onComplete({ app: selectedApp, referenceNumber });
    }
  };

  const currentStepData = selectedApp && disputeGuides[selectedApp]
    ? disputeGuides[selectedApp][currentStep - 1]
    : null;

  return (
    <div className={`bg-white rounded-2xl border-2 transition-all ${
      isExpanded ? "border-orange-300 shadow-lg" : "border-gray-200 shadow-sm hover:border-orange-200"
    }`}>
      {/* Collapsed View */}
      {!isExpanded && (
        <div className="p-5">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl">{isCompleted ? "✅" : "❌"}</span>
            <h4 className="font-semibold text-lg">4. File UPI Dispute</h4>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Report this transaction in your UPI app
          </p>
          <button
            onClick={onToggle}
            className="text-orange-600 hover:text-orange-700 font-semibold text-sm flex items-center gap-2"
          >
            EXPAND <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Expanded View */}
      {isExpanded && (
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{isCompleted ? "✅" : "❌"}</span>
              <h4 className="font-semibold text-lg">4. File UPI Dispute</h4>
            </div>
            <button
              onClick={onToggle}
              className="text-gray-500 hover:text-gray-700 flex items-center gap-1"
            >
              COLLAPSE <ChevronUp className="w-4 h-4" />
            </button>
          </div>

          {/* App Selection */}
          <div>
            <h5 className="font-semibold mb-4">Which UPI app did you use?</h5>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {upiApps.map(app => (
                <button
                  key={app.id}
                  onClick={() => {
                    setSelectedApp(app.id);
                    setCurrentStep(1);
                  }}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    selectedApp === app.id
                      ? "border-orange-600 bg-orange-50"
                      : "border-gray-200 hover:border-orange-300"
                  }`}
                >
                  <div className="text-3xl mb-2">{app.icon}</div>
                  <div className="text-sm font-semibold">{app.name}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Step-by-Step Guide */}
          {selectedApp && selectedAppData && (
            <>
              <div className="border-t border-gray-200 pt-6 space-y-4">
                <h5 className="font-semibold">
                  📋 Step-by-Step Guide for {selectedAppData.name}
                </h5>

                {/* Progress Bar */}
                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-600">
                      ○ Step {currentStep} of {totalSteps}
                    </span>
                    <span className="text-gray-600">
                      {Math.round(progressPercentage)}%
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-orange-500 transition-all duration-300"
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                </div>

                {/* Step Content */}
                {currentStepData && (
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold flex-shrink-0">
                        {currentStepData.stepNumber}
                      </div>
                      <div className="flex-1">
                        <h6 className="font-bold text-lg mb-2">{currentStepData.title}</h6>
                        <p className="text-gray-700">{currentStepData.description}</p>

                        {/* Transaction Details for Step 3 */}
                        {currentStep === 3 && (
                          <div className="mt-4 bg-white border border-gray-300 rounded-lg p-4 space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-600">Amount:</span>
                              <span className="font-semibold">{caseDetails.amount}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-600">Date:</span>
                              <span className="font-semibold">{caseDetails.dateTime}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-600">Transaction ID:</span>
                              <div className="flex items-center gap-2">
                                <span className="font-mono text-sm">{caseDetails.transactionId}</span>
                                <button
                                  onClick={handleCopyTransactionId}
                                  className="text-blue-600 hover:text-blue-700"
                                >
                                  <Copy className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Tips */}
                        {currentStepData.tips && currentStepData.tips.length > 0 && (
                          <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3">
                            <div className="font-semibold text-sm text-blue-900 mb-2">💡 Tips:</div>
                            <ul className="space-y-1">
                              {currentStepData.tips.map((tip, index) => (
                                <li key={index} className="text-sm text-blue-800 flex items-start gap-2">
                                  <span className="text-blue-600">•</span>
                                  <span>{tip}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Open App Button */}
                        {currentStep === 1 && selectedApp !== "other" && (
                          <button
                            onClick={handleOpenApp}
                            className="mt-4 flex items-center gap-2 text-orange-600 hover:text-orange-700 font-semibold"
                          >
                            <ExternalLink className="w-4 h-4" />
                            Open {selectedAppData.name} App
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                    disabled={currentStep === 1}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-40 disabled:cursor-not-allowed font-semibold"
                  >
                    ← PREVIOUS
                  </button>
                  <button
                    onClick={() => setCurrentStep(Math.min(totalSteps, currentStep + 1))}
                    disabled={currentStep === totalSteps}
                    className="px-6 py-2 bg-orange-600 text-white rounded-xl font-semibold hover:bg-orange-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    NEXT STEP →
                  </button>
                </div>
              </div>

              {/* Reference Number Input */}
              <div className="border-t border-gray-200 pt-6 space-y-4">
                <h5 className="font-semibold">📝 Save Your Reference Number</h5>
                <input
                  type="text"
                  value={referenceNumber}
                  onChange={(e) => setReferenceNumber(e.target.value)}
                  placeholder="Enter dispute reference number"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                <p className="text-sm text-gray-500">
                  💡 You'll find this after submitting the dispute in your UPI app
                </p>
              </div>

              {/* Complete Button */}
              <button
                onClick={handleMarkComplete}
                disabled={!referenceNumber.trim()}
                className="w-full bg-green-600 text-white py-4 px-6 rounded-xl font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                ✓ MARK AS COMPLETED
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
