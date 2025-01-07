"use client";

import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { AuthCard } from "@/components/auth/auth-card";
import { AlertBanner } from "@/components/ui/alert-banner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ResetPasswordForEmail from "@/db/actions/resetPasswordForEmail/actions";
import Link from "next/link";

const forgotPasswordSchema = z.object({
  email: z.string().email("Endereço de email inválido"),
});

export default function ForgotPasswordPage() {
  const [serverError, setServerError] = useState<boolean | null>(null);
  const [successMessage, setSuccessMessage] = useState<boolean | null>(null);

  const form = useForm({
    defaultValues: {
      email: "",
    },
    onSubmit: async ({ values }: any) => {
      try {
        const response = await ResetPasswordForEmail(
          value as { email: string }
        );
        if (response === false) {
          setServerError(true);
        } else {
          setSuccessMessage(true);
        }
      } catch (e) {
        setServerError(true);
      }
    },
    validatorAdapter: {
      validate: async (values) => {
        try {
          await forgotPasswordSchema.parseAsync(values);
          return { status: "success" };
        } catch (error) {
          if (error instanceof z.ZodError) {
            return {
              status: "error",
              errors: error.errors.map((e) => ({
                path: e.path,
                message: e.message,
              })),
            };
          }
          return { status: "error", errors: [] };
        }
      },
    },
  });

  return (
    <div className="pt-16 pb-28 px-4">
      {serverError && (
        <AuthCard className="border-0">
          <AlertBanner
            type="success"
            message="Conta criada com sucesso, por favor verifique o seu e-amil."
          />
        </AuthCard>
      )}

      <AuthCard>
        {successMessage ? (
          <div className="space-y-6">
            <div className="space-y-2 text-center">
              <h1 className="text-2xl font-bold">Esqueceu a sua senha?</h1>
              <p className="text-muted-foreground">
                Por favor insira o seu email que iremos enviar um link com as
                instruções
              </p>
            </div>
            <form.Provider>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  form.handleSubmit();
                }}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <form.Field name="email">
                    {(field) => (
                      <>
                        <Input
                          id="email"
                          type="email"
                          placeholder="name@example.com"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                        {field.state.meta.errors && (
                          <p className="text-sm text-destructive">
                            {field.state.meta.errors[0]}
                          </p>
                        )}
                      </>
                    )}
                  </form.Field>
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={form.state.isSubmitting}
                >
                  {form.state.isSubmitting ? "Enviando..." : "Recuperar Senha"}
                </Button>
              </form>
            </form.Provider>
          </div>
        ) : (
          <div className="space-y-6 text-center">
            <h2 className="text-2xl font-bold">
              Por favor verifique o seu e-mail.
            </h2>
            <p className="text-muted-foreground">
              Enviamos um email com todas as instruções
            </p>
            <Button asChild variant="outline" className="w-full">
              <Link href="/login">Voltar para o Login</Link>
            </Button>
          </div>
        )}
        <div className="mt-6 text-center text-sm">
          Lembra da sua senha?{" "}
          <Link href="/login" className="text-primary hover:underline">
            Faça o login aqui.
          </Link>
        </div>
      </AuthCard>
    </div>
  );
}
