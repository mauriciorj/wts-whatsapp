"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { UserNav } from "./user-nav";
import { Button } from "../ui/button";

export function Header({ userData }: any) {
  return (
    <header className="fixed top-0 w-full bg-background/80 backdrop-blur-sm border-b z-50">
      <div className="pl-10 pr-5 h-16 flex items-center justify-between">
        <Link href="/" className="pl-12 md:pl-0 text-3xl font-bold">
          WhatsApp
        </Link>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          {userData ? (
            <>
              <Button asChild>
                <Link href="/dashboard">Dashboard</Link>
              </Button>
              <UserNav />
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link href="#planos">Começar</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
