"use client";

import { MoreHorizontal, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import type { ChildDashboardData } from "@/types/dashboard";

const WEEKLY_GOAL_COINS = 50;

const AVATAR_BG: Record<string, string> = {
  space: "bg-[#d5c8ff]",
  ocean: "bg-[#a8e6df]",
  fire: "bg-[#ffcab5]",
  nature: "bg-[#dcfce7]",
  ready: "bg-[#fce7f3]",
};

interface ChildCardProps {
  child: ChildDashboardData;
}

export function ChildCard({ child }: ChildCardProps) {
  const weeklyPercent = Math.min(
    100,
    Math.round((child.weeklyCoins / WEEKLY_GOAL_COINS) * 100),
  );
  const isOnTrack = weeklyPercent >= 70;
  const accentIsOrange = child.accentColor === "primary";

  return (
    <div className="rounded-2xl border-2 border-navy bg-white shadow-[4px_4px_0px_0px_var(--navy)] transition-all hover:shadow-[2px_2px_0px_0px_var(--navy)] hover:translate-x-0.5 hover:translate-y-0.5">
      <div className="p-4">
        <div className="flex items-start gap-3">
          <Avatar className="h-14 w-14 border-2 border-navy flex-shrink-0">
            <AvatarFallback
              className={cn(
                AVATAR_BG[child.avatarKey] ?? "bg-muted",
                "text-xl font-bold text-navy",
              )}
            >
              {child.name.charAt(0)}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-1">
              <div>
                <p className="font-display text-lg text-navy leading-tight">
                  {child.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  Age {child.age} • Grade {child.grade}
                </p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="rounded-lg p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-navy">
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Edit Profile</DropdownMenuItem>
                  <DropdownMenuItem>View Details</DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">
                    Remove Child
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        <div className="mt-4 space-y-1.5">
          <div className="flex items-center justify-between text-xs font-medium">
            <span className="text-muted-foreground">Weekly Goal</span>
            <span
              className={cn(
                "font-bold",
                isOnTrack ? "text-accent" : "text-primary",
              )}
            >
              {weeklyPercent}%
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
            <div
              className={cn(
                "h-full rounded-full transition-all",
                isOnTrack ? "bg-accent" : "bg-primary",
              )}
              style={{ width: `${weeklyPercent}%` }}
            />
          </div>
        </div>
      </div>

      <div className="flex gap-2 border-t-2 border-border px-4 py-3">
        <Button
          variant="outline"
          size="sm"
          className="flex-1 rounded-xl border-2 border-navy text-xs font-bold text-navy hover:bg-muted"
        >
          View Report
        </Button>
        <Button
          size="sm"
          className={cn(
            "flex-1 gap-1.5 rounded-xl border-2 border-navy text-xs font-bold text-white shadow-[2px_2px_0px_0px_var(--navy)] transition-all hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5",
            accentIsOrange
              ? "bg-primary hover:bg-primary-hover"
              : "bg-accent hover:bg-accent/90",
          )}
        >
          <Play className="h-3 w-3 fill-white" />
          Play
        </Button>
      </div>
    </div>
  );
}
