import { useState } from "react";
import { ChevronRight, ChevronLeft, User, Phone, Mail, Building2, Receipt, IndianRupee, Calendar, Clock, UserX, FileText } from "lucide-react";
import { buttons, inputs, cards, iconContainers, typography, animations, spacing, layouts, badges } from "../styles/designSystem";

interface ConversationalDetailsCollectionProps {
  fraudScenario: string;
  urgencyLevel: string;
  nextStepsPreview: string[];
  onComplete: (details: TransactionDetails) => void;
  onBack: () => void;
}

export interface TransactionDetails {
  yourName: string;
  yourPhone: string;
  yourEmail: string;
  bankName: string;
  accountNumber: string;
  transactionId: string;
  amountLost: string;
  transactionDate: string;
  transactionTime: string;
  recipientUPI?: string;
  recipientAccount?: string;
  recipientName?: string;
  description: string;
}

type QuestionStep = "preview" | "name" | "phone" | "email" | "bank" | "transactionId" | "amount" | "date" | "time" | "recipient" | "description" | "complete";

const commonBanks = ["HDFC Bank", "State Bank of India", "ICICI Bank", "Axis Bank", "Kotak Mahindra Bank", "Punjab National Bank", "Bank of Baroda", "Canara Bank", "Other"];

export function ConversationalDetailsCollection({
  fraudScenario,
  urgencyLevel,
  nextStepsPreview,
  onComplete,
  onBack
}: ConversationalDetailsCollectionProps) {
  const [currentStep, setCurrentStep] = useState<QuestionStep>("preview");
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
  const [currentInput, setCurrentInput] = useState("");
  const [error, setError] = useState("");

  const handleNext = (field: keyof TransactionDetails, value: string) => {
    setDetails(prev => ({ ...prev, [field]: value }));
    setCurrentInput("");
    setError("");

    // Move to next step
    const stepOrder: QuestionStep[] = ["preview", "name", "phone", "email", "bank", "transactionId", "amount", "date", "time", "recipient", "description", "complete"];
    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex < stepOrder.length - 1) {
      setTimeout(() => setCurrentStep(stepOrder[currentIndex + 1]), 300);
    }
  };

  const handleSkip = (field: keyof TransactionDetails, value: string, nextStep: QuestionStep) => {
    setDetails(prev => ({ ...prev, [field]: value }));
    setCurrentInput("");
    setError("");
    setTimeout(() => setCurrentStep(nextStep), 300);
  };

  const handleBack = () => {
    const stepOrder: QuestionStep[] = ["preview", "name", "phone", "email", "bank", "transactionId", "amount", "date", "time", "recipient", "description", "complete"];
    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(stepOrder[currentIndex - 1]);
    } else {
      onBack();
    }
  };

  const validateAndNext = (field: keyof TransactionDetails, value: string, nextStep: QuestionStep) => {
    // Validation logic
    if (field === "yourName" && !value.trim()) {
      setError("Please enter your name");
      return;
    }
    if (field === "yourPhone") {
      if (value && !/^\d{10}$/.test(value.replace(/\s/g, ""))) {
        setError("Please enter a valid 10-digit phone number");
        return;
      }
    }
    if (field === "yourEmail" && value) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        setError("Please enter a valid email address");
        return;
      }
    }
    if (field === "bankName" && !value.trim()) {
      setError("Please select or enter your bank name");
      return;
    }
    if (field === "transactionId" && !value.trim()) {
      setError("Transaction ID is crucial - try 'Don't have it' if unavailable");
      return;
    }
    if (field === "amountLost" && !value.trim()) {
      setError("Please enter the amount lost");
      return;
    }
    if (field === "transactionDate" && !value) {
      setError("Please select the date");
      return;
    }
    if (field === "transactionTime" && !value) {
      setError("Please select the time");
      return;
    }

    handleNext(field, value);
  };

  // No need for custom classes - using design system

  // Preview Screen
  if (currentStep === "preview") {
    return (
      <div className={layouts.screen + " p-6 " + animations.fadeIn}>
        <div className={layouts.container}>
          <button
            onClick={onBack}
            className={buttons.text + " mb-6 flex items-center gap-2"}
          >
            <ChevronLeft className="w-5 h-5" />
            Back to Questions
          </button>

          <div className={cards.primary + " mb-6"}>
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">🚨</div>
              <h2 className={typography.heading.h2 + " mb-3"}>{fraudScenario}</h2>
              <div className={badges.urgency(urgencyLevel)}>
                {urgencyLevel.toUpperCase()} PRIORITY
              </div>
            </div>
          </div>

          <div className={cards.primary + " mb-6"}>
            <h3 className={typography.heading.h3 + " mb-4 flex items-center gap-2"}>
              <span>⚡</span>
              Critical Actions Required
            </h3>
            <div className="space-y-2">
              {nextStepsPreview.slice(0, 5).map((action, index) => (
                <div key={index} className="flex items-start gap-3 p-3 border-l-4 border-red-600 bg-red-50">
                  <div className="flex-shrink-0 w-6 h-6 bg-red-600 text-white rounded flex items-center justify-center text-xs font-bold mt-0.5">
                    {index + 1}
                  </div>
                  <div className={typography.body.base + " font-medium text-gray-900"}>{action}</div>
                </div>
              ))}
              {nextStepsPreview.length > 5 && (
                <div className={typography.body.small + " pl-9 text-gray-600 mt-2"}>
                  + {nextStepsPreview.length - 5} more actions
                </div>
              )}
            </div>
          </div>

          <div className="bg-blue-50 border-2 border-blue-200 rounded-3xl p-8 mb-6">
            <h3 className={typography.heading.h3 + " mb-3 text-blue-900"}>📝 Quick Information Collection</h3>
            <p className={typography.body.base + " text-blue-900 mb-3"}>
              To help you take action, I'll ask a few quick questions to prepare personalized scripts for your bank calls, SMS, and emails.
            </p>
            <p className={typography.body.small + " text-blue-800"}>
              💡 You can skip any question if you don't have the information right now.
            </p>
          </div>

          <button
            onClick={() => setCurrentStep("name")}
            className={buttons.primary.large + " flex items-center justify-center gap-3"}
          >
            Let's Get Started
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  // Question: Name
  if (currentStep === "name") {
    return (
      <div className={layouts.screen + " py-8 px-4"}>
        <div className={layouts.container}>
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <User className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className={typography.heading.h2 + " mb-2"}>What's your name?</h2>
            <p className={typography.body.small}>We'll use this for all your complaints and communications</p>
          </div>

          <div className={cards.primary + " " + animations.slideUp}>
            <input
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && validateAndNext("yourName", currentInput, "phone")}
              placeholder="Your full name (as per bank account)"
              className={inputs.text}
              autoFocus
            />
            {error && <p className={typography.error + " mt-2"}>{error}</p>}

            <div className="space-y-3 mt-8">
              <button
                onClick={() => validateAndNext("yourName", currentInput, "phone")}
                className={buttons.input.primary + " flex items-center justify-center gap-2"}
              >
                Continue
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="mt-4 text-center">
            <button
              onClick={handleBack}
              className={buttons.text}
              aria-label="Go back to previous question"
            >
              ← Back
            </button>
          </div>

          <p className="text-center text-sm text-gray-600 font-medium mt-4">Question 1 of 10</p>
        </div>
      </div>
    );
  }

  // Question: Phone
  if (currentStep === "phone") {
    return (
      <div className={layouts.screen + " py-8 px-4"}>
        <div className={layouts.container}>
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <Phone className="w-8 h-8 text-green-600" />
            </div>
            <h2 className={typography.heading.h2 + " mb-2"}>Your phone number?</h2>
            <p className={typography.body.small}>Bank will use this to contact you about your case</p>
          </div>

          <div className={cards.primary + " " + animations.slideUp}>
            <input
              type="tel"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && validateAndNext("yourPhone", currentInput, "email")}
              placeholder="10-digit mobile number"
              className={inputs.text}
              autoFocus
            />
            {error && <p className={typography.error + " mt-2"}>{error}</p>}

            <div className="space-y-3 mt-8">
              <button
                onClick={() => validateAndNext("yourPhone", currentInput, "email")}
                className={buttons.input.primary + " flex items-center justify-center gap-2"}
              >
                Continue
                <ChevronRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleSkip("yourPhone", "[To be provided]", "email")}
                className={buttons.input.secondary}
              >
                I'll add later
              </button>
            </div>
          </div>

          <div className="mt-4 text-center">
            <button
              onClick={handleBack}
              className={buttons.text}
              aria-label="Go back"
            >
              ← Back
            </button>
          </div>

          <p className="text-center text-sm text-gray-600 font-medium mt-4">Question 2 of 10</p>
        </div>
      </div>
    );
  }

  // Question: Email
  if (currentStep === "email") {
    return (
      <div className={layouts.screen + " py-8 px-4"}>
        <div className={layouts.container}>
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
              <Mail className="w-8 h-8 text-purple-600" />
            </div>
            <h2 className={typography.heading.h2 + " mb-2"}>Your email address?</h2>
            <p className={typography.body.small}>Optional - for email communications with your bank</p>
          </div>

          <div className={cards.primary + " " + animations.slideUp}>
            <input
              type="email"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && validateAndNext("yourEmail", currentInput, "bank")}
              placeholder="your.email@example.com"
              className={inputs.text}
              autoFocus
            />
            {error && <p className={typography.error + " mt-2"}>{error}</p>}

            <div className="space-y-3 mt-8">
              <button
                onClick={() => validateAndNext("yourEmail", currentInput, "bank")}
                className={buttons.input.primary + " flex items-center justify-center gap-2"}
              >
                Continue
                <ChevronRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleSkip("yourEmail", "", "bank")}
                className={buttons.input.secondary}
              >
                Skip
              </button>
            </div>
          </div>

          <div className="mt-4 text-center">
            <button
              onClick={handleBack}
              className={buttons.text}
              aria-label="Go back"
            >
              ← Back
            </button>
          </div>

          <p className="text-center text-sm text-gray-600 font-medium mt-4">Question 3 of 10</p>
        </div>
      </div>
    );
  }

  // Question: Bank Name
  if (currentStep === "bank") {
    return (
      <div className={layouts.screen + " py-8 px-4"}>
        <div className={layouts.container}>
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
              <Building2 className="w-8 h-8 text-indigo-600" />
            </div>
            <h2 className={typography.heading.h2 + " mb-2"}>Which bank?</h2>
            <p className={typography.body.small}>Select your bank or type if not listed</p>
          </div>

          <div className={cards.primary + " " + animations.slideUp}>
            <div className="grid grid-cols-2 gap-3 mb-4">
              {commonBanks.map((bank) => (
                <button
                  key={bank}
                  onClick={() => bank === "Other" ? setCurrentInput("") : validateAndNext("bankName", bank, "transactionId")}
                  className={buttons.quickAction}
                >
                  {bank}
                </button>
              ))}
            </div>

            <div className="relative">
              <div className="text-center text-sm text-gray-500 my-4 font-medium">or type bank name</div>
              <input
                type="text"
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && currentInput && validateAndNext("bankName", currentInput, "transactionId")}
                placeholder="Bank name"
                className={inputs.text}
              />
            </div>
            {error && <p className={typography.error + " mt-2"}>{error}</p>}

            <div className="space-y-3 mt-8">
              <button
                onClick={() => currentInput && validateAndNext("bankName", currentInput, "transactionId")}
                disabled={!currentInput}
                className={buttons.input.primary + " flex items-center justify-center gap-2 " + (!currentInput ? 'opacity-50 cursor-not-allowed' : '')}
              >
                Continue
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="mt-4 text-center">
            <button
              onClick={handleBack}
              className={buttons.text}
              aria-label="Go back"
            >
              ← Back
            </button>
          </div>

          <p className="text-center text-sm text-gray-600 font-medium mt-4">Question 4 of 10</p>
        </div>
      </div>
    );
  }

  // Question: Transaction ID
  if (currentStep === "transactionId") {
    return (
      <div className={layouts.screen + " py-8 px-4"}>
        <div className={layouts.container}>
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
              <Receipt className="w-8 h-8 text-orange-600" />
            </div>
            <h2 className={typography.heading.h2 + " mb-2"}>Transaction ID?</h2>
            <p className={typography.body.small}>Find this in your UPI app or bank SMS</p>
          </div>

          <div className={cards.primary + " " + animations.slideUp}>
            <input
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && validateAndNext("transactionId", currentInput, "amount")}
              placeholder="e.g., 123456789012"
              className={inputs.text + " font-mono"}
              autoFocus
            />
            {error && <p className={typography.error + " mt-2"}>{error}</p>}

            <div className="mt-4 p-4 bg-blue-50 border-2 border-blue-200 rounded-xl">
              <p className="text-sm text-blue-900 font-medium">
                💡 <strong>Where to find it:</strong> Open your payment app (PhonePe/GPay/Paytm), go to transaction history, and look for "UPI Ref No" or "Transaction ID"
              </p>
            </div>

            <div className="space-y-3 mt-8">
              <button
                onClick={() => validateAndNext("transactionId", currentInput, "amount")}
                className={buttons.input.primary + " flex items-center justify-center gap-2"}
              >
                Continue
                <ChevronRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleNext("transactionId", "Will retrieve later", "amount")}
                className={buttons.input.secondary}
              >
                Don't have it
              </button>
            </div>
          </div>

          <div className="mt-4 text-center">
            <button
              onClick={handleBack}
              className={buttons.text}
              aria-label="Go back"
            >
              ← Back
            </button>
          </div>

          <p className="text-center text-sm text-gray-600 font-medium mt-4">Question 5 of 10</p>
        </div>
      </div>
    );
  }

  // Question: Amount
  if (currentStep === "amount") {
    return (
      <div className={layouts.screen + " py-8 px-4"}>
        <div className={layouts.container}>
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
              <IndianRupee className="w-8 h-8 text-red-600" />
            </div>
            <h2 className={typography.heading.h2 + " mb-2"}>How much was lost?</h2>
            <p className={typography.body.small}>Enter the amount that was fraudulently debited</p>
          </div>

          <div className={cards.primary + " " + animations.slideUp}>
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold text-gray-700">₹</span>
              <input
                type="number"
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && validateAndNext("amountLost", currentInput, "date")}
                placeholder="5000"
                className={inputs.number}
                autoFocus
              />
            </div>
            {error && <p className={typography.error + " mt-2"}>{error}</p>}

            <div className="space-y-3 mt-8">
              <button
                onClick={() => validateAndNext("amountLost", currentInput, "date")}
                className={buttons.input.primary + " flex items-center justify-center gap-2"}
              >
                Continue
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="mt-4 text-center">
            <button
              onClick={handleBack}
              className={buttons.text}
              aria-label="Go back"
            >
              ← Back
            </button>
          </div>

          <p className="text-center text-sm text-gray-600 font-medium mt-4">Question 6 of 10</p>
        </div>
      </div>
    );
  }

  // Question: Date
  if (currentStep === "date") {
    return (
      <div className={layouts.screen + " py-8 px-4"}>
        <div className={layouts.container}>
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-100 rounded-full mb-4">
              <Calendar className="w-8 h-8 text-teal-600" />
            </div>
            <h2 className={typography.heading.h2 + " mb-2"}>What date?</h2>
            <p className={typography.body.small}>When did this transaction happen?</p>
          </div>

          <div className={cards.primary + " " + animations.slideUp}>
            <input
              type="date"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              max={new Date().toISOString().split('T')[0]}
              className={inputs.text}
              autoFocus
            />
            {error && <p className={typography.error + " mt-2"}>{error}</p>}

            <div className="space-y-3 mt-8">
              <button
                onClick={() => validateAndNext("transactionDate", currentInput, "time")}
                className={buttons.input.primary + " flex items-center justify-center gap-2"}
              >
                Continue
                <ChevronRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleNext("transactionDate", new Date().toISOString().split('T')[0], "time")}
                className={buttons.input.secondary}
              >
                Today
              </button>
            </div>
          </div>

          <div className="mt-4 text-center">
            <button
              onClick={handleBack}
              className={buttons.text}
              aria-label="Go back"
            >
              ← Back
            </button>
          </div>

          <p className="text-center text-sm text-gray-600 font-medium mt-4">Question 7 of 10</p>
        </div>
      </div>
    );
  }

  // Question: Time
  if (currentStep === "time") {
    return (
      <div className={layouts.screen + " py-8 px-4"}>
        <div className={layouts.container}>
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-cyan-100 rounded-full mb-4">
              <Clock className="w-8 h-8 text-cyan-600" />
            </div>
            <h2 className={typography.heading.h2 + " mb-2"}>What time?</h2>
            <p className={typography.body.small}>Approximate time is fine</p>
          </div>

          <div className={cards.primary + " " + animations.slideUp}>
            <input
              type="time"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              className={inputs.text}
              autoFocus
            />
            {error && <p className={typography.error + " mt-2"}>{error}</p>}

            <div className="grid grid-cols-3 gap-3 mt-4">
              <button
                onClick={() => handleNext("transactionTime", "09:00", "recipient")}
                className={buttons.quickAction}
              >
                Morning
              </button>
              <button
                onClick={() => handleNext("transactionTime", "14:00", "recipient")}
                className={buttons.quickAction}
              >
                Afternoon
              </button>
              <button
                onClick={() => handleNext("transactionTime", "20:00", "recipient")}
                className={buttons.quickAction}
              >
                Evening
              </button>
            </div>

            <div className="space-y-3 mt-8">
              <button
                onClick={() => validateAndNext("transactionTime", currentInput, "recipient")}
                className={buttons.input.primary + " flex items-center justify-center gap-2"}
              >
                Continue
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="mt-4 text-center">
            <button
              onClick={handleBack}
              className={buttons.text}
              aria-label="Go back"
            >
              ← Back
            </button>
          </div>

          <p className="text-center text-sm text-gray-600 font-medium mt-4">Question 8 of 10</p>
        </div>
      </div>
    );
  }

  // Question: Recipient
  if (currentStep === "recipient") {
    return (
      <div className={layouts.screen + " py-8 px-4"}>
        <div className={layouts.container}>
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-pink-100 rounded-full mb-4">
              <UserX className="w-8 h-8 text-pink-600" />
            </div>
            <h2 className={typography.heading.h2 + " mb-2"}>Recipient details?</h2>
            <p className={typography.body.small}>UPI ID or account number where money went (if known)</p>
          </div>

          <div className={cards.primary + " " + animations.slideUp}>
            <input
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleNext("recipientUPI", currentInput, "description")}
              placeholder="scammer@paytm or account number"
              className={inputs.text + " font-mono"}
              autoFocus
            />

            <div className="mt-4 p-4 bg-blue-50 border-2 border-blue-200 rounded-xl">
              <p className="text-sm text-blue-900 font-medium">
                💡 Check your transaction details in the UPI app or bank statement
              </p>
            </div>

            <div className="space-y-3 mt-8">
              <button
                onClick={() => handleNext("recipientUPI", currentInput || "Unknown", "description")}
                className={buttons.input.primary + " flex items-center justify-center gap-2"}
              >
                Continue
                <ChevronRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleNext("recipientUPI", "Unknown", "description")}
                className={buttons.input.secondary}
              >
                Unknown
              </button>
            </div>
          </div>

          <div className="mt-4 text-center">
            <button
              onClick={handleBack}
              className={buttons.text}
              aria-label="Go back"
            >
              ← Back
            </button>
          </div>

          <p className="text-center text-sm text-gray-600 font-medium mt-4">Question 9 of 10</p>
        </div>
      </div>
    );
  }

  // Question: Description
  if (currentStep === "description") {
    return (
      <div className={layouts.screen + " py-8 px-4"}>
        <div className={layouts.container}>
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-4">
              <FileText className="w-8 h-8 text-amber-600" />
            </div>
            <h2 className={typography.heading.h2 + " mb-2"}>Brief description?</h2>
            <p className={typography.body.small}>Optional - what happened in your own words</p>
          </div>

          <div className={cards.primary + " " + animations.slideUp}>
            <textarea
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              placeholder="e.g., Scanned QR code to pay ₹50 for groceries, but ₹5000 was deducted..."
              rows={5}
              className={inputs.textarea}
              autoFocus
            />

            <div className="space-y-3 mt-8">
              <button
                onClick={() => {
                  const finalDetails = { ...details, description: currentInput || "" };
                  onComplete(finalDetails);
                }}
                className={buttons.input.primary + " flex items-center justify-center gap-2"}
              >
                {currentInput ? "Finish" : "Skip & Finish"}
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="mt-4 text-center">
            <button
              onClick={handleBack}
              className={buttons.text}
              aria-label="Go back"
            >
              ← Back
            </button>
          </div>

          <p className="text-center text-sm text-gray-600 font-medium mt-4">Question 10 of 10</p>
        </div>
      </div>
    );
  }

  return null;
}
