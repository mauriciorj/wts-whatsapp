"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ClipboardCopy } from "lucide-react";

export function WhatsAppLink({ link }: { link: string }) {
  const copyToClipboard = () => {
    if (link) {
      // Copy the text inside the text field
      navigator.clipboard.writeText(link);

      // Alert the copied text
      alert("Copied the text: " + link);
    }
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Link de divulgação</h2>
      <div className="flex gap-4">
        <Input
          id="myWhatsAppLink"
          value="site.com/wp/ihad34shu"
          readOnly
          className="font-mono"
        />
        <Button variant="ghost" size="icon" onClick={copyToClipboard}>
          <ClipboardCopy className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
}
