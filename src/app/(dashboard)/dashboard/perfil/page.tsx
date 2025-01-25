"use client";

import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import GetUser from "@/actions/getUser/actions";
import GetUserProfile from "@/actions/getUserProfile/actions";
import { useQuery } from "@tanstack/react-query";

const Perfil = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { data: userData, isLoading: userIsLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => GetUser(),
  });

  const { data: userProfileData, isLoading: userProfileIsLoading } = useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => GetUserProfile({ userId: userData?.user?.id }),
    enabled: !!userData?.user?.id,
  });

  const handleResetPassword = async () => {
    setIsLoading(true);
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
                  <TableCell>
                    {userIsLoading || userProfileIsLoading ? (
                      <Skeleton className="w-full h-6 w-32" />
                    ) : (
                      userProfileData?.first_name
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Último Nome</TableCell>
                  <TableCell>
                    {userIsLoading || userProfileIsLoading ? (
                      <Skeleton className="h-6 w-32" />
                    ) : (
                      userProfileData?.last_name
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Email</TableCell>
                  <TableCell>
                    {userIsLoading || userProfileIsLoading ? (
                      <Skeleton className="h-6 w-32" />
                    ) : (
                      userProfileData?.email
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Plano Atual</TableCell>
                  <TableCell>
                    {userIsLoading || userProfileIsLoading ? (
                      <Skeleton className="h-6 w-32" />
                    ) : (
                      userProfileData?.plan
                    )}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <div className="mt-6">
              <Button
                onClick={handleResetPassword}
                disabled={isLoading}
                variant="outline"
              >
                {isLoading ? (
                  <div className="flex flex-row items-center italic">
                    Processando...
                    <LoaderCircle className="animate-spin h-6 w-5 ml-2" />
                  </div>
                ) : (
                  "Alterar Password"
                )}
              </Button>
            </div>
          </Card>
        </div>
      </main>
    </>
  );
};

export default Perfil;
