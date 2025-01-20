"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  MessageCircle,
  HelpCircle,
  Mail,
  Menu,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "WhatsApp", href: "/dashboard/whatsapp", icon: MessageCircle },
  { label: "Ajuda", href: "/dashboard/ajuda", icon: HelpCircle },
  { label: "Contato", href: "/contato", icon: Mail },
];

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden fixed top-3 left-4 z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu className="h-6 w-6" />
      </Button>

      <div
        className={cn(
          "fixed md:relative md:h-svh left-0 top-16 md:top-0 h-full w-64 border-r p-6 transition-transform duration-200 ease-in-out md:translate-x-0 z-10",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="space-y-4">
          <div className="mb-8">
            <h2 className="text-xl font-bold">Menu</h2>
          </div>
          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors",
                    pathname === item.href && "bg-secondary text-foreground"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
}
