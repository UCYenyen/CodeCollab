"use client";

import { Bell } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface DashboardHeaderProps {
  parentName: string;
  parentInitials: string;
}

export function DashboardHeader({ parentName, parentInitials }: DashboardHeaderProps) {
  return (
    <div className="flex items-start justify-between">
      <div>
        <h1 className="font-display text-3xl font-bold text-navy">
          Welcome back, {parentName}! 👋
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

        <Avatar className="h-10 w-10 border-2 border-navy">
          <AvatarFallback className="bg-primary text-sm font-bold text-white">
            {parentInitials}
          </AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}
