import { layouts, typography, cards, buttons, animations, badges } from "../styles/designSystem";

interface ActionIntroScreenProps {
  caseId: string;
  caseDetails: any;
  onStart: () => void;
}

export function ActionIntroScreen({ caseId, caseDetails, onStart }: ActionIntroScreenProps) {
  return (
    <div className={layouts.screenGradient}>
      <div className={layouts.container + " px-6 py-8"}>
        {/* Header */}
        <div className={"text-center mb-8 " + animations.slideUp}>
          <div className="inline-flex items-center justify-center w-24 h-24 bg-red-600 rounded-full mb-6 shadow-2xl">
            <span className="text-5xl">🚨</span>
          </div>
          <h1 className={typography.heading.h1 + " mb-3"}>Your Emergency Action Plan</h1>
          <div className="inline-block mb-4">
            <span className={badges.urgency("critical")}>CRITICAL PRIORITY</span>
          </div>
          <p className={typography.body.base + " text-gray-700 mb-2"}>
            Case #{caseId}
          </p>
          <p className={typography.body.small + " text-gray-600"}>
            {caseDetails.fraudType} • {caseDetails.amount} • {caseDetails.dateTime}
          </p>
        </div>

        {/* Critical Actions Card */}
        <div className={cards.hero + " mb-6 " + animations.slideUp}>
          <div className="text-center mb-6">
            <h2 className={typography.heading.h3 + " text-red-700 mb-2"}>
              3 Critical Actions
            </h2>
            <p className={typography.body.small + " text-red-600"}>
              Complete these within the next 15 minutes
            </p>
          </div>

          <div className="space-y-4">
            {/* Action 1 */}
            <div className="flex items-start gap-4 p-4 bg-white rounded-xl border-2 border-red-200">
              <div className="flex-shrink-0 w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <div className="flex-1">
                <h3 className={typography.heading.h4 + " mb-1"}>Call Bank Fraud Line</h3>
                <p className={typography.body.small}>
                  Report the fraud and request immediate account review
                </p>
              </div>
              <span className="text-2xl">📞</span>
            </div>

            {/* Action 2 */}
            <div className="flex items-start gap-4 p-4 bg-white rounded-xl border-2 border-red-200">
              <div className="flex-shrink-0 w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <div className="flex-1">
                <h3 className={typography.heading.h4 + " mb-1"}>Request Account Freeze</h3>
                <p className={typography.body.small}>
                  Send SMS to freeze your account and prevent further fraud
                </p>
              </div>
              <span className="text-2xl">💬</span>
            </div>

            {/* Action 3 */}
            <div className="flex items-start gap-4 p-4 bg-white rounded-xl border-2 border-red-200">
              <div className="flex-shrink-0 w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <div className="flex-1">
                <h3 className={typography.heading.h4 + " mb-1"}>File Cybercrime Complaint</h3>
                <p className={typography.body.small}>
                  Register official complaint with National Cybercrime Portal
                </p>
              </div>
              <span className="text-2xl">🔒</span>
            </div>
          </div>
        </div>

        {/* Important Info Card */}
        <div className="bg-blue-50 rounded-xl p-5 border-2 border-blue-200 mb-6">
          <div className="flex items-start gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <h3 className={typography.heading.h4 + " text-blue-900 mb-2"}>
                Before You Start
              </h3>
              <ul className="space-y-2 text-sm text-blue-800">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span>Keep your transaction details handy</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span>Have a pen and paper ready to note reference numbers</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span>Follow each step carefully - we'll guide you through</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Start Button */}
        <button
          onClick={onStart}
          className={buttons.primary.large + " flex items-center justify-center gap-3"}
        >
          <span className="text-2xl">🚀</span>
          START EMERGENCY ACTIONS
        </button>

        <p className={typography.body.small + " text-center text-gray-600 mt-4"}>
          Time is critical. Let's protect your money now.
        </p>
      </div>
    </div>
  );
}
