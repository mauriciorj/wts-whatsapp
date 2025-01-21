"use client";

import { useTheme } from "next-themes";
import { FAQ } from "@/components/sections/faq";
import { Pricing } from "@/components/sections/pricing";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, ChartPie, Rabbit, Shield } from "lucide-react";
import Image from "next/image";
import whatsapp_dark from "@/images/whatsapp_dark.webp";
import whatsapp_light from "@/images/whatsapp_light.webp";
import Link from "next/link";

export default function Home() {
  const { resolvedTheme } = useTheme();
  return (
    <>
      {/* Hero Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold mb-6">
                Um link, vários WhatsApps
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Evite ter o seu WhatsApp{" "}
                <b>
                  <u>banido</u>
                </b>
                .
              </p>
              <Link href="/#planos">
                <Button size="lg">
                  Começar <ArrowRight className="ml-2" />
                </Button>
              </Link>
            </div>
            <div className="border-0 relative h-[500px]">
              {resolvedTheme === "dark" ? (
                <Image
                  src={whatsapp_dark}
                  alt="ZapRouter Interface"
                  className="border-0"
                />
              ) : (
                <Image
                  src={whatsapp_light}
                  alt="ZapRouter Interface"
                  className="border-0"
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">
            Porque escolher a nossa solução
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6">
              <ChartPie className="h-12 w-12 mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Relatórios</h3>
              <p className="text-muted-foreground">
                Saiba quem são os seus clientes. Localidade, sistema
                operacional, tipo de dispositivo e etc.
              </p>
            </Card>
            <Card className="p-6">
              <Rabbit className="h-12 w-12 mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">
                Configuração Rápida
              </h3>
              <p className="text-muted-foreground">
                Tenha seu sistema funcionando em menos de 2 minutos.
              </p>
            </Card>
            <Card className="p-6">
              <Shield className="h-12 w-12 mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Segurança</h3>
              <p className="text-muted-foreground">
                Sistema totalmente seguro e confiável.
              </p>
            </Card>
          </div>
        </div>
      </section>
      <section id="planos">
        <Pricing />
      </section>
      <FAQ />
    </>
  );
}
