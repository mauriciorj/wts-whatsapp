"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ClipboardCopy } from "lucide-react";
import { Check } from "lucide-react";

export function WhatsAppLink({ link }: { link: string }) {
  const [isCopied, setIsCopied] = useState(false);

  const baseLink = `https://zaprouter.pro/wp/${link}`;

  const copyToClipboard = () => {
    if (link) {
      // Copy the text inside the text field
      navigator.clipboard.writeText(baseLink);
      setIsCopied(true);
    }
  };

  useEffect(() => {
    if (isCopied) {
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }
  }, [isCopied]);

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Link de divulgação</h2>
      <div className="flex gap-4">
        <div className="w-full relative">
          <Input
            id="myWhatsAppLink"
            value={`${baseLink}`}
            readOnly
            className="font-mono"
          />
          <div
            className="absolute right-2 top-[10px] cursor-pointer text-center justify-center"
            onClick={copyToClipboard}
          >
            {isCopied ? (
              <Check className="h-5 w-5 text-green-600" />
            ) : (
              <ClipboardCopy className="h-5 w-5" />
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
