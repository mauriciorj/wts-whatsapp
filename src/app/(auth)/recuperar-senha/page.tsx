"use client";

import { useState } from "react";
import Link from "next/link";
import { LoaderCircle } from "lucide-react";
import ResetPasswordForEmail from "@/db/actions/resetPasswordForEmail/actions";
import AuthCard from "@/components/auth/auth-card";
import { AlertBanner } from "@/components/ui/alert-banner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "@tanstack/react-form";

export default function ForgotPasswordPage() {
  const [serverError, setServerError] = useState<boolean | null>(null);
  const [successMessage, setSuccessMessage] = useState<boolean | null>(false);

  const form: any = useForm({
    defaultValues: {
      email: "",
    },
    onSubmit: async ({ value }: any) => {
      try {
        const response = await ResetPasswordForEmail({
          email: value.email,
          redirectToUrl: `https://www.zaprouter.pro/atualizar-senha`,
        });
        if (response === false) {
          setServerError(true);
        } else {
          setSuccessMessage(true);
        }
      } catch {
        setServerError(true);
      }
    },
  });

  return (
    <div className="pt-16 pb-28 px-4">
      {serverError && (
        <AuthCard className="border-0">
          <AlertBanner
            message="Por favor verifique o seu email. Enviamos todas as informações para alterar a sua senha."
            type="success"
          />
        </AuthCard>
      )}

      <AuthCard>
        {!successMessage ? (
          <div className="space-y-6">
            <div className="space-y-2 text-center">
              <h1 className="text-2xl font-bold">Esqueceu a sua senha?</h1>
              <p className="text-muted-foreground">
                Por favor insira o seu email que iremos enviar um link com as
                instruções
              </p>
            </div>
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit();
              }}
            >
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <form.Field name="email">
                  {(field: any) => (
                    <>
                      <Input
                        id="email"
                        onBlur={field.handleBlur}
                        onChange={(e: any) =>
                          field.handleChange(e.target.value)
                        }
                        placeholder="seuemail@exemplo.com"
                        required
                        type="email"
                        value={field.state.value}
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
                className="w-full"
                disabled={form.state.isSubmitting}
                type="submit"
              >
                {form.state.isSubmitting ? (
                  <div className="flex flex-row items-center italic">
                    Enviando...
                    <LoaderCircle className="animate-spin h-5 w-5 ml-2" />
                  </div>
                ) : (
                  "Recuperar Senha"
                )}
              </Button>
            </form>
          </div>
        ) : (
          <div className="space-y-6 text-center">
            <h2 className="text-2xl font-bold">
              Por favor verifique o seu e-mail.
            </h2>
            <p className="text-muted-foreground">
              Enviamos um email com todas as instruções
            </p>
            <Button asChild className="w-full" variant="outline">
              <Link href="/login" prefetch>
                Voltar para o Login
              </Link>
            </Button>
          </div>
        )}
        <div className="mt-6 text-center text-sm">
          Lembra da sua senha?{" "}
          <Link className="text-primary hover:underline" href="/login">
            Faça o login aqui.
          </Link>
        </div>
      </AuthCard>
    </div>
  );
}
