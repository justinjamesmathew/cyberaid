import { useState } from "react";
import { UPIDisputeCard } from "./UPIDisputeCard";
import { EvidenceCard } from "./EvidenceCard";
import { EmailBankCard } from "./EmailBankCard";
import { headers } from "../styles/designSystem";

interface FollowUpActionsProps {
  caseDetails: any;
  onUpdate?: (action: string, data: any) => void;
  fraudScenario?: string;
}

export function FollowUpActions({ caseDetails, onUpdate, fraudScenario }: FollowUpActionsProps) {
  const [expanded, setExpanded] = useState({
    upiDispute: false,
    evidence: false,
    emailBank: false
  });

  const [completed, setCompleted] = useState({
    upiDispute: false,
    evidence: false,
    emailBank: false
  });

  const handleToggle = (card: keyof typeof expanded) => {
    setExpanded(prev => ({
      ...prev,
      [card]: !prev[card]
    }));
  };

  const handleComplete = (card: keyof typeof completed, data: any) => {
    setCompleted(prev => ({
      ...prev,
      [card]: true
    }));
    onUpdate?.(card, data);
  };

  return (
    <div>
      <div className={headers.section}>
        <h3 className={headers.sectionTitle + " text-orange-600"}>
          📋 FOLLOW-UP ACTIONS
        </h3>
        <p className={headers.sectionSubtitle}>Do within 24 hours</p>
      </div>

      <div className="space-y-4">
        <UPIDisputeCard
          isExpanded={expanded.upiDispute}
          isCompleted={completed.upiDispute}
          onToggle={() => handleToggle("upiDispute")}
          onComplete={(data) => handleComplete("upiDispute", data)}
          caseDetails={caseDetails}
        />

        <EvidenceCard
          isExpanded={expanded.evidence}
          isCompleted={completed.evidence}
          onToggle={() => handleToggle("evidence")}
          onComplete={(data) => handleComplete("evidence", data)}
          caseDetails={caseDetails}
        />

        <EmailBankCard
          isExpanded={expanded.emailBank}
          isCompleted={completed.emailBank}
          onToggle={() => handleToggle("emailBank")}
          onComplete={(data) => handleComplete("emailBank", data)}
          caseDetails={caseDetails}
          fraudScenario={fraudScenario}
        />
      </div>
    </div>
  );
}
