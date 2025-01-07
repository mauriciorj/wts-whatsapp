"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import PostWhatsAppNumbers from "@/actions/postWhatsAppNumbers/actions";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { PlansInfo } from "@/lib/rules";
import { Plus, Trash2 } from "lucide-react";

type WhatsAppEntry = {
  number: string;
  message: string;
}[];

export function WhatsAppNumbers({
  numbers,
  userInfo,
}: {
  numbers: { number: string; message: string }[];
  userInfo: {
    plan: string;
    user_id: string;
  };
}) {
  const maxNumbers = PlansInfo[userInfo?.plan]?.maxNumbers;
  const [entries, seEntries] = useState<WhatsAppEntry>(numbers);
  const [errorsMessages, setErrorsMessages] = useState<any>([]);

  const mutation = useMutation({
    mutationFn: (entries) =>
      PostWhatsAppNumbers({ entries, user_id: userInfo?.user_id } as any),
  });

  const checkErrors = () => {
    let hasError = false;
    const errors: any = [];
    entries?.map((entry) => {
      let numberError = null;
      let messageError = null;
      if (entry.number && entry.message) {
        errors.push({ numberError, messageError });
      } else {
        if (!entry.number) {
          numberError = "Número obrigatório";
          hasError = true;
        }
        if (!entry.message) {
          messageError = "Mensagem obrigatória";
          hasError = true;
        }
        errors.push({ numberError, messageError });
      }
    });
    setErrorsMessages(errors);
    return hasError;
  };

  const handleRemove = (index: number) => {
    seEntries(entries.filter((_, i) => i !== index));
  };

  const handleAdd = () => {
    const hasErrors = checkErrors();
    if (!hasErrors) {
      seEntries([...entries, { number: "", message: "" }]);
    }
  };

  const handleUpdate = (index: number, field: string, value: string) => {
    const updatedEntries = entries.map((entry, i) =>
      i === index ? { ...entry, [field]: value } : entry
    );
    seEntries(updatedEntries);
  };

  const handleSave = () => {
    const hasErrors = checkErrors();
    if (!hasErrors) {
      mutation.mutate(entries as any);
      console.log("save !!!");
    }
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Numeros de WhatsApp</h2>
      <div>
        <div className="mt-10">
          <div className="flex gap-4">
            <Label className="w-full">Numero de Celular</Label>
            <Label className="w-full">Texto</Label>
            <div className="w-[18px]"> </div>
          </div>
        </div>
        {entries?.map((entry, index) => (
          <div key={index} className="mt-4">
            <div className="flex gap-4">
              <Input
                value={entry.number}
                onChange={(e) => handleUpdate(index, "number", e.target.value)}
                placeholder="WhatsApp number"
              />
              <Input
                value={entry.message}
                onChange={(e) => handleUpdate(index, "message", e.target.value)}
                placeholder="message"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleRemove(index)}
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
            <div className="mt-1">
              <div className="flex gap-4">
                <div className="w-full">
                  {errorsMessages[index] &&
                    errorsMessages[index]?.numberError && (
                      <p className="text-sm text-destructive">
                        {errorsMessages[index].numberError || ""}
                      </p>
                    )}
                </div>
                <div className="w-full">
                  {errorsMessages[index] &&
                    errorsMessages[index]?.messageError && (
                      <p className="text-sm text-destructive">
                        {errorsMessages[index].messageError || ""}
                      </p>
                    )}
                </div>
                <div className="w-[18px]"> </div>
              </div>
            </div>
          </div>
        ))}
        <div className="flex flex-row w-full justify-end mt-8">
          <div className="flex gap-4">
            {entries?.length < maxNumbers && (
              <Button variant="outline" onClick={handleAdd}>
                <div className="flex flex-row items-center">
                  <span>Adicionar Número</span>{" "}
                  <Plus className="h-4 w-4 ml-2" />
                </div>
              </Button>
            )}
            <Button onClick={handleSave}>Salvar alterações</Button>
            <div className="w-[18px]"> </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
