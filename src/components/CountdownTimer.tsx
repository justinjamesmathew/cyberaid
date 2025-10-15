import { useEffect, useState } from "react";

interface CountdownTimerProps {
  startTime: Date;
}

export function CountdownTimer({ startTime }: CountdownTimerProps) {
  const [elapsed, setElapsed] = useState("");

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const diff = now.getTime() - startTime.getTime();
      
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      if (hours > 0) {
        setElapsed(`${hours}h ${minutes}m`);
      } else if (minutes > 0) {
        setElapsed(`${minutes} minutes`);
      } else {
        setElapsed(`${seconds} seconds`);
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [startTime]);

  return (
    <div className="bg-gradient-to-br from-[#DC2626] to-[#991B1B] text-white rounded-2xl p-5 shadow-lg animate-pulse">
      <div className="flex items-center gap-3">
        <span className="text-2xl">⏱️</span>
        <div>
          <div className="text-sm opacity-90">Time Since Fraud</div>
          <div className="text-3xl font-bold">{elapsed}</div>
        </div>
      </div>
    </div>
  );
}
