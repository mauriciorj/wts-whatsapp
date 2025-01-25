"use client";

import { useEffect, useState } from "react";
import { Check, ClipboardCopy } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

const WhatsAppLink = ({
  isLoading,
  link,
}: {
  isLoading: boolean;
  link: string;
}) => {
  const [isCopied, setIsCopied] = useState(false);

  const baseLink = link ? `https://zaprouter.pro/wp/${link}` : "";

  const copyToClipboard = () => {
    if (link) {
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
          {isLoading && (
            <div className="absolute left-3 top-2">
              <Skeleton className="h-6 w-[270px]" />
            </div>
          )}
          <Input
            className="font-mono"
            id="myWhatsAppLink"
            readOnly
            value={`${baseLink}`}
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
};

export default WhatsAppLink;
