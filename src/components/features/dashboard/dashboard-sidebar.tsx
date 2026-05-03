"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
  BarChart2,
  Settings,
  User,
  LogOut,
  ChevronDown,
  ChevronRight,
  Sparkles,
  Menu,
  X,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import type { SidebarChildItem } from "@/types/dashboard";

interface DashboardSidebarProps {
  children: SidebarChildItem[];
}

export function DashboardSidebar({ children }: DashboardSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [childrenOpen, setChildrenOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const supabase = createClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/auth/sign-in");
    router.refresh();
  };

  const handleNavigate = () => setMobileOpen(false);

  const sidebarContent = (
    <>
      <Link
        href={"/"}
        onClick={handleNavigate}
        className="flex items-center gap-2.5 px-5 py-5"
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
          <Sparkles className="h-4 w-4 text-white" />
        </div>
        <span className="font-display text-lg font-bold tracking-wide">
          Brain<span className="text-primary">Spark</span>
        </span>
      </Link>

      <nav className="flex-1 space-y-0.5 px-3 py-2">
        <div>
          <button
            onClick={() => setChildrenOpen((o) => !o)}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-card transition-colors hover:bg-white/10 hover:text-white"
          >
            <User className="h-4 w-4 flex-shrink-0" />
            <span className="flex-1 text-left">My Children</span>
            {childrenOpen ? (
              <ChevronDown className="h-3.5 w-3.5" />
            ) : (
              <ChevronRight className="h-3.5 w-3.5" />
            )}
          </button>

          {childrenOpen && (
            <div className="ml-4 mt-0.5 space-y-0.5 border-l border-white/10 pl-4">
              <Link
                href="/dashboard"
                onClick={handleNavigate}
                className={cn(
                  "block rounded-lg px-3 py-2 text-xs font-medium transition-colors",
                  pathname === "/dashboard"
                    ? "text-primary"
                    : "text-white/60 hover:text-white",
                )}
              >
                Overview
              </Link>
              {children.map((child) => (
                <Link
                  key={child.id}
                  href={`/dashboard/children/${child.id}`}
                  onClick={handleNavigate}
                  className="block rounded-lg px-3 py-2 text-xs font-medium text-white/60 transition-colors hover:text-white"
                >
                  {child.name}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* <Link
          href="/dashboard/reports"
          onClick={handleNavigate}
          className={cn(
            "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
            pathname.startsWith("/dashboard/reports")
              ? "bg-primary text-white"
              : "text-white/70 hover:bg-white/10 hover:text-white",
          )}
        >
          <BarChart2 className="h-4 w-4 flex-shrink-0" />
          Reports
        </Link> */}

        <Link
          href="/dashboard/settings"
          onClick={handleNavigate}
          className={cn(
            "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
            pathname.startsWith("/dashboard/settings")
              ? "bg-primary text-white"
              : "text-white/70 hover:bg-white/10 hover:text-white",
          )}
        >
          <Settings className="h-4 w-4 flex-shrink-0" />
          Settings
        </Link>
      </nav>

      <div className="px-3 py-4">
        <button
          onClick={handleSignOut}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/60 transition-colors hover:bg-white/10 hover:text-white"
        >
          <LogOut className="h-4 w-4 flex-shrink-0" />
          Logout
        </button>
      </div>
    </>
  );

  return (
    <>
      <div className="flex items-center justify-between bg-navy px-4 py-3 md:hidden">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary">
            <Sparkles className="h-3.5 w-3.5 text-white" />
          </div>
          <span className="font-display text-base font-bold tracking-wide text-white">
            Brain<span className="text-primary">Spark</span>
          </span>
        </Link>
        <button
          onClick={() => setMobileOpen(true)}
          className="rounded-lg p-2 text-white hover:bg-white/10"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      <aside className="hidden h-screen w-56 flex-shrink-0 flex-col bg-navy text-white md:flex">
        {sidebarContent}
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            onClick={() => setMobileOpen(false)}
            className="absolute inset-0 bg-black/50"
          />
          <aside className="relative flex h-full w-64 flex-col bg-navy text-white">
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute right-3 top-3 rounded-lg p-2 text-white hover:bg-white/10"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
}
