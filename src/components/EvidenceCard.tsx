import { useState } from "react";
import { ChevronDown, ChevronUp, Download, Shield } from "lucide-react";
import { FileUpload } from "./FileUpload";
import { EvidenceItemCard, EvidenceItem } from "./EvidenceItemCard";

interface EvidenceCardProps {
  isExpanded: boolean;
  isCompleted: boolean;
  onToggle: () => void;
  onComplete: (data: { items: EvidenceItem[] }) => void;
  caseDetails: any;
}

interface RecommendedItem {
  type: string;
  label: string;
  reason: string;
}

const recommendedItems: RecommendedItem[] = [
  {
    type: "statement",
    label: "Bank statement (Last 3 months)",
    reason: "Shows transaction history and patterns"
  },
  {
    type: "chat",
    label: "Chat/SMS with merchant (if any)",
    reason: "Proves communication and scam attempt"
  },
  {
    type: "other",
    label: "Additional proof",
    reason: "Any other evidence like receipts, emails"
  }
];

export function EvidenceCard({
  isExpanded,
  isCompleted,
  onToggle,
  onComplete,
  caseDetails
}: EvidenceCardProps) {
  const [items, setItems] = useState<EvidenceItem[]>([
    {
      id: "1",
      type: "transaction",
      fileName: "transaction_oct12.jpg",
      fileSize: 2400000,
      uploadedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      annotated: false
    },
    {
      id: "2",
      type: "other",
      fileName: "qr_code_shop.jpg",
      fileSize: 1800000,
      uploadedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      annotated: false
    }
  ]);

  const [exportFormat, setExportFormat] = useState<"zip" | "pdf" | "cloud">("pdf");
  const [exportOptions, setExportOptions] = useState({
    includeAnnotations: true,
    includeSummary: true,
    passwordProtect: false
  });

  const uploadedTypes = items.map(item => item.type);
  const missingItems = recommendedItems.filter(
    item => !uploadedTypes.includes(item.type as any)
  );

  const handleUpload = (files: File[]) => {
    const newItems: EvidenceItem[] = files.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      type: "other",
      fileName: file.name,
      fileSize: file.size,
      uploadedAt: new Date(),
      annotated: false
    }));
    setItems([...items, ...newItems]);
  };

  const handleDelete = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleView = (id: string) => {
    console.log("View evidence:", id);
    // In real app, open viewer modal
  };

  const handleAnnotate = (id: string) => {
    console.log("Annotate evidence:", id);
    // In real app, open annotation tool
  };

  const handleExport = () => {
    console.log("Exporting evidence bundle...", { exportFormat, exportOptions });
    // In real app, generate and download bundle
    alert(`Exporting as ${exportFormat.toUpperCase()} with selected options`);
  };

  const getTotalSize = () => {
    return items.reduce((total, item) => total + item.fileSize, 0);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  return (
    <div className={`bg-white rounded-2xl border-2 transition-all ${
      isExpanded ? "border-orange-300 shadow-lg" : "border-gray-200 shadow-sm hover:border-orange-200"
    }`}>
      {/* Collapsed View */}
      {!isExpanded && (
        <div className="p-5">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl">{isCompleted ? "✅" : "❌"}</span>
            <h4 className="font-semibold text-lg">5. Add Evidence</h4>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            {items.length}/5 recommended items uploaded
          </p>
          <button
            onClick={onToggle}
            className="text-orange-600 hover:text-orange-700 font-semibold text-sm flex items-center gap-2"
          >
            ADD MORE <ChevronDown className="w-4 h-4" />
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
              <h4 className="font-semibold text-lg">5. Add Evidence</h4>
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
              💡 Evidence strengthens your case and increases recovery chances by 35%
            </p>
          </div>

          {/* Uploaded Items */}
          <div>
            <h5 className="font-semibold mb-4">
              📋 Recommended Evidence ({items.length}/5 collected)
            </h5>

            <div className="space-y-3">
              {items.map(item => (
                <EvidenceItemCard
                  key={item.id}
                  item={item}
                  onView={() => handleView(item.id)}
                  onAnnotate={() => handleAnnotate(item.id)}
                  onDelete={() => handleDelete(item.id)}
                />
              ))}

              {/* Missing Items */}
              {missingItems.map((missing, index) => (
                <div
                  key={index}
                  className="bg-yellow-50 border border-yellow-200 rounded-xl p-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-lg">⚠️</span>
                        <span className="font-semibold text-gray-900">{missing.label}</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        Why it helps: {missing.reason}
                      </div>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <button className="text-sm text-orange-600 hover:text-orange-700 font-semibold">
                        📤 UPLOAD
                      </button>
                      <button className="text-sm text-gray-500 hover:text-gray-700">
                        ❌ SKIP
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upload Zone */}
          <div className="border-t border-gray-200 pt-6">
            <h5 className="font-semibold mb-4">➕ Upload Additional Evidence</h5>
            <FileUpload onUpload={handleUpload} />
          </div>

          {/* Export Bundle */}
          <div className="border-t border-gray-200 pt-6 space-y-4">
            <h5 className="font-semibold">📦 Export Evidence Bundle</h5>

            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-3">Download all evidence as:</p>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      value="zip"
                      checked={exportFormat === "zip"}
                      onChange={(e) => setExportFormat(e.target.value as any)}
                      className="w-4 h-4"
                    />
                    <span className="text-sm">ZIP file (original files)</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      value="pdf"
                      checked={exportFormat === "pdf"}
                      onChange={(e) => setExportFormat(e.target.value as any)}
                      className="w-4 h-4"
                    />
                    <span className="text-sm">PDF (all images + summary)</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      value="cloud"
                      checked={exportFormat === "cloud"}
                      onChange={(e) => setExportFormat(e.target.value as any)}
                      className="w-4 h-4"
                    />
                    <span className="text-sm">Cloud link (Google Drive)</span>
                  </label>
                </div>
              </div>

              <div className="border-t border-gray-300 pt-3 space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={exportOptions.includeAnnotations}
                    onChange={(e) => setExportOptions({
                      ...exportOptions,
                      includeAnnotations: e.target.checked
                    })}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">Include annotations</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={exportOptions.includeSummary}
                    onChange={(e) => setExportOptions({
                      ...exportOptions,
                      includeSummary: e.target.checked
                    })}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">Include case summary</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={exportOptions.passwordProtect}
                    onChange={(e) => setExportOptions({
                      ...exportOptions,
                      passwordProtect: e.target.checked
                    })}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">Password protect (recommended)</span>
                </label>
              </div>

              <button
                onClick={handleExport}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                DOWNLOAD BUNDLE ({items.length} files, {formatFileSize(getTotalSize())})
              </button>
            </div>
          </div>

          {/* Privacy Notice */}
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-start gap-3">
            <Shield className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-green-900">
              <strong>Privacy Protected:</strong> All evidence is encrypted and stored securely. 
              You can delete your data anytime.
            </div>
          </div>

          {/* Complete Button */}
          <button
            onClick={() => onComplete({ items })}
            className="w-full bg-green-600 text-white py-4 px-6 rounded-xl font-semibold hover:bg-green-700 transition-colors"
          >
            ✓ MARK AS COMPLETED
          </button>
        </div>
      )}
    </div>
  );
}
