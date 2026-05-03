"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MoreHorizontal, Play, Loader2 } from "lucide-react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from "recharts";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
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
  isSelected?: boolean;
  onSelect?: (childId: string) => void;
}

export function ChildCard({ child, isSelected, onSelect }: ChildCardProps) {
  const router = useRouter();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const weeklyPercent = Math.min(
    100,
    Math.round((child.weeklyCoins / WEEKLY_GOAL_COINS) * 100),
  );
  const isOnTrack = weeklyPercent >= 70;
  const accentIsOrange = child.accentColor === "primary";

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/children/${child.id}`, { method: "DELETE" });
      if (res.ok) {
        router.refresh();
      } else {
        const data = await res.json();
        console.error("Failed to delete child:", data.error);
        alert(data.error || "Failed to delete child");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to delete child");
    } finally {
      setIsDeleting(false);
      setShowDeleteDialog(false);
    }
  };

  return (
    <>
      <div
        onClick={() => onSelect?.(child.id)}
        className={cn(
          "rounded-2xl border-2 bg-white transition-all cursor-pointer",
          isSelected
            ? "shadow-[4px_4px_0px_0px_var(--primary)] hover:shadow-[2px_2px_0px_0px_var(--primary)] hover:translate-x-0.5 hover:translate-y-0.5"
            : "border-navy shadow-[4px_4px_0px_0px_var(--navy)] hover:shadow-[2px_2px_0px_0px_var(--navy)] hover:translate-x-0.5 hover:translate-y-0.5",
        )}
      >
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
                    <DropdownMenuItem onClick={() => router.push(`/dashboard/children/${child.id}/edit`)}>
                      Edit Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push(`/dashboard/children/${child.id}`)}>
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="text-destructive"
                      onClick={() => setShowDeleteDialog(true)}
                    >
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

          {child.assessmentScores && (
            <div className="mt-4">
              <p className="text-xs font-medium text-muted-foreground mb-1">Cognitive Profile</p>
              <div className="h-44 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart
                    data={[
                      { subject: "Attn", value: child.assessmentScores.attention },
                      { subject: "Mem", value: child.assessmentScores.memory },
                      { subject: "Logic", value: child.assessmentScores.logic },
                      { subject: "Motor", value: child.assessmentScores.motoric },
                      { subject: "Social", value: child.assessmentScores.social },
                    ]}
                    outerRadius="70%"
                  >
                    <PolarGrid stroke="var(--border)" />
                    <PolarAngleAxis
                      dataKey="subject"
                      tick={{ fill: "var(--navy)", fontSize: 10, fontWeight: "bold" }}
                    />
                    <Radar
                      dataKey="value"
                      stroke="var(--primary)"
                      fill="var(--primary)"
                      fillOpacity={0.5}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-2 border-t-2 border-border px-4 py-3">
          {child.hasCompletedPreAssessment ? (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push(`/dashboard/children/${child.id}`)}
                className="flex-1 rounded-xl border-2 border-navy text-xs font-bold text-navy hover:bg-muted"
              >
                View Report
              </Button>
              <Button
                size="sm"
                onClick={() => {
                  sessionStorage.setItem("assessmentChildId", child.id);
                  router.push(`/assessment`);
                }}
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
            </>
          ) : (
            <Button
              size="sm"
              onClick={() => {
                  sessionStorage.setItem("assessmentChildId", child.id);
                  router.push(`/assessment`);
                }}
              className="w-full rounded-xl border-2 border-navy text-xs font-bold text-white shadow-[2px_2px_0px_0px_var(--navy)] transition-all hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 bg-primary hover:bg-primary-hover"
            >
              Take Pre Assessment
            </Button>
          )}
        </div>
      </div>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent className="rounded-3xl border-4 border-navy">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-display text-navy">Remove {child.name}?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to permanently remove this child profile? This action cannot be undone, and all their progress will be lost.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting} className="rounded-xl border-2 border-border font-bold">Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={(e) => {
                e.preventDefault();
                handleDelete();
              }}
              disabled={isDeleting} 
              className="bg-destructive hover:bg-destructive/90 text-white rounded-xl border-2 border-destructive font-bold"
            >
              {isDeleting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

