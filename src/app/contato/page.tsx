"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AuthCard } from "@/components/auth/auth-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const contactSchema = z.object({
  name: z.string().min(2, "Nome é obrigatório"),
  email: z.string().email("Endereço de email inválido"),
  subject: z.string().min(2, "Assunto é obrigatório"),
  message: z.string().min(10, "A mensagem deve ter pelo menos 10 caracteres"),
});

export default function ContactPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    // Handle contact form submission here
    setIsSubmitted(true);
    setIsLoading(false);
  };

  return (
    <div className="pt-14 pb-16 px-4">
      <AuthCard>
        {!isSubmitted ? (
          <div className="space-y-6">
            <div className="space-y-2 text-center">
              <h1 className="text-2xl font-bold">Entre em contato</h1>
              <p className="text-muted-foreground">
                Alguma dúvida. Ficaremos felizes em ajudar!
              </p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome *</Label>
                <Input
                  id="name"
                  placeholder="Seu nome"
                  {...register("name")}
                  required
                />
                {errors.name && (
                  <p className="text-sm text-destructive">
                    {errors.name.message?.toString()}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="nome@exemplo.com"
                  {...register("email")}
                  required
                />
                {errors.email && (
                  <p className="text-sm text-destructive">
                    {errors.email.message?.toString()}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Assunto *</Label>
                <Input
                  id="subject"
                  placeholder="Como podemos ajudar?"
                  {...register("subject")}
                  required
                />
                {errors.subject && (
                  <p className="text-sm text-destructive">
                    {errors.subject.message?.toString()}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Mensagem *</Label>
                <Textarea
                  id="message"
                  placeholder="Sua mensagem..."
                  className="min-h-[120px]"
                  {...register("message")}
                  required
                />
                {errors.message && (
                  <p className="text-sm text-destructive">
                    {errors.message.message?.toString()}
                  </p>
                )}
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Enviando..." : "Enviar Mensagem"}
              </Button>
            </form>
          </div>
        ) : (
          <div className="space-y-6 text-center">
            <h2 className="text-2xl font-bold">Mensagem Enviada!</h2>
            <p className="text-muted-foreground">
              Obrigado por entrar em contato. Retornaremos o mais rápido
              possível.
            </p>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setIsSubmitted(false)}
            >
              Enviar Outra Mensagem
            </Button>
          </div>
        )}
      </AuthCard>
    </div>
  );
}
