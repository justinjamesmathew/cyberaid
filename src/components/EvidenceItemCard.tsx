import { Eye, Edit2, Trash2, FileText, Image as ImageIcon, Film, Music } from "lucide-react";

export interface EvidenceItem {
  id: string;
  type: "transaction" | "chat" | "statement" | "receipt" | "other";
  fileName: string;
  fileSize: number;
  uploadedAt: Date;
  url?: string;
  thumbnail?: string;
  annotated: boolean;
}

interface EvidenceItemCardProps {
  item: EvidenceItem;
  onView: () => void;
  onAnnotate: () => void;
  onDelete: () => void;
}

export function EvidenceItemCard({ item, onView, onAnnotate, onDelete }: EvidenceItemCardProps) {
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const formatTimeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    if (seconds < 60) return "Just now";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} min${minutes > 1 ? "s" : ""} ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    const days = Math.floor(hours / 24);
    return `${days} day${days > 1 ? "s" : ""} ago`;
  };

  const getFileIcon = () => {
    const ext = item.fileName.split(".").pop()?.toLowerCase();
    if (["jpg", "jpeg", "png", "gif", "webp"].includes(ext || "")) {
      return <ImageIcon className="w-12 h-12 text-blue-500" />;
    }
    if (["mp4", "mov", "avi"].includes(ext || "")) {
      return <Film className="w-12 h-12 text-purple-500" />;
    }
    if (["mp3", "wav", "m4a"].includes(ext || "")) {
      return <Music className="w-12 h-12 text-green-500" />;
    }
    return <FileText className="w-12 h-12 text-gray-500" />;
  };

  const getTypeLabel = () => {
    const labels: Record<string, string> = {
      transaction: "Transaction Proof",
      chat: "Communication",
      statement: "Bank Statement",
      receipt: "Receipt",
      other: "Evidence"
    };
    return labels[item.type] || "Evidence";
  };

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 hover:bg-gray-100 transition-colors">
      <div className="flex items-start gap-4">
        {/* Thumbnail/Icon */}
        <div className="w-20 h-20 bg-white rounded-lg border border-gray-200 flex items-center justify-center flex-shrink-0">
          {item.thumbnail ? (
            <img
              src={item.thumbnail}
              alt={item.fileName}
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
            getFileIcon()
          )}
        </div>

        {/* File Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-1">
            <div className="flex items-center gap-2">
              <span className="text-lg">✅</span>
              <h6 className="font-semibold text-gray-900 truncate">{getTypeLabel()}</h6>
            </div>
            {item.annotated && (
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                Annotated
              </span>
            )}
          </div>

          <div className="space-y-1 text-sm text-gray-600">
            <div className="truncate">
              <span className="font-medium">File:</span> {item.fileName}
            </div>
            <div>
              <span className="font-medium">Size:</span> {formatFileSize(item.fileSize)}
            </div>
            <div>
              <span className="font-medium">Uploaded:</span> {formatTimeAgo(item.uploadedAt)}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 mt-3">
            <button
              onClick={onView}
              className="flex items-center gap-1 px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <Eye className="w-4 h-4" />
              VIEW
            </button>
            <button
              onClick={onAnnotate}
              className="flex items-center gap-1 px-3 py-1.5 text-sm text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
            >
              <Edit2 className="w-4 h-4" />
              ANNOTATE
            </button>
            <button
              onClick={onDelete}
              className="flex items-center gap-1 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              DELETE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
