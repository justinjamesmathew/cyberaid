import { useEffect, useState } from "react";

interface GoldenWindowProps {
  startTime: Date;
  windowHours?: number;
}

export function GoldenWindow({ startTime, windowHours = 4 }: GoldenWindowProps) {
  const [remaining, setRemaining] = useState("");
  const [percentage, setPercentage] = useState(100);

  useEffect(() => {
    const updateWindow = () => {
      const now = new Date();
      const elapsed = now.getTime() - startTime.getTime();
      const totalWindow = windowHours * 60 * 60 * 1000;
      const remainingMs = totalWindow - elapsed;
      
      if (remainingMs <= 0) {
        setRemaining("Window closed");
        setPercentage(0);
        return;
      }

      const hours = Math.floor(remainingMs / (1000 * 60 * 60));
      const minutes = Math.floor((remainingMs % (1000 * 60 * 60)) / (1000 * 60));
      
      setRemaining(`${hours}h ${minutes}m remaining`);
      setPercentage((remainingMs / totalWindow) * 100);
    };

    updateWindow();
    const interval = setInterval(updateWindow, 1000);
    return () => clearInterval(interval);
  }, [startTime, windowHours]);

  return (
    <div className="bg-gradient-to-br from-[#F59E0B] to-[#D97706] text-white rounded-2xl p-5 shadow-lg">
      <div className="flex items-center gap-3 mb-3">
        <span className="text-xl">⚡</span>
        <div className="flex-1">
          <div className="text-sm opacity-90">Golden Window</div>
          <div className="text-lg font-semibold">{remaining}</div>
        </div>
      </div>
      <div className="h-2 bg-white/30 rounded-full overflow-hidden">
        <div 
          className="h-full bg-white transition-all duration-1000 ease-linear rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
