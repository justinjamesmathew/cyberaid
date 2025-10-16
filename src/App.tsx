import { useState } from "react";
import { HomeScreen } from "./components/HomeScreen";
import { EmergencyFlowScreen } from "./components/EmergencyFlowScreen";
import { ConfirmationScreen } from "./components/ConfirmationScreen";
import { ActionPlanFlow } from "./components/ActionPlanFlow";
import { BranchingTriageFlow, TriageResult } from "./components/BranchingTriageFlow";
import { ConversationalDetailsCollection, TransactionDetails } from "./components/ConversationalDetailsCollection";
import { AppHeader } from "./components/AppHeader";
import { Toaster } from "./components/ui/sonner";

type Screen = "home" | "triage" | "details" | "emergency" | "confirmation" | "dashboard";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("home");
  const [incidentStartTime] = useState(new Date());
  const [inputData, setInputData] = useState<any>(null);
  const [confirmedData, setConfirmedData] = useState<any>(null);
  const [triageData, setTriageData] = useState<TriageResult | null>(null);

  // Mock AI extraction based on user input
  const extractDataFromInput = (data: { method: string; content: string }) => {
    return {
      fraudType: "UPI QR Code Scam",
      transactionId: "123456789012",
      amount: "₹5,000",
      dateTime: "Oct 12, 2025, 2:30 PM",
      recipientUPI: "scammer@paytm",
      bank: "HDFC Bank",
      description: data.content
    };
  };

  const handleEmergency = () => {
    setCurrentScreen("triage");
  };

  const handlePastIncident = () => {
    // Past incidents also go through triage
    setCurrentScreen("triage");
  };

  const handleTriageComplete = (result: TriageResult) => {
    setTriageData(result);
    // Go to details collection screen instead of dashboard
    setCurrentScreen("details");
  };

  const handleDetailsComplete = (details: TransactionDetails) => {
    // Merge triage data with collected details
    const confirmedData = {
      // Fraud identification from triage
      fraudType: triageData?.fraudScenario || "Financial Fraud",
      urgencyLevel: triageData?.urgencyLevel || "high",
      recommendedActions: triageData?.actions || [],
      recoveryProbability: triageData?.recoveryProbability || 50,

      // Personal details
      name: details.yourName,
      mobile: details.yourPhone,
      email: details.yourEmail,

      // Bank details
      bank: details.bankName,
      accountNumber: details.accountNumber,

      // Transaction details
      transactionId: details.transactionId,
      amount: `₹${details.amountLost}`,
      dateTime: `${new Date(details.transactionDate).toLocaleDateString("en-IN", {
        month: "short",
        day: "numeric",
        year: "numeric"
      })}, ${details.transactionTime}`,

      // Recipient details
      recipientUPI: details.recipientUPI || "",
      recipientAccount: details.recipientAccount || "",
      recipientName: details.recipientName || "",

      // Description
      description: details.description || triageData?.fraudScenario || ""
    };

    setConfirmedData(confirmedData);
    setCurrentScreen("dashboard");
  };

  const handleInputComplete = (data: { method: string; content: string }) => {
    const extracted = extractDataFromInput(data);
    setInputData(extracted);
    setCurrentScreen("confirmation");
  };

  const handleConfirm = (data: any) => {
    setConfirmedData(data);
    setCurrentScreen("dashboard");
  };

  const handleBack = () => {
    if (currentScreen === "triage") {
      setCurrentScreen("home");
    } else if (currentScreen === "details") {
      setCurrentScreen("triage");
    } else if (currentScreen === "emergency") {
      setCurrentScreen("triage");
    } else if (currentScreen === "confirmation") {
      setCurrentScreen("emergency");
    } else if (currentScreen === "dashboard") {
      setCurrentScreen("home");
    }
  };

  return (
    <div className="size-full flex flex-col">
      <AppHeader />
      <div className="flex-1 overflow-auto">
        {currentScreen === "home" && (
          <HomeScreen
            onEmergency={handleEmergency}
            onPastIncident={handlePastIncident}
          />
        )}

      {currentScreen === "triage" && (
        <BranchingTriageFlow onComplete={handleTriageComplete} />
      )}

      {currentScreen === "details" && triageData && (
        <ConversationalDetailsCollection
          fraudScenario={triageData.fraudScenario}
          urgencyLevel={triageData.urgencyLevel}
          nextStepsPreview={triageData.actions.map(action => action.title)}
          triageAnswers={triageData.answers}
          onComplete={handleDetailsComplete}
          onBack={handleBack}
        />
      )}

      {currentScreen === "emergency" && (
        <EmergencyFlowScreen
          startTime={incidentStartTime}
          onBack={handleBack}
          onContinue={handleInputComplete}
        />
      )}

      {currentScreen === "confirmation" && inputData && (
        <ConfirmationScreen
          onBack={handleBack}
          onConfirm={handleConfirm}
          extractedData={inputData}
        />
      )}

      {currentScreen === "dashboard" && confirmedData && (
        <ActionPlanFlow
          caseId="INC-001"
          caseDetails={confirmedData}
        />
      )}
      </div>

      <Toaster position="top-center" richColors />
    </div>
  );
}