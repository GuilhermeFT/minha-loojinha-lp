"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type ThankYouModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function ThankYouModal({ open, onOpenChange }: ThankYouModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Obrigado!</DialogTitle>
          <DialogDescription>
            Parabéns por garantir sua vaga. Entraremos em contato em breve para
            os próximos passos.
          </DialogDescription>
        </DialogHeader>
        <div className="pt-2">
          <Button
            type="button"
            className="w-full"
            onClick={() => onOpenChange(false)}
          >
            Entendido
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
