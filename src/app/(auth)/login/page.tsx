"use client";

import { useState } from "react";
import Link from "next/link";
import { AlertBanner } from "@/components/ui/alert-banner";
import { AuthCard } from "@/components/auth/auth-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LoginUser from "@/db/actions/login/actions";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "@tanstack/react-form";

export default function LoginPage() {
  const [serverError, setServerError] = useState<boolean>(false);
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }: any) => {
      const response = await LoginUser(
        value as { email: string; password: string }
      );
      if (response === false) {
        setServerError(true);
      }
    },
  });

  return (
    <div className="pt-16 pb-16 px-4">
      <AuthCard>
        <div className="space-y-6">
          {serverError && (
            <AlertBanner type="error" message="Usuário e/ou senha inválidos." />
          )}
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-bold">Seja Bem Vindo</h1>
            <p className="text-muted-foreground">
              Insira suas informações para acessar o sistema
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
              setServerError(false);
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
                      onChange={(e: any) => field.handleChange(e.target.value)}
                      required
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
            <div className="space-y-2 relative">
              <Label htmlFor="password">Senha</Label>
              <form.Field name="password">
                {(field) => (
                  <>
                    <Input
                      id="password"
                      type={isShowPassword ? "text" : "password"}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e: any) => field.handleChange(e.target.value)}
                      required
                    />
                    {isShowPassword ? (
                      <div
                        onClick={() => setIsShowPassword(!isShowPassword)}
                        data-testid="showpassword"
                        className="flex w-[25px] absolute right-2 top-8 cursor-pointer text-center justify-center"
                      >
                        <EyeOff className="h-6 w-6 text-primary" />
                      </div>
                    ) : (
                      <div
                        onClick={() => setIsShowPassword(!isShowPassword)}
                        data-testid="showpassword"
                        className="flex w-[25px] absolute right-2 top-8 cursor-pointer text-center justify-center"
                      >
                        <Eye className="h-6 w-6 text-primary" />
                      </div>
                    )}
                    {field.state.meta.errors && (
                      <p className="text-sm text-destructive">
                        {field.state.meta.errors[0]}
                      </p>
                    )}
                  </>
                )}
              </form.Field>
            </div>
            <div className="text-right">
              <Link
                href="/forgot-password"
                className="text-sm text-primary hover:underline"
              >
                Esqueceu sua senha?
              </Link>
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={form.state.isSubmitting}
            >
              {form.state.isSubmitting ? "Entrando..." : "Entrar"}
            </Button>
          </form>

          <div className="text-center text-sm">
            Não tem uma conta?{" "}
            <Link href="/signup" className="text-primary hover:underline">
              Crie uma agora mesmo.
            </Link>
          </div>
        </div>
      </AuthCard>
    </div>
  );
}
