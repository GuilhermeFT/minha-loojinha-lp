import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FeedbackForm } from "@/components/feedback-form";

export const metadata: Metadata = {
  title: "Enviar feedback",
  description:
    "Envie sua opinião sobre o Minha Loojinha. Estamos em acesso antecipado e seu feedback ajuda a melhorar.",
};

export default function FeedbackPage() {
  return (
    <div className="container mx-auto max-w-xl px-4 py-12 sm:py-16">
      <Card className="border-2">
        <CardHeader className="space-y-1">
          <CardTitle>Enviar feedback</CardTitle>
          <CardDescription>
            Estamos em acesso antecipado. Sua opinião ajuda a melhorar o Minha
            Loojinha para lojistas da região.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FeedbackForm />
          <p className="mt-6 text-center">
            <Button variant="link" asChild className="text-sm">
              <Link href="/">Voltar ao início</Link>
            </Button>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
