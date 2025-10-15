import { buttons, cards, layouts, headers, typography, iconContainers, borderRadius } from "../styles/designSystem";

interface HomeScreenProps {
  onEmergency: () => void;
  onPastIncident: () => void;
}

export function HomeScreen({ onEmergency, onPastIncident }: HomeScreenProps) {
  const mockCases = [
    {
      id: "001",
      type: "UPI Scam",
      amount: "₹5,000",
      status: "In Progress",
      statusColor: "text-yellow-600",
      statusIcon: "🟡"
    },
    {
      id: "002",
      type: "Phishing",
      amount: "₹2,000",
      status: "Resolved",
      statusColor: "text-green-600",
      statusIcon: "✅"
    }
  ];

  return (
    <div className={layouts.screen}>
      {/* Header */}
      <header className={headers.appHeader}>
        <div className={`${layouts.containerWide} ${layouts.flexBetween}`}>
          <h1 className={typography.heading.h3}>UPI Scam Response</h1>
          <button className={iconContainers.small("bg-gray-100")}>
            👤
          </button>
        </div>
      </header>

      <div className={`${layouts.containerWide} ${layouts.padding} space-y-8`}>
        {/* Hero Section */}
        <div className={cards.hero}>
          <div className="max-w-2xl">
            <div className="text-4xl mb-4">🚨</div>
            <h2 className={typography.heading.h1 + " mb-3"}>URGENT HELP</h2>
            <p className={typography.body.large + " mb-6"}>
              Been scammed recently? Act now to recover your money. The faster you act, the better your chances of recovery.
            </p>

            <div className="space-y-4">
              <button
                onClick={onEmergency}
                className={buttons.primary.large + " animate-pulse"}
              >
                <span className="text-2xl mr-3">⚡</span>
                I've Been Scammed RIGHT NOW
              </button>

              <button
                onClick={onPastIncident}
                className={buttons.secondary.large}
              >
                Report a Past Incident
                <div className={typography.body.small + " mt-1"}>(More than 4 hours ago)</div>
              </button>
            </div>
          </div>
        </div>

        {/* Your Cases */}
        <div className={cards.secondary}>
          <div className={`${layouts.flexBetween} mb-6`}>
            <h2 className={typography.heading.h3}>📂 Your Cases</h2>
            <button className={buttons.link}>View All →</button>
          </div>

          <div className="space-y-4">
            {mockCases.map((case_) => (
              <div
                key={case_.id}
                className={cards.listItem}
              >
                <div className={layouts.flexBetween}>
                  <div>
                    <div className={typography.heading.h4 + " text-base"}>Case #{case_.id}</div>
                    <div className={typography.body.small + " mt-1"}>
                      {case_.type} • {case_.amount}
                    </div>
                    <div className={`${typography.body.small} mt-2 flex items-center gap-2 ${case_.statusColor}`}>
                      <span>{case_.statusIcon}</span>
                      Status: {case_.status}
                    </div>
                  </div>
                  <button className={buttons.link}>
                    View Details →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Prevention Tips */}
        <div className={cards.info}>
          <div className="flex items-start gap-4">
            <span className="text-3xl">💡</span>
            <div>
              <h3 className={typography.heading.h4}>Prevention Tips</h3>
              <p className={typography.body.small + " mb-3"}>Learn how to stay safe from UPI scams</p>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-semibold">
                Read More →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-3 md:hidden">
        <div className="flex items-center justify-around">
          <button className="flex flex-col items-center gap-1 text-red-600">
            <span className="text-xl">🏠</span>
            <span className="text-xs">Home</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-gray-400">
            <span className="text-xl">📂</span>
            <span className="text-xs">Cases</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-gray-400">
            <span className="text-xl">❓</span>
            <span className="text-xs">Help</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-gray-400">
            <span className="text-xl">👤</span>
            <span className="text-xs">Profile</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
