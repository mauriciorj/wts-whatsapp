"use client";

export function PageTitle({ userName }: { userName: string }) {
  return (
    <div>
      <h1 className="text-3xl font-bold">Bem vindo, {userName}</h1>
      <p className="text-muted-foreground mt-2">
        Seu Dashboard com as últimas informações
      </p>
    </div>
  );
}
