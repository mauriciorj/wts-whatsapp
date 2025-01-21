"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { UserNav } from "./user-nav";
import { Button } from "../ui/button";

export function Header({ userData }: any) {
  const pathname = usePathname();

  const isInsideDashboard = Boolean(pathname.split("/")[1] === "dashboard");

  return (
    <header className="fixed top-0 w-full bg-background/80 backdrop-blur-sm border-b z-50">
      <div
        className={`${
          userData && !isInsideDashboard ? "pl-5 pr-5 md:pl-20 md:pr-20" : null
        } ${
          userData && isInsideDashboard ? "pl-16 pr-2 md:pl-20 md:pr-20" : null
        } ${
          !userData ? "pl-5 pr-5 md:pl-20 md:pr-20" : null
        } h-16 flex items-center justify-between`}
      >
        <Link href="/" className="pl-0 text-xl md:text-3xl font-bold">
          Zap<span className="text-destructive">Router</span>
        </Link>
        <div className="flex items-center gap-2">
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
                <Link href="/#planos">Começar</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
