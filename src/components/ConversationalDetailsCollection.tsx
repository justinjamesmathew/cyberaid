import { useState } from "react";
import { ChevronRight, ChevronLeft, User, Phone, Mail, Building2, Receipt, IndianRupee, Calendar, Clock, UserX, FileText } from "lucide-react";
import { buttons, inputs, cards, iconContainers, typography, animations, spacing, layouts, badges } from "../styles/designSystem";
import { QuestionScreen } from "./QuestionScreen";
import { QuestionForm } from "./QuestionForm";

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
      <QuestionScreen
        icon={
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <User className="w-8 h-8 text-blue-600" />
          </div>
        }
        title="What's your name?"
        subtitle="We'll use this for all your complaints and communications"
        onBack={handleBack}
        questionNumber={1}
        totalQuestions={10}
      >
        <QuestionForm
          onSubmit={() => validateAndNext("yourName", currentInput, "phone")}
          error={error}
        >
          <input
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && validateAndNext("yourName", currentInput, "phone")}
            placeholder="Your full name (as per bank account)"
            className={inputs.text}
            autoFocus
          />
        </QuestionForm>
      </QuestionScreen>
    );
  }

  // Question: Phone
  if (currentStep === "phone") {
    return (
      <QuestionScreen
        icon={
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <Phone className="w-8 h-8 text-green-600" />
          </div>
        }
        title="Your phone number?"
        subtitle="Bank will use this to contact you about your case"
        onBack={handleBack}
        questionNumber={2}
        totalQuestions={10}
      >
        <QuestionForm
          onSubmit={() => validateAndNext("yourPhone", currentInput, "email")}
          error={error}
          secondaryButton={{
            label: "I'll add later",
            onClick: () => handleSkip("yourPhone", "[To be provided]", "email")
          }}
        >
          <input
            type="tel"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && validateAndNext("yourPhone", currentInput, "email")}
            placeholder="10-digit mobile number"
            className={inputs.text}
            autoFocus
          />
        </QuestionForm>
      </QuestionScreen>
    );
  }

  // Question: Email
  if (currentStep === "email") {
    return (
      <QuestionScreen
        icon={
          <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
            <Mail className="w-8 h-8 text-purple-600" />
          </div>
        }
        title="Your email address?"
        subtitle="Optional - for email communications with your bank"
        onBack={handleBack}
        questionNumber={3}
        totalQuestions={10}
      >
        <QuestionForm
          onSubmit={() => validateAndNext("yourEmail", currentInput, "bank")}
          error={error}
          secondaryButton={{
            label: "Skip",
            onClick: () => handleSkip("yourEmail", "", "bank")
          }}
        >
          <input
            type="email"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && validateAndNext("yourEmail", currentInput, "bank")}
            placeholder="your.email@example.com"
            className={inputs.text}
            autoFocus
          />
        </QuestionForm>
      </QuestionScreen>
    );
  }

  // Question: Bank Name
  if (currentStep === "bank") {
    return (
      <QuestionScreen
        icon={
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
            <Building2 className="w-8 h-8 text-indigo-600" />
          </div>
        }
        title="Which bank?"
        subtitle="Select your bank or type if not listed"
        onBack={handleBack}
        questionNumber={4}
        totalQuestions={10}
      >
        <QuestionForm
          onSubmit={() => currentInput && validateAndNext("bankName", currentInput, "transactionId")}
          error={error}
        >
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
        </QuestionForm>
      </QuestionScreen>
    );
  }

  // Question: Transaction ID
  if (currentStep === "transactionId") {
    return (
      <QuestionScreen
        icon={
          <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
            <Receipt className="w-8 h-8 text-orange-600" />
          </div>
        }
        title="Transaction ID?"
        subtitle="Find this in your UPI app or bank SMS"
        onBack={handleBack}
        questionNumber={5}
        totalQuestions={10}
      >
        <QuestionForm
          onSubmit={() => validateAndNext("transactionId", currentInput, "amount")}
          error={error}
          secondaryButton={{
            label: "Don't have it",
            onClick: () => handleNext("transactionId", "Will retrieve later", "amount")
          }}
        >
          <input
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && validateAndNext("transactionId", currentInput, "amount")}
            placeholder="e.g., 123456789012"
            className={inputs.text + " font-mono"}
            autoFocus
          />

          <div className="mt-4 p-4 bg-blue-50 border-2 border-blue-200 rounded-xl">
            <p className="text-sm text-blue-900 font-medium">
              💡 <strong>Where to find it:</strong> Open your payment app (PhonePe/GPay/Paytm), go to transaction history, and look for "UPI Ref No" or "Transaction ID"
            </p>
          </div>
        </QuestionForm>
      </QuestionScreen>
    );
  }

  // Question: Amount
  if (currentStep === "amount") {
    return (
      <QuestionScreen
        icon={
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
            <IndianRupee className="w-8 h-8 text-red-600" />
          </div>
        }
        title="How much was lost?"
        subtitle="Enter the amount that was fraudulently debited"
        onBack={handleBack}
        questionNumber={6}
        totalQuestions={10}
      >
        <QuestionForm
          onSubmit={() => validateAndNext("amountLost", currentInput, "date")}
          error={error}
        >
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
        </QuestionForm>
      </QuestionScreen>
    );
  }

  // Question: Date
  if (currentStep === "date") {
    return (
      <QuestionScreen
        icon={
          <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-100 rounded-full mb-4">
            <Calendar className="w-8 h-8 text-teal-600" />
          </div>
        }
        title="What date?"
        subtitle="When did this transaction happen?"
        onBack={handleBack}
        questionNumber={7}
        totalQuestions={10}
      >
        <QuestionForm
          onSubmit={() => validateAndNext("transactionDate", currentInput, "time")}
          error={error}
          secondaryButton={{
            label: "Today",
            onClick: () => handleNext("transactionDate", new Date().toISOString().split('T')[0], "time")
          }}
        >
          <input
            type="date"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            max={new Date().toISOString().split('T')[0]}
            className={inputs.text}
            autoFocus
          />
        </QuestionForm>
      </QuestionScreen>
    );
  }

  // Question: Time
  if (currentStep === "time") {
    return (
      <QuestionScreen
        icon={
          <div className="inline-flex items-center justify-center w-16 h-16 bg-cyan-100 rounded-full mb-4">
            <Clock className="w-8 h-8 text-cyan-600" />
          </div>
        }
        title="What time?"
        subtitle="Approximate time is fine"
        onBack={handleBack}
        questionNumber={8}
        totalQuestions={10}
      >
        <QuestionForm
          onSubmit={() => validateAndNext("transactionTime", currentInput, "recipient")}
          error={error}
        >
          <input
            type="time"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            className={inputs.text}
            autoFocus
          />

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
        </QuestionForm>
      </QuestionScreen>
    );
  }

  // Question: Recipient
  if (currentStep === "recipient") {
    return (
      <QuestionScreen
        icon={
          <div className="inline-flex items-center justify-center w-16 h-16 bg-pink-100 rounded-full mb-4">
            <UserX className="w-8 h-8 text-pink-600" />
          </div>
        }
        title="Recipient details?"
        subtitle="UPI ID or account number where money went (if known)"
        onBack={handleBack}
        questionNumber={9}
        totalQuestions={10}
      >
        <QuestionForm
          onSubmit={() => handleNext("recipientUPI", currentInput || "Unknown", "description")}
          secondaryButton={{
            label: "Unknown",
            onClick: () => handleNext("recipientUPI", "Unknown", "description")
          }}
        >
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
        </QuestionForm>
      </QuestionScreen>
    );
  }

  // Question: Description
  if (currentStep === "description") {
    return (
      <QuestionScreen
        icon={
          <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-4">
            <FileText className="w-8 h-8 text-amber-600" />
          </div>
        }
        title="Brief description?"
        subtitle="Optional - what happened in your own words"
        onBack={handleBack}
        questionNumber={10}
        totalQuestions={10}
      >
        <QuestionForm
          onSubmit={() => {
            const finalDetails = { ...details, description: currentInput || "" };
            onComplete(finalDetails);
          }}
          submitLabel={currentInput ? "Finish" : "Skip & Finish"}
        >
          <textarea
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            placeholder="e.g., Scanned QR code to pay ₹50 for groceries, but ₹5000 was deducted..."
            rows={5}
            className={inputs.textarea}
            autoFocus
          />
        </QuestionForm>
      </QuestionScreen>
    );
  }

  return null;
}
