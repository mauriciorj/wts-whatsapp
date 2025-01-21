"use client";

import { useRouter, usePathname } from "next/navigation";
import { createClient } from "@/db/supabase/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, LogOut, Settings } from "lucide-react";

export function UserNav() {
  const router = useRouter();
  const pathname = usePathname();

  const handleSignOut = async () => {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();
    if (!error) {
      router.refresh();
    }
  };
  const isInsideDashboard = Boolean(pathname.split("/")[1] === "dashboard");

  if (!isInsideDashboard) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Settings />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem
          asChild
          onClick={() => router.push("/dashboard/perfil")}
          className="cursor-pointer"
        >
          <div className="w-full flex items-center">
            <User className="mr-2 h-4 w-4" />
            Perfil
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-rose-600 cursor-pointer"
          onClick={() => handleSignOut()}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
