"use client";

import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { signupSchema } from "@/lib/validations/auth";
import { AuthCard } from "@/components/auth/auth-card";
import { AlertBanner } from "@/components/ui/alert-banner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CreateUserAccount from "@/db/actions/createUserAccount/actions";
import Link from "next/link";

export default function CriarConta() {
  const [serverError, setServerError] = useState<boolean | null>(null);
  const [successMessage, setSuccessMessage] = useState<boolean | null>(null);

  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      plan: "basic",
      cardNumber: "",
      expiryDate: "",
      cvc: "",
    },
    onSubmit: async ({ value }: any) => {
      try {
        const response = await CreateUserAccount(
          value as {
            email: string;
            firstName: string;
            lastName: string;
            password: string;
            plan: string;
          }
        );
        console.log("");
        console.log("");
        console.log("");
        console.log("response ==> ", response);
        if (response === false) {
          setServerError(true);
        } else {
          setSuccessMessage(true);
        }
      } catch (e) {
        console.log("");
        console.log("");
        console.log("");
        console.log("e ==> ", e);
        setServerError(true);
      }
    },
  });

  return (
    <div className="pt-10 pb-16 px-4">
      {serverError && (
        <AuthCard className="border-0">
          <AlertBanner
            type="success"
            message="Conta criada com sucesso, por favor verifique o seu e-amil."
          />
        </AuthCard>
      )}
      {successMessage && (
        <AuthCard className="border-0">
          <AlertBanner
            type="error"
            message="Ops... algo deu errado. Por favor tente de novo."
          />
        </AuthCard>
      )}
      <AuthCard>
        <div className="space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-bold">Criar conta</h1>
            <p className="text-muted-foreground">
              Por favor insira suas informações abaixo
            </p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
            className="space-y-4"
          >
            <div className="grid grid-cols-2 gap-4">
              <form.Field name="firstName">
                {(field) => (
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Primeiro nome</Label>
                    <Input
                      id="firstName"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      required
                    />
                    {field.state.meta.errors && (
                      <p className="text-sm text-destructive">
                        {field.state.meta.errors[0]}
                      </p>
                    )}
                  </div>
                )}
              </form.Field>
              <form.Field name="lastName">
                {(field) => (
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Último nome</Label>
                    <Input
                      id="lastName"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      required
                    />
                    {field.state.meta.errors && (
                      <p className="text-sm text-destructive">
                        {field.state.meta.errors[0]}
                      </p>
                    )}
                  </div>
                )}
              </form.Field>
            </div>

            <form.Field name="email">
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    required
                  />
                  {field.state.meta.errors && (
                    <p className="text-sm text-destructive">
                      {field.state.meta.errors[0]}
                    </p>
                  )}
                </div>
              )}
            </form.Field>

            <form.Field name="password">
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor="password">Senha</Label>
                  <Input
                    id="password"
                    type="password"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    required
                  />
                  {field.state.meta.errors && (
                    <p className="text-sm text-destructive">
                      {field.state.meta.errors[0]}
                    </p>
                  )}
                </div>
              )}
            </form.Field>

            <form.Field name="plan">
              {(field) => (
                <div className="space-y-2">
                  <Label>Plano</Label>
                  <Input
                    id="plan"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    readOnly
                    disabled
                  />
                  {field.state.meta.errors && (
                    <p className="text-sm text-destructive">
                      {field.state.meta.errors[0]}
                    </p>
                  )}
                </div>
              )}
            </form.Field>

            <div className="space-y-4">
              <h3 className="font-semibold">Informações para Pagamento</h3>
              <form.Field name="cardNumber">
                {(field) => (
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Número do cartão</Label>
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      required
                    />
                    {field.state.meta.errors && (
                      <p className="text-sm text-destructive">
                        {field.state.meta.errors[0]}
                      </p>
                    )}
                  </div>
                )}
              </form.Field>

              <div className="grid grid-cols-2 gap-4">
                <form.Field name="expiryDate">
                  {(field) => (
                    <div className="space-y-2">
                      <Label htmlFor="expiryDate">Data de expiração</Label>
                      <Input
                        id="expiryDate"
                        placeholder="MM/YY"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        required
                      />
                      {field.state.meta.errors && (
                        <p className="text-sm text-destructive">
                          {field.state.meta.errors[0]}
                        </p>
                      )}
                    </div>
                  )}
                </form.Field>

                <form.Field name="cvc">
                  {(field) => (
                    <div className="space-y-2">
                      <Label htmlFor="cvc">CVC</Label>
                      <Input
                        id="cvc"
                        placeholder="123"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        required
                      />
                      {field.state.meta.errors && (
                        <p className="text-sm text-destructive">
                          {field.state.meta.errors[0]}
                        </p>
                      )}
                    </div>
                  )}
                </form.Field>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={form.state.isSubmitting}
            >
              {form.state.isSubmitting ? "Criando conta..." : "Criar conta"}
            </Button>
          </form>
          <div className="text-center text-sm">
            Já possui uma conta?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Faça o Login.
            </Link>
          </div>
        </div>
      </AuthCard>
    </div>
  );
}
