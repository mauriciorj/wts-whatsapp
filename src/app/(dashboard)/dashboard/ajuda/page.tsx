"use client";

import { HelpContent } from "@/components/help/help-content";

export default function HelpPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Central de Ajuda</h1>
      <HelpContent />
    </div>
  );
}