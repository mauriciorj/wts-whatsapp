"use client";

import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import whatsapp_dark from "@/images/whatsapp_dark.webp";
import whatsapp_light from "@/images/whatsapp_light.webp";

const Hero = () => {
  const { resolvedTheme } = useTheme();
  return (
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
                alt="ZapRouter Interface"
                className="border-0"
                src={whatsapp_dark}
              />
            ) : (
              <Image
                alt="ZapRouter Interface"
                className="border-0"
                src={whatsapp_light}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
