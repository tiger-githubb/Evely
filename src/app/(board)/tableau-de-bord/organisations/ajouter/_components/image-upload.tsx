"use client";

import { cn } from "@/lib/utils";
import { getImageUrl } from "@/utils/image-utils";
import { ImageIcon } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { PiArrowsCounterClockwiseDuotone } from "react-icons/pi";
import { toast } from "sonner";

interface ImageUploadProps {
  value?: File | string;
  onChange: (file: File) => void;
  className?: string;
}

export function ImageUpload({ value, onChange, className }: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (value instanceof File) {
      const url = URL.createObjectURL(value);
      setImageUrl(url);
      return () => {
        URL.revokeObjectURL(url);
        setImageUrl(null);
      };
    } else if (typeof value === "string") {
      setImageUrl(getImageUrl(value));
    } else {
      setImageUrl(null);
    }
  }, [value]);

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      if (rejectedFiles.length > 0) {
        toast.error("Format de fichier non supporté ou taille trop importante");
        return;
      }

      if (acceptedFiles.length > 0) {
        onChange(acceptedFiles[0]);
      }
    },
    [onChange]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/webp": [],
    },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024,
    onDragEnter: () => setIsDragging(true),
    onDragLeave: () => setIsDragging(false),
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        "relative overflow-hidden rounded-lg border-2 border-dashed transition-colors duration-200 ease-in-out",
        isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25",
        "hover:border-primary hover:bg-primary/5",
        "cursor-pointer flex items-center justify-center",
        className
      )}
    >
      <input {...getInputProps()} />
      {imageUrl ? (
        <div className="group relative h-full w-full">
          <Image
            src={imageUrl}
            alt="Preview"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
            <PiArrowsCounterClockwiseDuotone className="h-6 w-6 text-white" />
          </div>
        </div>
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-muted-foreground">
          <ImageIcon className="mb-2 h-10 w-10" />
          <p className="text-center text-sm">
            {isDragging ? "Déposez l'image ici..." : "Glissez une image ici ou cliquez pour en sélectionner une"}
          </p>
        </div>
      )}
    </div>
  );
}
