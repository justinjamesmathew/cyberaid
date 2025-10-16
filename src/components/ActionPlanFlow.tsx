import { useState } from "react";
import { ActionIntroScreen } from "./ActionIntroScreen";
import { ActionStepScreen } from "./ActionStepScreen";
import { ActionDashboard } from "./ActionDashboard";
import { CallScriptModal } from "./CallScriptModal";
import { SMSPreviewModal } from "./SMSPreviewModal";
import { cards, buttons, typography, spacing } from "../styles/designSystem";
import { getBankContacts } from "../data/bankContacts";

interface ActionPlanFlowProps {
  caseId: string;
  caseDetails: any;
}

type FlowStep = "intro" | "step1" | "step2" | "step3" | "dashboard";

export function ActionPlanFlow({ caseId, caseDetails }: ActionPlanFlowProps) {
  const [currentStep, setCurrentStep] = useState<FlowStep>("intro");
  const [callModalOpen, setCallModalOpen] = useState(false);
  const [smsModalOpen, setSmsModalOpen] = useState(false);

  const [actions, setActions] = useState({
    callBank: { status: "pending" as const, ref: "" },
    sendSMS: { status: "pending" as const, ref: "" },
    fileCybercrime: { status: "pending" as const, ref: "" }
  });

  // Get bank-specific contact information
  const bankContacts = getBankContacts(caseDetails.bank || "");

  const handleMarkDone = (actionKey: keyof typeof actions, ref?: string) => {
    setActions(prev => ({
      ...prev,
      [actionKey]: { status: "completed", ref: ref || prev[actionKey].ref }
    }));
  };

  const handleReferenceChange = (actionKey: keyof typeof actions, ref: string) => {
    setActions(prev => ({
      ...prev,
      [actionKey]: { ...prev[actionKey], ref }
    }));
  };

  // Intro Screen
  if (currentStep === "intro") {
    return (
      <ActionIntroScreen
        caseId={caseId}
        caseDetails={caseDetails}
        onStart={() => setCurrentStep("step1")}
      />
    );
  }

  // Step 1: Call Bank
  if (currentStep === "step1") {
    return (
      <>
        <ActionStepScreen
          stepNumber={1}
          totalSteps={3}
          title="Call Bank Fraud Line"
          description="Report the fraud immediately and request account review"
          icon="📞"
          onNext={() => setCurrentStep("step2")}
          onSkip={() => setCurrentStep("step2")}
        >
          <div className={cards.primary}>
            <h3 className={typography.heading.h3 + " mb-4"}>What to do:</h3>

            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center font-bold text-sm">
                  1
                </span>
                <div>
                  <h4 className={typography.heading.h4 + " mb-1"}>Call {bankContacts.name} fraud helpline</h4>
                  <p className={typography.body.small}>
                    We've found the correct number: {bankContacts.fraudHelplineDisplay}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center font-bold text-sm">
                  2
                </span>
                <div>
                  <h4 className={typography.heading.h4 + " mb-1"}>Use our call script</h4>
                  <p className={typography.body.small}>
                    We've prepared exactly what to say with all your details
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center font-bold text-sm">
                  3
                </span>
                <div>
                  <h4 className={typography.heading.h4 + " mb-1"}>Note the reference number</h4>
                  <p className={typography.body.small}>
                    You'll receive a complaint reference number - keep it safe
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => setCallModalOpen(true)}
                className={buttons.primary.base + " flex items-center justify-center gap-2"}
              >
                <span className="text-xl">📞</span>
                VIEW CALL SCRIPT & NUMBER
              </button>

              {actions.callBank.status === "pending" && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                  <p className={typography.body.small + " text-yellow-800 mb-3"}>
                    Did you complete the call?
                  </p>
                  <input
                    type="text"
                    placeholder="Enter reference number (optional)"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg mb-3 focus:ring-4 focus:ring-blue-200 focus:border-blue-500 focus:outline-none"
                    value={actions.callBank.ref}
                    onChange={(e) => handleReferenceChange("callBank", e.target.value)}
                  />
                  <button
                    onClick={() => {
                      handleMarkDone("callBank");
                    }}
                    className={buttons.secondary.base}
                  >
                    ✓ Yes, I Called the Bank
                  </button>
                </div>
              )}

              {actions.callBank.status === "completed" && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">✅</span>
                    <span className={typography.heading.h4 + " text-green-900"}>
                      Call Completed!
                    </span>
                  </div>
                  {actions.callBank.ref && (
                    <p className={typography.body.small + " text-green-800"}>
                      Reference: {actions.callBank.ref}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </ActionStepScreen>

        <CallScriptModal
          isOpen={callModalOpen}
          onClose={() => setCallModalOpen(false)}
          caseDetails={caseDetails}
          phoneNumber={bankContacts.fraudHelpline}
          phoneNumberDisplay={bankContacts.fraudHelplineDisplay}
          bankName={bankContacts.name}
          fraudScenario={caseDetails.fraudType}
        />
      </>
    );
  }

  // Step 2: Send SMS
  if (currentStep === "step2") {
    return (
      <>
        <ActionStepScreen
          stepNumber={2}
          totalSteps={3}
          title="Request Account Freeze"
          description="Send SMS to freeze your account and prevent further fraud"
          icon="💬"
          onNext={() => setCurrentStep("step3")}
          onSkip={() => setCurrentStep("step3")}
        >
          <div className={cards.primary}>
            <h3 className={typography.heading.h3 + " mb-4"}>What to do:</h3>

            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold text-sm">
                  1
                </span>
                <div>
                  <h4 className={typography.heading.h4 + " mb-1"}>Review the pre-filled SMS</h4>
                  <p className={typography.body.small}>
                    We've created the message with all your transaction details
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold text-sm">
                  2
                </span>
                <div>
                  <h4 className={typography.heading.h4 + " mb-1"}>Send to {bankContacts.name} SMS number</h4>
                  <p className={typography.body.small}>
                    We've found the correct number: {bankContacts.smsNumberDisplay}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold text-sm">
                  3
                </span>
                <div>
                  <h4 className={typography.heading.h4 + " mb-1"}>Save confirmation</h4>
                  <p className={typography.body.small}>
                    You'll get a confirmation SMS - screenshot it
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => setSmsModalOpen(true)}
                className={buttons.primary.base + " flex items-center justify-center gap-2"}
              >
                <span className="text-xl">💬</span>
                VIEW SMS TEMPLATE
              </button>

              {actions.sendSMS.status === "pending" && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                  <p className={typography.body.small + " text-yellow-800 mb-3"}>
                    Did you send the SMS?
                  </p>
                  <button
                    onClick={() => handleMarkDone("sendSMS")}
                    className={buttons.secondary.base}
                  >
                    ✓ Yes, I Sent the SMS
                  </button>
                </div>
              )}

              {actions.sendSMS.status === "completed" && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">✅</span>
                    <span className={typography.heading.h4 + " text-green-900"}>
                      SMS Sent!
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </ActionStepScreen>

        <SMSPreviewModal
          isOpen={smsModalOpen}
          onClose={() => setSmsModalOpen(false)}
          caseDetails={caseDetails}
          smsNumber={bankContacts.smsNumber}
          smsNumberDisplay={bankContacts.smsNumberDisplay}
          bankName={bankContacts.name}
          fraudScenario={caseDetails.fraudType}
        />
      </>
    );
  }

  // Step 3: File Cybercrime
  if (currentStep === "step3") {
    return (
      <ActionStepScreen
        stepNumber={3}
        totalSteps={3}
        title="File Cybercrime Complaint"
        description="Register official complaint with National Cybercrime Portal"
        icon="🔒"
        onNext={() => setCurrentStep("dashboard")}
        onSkip={() => setCurrentStep("dashboard")}
        nextLabel="Go to Dashboard"
      >
        <div className={cards.primary}>
          <h3 className={typography.heading.h3 + " mb-4"}>What to do:</h3>

          <div className="space-y-4 mb-6">
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold text-sm">
                1
              </span>
              <div>
                <h4 className={typography.heading.h4 + " mb-1"}>Visit National Cybercrime Portal</h4>
                <p className={typography.body.small}>
                  Official government portal for reporting cyber fraud
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold text-sm">
                2
              </span>
              <div>
                <h4 className={typography.heading.h4 + " mb-1"}>Fill in your details</h4>
                <p className={typography.body.small}>
                  Use the transaction information you've already provided
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold text-sm">
                3
              </span>
              <div>
                <h4 className={typography.heading.h4 + " mb-1"}>Save your complaint number</h4>
                <p className={typography.body.small}>
                  You'll receive an ACK number - this is very important
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => window.open("https://cybercrime.gov.in", "_blank")}
              className={buttons.primary.base + " flex items-center justify-center gap-2"}
            >
              <span className="text-xl">🚨</span>
              OPEN CYBERCRIME PORTAL
            </button>

            {actions.fileCybercrime.status === "pending" && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                <p className={typography.body.small + " text-yellow-800 mb-3"}>
                  Did you file the complaint?
                </p>
                <input
                  type="text"
                  placeholder="Enter ACK/Complaint number"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg mb-3 focus:ring-4 focus:ring-blue-200 focus:border-blue-500 focus:outline-none"
                  value={actions.fileCybercrime.ref}
                  onChange={(e) => handleReferenceChange("fileCybercrime", e.target.value)}
                />
                <button
                  onClick={() => handleMarkDone("fileCybercrime")}
                  className={buttons.secondary.base}
                >
                  ✓ Yes, I Filed the Complaint
                </button>
              </div>
            )}

            {actions.fileCybercrime.status === "completed" && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">✅</span>
                  <span className={typography.heading.h4 + " text-green-900"}>
                    Complaint Filed!
                  </span>
                </div>
                {actions.fileCybercrime.ref && (
                  <p className={typography.body.small + " text-green-800"}>
                    ACK: {actions.fileCybercrime.ref}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </ActionStepScreen>
    );
  }

  // Dashboard
  return (
    <ActionDashboard
      caseId={caseId}
      caseDetails={caseDetails}
      initialActions={actions}
    />
  );
}
