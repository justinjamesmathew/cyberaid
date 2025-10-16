import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, Copy, Mail, Check, Edit } from "lucide-react";
import { generateScenarioContent } from "../utils/scenarioContent";
import { getBankContacts } from "../data/bankContacts";

interface EmailBankCardProps {
  isExpanded: boolean;
  isCompleted: boolean;
  onToggle: () => void;
  onComplete: (data: { sentAt: Date }) => void;
  caseDetails: any;
  fraudScenario?: string;
}

export function EmailBankCard({
  isExpanded,
  isCompleted,
  onToggle,
  onComplete,
  caseDetails,
  fraudScenario
}: EmailBankCardProps) {
  const [emailBody, setEmailBody] = useState("");
  const [subject, setSubject] = useState("");
  const [toEmail, setToEmail] = useState("");
  const [ccEmail, setCcEmail] = useState("yourself@email.com");
  const [sendOption, setSendOption] = useState<"clipboard" | "mailto">("clipboard");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Generate scenario-specific email template
    const scenarioContent = generateScenarioContent(
      fraudScenario || caseDetails.fraudType || "Financial Fraud",
      caseDetails
    );

    // Get bank-specific contact information
    const bankContacts = getBankContacts(caseDetails.bank || "");
    setToEmail(bankContacts.email);
    setSubject(`Urgent: Fraud Report - Transaction ID ${caseDetails.transactionId}`);
    setEmailBody(scenarioContent.emailBody);
  }, [caseDetails, fraudScenario]);

  const handleCopy = () => {
    const fullEmail = `To: ${toEmail}
CC: ${ccEmail}
Subject: ${subject}

${emailBody}`;

    navigator.clipboard.writeText(fullEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleMailto = () => {
    const mailto = `mailto:${toEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}&cc=${ccEmail}`;
    window.location.href = mailto;
  };

  const handleSend = () => {
    if (sendOption === "mailto") {
      handleMailto();
    } else {
      handleCopy();
    }
  };

  const mockAttachments = [
    { name: "transaction_confirmation.jpg", size: "2.3 MB" },
    { name: "qr_code_photo.jpg", size: "1.8 MB" },
    { name: "bank_statement.pdf", size: "6.5 MB" },
    { name: "cybercrime_complaint.pdf", size: "0.8 MB" },
    { name: "timeline_document.pdf", size: "0.9 MB" }
  ];

  const totalAttachmentSize = "12.3 MB";

  return (
    <div className={`bg-white rounded-2xl border-2 transition-all ${
      isExpanded ? "border-orange-300 shadow-lg" : "border-gray-200 shadow-sm hover:border-orange-200"
    }`}>
      {/* Collapsed View */}
      {!isExpanded && (
        <div className="p-5">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl">{isCompleted ? "✅" : "❌"}</span>
            <h4 className="font-semibold text-lg">6. Email Bank Formal Complaint</h4>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Send official written complaint
          </p>
          <button
            onClick={onToggle}
            className="text-orange-600 hover:text-orange-700 font-semibold text-sm flex items-center gap-2"
          >
            COMPOSE EMAIL <ChevronDown className="w-4 h-4" />
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
              <h4 className="font-semibold text-lg">6. Email Bank Formal Complaint</h4>
            </div>
            <button
              onClick={onToggle}
              className="text-gray-500 hover:text-gray-700 flex items-center gap-1"
            >
              COLLAPSE <ChevronUp className="w-4 h-4" />
            </button>
          </div>

          {/* Info Banner */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <p className="text-sm text-blue-900">
              💡 A formal email creates a paper trail and strengthens your case for escalation
            </p>
          </div>

          {/* Email Details */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600 w-16">To:</span>
              <span className="font-semibold flex-1">{toEmail}</span>
              <button className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1">
                <Edit className="w-3 h-3" />
                EDIT
              </button>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600 w-16">CC:</span>
              <span className="flex-1">{ccEmail}</span>
              <button className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1">
                <Edit className="w-3 h-3" />
                EDIT
              </button>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-sm text-gray-600 w-16 pt-1">Subject:</span>
              <span className="font-semibold flex-1">{subject}</span>
            </div>
          </div>

          {/* Email Body */}
          <div>
            <h5 className="font-semibold mb-3">📧 Email Content</h5>
            <div className="border border-gray-200 rounded-xl p-5 bg-gray-50 max-h-96 overflow-y-auto">
              <pre className="text-sm whitespace-pre-wrap font-sans text-gray-800">
                {emailBody}
              </pre>
            </div>
          </div>

          <button className="text-blue-600 hover:text-blue-700 font-semibold text-sm flex items-center gap-2">
            <Edit className="w-4 h-4" />
            EDIT EMAIL
          </button>

          {/* Attachments */}
          <div className="border-t border-gray-200 pt-6">
            <h5 className="font-semibold mb-4">
              📎 Attachments ({mockAttachments.length} files, {totalAttachmentSize})
            </h5>

            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-2">
              {mockAttachments.map((attachment, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-2"
                >
                  <div className="flex items-center gap-3">
                    <input type="checkbox" defaultChecked className="w-4 h-4" />
                    <span className="text-sm">{attachment.name}</span>
                  </div>
                  <span className="text-sm text-gray-500">({attachment.size})</span>
                </div>
              ))}
            </div>

            <div className="flex gap-2 mt-3">
              <button className="text-sm text-blue-600 hover:text-blue-700 font-semibold">
                ADD MORE ATTACHMENTS
              </button>
              <span className="text-gray-300">•</span>
              <button className="text-sm text-red-600 hover:text-red-700">
                REMOVE ALL
              </button>
            </div>
          </div>

          {/* Send Options */}
          <div className="border-t border-gray-200 pt-6 space-y-4">
            <h5 className="font-semibold">Send Options:</h5>

            <div className="space-y-3">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="radio"
                  value="mailto"
                  checked={sendOption === "mailto"}
                  onChange={(e) => setSendOption(e.target.value as any)}
                  className="w-4 h-4 mt-1"
                />
                <div>
                  <div className="text-sm font-medium">Open in email app (Gmail, Outlook, etc.)</div>
                  <div className="text-xs text-gray-500">Recommended - Opens your default email client</div>
                </div>
              </label>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="radio"
                  value="clipboard"
                  checked={sendOption === "clipboard"}
                  onChange={(e) => setSendOption(e.target.value as any)}
                  className="w-4 h-4 mt-1"
                />
                <div>
                  <div className="text-sm font-medium">Copy to clipboard (paste into your email)</div>
                  <div className="text-xs text-gray-500">For manual sending via webmail</div>
                </div>
              </label>

              <label className="flex items-start gap-3 cursor-pointer opacity-50">
                <input
                  type="radio"
                  value="api"
                  disabled
                  className="w-4 h-4 mt-1"
                />
                <div>
                  <div className="text-sm font-medium">Send via API (requires configuration)</div>
                  <div className="text-xs text-gray-500">Not available in this version</div>
                </div>
              </label>
            </div>

            <div className="space-y-2 pt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="w-4 h-4" />
                <span className="text-sm">Keep a copy for my records</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="w-4 h-4" />
                <span className="text-sm">Mark as completed when sent</span>
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="border-t border-gray-200 pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <button
                onClick={handleCopy}
                className="flex items-center justify-center gap-2 bg-gray-100 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-5 h-5 text-green-600" />
                    COPIED!
                  </>
                ) : (
                  <>
                    <Copy className="w-5 h-5" />
                    COPY EMAIL
                  </>
                )}
              </button>

              <button
                onClick={handleMailto}
                className="flex items-center justify-center gap-2 bg-orange-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-orange-700 transition-colors"
              >
                <Mail className="w-5 h-5" />
                OPEN IN EMAIL APP
              </button>

              <button
                onClick={() => onComplete({ sentAt: new Date() })}
                className="flex items-center justify-center gap-2 bg-green-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-green-700 transition-colors"
              >
                <Check className="w-5 h-5" />
                MARK SENT
              </button>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
            <div className="font-semibold text-sm text-yellow-900 mb-2">💡 Tips for effective complaint email:</div>
            <ul className="space-y-1 text-sm text-yellow-800">
              <li className="flex items-start gap-2">
                <span>•</span>
                <span>Keep it formal and concise</span>
              </li>
              <li className="flex items-start gap-2">
                <span>•</span>
                <span>Include all reference numbers from previous actions</span>
              </li>
              <li className="flex items-start gap-2">
                <span>•</span>
                <span>Mention RBI guidelines for response timeline</span>
              </li>
              <li className="flex items-start gap-2">
                <span>•</span>
                <span>Request specific actions (freeze, reversal, investigation)</span>
              </li>
              <li className="flex items-start gap-2">
                <span>•</span>
                <span>Attach all available evidence</span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
