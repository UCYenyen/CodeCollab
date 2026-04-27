"use client";

import { Bell } from "lucide-react";
import { NavAccountButton } from "@/components/layout/nav-account-button";
import { useNavbarUser } from "@/hooks/use-navbar-user";
interface DashboardHeaderProps {
  parentName: string;
}

export function DashboardHeader({ parentName }: DashboardHeaderProps) {
  const user = useNavbarUser();
  return (
    <div className="flex items-start justify-between">
      <div>
        <h1 className="font-display text-3xl text-navy">
          Welcome back, <span className="text-primary">{parentName}</span>
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Here&apos;s how your little sparks are doing today.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative">
          <button className="flex h-10 w-10 items-center justify-center rounded-xl border-2 border-navy bg-white shadow-[2px_2px_0px_0px_var(--navy)] transition-all hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5">
            <Bell className="h-4 w-4 text-navy" />
          </button>
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[9px] font-bold text-white">
            3
          </span>
        </div>

        {user && <NavAccountButton user={user} />}
      </div>
    </div>
  );
}
