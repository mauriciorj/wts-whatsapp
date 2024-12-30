"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";

type WhatsAppEntry = {
  number: string;
  description: string;
}[];

export function WhatsAppNumbers({
  numbers,
}: {
  numbers: { number: string; description: string }[];
}) {
  const [entries, setEntries] = useState<WhatsAppEntry>(numbers);
  const [newNumber, setNewNumber] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [hasChanges, setHasChanges] = useState(false);

  const handleRemove = (index: number) => {
    setEntries(entries.filter((_, i) => i !== index));
    setHasChanges(true);
  };

  const handleAdd = () => {
    if (newNumber && newDescription) {
      setEntries([
        ...entries,
        { number: newNumber, description: newDescription },
      ]);
      setNewNumber("");
      setNewDescription("");
      setHasChanges(true);
    }
  };

  const handleUpdate = (
    index: number,
    field: string,
    value: string
  ) => {
    const updatedEntries = entries.map((entry, i) =>
      i === index ? { ...entry, [field]: value } : entry
    );
    setEntries(updatedEntries);
    setHasChanges(true);
  };

  const handleSave = () => {
    // Handle save logic here
    console.log("Saving changes:", entries);
    setHasChanges(false);
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Numeros de WhatsApp</h2>
      <div className="space-y-4">
        <div className="space-y-2 mt-10">
          <div className="flex gap-4">
            <Label className="w-full">Numero de Celular</Label>
            <Label className="w-full">Texto</Label>
            <div className="w-[18px]"> </div>
          </div>
        </div>
        {entries.map((entry, index) => (
          <div key={index} className="space-y-2">
            <div className="flex gap-4">
              <Input
                value={entry.number}
                onChange={(e) => handleUpdate(index, "number", e.target.value)}
                placeholder="WhatsApp number"
              />
              <Input
                value={entry.description}
                onChange={(e) =>
                  handleUpdate(index, "description", e.target.value)
                }
                placeholder="Description"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleRemove(index)}
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          </div>
        ))}
        <div className="space-y-2">
          <div className="flex gap-4">
            <Input
              placeholder="Celular, ex: +5511999999"
              value={newNumber}
              onChange={(e) => setNewNumber(e.target.value)}
            />
            <Input
              placeholder="Insira uma descrição"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
            />
            <Button variant="ghost" size="icon" onClick={handleAdd}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
        {hasChanges && (
          <div className="flex justify-end mt-4">
            <Button onClick={handleSave}>Salvar alterações</Button>
          </div>
        )}
      </div>
    </Card>
  );
}
