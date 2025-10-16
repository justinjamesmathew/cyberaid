import { Shield } from "lucide-react";

export function AppHeader() {
  return (
    <header className="bg-gradient-to-r from-orange-600 via-orange-700 to-red-600 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3.5">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-11 h-11 bg-white rounded-xl shadow-md">
            <Shield className="w-7 h-7 text-orange-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">CyberAid</h1>
            <p className="text-xs text-white/90 font-medium">UPI Fraud Response Assistant</p>
          </div>
        </div>
      </div>
    </header>
  );
}
