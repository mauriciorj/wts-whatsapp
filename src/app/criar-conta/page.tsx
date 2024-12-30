"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "@/lib/validations/auth";
import { AuthCard } from "@/components/auth/auth-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function SignupPage() {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    // Handle signup logic here
    console.log(data);
    setIsLoading(false);
  };

  return (
    <div className="pt-10 pb-16 px-4">
      <AuthCard>
        <div className="space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-bold">Criar Conta</h1>
            <p className="text-muted-foreground">
              Por favor insira suas informações abaixo
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Primeiro nome</Label>
                <Input id="firstName" {...register("firstName")} />
                {errors.firstName && (
                  <p className="text-sm text-destructive">
                    {errors.firstName.message?.toString()}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Último nome</Label>
                <Input id="lastName" {...register("lastName")} />
                {errors.lastName && (
                  <p className="text-sm text-destructive">
                    {errors.lastName.message?.toString()}
                  </p>
                )}
              </div>
            </div>
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
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" {...register("password")} />
              {errors.password && (
                <p className="text-sm text-destructive">
                  {errors.password.message?.toString()}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label>Plan</Label>
              <Input
                id="plan"
                type="text"
                {...register("plan")}
                value="Avançado - R$49"
                readOnly
                disabled
              />
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold">Informações de Pagamento</h3>
              <div className="space-y-2">
                <Label htmlFor="cardNumber">Número do Cartão</Label>
                <Input
                  id="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  {...register("cardNumber")}
                />
                {errors.cardNumber && (
                  <p className="text-sm text-destructive">
                    {errors.cardNumber.message?.toString()}
                  </p>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiryDate">Data que Expira</Label>
                  <Input
                    id="expiryDate"
                    placeholder="MM/YY"
                    {...register("expiryDate")}
                  />
                  {errors.expiryDate && (
                    <p className="text-sm text-destructive">
                      {errors.expiryDate.message?.toString()}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvc">CVC</Label>
                  <Input id="cvc" placeholder="123" {...register("cvc")} />
                  {errors.cvc && (
                    <p className="text-sm text-destructive">
                      {errors.cvc.message?.toString()}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Criando Conta..." : "Criar conta"}
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
