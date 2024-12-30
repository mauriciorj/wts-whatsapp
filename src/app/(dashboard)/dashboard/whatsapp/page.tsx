"use client";

import { WhatsAppLink } from "@/components/whatsapp/whatsapp-link";
import { WhatsAppNumbers } from "@/components/whatsapp/whatsapp-numbers";

export default function WhatsAppPage() {
  const link = "site.com/wp/ihad34shu";

  const numbers = [{ number: "+55219999999", description: "Customer Support" }];

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">WhatsApp</h1>
      <WhatsAppLink link={link} />
      <WhatsAppNumbers numbers={numbers}/>
    </div>
  );
}
