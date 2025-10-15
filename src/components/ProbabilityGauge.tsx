interface ProbabilityGaugeProps {
  percentage: number;
}

export function ProbabilityGauge({ percentage }: ProbabilityGaugeProps) {
  const radius = 60;
  const strokeWidth = 12;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const getColor = () => {
    if (percentage >= 71) return "#10B981";
    if (percentage >= 41) return "#F59E0B";
    return "#DC2626";
  };

  const getMessage = () => {
    if (percentage >= 71) return "Excellent - Act Now!";
    if (percentage >= 41) return "Good - Quick Action Needed";
    return "Low - Act Immediately";
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
      <div className="text-center">
        <div className="font-semibold mb-4">📈 Recovery Probability</div>
        <div className="relative inline-block">
          <svg height={radius * 2} width={radius * 2}>
            <circle
              stroke="#E5E7EB"
              fill="transparent"
              strokeWidth={strokeWidth}
              r={normalizedRadius}
              cx={radius}
              cy={radius}
            />
            <circle
              stroke={getColor()}
              fill="transparent"
              strokeWidth={strokeWidth}
              strokeDasharray={circumference + ' ' + circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              r={normalizedRadius}
              cx={radius}
              cy={radius}
              className="transition-all duration-1000 ease-out"
              style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-4xl font-bold text-gray-800">{percentage}%</div>
          </div>
        </div>
        <div className="mt-4 text-sm text-gray-600">{getMessage()}</div>
      </div>
    </div>
  );
}
