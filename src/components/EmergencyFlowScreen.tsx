import { CountdownTimer } from "./CountdownTimer";
import { GoldenWindow } from "./GoldenWindow";
import { ProbabilityGauge } from "./ProbabilityGauge";
import { ArrowLeft, Mic, Camera, Type } from "lucide-react";
import { useState } from "react";

interface EmergencyFlowScreenProps {
  startTime: Date;
  onBack: () => void;
  onContinue: (data: { method: string; content: string }) => void;
}

export function EmergencyFlowScreen({ startTime, onBack, onContinue }: EmergencyFlowScreenProps) {
  const [textInput, setTextInput] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  const handleVoiceInput = () => {
    setIsRecording(true);
    // Simulate voice recording
    setTimeout(() => {
      setIsRecording(false);
      onContinue({
        method: "voice",
        content: "Scammed via UPI QR code at a shop. Paid ₹5,000 but wrong amount was deducted."
      });
    }, 2000);
  };

  const handlePhotoInput = () => {
    // Simulate photo capture
    onContinue({
      method: "photo",
      content: "Screenshot captured with transaction details"
    });
  };

  const handleTextSubmit = () => {
    if (textInput.trim()) {
      onContinue({
        method: "text",
        content: textInput
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="font-bold text-lg">Emergency Mode</h1>
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <span className="text-xl">❓</span>
          </button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-6 space-y-6">
        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CountdownTimer startTime={startTime} />
          <GoldenWindow startTime={startTime} />
        </div>

        <ProbabilityGauge percentage={85} />

        {/* Input Section */}
        <div className="bg-white rounded-3xl p-6 shadow-md border border-gray-200">
          <h2 className="text-xl font-bold mb-6">Tell Us What Happened</h2>

          <div className="space-y-4">
            {/* Voice Input */}
            <button
              onClick={handleVoiceInput}
              disabled={isRecording}
              className={`w-full bg-gradient-to-br from-[#DC2626] to-[#991B1B] text-white py-6 px-6 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed ${
                isRecording ? "animate-pulse" : ""
              }`}
            >
              <Mic className="inline-block w-8 h-8 mr-3" />
              {isRecording ? "Recording..." : "Tap & Tell Us What Happened"}
            </button>

            {/* Photo Input */}
            <button
              onClick={handlePhotoInput}
              className="w-full bg-white text-gray-700 py-5 px-6 rounded-2xl font-semibold border-2 border-gray-200 hover:border-red-300 hover:bg-gray-50 transition-all"
            >
              <Camera className="inline-block w-6 h-6 mr-3" />
              Take Photo of Transaction
            </button>

            {/* UPI Import */}
            <button className="w-full bg-white text-gray-700 py-5 px-6 rounded-2xl font-semibold border-2 border-gray-200 hover:border-red-300 hover:bg-gray-50 transition-all">
              <span className="text-xl mr-3">📱</span>
              Import from UPI App
            </button>

            {/* Divider */}
            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-gray-300" />
              <span className="text-sm text-gray-500">OR</span>
              <div className="flex-1 h-px bg-gray-300" />
            </div>

            {/* Text Input */}
            <div className="space-y-3">
              <textarea
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder="Type what happened here... (e.g., 'Scanned QR code, paid ₹5000 to wrong account')"
                className="w-full min-h-32 px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
              />
              <button
                onClick={handleTextSubmit}
                disabled={!textInput.trim()}
                className="w-full bg-red-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Type className="inline-block w-5 h-5 mr-2" />
                Continue with Text
              </button>
            </div>
          </div>
        </div>

        {/* Privacy Notice */}
        <div className="bg-green-50 border border-green-200 rounded-2xl p-5 flex items-start gap-3">
          <span className="text-2xl">🔒</span>
          <div>
            <div className="font-semibold text-green-900 mb-1">Your data is encrypted</div>
            <div className="text-sm text-green-800">
              We use bank-grade encryption and never share your information. You can delete your data anytime.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
