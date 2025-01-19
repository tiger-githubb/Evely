"use client";

import { cn } from "@/lib/utils";
import { FileIcon, ImageIcon, X } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useCallback, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { toast } from "sonner";

interface FileUploaderProps {
  value?: File[] | string[];
  onChange: (files: File[]) => void;
  className?: string;
  maxFiles?: number;
  maxSize?: number;
  accept?: Record<string, string[]>;
  preview?: boolean;
}

export function FileUploader({
  value = [],
  onChange,
  className,
  maxFiles = 5,
  maxSize = 5 * 1024 * 1024,
  accept = {
    "image/*": [],
    "video/*": [],
  },
  preview = true,
}: FileUploaderProps) {
  const t = useTranslations("Common.Logs");
  const [files, setFiles] = useState<(File | string)[]>(value);

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      if (rejectedFiles.length > 0) {
        toast.error(t("someFileUnsupported"));
      }

      const newFiles = [...files, ...acceptedFiles].slice(0, maxFiles);
      setFiles(newFiles);
      onChange(newFiles.filter((file): file is File => file instanceof File));
    },
    [files, maxFiles, onChange, t]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxFiles,
    maxSize,
  });

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    onChange(newFiles.filter((file): file is File => file instanceof File));
  };

  return (
    <div className="space-y-4">
      <span className="text-xs text-muted-foreground/60">1380px * 920px</span>
      <div
        {...getRootProps()}
        className={cn(
          "relative overflow-hidden rounded-lg border-2 border-dashed transition-colors duration-200 ease-in-out",
          isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25",
          "hover:border-primary hover:bg-primary/5",
          "cursor-pointer flex items-center justify-center p-6",
          className
        )}
      >
        <input {...getInputProps()} />
        <div className="text-center">
          {isDragActive ? (
            <p className="text-sm text-muted-foreground">{t("fileDropActive")}</p>
          ) : (
            <div className="space-y-2">
              <div className="flex justify-center">
                <ImageIcon className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground">{t("fileDropInactive")}</p>
            </div>
          )}
        </div>
      </div>

      {files.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {files.map((file, index) => (
            <div key={index} className="relative rounded-lg border p-2 flex items-center gap-2">
              {preview && file instanceof File && file.type.startsWith("image/") ? (
                <Image
                  src={URL.createObjectURL(file)}
                  alt="preview"
                  width={48}
                  height={48}
                  className="h-12 w-12 object-cover rounded"
                />
              ) : (
                <FileIcon className="h-12 w-12 text-muted-foreground" />
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm truncate">{file instanceof File ? file.name : file}</p>
                {file instanceof File && <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>}
              </div>
              <button type="button" onClick={() => removeFile(index)} className="p-1 hover:bg-muted rounded">
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
