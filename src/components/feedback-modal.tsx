"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FeedbackForm } from "@/components/feedback-form";

type FeedbackModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function FeedbackModal({ open, onOpenChange }: FeedbackModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Como foi sua experiência?</DialogTitle>
          <DialogDescription>
            Estamos em acesso antecipado. Sua opinião ajuda a melhorar o Minha
            Loojinha.
          </DialogDescription>
        </DialogHeader>
        <FeedbackForm
          showSkipButton
          onSkip={() => onOpenChange(false)}
          onSuccess={() => onOpenChange(false)}
          className="pt-2"
        />
      </DialogContent>
    </Dialog>
  );
}
