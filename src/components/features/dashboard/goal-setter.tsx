"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Target, Check, Pencil, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface GoalSetterProps {
  childId: string;
  initialGoal: number;
  weeklyCoins: number;
}

export function GoalSetter({ childId, initialGoal, weeklyCoins }: GoalSetterProps) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [goal, setGoal] = useState(initialGoal);
  const [draftGoal, setDraftGoal] = useState(initialGoal.toString());
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const percent = goal > 0 ? Math.min(100, Math.round((weeklyCoins / goal) * 100)) : 0;

  const handleSave = async () => {
    const value = parseInt(draftGoal, 10);
    if (isNaN(value) || value < 0) {
      setError("Please enter a valid number");
      return;
    }

    setIsSaving(true);
    setError(null);
    try {
      const res = await fetch(`/api/children/${childId}/goal`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ weeklyGoal: value }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to save goal");
      }

      setGoal(value);
      setIsEditing(false);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save goal");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setDraftGoal(goal.toString());
    setIsEditing(false);
    setError(null);
  };

  return (
    <div className="rounded-2xl border-2 border-navy bg-white p-5 shadow-[4px_4px_0px_0px_var(--navy)]">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Target className="h-5 w-5 text-primary" />
          <h3 className="font-display text-lg text-navy">Weekly Goal</h3>
        </div>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-1 text-xs font-bold text-primary hover:underline"
          >
            <Pencil className="h-3 w-3" />
            Edit
          </button>
        )}
      </div>

      {!isEditing ? (
        <>
          <div className="flex items-baseline justify-between mb-2">
            <span className="text-sm text-muted-foreground">Coins this week</span>
            <span className="font-display text-2xl text-navy">
              {weeklyCoins} <span className="text-muted-foreground text-base">/ {goal}</span>
            </span>
          </div>
          <div className="h-3 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary transition-all"
              style={{ width: `${percent}%` }}
            />
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            {percent >= 100
              ? "🎉 Goal reached this week!"
              : `${percent}% complete — ${Math.max(0, goal - weeklyCoins)} coins to go.`}
          </p>
        </>
      ) : (
        <div className="space-y-3">
          <label className="block text-xs font-bold text-navy uppercase">
            Coins per week
          </label>
          <Input
            type="number"
            min={0}
            value={draftGoal}
            onChange={(e) => setDraftGoal(e.target.value)}
            className="rounded-xl border-2 border-navy"
          />
          {error && <p className="text-xs text-destructive">{error}</p>}
          <div className="flex gap-2">
            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="flex-1 bg-primary text-white rounded-xl border-2 border-navy"
            >
              {isSaving ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <Check className="h-4 w-4 mr-1" /> Save
                </>
              )}
            </Button>
            <Button
              variant="outline"
              onClick={handleCancel}
              disabled={isSaving}
              className="flex-1 rounded-xl border-2 border-navy"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
