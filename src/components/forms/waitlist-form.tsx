"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { submitWaitlist } from "@/actions/waitlist";

type WaitlistFormProps = { className?: string };

export function WaitlistForm({ className }: WaitlistFormProps) {
  const [state, formAction, isPending] = useActionState(
    async (
      _prev: { message: string; ok: boolean } | null,
      formData: FormData
    ) => {
      const result = await submitWaitlist(formData);
      return { message: result.message, ok: result.ok };
    },
    null as { message: string; ok: boolean } | null
  );

  return (
    <form action={formAction} className={cn("space-y-2", className)}>
      <Input type="text" name="name" placeholder="Seu nome" disabled={isPending} required />
      <Input type="email" name="email" placeholder="Seu e-mail" disabled={isPending} required />
      <Button type="submit" size="sm" className="w-full" disabled={isPending}>
        {isPending ? "Enviando..." : "Avise-me"}
      </Button>
      {state?.message && (
        <p
          className={cn(
            "text-sm",
            state.ok ? "text-[hsl(var(--primary))]" : "text-red-600 dark:text-red-400"
          )}
        >
          {state.message}
        </p>
      )}
    </form>
  );
}
