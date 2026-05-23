"use client";

import { CheckCircle } from "lucide-react";
import { Button } from "@/components/atoms/Button";

type SuccessModalProps = {
  open: boolean;
  onClose: () => void;
  onAddAnother: () => void;
};

export default function SuccessModal({
  open,
  onClose,
  onAddAnother,
}: SuccessModalProps) {
  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="success-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 p-4"
    >
      <section className="w-full max-w-[374px] rounded-lg bg-surface p-8 text-center shadow-card">
        <div className="mx-auto mb-5 flex size-16 items-center justify-center rounded-full bg-primary-50 text-primary-600">
          <CheckCircle size={28} aria-hidden />
        </div>
        <h2 id="success-title" className="text-heading-3">
          User Added Successfully!
        </h2>
        <p className="mt-3 text-body-sm text-slate-600">
          The user has been added to the system.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button onClick={onAddAnother}>Add Another User</Button>
        </div>
      </section>
    </div>
  );
}
