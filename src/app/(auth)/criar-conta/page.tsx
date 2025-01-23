"use client";

import { useState } from "react";
import { useForm } from "@tanstack/react-form";
// import { z } from "zod";
import { signupSchema } from "@/lib/validations/auth";
import { AuthCard } from "@/components/auth/auth-card";
import { AlertBanner } from "@/components/ui/alert-banner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PasswordRules from "@/components/auth/passwordRules";
import CreateUserAccount from "@/db/actions/createUserAccount/actions";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import PasswordRulesValidation from "@/lib/passwordRulesValidation";

export default function CriarConta() {
  const [serverError, setServerError] = useState<boolean | null>(null);
  const [serverErrorMessage, setServerErrorMessage] = useState<string | null>(
    null
  );

  const [successMessage, setSuccessMessage] = useState<boolean | null>(null);
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const [passwordValidation, setPasswordValidation] = useState<any>({
    rule1: false,
    rule2: false,
    rule3: false,
    rule4: false,
    rule5: false,
  });

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
    validators: {
      onChange: signupSchema,
    },
    onSubmit: async ({ value }: any) => {
      setServerError(null);
      setServerErrorMessage(null);
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
        if (response?.status === 500) {
          setServerErrorMessage(
            "Ops... algo deu errado. Por favor tente de novo."
          );
          setServerError(true);
        } else if (response?.status === 400) {
          setServerErrorMessage(
            "Esse email já existe, por favor faça o login."
          );
          setServerError(true);
        } else {
          setSuccessMessage(true);
        }
      } catch {
        setServerErrorMessage(
          "Ops... algo deu errado. Por favor tente de novo."
        );
        setServerError(true);
      }
    },
  });

  return (
    <div className="pt-10 pb-16 px-4">
      {serverError && (
        <AuthCard className="border-0">
          <AlertBanner type="error" message={serverErrorMessage} />
        </AuthCard>
      )}
      {successMessage ? (
        <div className="h-full">
          <AuthCard className="border-0">
            <AlertBanner
              type="success"
              message="Conta criada com sucesso, por favor verifique o seu e-mail."
            />
          </AuthCard>
        </div>
      ) : (
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
                        maxLength={50}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e: any) =>
                          field.handleChange(e.target.value)
                        }
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
                        maxLength={50}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e: any) =>
                          field.handleChange(e.target.value)
                        }
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
                      onChange={(e: any) => field.handleChange(e.target.value)}
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
                  <div className="space-y-2 relative">
                    <Label htmlFor="password">Senha</Label>
                    <Input
                      id="password"
                      maxLength={20}
                      type={isShowPassword ? "text" : "password"}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e: any) => {
                        field.handleChange(e.target.value);
                        const checkRules = PasswordRulesValidation(
                          e.target.value
                        );
                        setPasswordValidation((prevState: any) => ({
                          ...prevState,
                          ...checkRules,
                        }));
                      }}
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
                  </div>
                )}
              </form.Field>
              <PasswordRules passwordValidation={passwordValidation} />

              <form.Field name="plan">
                {(field) => (
                  <div className="space-y-2">
                    <Label>Plano</Label>
                    <Input
                      id="plan"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e: any) => field.handleChange(e.target.value)}
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
                        onChange={(e: any) => {
                          const re = /^[0-9\b]+$/;
                          if (
                            e.target.value === "" ||
                            re.test(e.target.value)
                          ) {
                            field.handleChange(e.target.value);
                          }
                        }}
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
                          onChange={(e: any) => {
                            let value = e.target.value.replace(/\D/g, "");
                            if (value.length >= 2) {
                              value =
                                value.slice(0, 2) + "/" + value.slice(2, 4);
                            }
                            field.handleChange(value);
                          }}
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
                          onChange={(e: any) => {
                            const re = /^[0-9\b]+$/;
                            if (
                              e.target.value === "" ||
                              re.test(e.target.value)
                            ) {
                              field.handleChange(e.target.value);
                            }
                          }}
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
      )}
    </div>
  );
}
