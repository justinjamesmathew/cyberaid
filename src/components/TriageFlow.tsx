import { useState } from "react";
import { ChevronRight, Clock, HelpCircle, CreditCard, AlertTriangle, Building2 } from "lucide-react";

interface TriageFlowProps {
  onComplete: (triageData: TriageData) => void;
}

export interface TriageData {
  timeframe: string;
  context: string;
  paymentMethod: string;
  issue: string;
  bank: string;
  amount: string;
  deducedFraudType: string;
  urgencyLevel: "critical" | "urgent" | "high" | "medium";
  recommendedActions: string[];
}

interface QuestionOption {
  value: string;
  label: string;
  icon?: string;
  urgency?: "critical" | "urgent" | "high" | "medium";
}

export function TriageFlow({ onComplete }: TriageFlowProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<Partial<TriageData>>({});

  const totalSteps = 5;
  const progress = (currentStep / totalSteps) * 100;

  // Question 1: Timeframe
  const timeframeOptions: QuestionOption[] = [
    { value: "just-now", label: "Just now (less than 30 minutes)", icon: "🔥", urgency: "critical" },
    { value: "within-4h", label: "Within the last 4 hours", icon: "⚡", urgency: "urgent" },
    { value: "today", label: "Today (4-24 hours ago)", icon: "⚠️", urgency: "high" },
    { value: "earlier", label: "Yesterday or earlier", icon: "📅", urgency: "medium" }
  ];

  // Question 2: Context
  const contextOptions: QuestionOption[] = [
    { value: "shopping-store", label: "Shopping or paying at a physical store", icon: "🏪" },
    { value: "online-shopping", label: "Shopping or paying online", icon: "🛒" },
    { value: "received-communication", label: "Received a call, SMS, or email", icon: "📞" },
    { value: "app-download", label: "Installing or using an app", icon: "📱" },
    { value: "money-transfer", label: "Transferring money to someone", icon: "💸" },
    { value: "other", label: "Something else", icon: "❓" }
  ];

  // Question 3: Payment Method
  const paymentOptions: QuestionOption[] = [
    { value: "upi", label: "UPI (PhonePe, Google Pay, Paytm, etc.)", icon: "📱" },
    { value: "card", label: "Debit or Credit card", icon: "💳" },
    { value: "netbanking", label: "Net banking / Internet banking", icon: "🌐" },
    { value: "shared-otp", label: "I shared OTP, PIN, or password", icon: "🔐" },
    { value: "atm", label: "Money withdrawn from ATM", icon: "🏧" },
    { value: "no-payment", label: "No payment yet - I stopped it in time", icon: "✋" }
  ];

  // Question 4: Issue
  const issueOptions: QuestionOption[] = [
    { value: "wrong-amount", label: "Wrong amount was deducted from my account", icon: "💰" },
    { value: "multiple-txn", label: "Multiple transactions I didn't authorize", icon: "🔄" },
    { value: "shared-regret", label: "I shared OTP/PIN but now realize it was a scam", icon: "😰" },
    { value: "account-access", label: "My account was locked or accessed by someone else", icon: "🔒" },
    { value: "no-product", label: "I paid but didn't receive the product or refund", icon: "📦" },
    { value: "suspicious-link", label: "A link or app asked for my bank details", icon: "🎣" },
    { value: "forced-payment", label: "I was pressured or threatened to make payment", icon: "⚠️" }
  ];

  const handleAnswer = (question: string, value: string, option?: QuestionOption) => {
    const newAnswers = {
      ...answers,
      [question]: value
    };

    // Store urgency from timeframe
    if (question === "timeframe" && option?.urgency) {
      newAnswers.urgencyLevel = option.urgency;
    }

    setAnswers(newAnswers);

    // Move to next step
    if (currentStep < totalSteps) {
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
      }, 300);
    }
  };

  const handleFinalSubmit = (bank: string, amount: string) => {
    const triageData: TriageData = {
      timeframe: answers.timeframe || "",
      context: answers.context || "",
      paymentMethod: answers.paymentMethod || "",
      issue: answers.issue || "",
      bank,
      amount,
      deducedFraudType: deduceFraudType(answers),
      urgencyLevel: answers.urgencyLevel || "medium",
      recommendedActions: getRecommendedActions(answers)
    };

    onComplete(triageData);
  };

  const deduceFraudType = (answers: Partial<TriageData>): string => {
    const { context, paymentMethod, issue } = answers;

    // UPI QR Code Scam
    if (context === "shopping-store" && paymentMethod === "upi" && issue === "wrong-amount") {
      return "UPI QR Code Manipulation";
    }

    // Phishing
    if (context === "received-communication" && issue === "shared-regret") {
      return "Phishing + Social Engineering";
    }

    if (issue === "suspicious-link") {
      return "Phishing (Link-based)";
    }

    // Account Takeover
    if (paymentMethod === "shared-otp" && issue === "account-access") {
      return "Account Takeover via OTP Sharing";
    }

    if (issue === "account-access") {
      return "Unauthorized Account Access";
    }

    // Card Fraud
    if (paymentMethod === "card" && issue === "multiple-txn") {
      return "Card Cloning / Data Breach";
    }

    // Payment Fraud
    if (issue === "no-product") {
      return "Payment Fraud / Non-delivery Scam";
    }

    // Extortion
    if (issue === "forced-payment") {
      return "Extortion / Threat-based Fraud";
    }

    // Online Shopping Fraud
    if (context === "online-shopping" && issue === "no-product") {
      return "E-commerce Fraud";
    }

    // App-based Fraud
    if (context === "app-download" && (issue === "multiple-txn" || issue === "account-access")) {
      return "Malicious App / Trojan";
    }

    // Generic based on payment method
    if (paymentMethod === "upi") return "UPI Fraud";
    if (paymentMethod === "card") return "Card Fraud";
    if (paymentMethod === "netbanking") return "Net Banking Fraud";

    return "Financial Fraud";
  };

  const getRecommendedActions = (answers: Partial<TriageData>): string[] => {
    const actions: string[] = [];
    const { paymentMethod, issue, urgencyLevel } = answers;

    // Critical/Urgent: Add immediate call
    if (urgencyLevel === "critical" || urgencyLevel === "urgent") {
      actions.push("call-bank-immediately");
    }

    // Always freeze account if unauthorized access
    if (issue === "account-access" || issue === "multiple-txn") {
      actions.push("freeze-account");
    }

    // UPI specific
    if (paymentMethod === "upi") {
      actions.push("file-upi-dispute");
      actions.push("report-to-npci");
    }

    // Card specific
    if (paymentMethod === "card") {
      actions.push("block-card");
      actions.push("dispute-transaction");
    }

    // If OTP shared, additional security
    if (paymentMethod === "shared-otp" || issue === "shared-regret") {
      actions.push("change-passwords");
      actions.push("enable-2fa");
    }

    // Always file cybercrime
    actions.push("file-cybercrime-complaint");

    // Collect evidence
    actions.push("collect-evidence");

    return actions;
  };

  const renderQuestion = () => {
    switch (currentStep) {
      case 1:
        return (
          <QuestionCard
            icon={<Clock className="w-8 h-8 text-red-600" />}
            title="When did this happen?"
            subtitle="This helps us prioritize urgent actions to maximize recovery chances"
            step={1}
            total={totalSteps}
          >
            <div className="space-y-3">
              {timeframeOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleAnswer("timeframe", option.value, option)}
                  className="w-full text-left p-4 rounded-xl border-2 border-gray-200 hover:border-red-500 hover:bg-red-50 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{option.icon}</span>
                    <span className="font-semibold text-gray-900 group-hover:text-red-900">
                      {option.label}
                    </span>
                    <ChevronRight className="w-5 h-5 text-gray-400 ml-auto group-hover:text-red-600" />
                  </div>
                </button>
              ))}
            </div>
          </QuestionCard>
        );

      case 2:
        return (
          <QuestionCard
            icon={<HelpCircle className="w-8 h-8 text-blue-600" />}
            title="What were you trying to do?"
            subtitle="This helps us understand the situation and context"
            step={2}
            total={totalSteps}
          >
            <div className="space-y-3">
              {contextOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleAnswer("context", option.value)}
                  className="w-full text-left p-4 rounded-xl border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{option.icon}</span>
                    <span className="font-semibold text-gray-900 group-hover:text-blue-900">
                      {option.label}
                    </span>
                    <ChevronRight className="w-5 h-5 text-gray-400 ml-auto group-hover:text-blue-600" />
                  </div>
                </button>
              ))}
            </div>
          </QuestionCard>
        );

      case 3:
        return (
          <QuestionCard
            icon={<CreditCard className="w-8 h-8 text-purple-600" />}
            title="How did the payment happen?"
            subtitle="This identifies which accounts need to be secured immediately"
            step={3}
            total={totalSteps}
          >
            <div className="space-y-3">
              {paymentOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleAnswer("paymentMethod", option.value)}
                  className="w-full text-left p-4 rounded-xl border-2 border-gray-200 hover:border-purple-500 hover:bg-purple-50 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{option.icon}</span>
                    <span className="font-semibold text-gray-900 group-hover:text-purple-900">
                      {option.label}
                    </span>
                    <ChevronRight className="w-5 h-5 text-gray-400 ml-auto group-hover:text-purple-600" />
                  </div>
                </button>
              ))}
            </div>
          </QuestionCard>
        );

      case 4:
        return (
          <QuestionCard
            icon={<AlertTriangle className="w-8 h-8 text-orange-600" />}
            title="What happened that seemed wrong?"
            subtitle="This helps us identify the exact type of fraud and appropriate actions"
            step={4}
            total={totalSteps}
          >
            <div className="space-y-3">
              {issueOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleAnswer("issue", option.value)}
                  className="w-full text-left p-4 rounded-xl border-2 border-gray-200 hover:border-orange-500 hover:bg-orange-50 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{option.icon}</span>
                    <span className="font-semibold text-gray-900 group-hover:text-orange-900">
                      {option.label}
                    </span>
                    <ChevronRight className="w-5 h-5 text-gray-400 ml-auto group-hover:text-orange-600" />
                  </div>
                </button>
              ))}
            </div>
          </QuestionCard>
        );

      case 5:
        return <FinalDetailsStep onSubmit={handleFinalSubmit} />;

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 py-8 px-4">
      {/* Progress Bar */}
      <div className="max-w-2xl mx-auto mb-6">
        <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
          <span className="font-semibold">Emergency Assessment</span>
          <span>Step {currentStep} of {totalSteps}</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-red-600 to-orange-600 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="max-w-2xl mx-auto">
        {renderQuestion()}
      </div>

      {/* Back Button */}
      {currentStep > 1 && currentStep < 5 && (
        <div className="max-w-2xl mx-auto mt-4">
          <button
            onClick={() => setCurrentStep(currentStep - 1)}
            className="text-gray-600 hover:text-gray-900 font-semibold text-sm"
          >
            ← Back
          </button>
        </div>
      )}
    </div>
  );
}

interface QuestionCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  step: number;
  total: number;
  children: React.ReactNode;
}

function QuestionCard({ icon, title, subtitle, children }: QuestionCardProps) {
  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-start gap-4 mb-6">
        <div className="flex-shrink-0">{icon}</div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
          <p className="text-sm text-gray-600">{subtitle}</p>
        </div>
      </div>

      {children}
    </div>
  );
}

interface FinalDetailsStepProps {
  onSubmit: (bank: string, amount: string) => void;
}

function FinalDetailsStep({ onSubmit }: FinalDetailsStepProps) {
  const [bank, setBank] = useState("");
  const [amount, setAmount] = useState("");

  const banks = [
    "HDFC Bank",
    "SBI",
    "ICICI Bank",
    "Axis Bank",
    "Kotak Mahindra Bank",
    "Punjab National Bank",
    "Bank of Baroda",
    "Canara Bank",
    "Union Bank",
    "IndusInd Bank",
    "IDFC First Bank",
    "Yes Bank",
    "Other"
  ];

  const handleSubmit = () => {
    if (bank && amount) {
      onSubmit(bank, amount);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-start gap-4 mb-6">
        <Building2 className="w-8 h-8 text-green-600 flex-shrink-0" />
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Quick details for your action plan
          </h2>
          <p className="text-sm text-gray-600">
            We need these to generate the right complaint forms, contact information, and prioritized actions
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Bank Selection */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Your Bank *
          </label>
          <select
            value={bank}
            onChange={(e) => setBank(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
          >
            <option value="">Select your bank</option>
            {banks.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
          <p className="text-xs text-gray-500 mt-1">
            This determines which fraud helpline to call and email addresses to use
          </p>
        </div>

        {/* Amount */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Amount Involved *
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">
              ₹
            </span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount (or 0 if no money lost yet)"
              className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            This helps prioritize actions and determines if high-value fraud procedures apply
          </p>
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-xl">🔒</span>
            <div className="text-sm text-blue-900">
              <strong>Privacy Protected:</strong> All information is processed locally and encrypted.
              We never share your data with third parties.
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={!bank || !amount}
          className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 px-6 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
        >
          🚀 Generate My Action Plan
        </button>
      </div>
    </div>
  );
}
