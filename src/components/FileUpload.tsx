import { useRef, useState } from "react";
import { Upload, Camera, Mic, Image as ImageIcon } from "lucide-react";

interface FileUploadProps {
  onUpload: (files: File[]) => void;
  maxSize?: number;
  acceptedTypes?: string[];
}

export function FileUpload({
  onUpload,
  maxSize = 10 * 1024 * 1024, // 10MB default
  acceptedTypes = ["image/*", "application/pdf", "audio/*", "video/*"]
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      handleFiles(files);
    }
  };

  const handleFiles = (files: File[]) => {
    const validFiles = files.filter(file => {
      if (file.size > maxSize) {
        alert(`${file.name} exceeds ${formatFileSize(maxSize)} limit`);
        return false;
      }
      return true;
    });

    if (validFiles.length > 0) {
      onUpload(validFiles);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleCameraClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.setAttribute("capture", "environment");
      fileInputRef.current.click();
    }
  };

  return (
    <div className="space-y-4">
      {/* Drag & Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
        className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all ${
          isDragging
            ? "border-orange-400 bg-orange-50"
            : "border-gray-300 hover:border-orange-400 hover:bg-orange-50/50"
        }`}
      >
        <div className="text-6xl mb-4">📁</div>
        <div className="text-lg font-semibold text-gray-700 mb-2">
          Drag and drop files here
        </div>
        <div className="text-sm text-gray-500 mb-4">or click to browse</div>
        <div className="text-xs text-gray-400">
          Supported: JPG, PNG, PDF, MP3, MP4 • Max {formatFileSize(maxSize)} per file
        </div>
      </div>

      <div className="text-center text-sm text-gray-500">OR</div>

      {/* Quick Action Buttons */}
      <div className="grid grid-cols-3 gap-3">
        <button
          onClick={handleCameraClick}
          className="flex flex-col items-center gap-2 p-4 bg-white border-2 border-gray-200 rounded-xl hover:border-orange-300 hover:bg-orange-50 transition-all"
        >
          <Camera className="w-6 h-6 text-gray-600" />
          <span className="text-sm font-semibold">Take Photo</span>
        </button>

        <button
          onClick={() => {
            const input = document.createElement("input");
            input.type = "file";
            input.accept = "audio/*";
            input.onchange = (e) => {
              const files = (e.target as HTMLInputElement).files;
              if (files) handleFiles(Array.from(files));
            };
            input.click();
          }}
          className="flex flex-col items-center gap-2 p-4 bg-white border-2 border-gray-200 rounded-xl hover:border-orange-300 hover:bg-orange-50 transition-all"
        >
          <Mic className="w-6 h-6 text-gray-600" />
          <span className="text-sm font-semibold">Record Voice</span>
        </button>

        <button
          onClick={handleClick}
          className="flex flex-col items-center gap-2 p-4 bg-white border-2 border-gray-200 rounded-xl hover:border-orange-300 hover:bg-orange-50 transition-all"
        >
          <ImageIcon className="w-6 h-6 text-gray-600" />
          <span className="text-sm font-semibold">From Gallery</span>
        </button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept={acceptedTypes.join(",")}
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
}
