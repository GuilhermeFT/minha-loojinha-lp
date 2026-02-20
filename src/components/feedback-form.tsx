"use client";

import { useEffect } from "react";
import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { submitFeedback } from "@/actions/feedback";

type FeedbackFormProps = {
  className?: string;
  onSkip?: () => void;
  showSkipButton?: boolean;
  onSuccess?: () => void;
};

export function FeedbackForm({
  className,
  onSkip,
  showSkipButton = false,
  onSuccess,
}: FeedbackFormProps) {
  const [state, formAction, isPending] = useActionState(
    async (
      _prev: { message: string; ok: boolean } | null,
      formData: FormData
    ) => {
      const result = await submitFeedback(formData);
      return { message: result.message, ok: result.ok };
    },
    null as { message: string; ok: boolean } | null
  );

  useEffect(() => {
    if (state?.ok) onSuccess?.();
  }, [state?.ok, onSuccess]);

  return (
    <form action={formAction} className={cn("space-y-4", className)}>
      <textarea
        name="text"
        placeholder="Alguma sugestão ou comentário?"
        rows={4}
        maxLength={2000}
        disabled={isPending}
        className="w-full rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-3 py-2 text-sm placeholder:text-[hsl(var(--muted-foreground))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] disabled:pointer-events-none disabled:opacity-50"
      />
      {state?.message && (
        <p
          className={cn(
            "text-sm",
            state.ok
              ? "text-[hsl(var(--primary))]"
              : "text-red-600 dark:text-red-400"
          )}
        >
          {state.message}
        </p>
      )}
      <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
        <Button type="submit" disabled={isPending} className="sm:min-w-24">
          {isPending ? "Enviando..." : "Enviar"}
        </Button>
        {showSkipButton && (
          <Button
            type="button"
            variant="ghost"
            onClick={onSkip}
            disabled={isPending}
          >
            Depois
          </Button>
        )}
      </div>
    </form>
  );
}
