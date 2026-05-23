"use client";

import { Upload, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { Button } from "@/components/atoms/Button";
import { IconButton } from "@/components/atoms/IconButton";
import { FormField } from "@/components/molecules/FormField";
import { cn } from "@/utils/twMerge";

type FileUploadFieldProps = {
  label: string;
  value?: File | null;
  onChange: (file: File | null) => void;
  error?: string;
  optional?: boolean;
};

export function FileUploadField({
  label,
  value,
  onChange,
  error,
  optional,
}: FileUploadFieldProps) {
  const id = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const previewUrl = useMemo(() => {
    if (!value || !value.type.startsWith("image/")) return null;

    return URL.createObjectURL(value);
  }, [value]);

  const pick = (file?: File) => {
    if (!file) return;
    onChange(file);
  };

  const clearFile = () => {
    onChange(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  useEffect(() => {
    if (!previewUrl) return;

    return () => URL.revokeObjectURL(previewUrl);
  }, [previewUrl]);

  return (
    <FormField id={id} label={label} optional={optional} error={error}>
      <div
        onDragOver={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(event) => {
          event.preventDefault();
          setDragging(false);
          pick(event.dataTransfer.files[0]);
        }}
        className={cn(
          "flex min-h-40 flex-col items-center justify-center rounded-lg border border-dashed border-input bg-surface p-6 text-center transition",
          dragging && "border-primary-600 bg-primary-50",
          error && "border-danger",
        )}
      >
        {value && (
          <div className="mb-4 flex w-full items-center gap-4 rounded-lg bg-slate-50 p-4 text-left">
            {previewUrl ? (
              <Image
                src={previewUrl}
                alt="Avatar preview"
                width={64}
                height={64}
                unoptimized
                className="size-16 rounded-lg border border-slate-200 object-cover"
              />
            ) : (
              <div className="flex size-16 items-center justify-center rounded-lg border border-slate-200 bg-surface text-slate-400">
                <Upload size={24} aria-hidden />
              </div>
            )}
            <div className="min-w-0 flex-1">
              <p className="truncate text-body-sm font-medium text-slate-900">
                {value.name}
              </p>
              <p className="text-caption text-muted-foreground">
                {formatFileSize(value.size)}
              </p>
            </div>
            <IconButton label="Remove avatar" onClick={clearFile}>
              <X size={16} />
            </IconButton>
          </div>
        )}
        <Upload size={40} className="mb-3 text-slate-400" aria-hidden />
        <p className="text-body-sm text-slate-700">
          Drag & drop your avatar here or
        </p>
        <Button className="mt-3" onClick={() => inputRef.current?.click()}>
          Browse Files
        </Button>
        <p className="mt-2 text-caption text-muted-foreground">
          PNG, JPG up to 5MB
        </p>
        <input
          ref={inputRef}
          id={id}
          type="file"
          accept="image/png,image/jpeg"
          className="sr-only"
          onChange={(event) => pick(event.target.files?.[0])}
        />
      </div>
    </FormField>
  );
}

function formatFileSize(size: number) {
  if (size < 1024 * 1024) {
    return `${Math.max(1, Math.round(size / 1024))} KB`;
  }

  return `${(size / 1024 / 1024).toFixed(1)} MB`;
}
