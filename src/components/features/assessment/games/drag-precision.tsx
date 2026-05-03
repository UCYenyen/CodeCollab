"use client";

import { useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import type { GameProps } from "@/types/assessment";

const GAME_DURATION = 20;
const TOTAL_TARGETS = 10;

interface Target {
  id: number;
  x: number;
  y: number;
}

export function DragPrecision({ onComplete }: GameProps) {
  const [phase, setPhase] = useState<"idle" | "playing" | "done">("idle");
  const [target, setTarget] = useState<Target | null>(null);
  const [hits, setHits] = useState(0);
  const [missed, setMissed] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);

  const spawnTarget = useCallback(() => {
    setTarget({
      id: Date.now(),
      x: Math.random() * 80 + 5,
      y: Math.random() * 70 + 10,
    });
  }, []);

  const startGame = () => {
    setHits(0);
    setMissed(0);
    setTimeLeft(GAME_DURATION);
    setPhase("playing");
    spawnTarget();
  };

  useEffect(() => {
    if (phase !== "playing") return;
    const interval = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(interval);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [phase]);

  useEffect(() => {
    if (phase === "playing" && timeLeft === 0) {
      const total = hits + missed;
      const accuracy = total > 0 ? hits / total : 0;
      const completion = Math.min(hits / TOTAL_TARGETS, 1);
      const score = Math.round((accuracy * 0.6 + completion * 0.4) * 100);
      setPhase("done");
      onComplete(score);
    }
  }, [timeLeft, phase, hits, missed, onComplete]);

  const handleHit = () => {
    setHits((h) => h + 1);
    spawnTarget();
  };

  const handleMiss = () => {
    setMissed((m) => m + 1);
  };

  return (
    <div className="w-full max-w-2xl bg-white p-6 rounded-3xl border-4 border-navy shadow-[8px_8px_0px_0px_var(--navy)]">
      <h2 className="font-display text-2xl text-navy mb-2">Drag Precision</h2>
      <p className="text-muted-foreground mb-4">Tap the moving target as fast as you can!</p>

      {phase === "idle" && (
        <Button onClick={startGame} className="w-full bg-primary text-white h-12 rounded-xl">
          Start Game
        </Button>
      )}

      {phase === "playing" && (
        <div className="space-y-3">
          <div className="flex justify-between text-sm font-bold text-navy">
            <span>Time: {timeLeft}s</span>
            <span>Hits: {hits}</span>
          </div>
          <div
            onClick={handleMiss}
            className="relative w-full h-80 bg-slate-50 rounded-xl border-2 border-border overflow-hidden cursor-crosshair"
          >
            {target && (
              <button
                key={target.id}
                onClick={(e) => {
                  e.stopPropagation();
                  handleHit();
                }}
                style={{ left: `${target.x}%`, top: `${target.y}%` }}
                className="absolute w-12 h-12 rounded-full bg-primary border-2 border-navy hover:scale-110 transition-transform"
              />
            )}
          </div>
        </div>
      )}

      {phase === "done" && (
        <div className="text-center text-lg font-bold text-navy">Time's up!</div>
      )}
    </div>
  );
}
