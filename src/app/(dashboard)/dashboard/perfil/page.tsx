"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";

// Mock user data - replace with actual data fetching
const userData = {
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  plan: "Business",
  nextPayment: "2024-04-20",
};

export default function ProfilePage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleResetPassword = async () => {
    setIsLoading(true);
    // Handle password reset logic here
    console.log("Password reset requested");
    setIsLoading(false);
  };

  return (
    <>
      <main className="min-h-screen pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-3xl">
          <Card className="p-6">
            <h1 className="text-2xl font-bold mb-6">Perfil de Usuário</h1>
            
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Primeiro Nome</TableCell>
                  <TableCell>{userData.firstName}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Último Nome</TableCell>
                  <TableCell>{userData.lastName}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Email</TableCell>
                  <TableCell>{userData.email}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Plano Atual</TableCell>
                  <TableCell>{userData.plan}</TableCell>
                </TableRow>
                {/* <TableRow>
                  <TableCell className="font-medium">Next Payment Date</TableCell>
                  <TableCell>{userData.nextPayment}</TableCell>
                </TableRow> */}
              </TableBody>
            </Table>

            <div className="mt-6">
              <Button
                onClick={handleResetPassword}
                disabled={isLoading}
                variant="outline"
              >
                {isLoading ? "Processando..." : "Alterar Password"}
              </Button>
            </div>
          </Card>
        </div>
      </main>
    </>
  );
}