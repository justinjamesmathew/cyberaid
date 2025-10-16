import { Shield } from "lucide-react";

export function AppHeader() {
  return (
    <header className="bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 bg-white rounded-lg">
            <Shield className="w-6 h-6 text-orange-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">CyberAid</h1>
            <p className="text-xs text-orange-100">UPI Fraud Response Assistant</p>
          </div>
        </div>
      </div>
    </header>
  );
}
