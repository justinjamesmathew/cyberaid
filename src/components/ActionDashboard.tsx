import { ActionCard } from "./ActionCard";
import { CallScriptModal } from "./CallScriptModal";
import { SMSPreviewModal } from "./SMSPreviewModal";
import { FollowUpActions } from "./FollowUpActions";
import { useState } from "react";
import { layouts, headers, typography, cards, progress, badges } from "../styles/designSystem";

interface ActionDashboardProps {
  caseId: string;
  caseDetails: any;
  initialActions?: {
    callBank: { status: "pending" | "completed", ref: string };
    sendSMS: { status: "pending" | "completed", ref: string };
    fileCybercrime: { status: "pending" | "completed", ref: string };
  };
}

export function ActionDashboard({ caseId, caseDetails, initialActions }: ActionDashboardProps) {
  const [callModalOpen, setCallModalOpen] = useState(false);
  const [smsModalOpen, setSmsModalOpen] = useState(false);
  const [actions, setActions] = useState(initialActions || {
    callBank: { status: "pending" as const, ref: "" },
    sendSMS: { status: "pending" as const, ref: "" },
    fileCybercrime: { status: "pending" as const, ref: "" }
  });

  const completedCount = Object.values(actions).filter(a => a.status === "completed").length;
  const totalImmediate = 3;
  const progressPercentage = (completedCount / totalImmediate) * 100;

  const handleMarkDone = (actionKey: string) => {
    setActions(prev => ({
      ...prev,
      [actionKey]: { ...prev[actionKey as keyof typeof prev], status: "completed" }
    }));
  };

  const handleReferenceChange = (actionKey: string, ref: string) => {
    setActions(prev => ({
      ...prev,
      [actionKey]: { ...prev[actionKey as keyof typeof prev], ref }
    }));
  };

  return (
    <div className={layouts.screen + " pb-24"}>
      {/* Header */}
      <header className={headers.appHeader}>
        <div className={layouts.containerWide}>
          <div className={`${layouts.flexBetween} ${typography.body.small} mb-2`}>
            <span className="font-semibold">Case #{caseId}</span>
            <span className={badges.urgency("critical")}>ACTIVE CASE</span>
          </div>
        </div>
      </header>

      <div className={`${layouts.containerWide} px-6 py-6 space-y-6`}>
        {/* Progress Card */}
        <div className={cards.secondary}>
          <h2 className={typography.heading.h3 + " mb-4"}>Your Emergency Action Plan</h2>
          <div className={typography.body.small + " mb-4"}>
            {caseDetails.fraudType} • {caseDetails.amount} • {caseDetails.dateTime}
          </div>

          <div className="mb-4">
            <div className={`${layouts.flexBetween} ${typography.body.small} mb-2`}>
              <span className="font-semibold">Critical Actions: {completedCount}/{totalImmediate} Complete</span>
              <span className="text-gray-600">{Math.round(progressPercentage)}%</span>
            </div>
            <div className={progress.container}>
              <div
                className={progress.barRed}
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          {completedCount === totalImmediate && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <div className="flex items-center gap-2">
                <span className="text-xl">✅</span>
                <div>
                  <div className="font-semibold text-green-900">Great work! All critical actions complete</div>
                  <div className={typography.body.small + " text-green-800"}>Now focus on the follow-up actions below</div>
                </div>
              </div>
            </div>
          )}

          {completedCount < totalImmediate && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <div className="flex items-center gap-2">
                <span className="text-xl">⚡</span>
                <div>
                  <div className="font-semibold text-amber-900">
                    {totalImmediate - completedCount} critical {totalImmediate - completedCount === 1 ? 'action' : 'actions'} remaining
                  </div>
                  <div className={typography.body.small + " text-amber-800"}>Complete these as soon as possible</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Immediate Actions */}
        <div>
          <div className={headers.section}>
            <h3 className={headers.sectionTitle + " text-red-600"}>⚡ IMMEDIATE ACTIONS</h3>
            <p className={headers.sectionSubtitle}>Do these first (next 15 mins)</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <ActionCard
              number={1}
              title="Call Bank Fraud Line"
              status={actions.callBank.status}
              urgent
              primaryAction={{
                label: "CALL NOW",
                icon: "📞",
                onClick: () => setCallModalOpen(true)
              }}
              secondaryActions={[
                { label: "VIEW SCRIPT 📄", onClick: () => setCallModalOpen(true) }
              ]}
              onMarkDone={() => handleMarkDone("callBank")}
              referenceNumber={actions.callBank.ref}
              onReferenceChange={(ref) => handleReferenceChange("callBank", ref)}
            />

            <ActionCard
              number={2}
              title="Request Account Freeze"
              status={actions.sendSMS.status}
              urgent
              primaryAction={{
                label: "SEND SMS",
                icon: "💬",
                onClick: () => setSmsModalOpen(true)
              }}
              secondaryActions={[
                { label: "PREVIEW", onClick: () => setSmsModalOpen(true) }
              ]}
              onMarkDone={() => handleMarkDone("sendSMS")}
              referenceNumber={actions.sendSMS.ref}
              onReferenceChange={(ref) => handleReferenceChange("sendSMS", ref)}
            />

            <ActionCard
              number={3}
              title="File Cybercrime Complaint"
              status={actions.fileCybercrime.status}
              urgent
              primaryAction={{
                label: "FILE COMPLAINT",
                icon: "🚨",
                onClick: () => window.open("https://cybercrime.gov.in", "_blank")
              }}
              secondaryActions={[
                { label: "START", onClick: () => {} }
              ]}
              onMarkDone={() => handleMarkDone("fileCybercrime")}
              referenceNumber={actions.fileCybercrime.ref}
              onReferenceChange={(ref) => handleReferenceChange("fileCybercrime", ref)}
            />
          </div>
        </div>

        {/* Follow-up Actions */}
        <FollowUpActions
          caseDetails={caseDetails}
          onUpdate={(action, data) => console.log("Follow-up action completed:", action, data)}
          fraudScenario={caseDetails.fraudType}
        />

        {/* Escalation */}
        <div>
          <div className={headers.section}>
            <h3 className={headers.sectionTitle + " text-gray-600"}>⏰ ESCALATION</h3>
            <p className={headers.sectionSubtitle}>If no response</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-100 rounded-2xl p-5 border border-gray-300">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">🔒</span>
                <h4 className={typography.heading.h4 + " text-gray-700"}>NPCI Escalation</h4>
              </div>
              <div className={typography.body.small + " mb-3"}>Available in 10 days (Oct 22)</div>
              <button className="text-gray-600 hover:text-gray-700 text-sm font-semibold">
                SET REMINDER
              </button>
            </div>

            <div className="bg-gray-100 rounded-2xl p-5 border border-gray-300">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">🔒</span>
                <h4 className={typography.heading.h4 + " text-gray-700"}>RBI Ombudsman</h4>
              </div>
              <div className={typography.body.small + " mb-3"}>Available in 30 days (Nov 11)</div>
              <button className="text-gray-600 hover:text-gray-700 text-sm font-semibold">
                SET REMINDER
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-around">
          <button className="flex flex-col items-center gap-1 text-red-600">
            <span className="text-xl">📊</span>
            <span className="text-xs">Dashboard</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-gray-400">
            <span className="text-xl">📅</span>
            <span className="text-xs">Timeline</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-gray-400">
            <span className="text-xl">📁</span>
            <span className="text-xs">Evidence</span>
          </button>
        </div>
      </nav>

      {/* Modals */}
      <CallScriptModal
        isOpen={callModalOpen}
        onClose={() => setCallModalOpen(false)}
        caseDetails={{
          name: "Your Name",
          mobile: "9876543210",
          bank: caseDetails.bank,
          transactionId: caseDetails.transactionId,
          amount: caseDetails.amount,
          date: caseDetails.dateTime,
          recipientUPI: caseDetails.recipientUPI
        }}
        phoneNumber="1800-XXX-XXXX"
        fraudScenario={caseDetails.fraudType}
      />

      <SMSPreviewModal
        isOpen={smsModalOpen}
        onClose={() => setSmsModalOpen(false)}
        caseDetails={{
          bank: caseDetails.bank,
          transactionId: caseDetails.transactionId,
          amount: caseDetails.amount,
          date: caseDetails.dateTime,
          name: "Your Name",
          mobile: "9876543210"
        }}
        smsNumber="XXXX"
        fraudScenario={caseDetails.fraudType}
      />
    </div>
  );
}
