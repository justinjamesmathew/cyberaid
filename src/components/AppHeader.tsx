import { Shield } from "lucide-react";

export function AppHeader() {
  return (
    <header className="bg-white border-b-4 border-orange-500 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3.5">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-11 h-11 bg-orange-600 rounded-xl shadow-md">
            <Shield className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-orange-600">CyberAid</h1>
            <p className="text-xs text-gray-600 font-medium">UPI Fraud Response Assistant</p>
          </div>
        </div>
      </div>
    </header>
  );
}
