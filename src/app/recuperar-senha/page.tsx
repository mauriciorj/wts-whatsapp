"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AuthCard } from "@/components/auth/auth-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

const forgotPasswordSchema = z.object({
  email: z.string().email("Endereço de email inválido"),
});

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    // Handle password reset logic here
    console.log(data);
    setIsSubmitted(true);
    setIsLoading(false);
  };

  return (
    <div className="pt-16 pb-28 px-4">
      <AuthCard>
        {!isSubmitted ? (
          <div className="space-y-6">
            <div className="space-y-2 text-center">
              <h1 className="text-2xl font-bold">Esqueceu a sua senha?</h1>
              <p className="text-muted-foreground">
                Insira o seu email que enviaremos um link com todas as
                instruções
              </p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="nome@exemplo.com"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-sm text-destructive">
                    {errors.email.message?.toString()}
                  </p>
                )}
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Enviando..." : "Recuperar Senha"}
              </Button>
            </form>
          </div>
        ) : (
          <div className="space-y-6 text-center">
            <h2 className="text-2xl font-bold">
              Por favor verifique o seu email
            </h2>
            <p className="text-muted-foreground">
              Enviamos um email com todas as instruções
            </p>
            <Button asChild variant="outline" className="w-full">
              <Link href="/login">Voltar para Login</Link>
            </Button>
          </div>
        )}
        <div className="mt-6 text-center text-sm">
          Lembra da sua senha?{" "}
          <Link href="/login" className="text-primary hover:underline">
            Faça o Login aqui.
          </Link>
        </div>
      </AuthCard>
    </div>
  );
}
