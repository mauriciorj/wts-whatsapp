import Link from "next/link";
import { createServer } from "@/db/supabase/server";
import { UserNav } from "./user-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "../ui/button";

export async function Header() {
  const supabase = await createServer();
  const { data } = await supabase.auth.getUser();

  return (
    <header className="fixed top-0 w-full bg-background/80 backdrop-blur-sm border-b z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="pl-12 md:pl-0 text-xl font-bold">
          WhatsApp
        </Link>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          {data?.user?.email ? (
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
