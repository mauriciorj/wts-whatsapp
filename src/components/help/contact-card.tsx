"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import Link from "next/link";

export function ContactCard() {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Mail className="h-6 w-6 text-primary" />
          <h2 className="text-xl font-semibold">Contato</h2>
        </div>
        <Button asChild>
          <Link href="/contato">Entre em contato</Link>
        </Button>
      </div>
    </Card>
  );
}