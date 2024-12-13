"use client";

import { cn } from "@/lib/utils";
import { ImageIcon } from "lucide-react";
import Image from "next/image";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface ImageUploadProps {
  value?: File;
  onChange: (file: File) => void;
  className?: string;
}

export function ImageUpload({ value, onChange, className }: ImageUploadProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onChange(acceptedFiles[0]);
      }
    },
    [onChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/webp": [],
    },
    maxFiles: 1,
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        "border-2 border-dashed rounded-lg cursor-pointer flex items-center justify-center relative overflow-hidden",
        isDragActive && "border-primary",
        className
      )}
    >
      <input {...getInputProps()} />
      {value ? (
        <Image src={URL.createObjectURL(value)} alt="Preview" fill className="object-cover" />
      ) : (
        <div className="flex flex-col items-center justify-center p-6 text-muted-foreground">
          <ImageIcon className="w-10 h-10 mb-2" />
          <p className="text-sm text-center">Glissez une image ici ou cliquez pour en sélectionner une</p>
        </div>
      )}
    </div>
  );
}
