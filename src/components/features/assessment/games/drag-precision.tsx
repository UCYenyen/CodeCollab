"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useGameMetrics } from "@/hooks/use-game-metrics";
import type { GameProps } from "@/types/assessment";

export function DragPrecision({ onComplete }: GameProps) {
  const { finishGame } = useGameMetrics({ onComplete });
  const [isPlaying, setIsPlaying] = useState(false);
  
  const startGame = () => {
    setIsPlaying(true);
    setTimeout(() => {
      finishGame(() => 90);
    }, 5000);
  };

  return (
    <div className="w-full max-w-2xl bg-white p-6 rounded-3xl border-4 border-navy shadow-[8px_8px_0px_0px_var(--navy)]">
      <h2 className="font-display text-2xl text-navy mb-2">Drag Precision</h2>
      <p className="text-muted-foreground mb-4">Drag the objects into their slots.</p>
      
      {!isPlaying ? (
        <Button onClick={startGame} className="w-full bg-primary text-white h-12 rounded-xl">Start Game</Button>
      ) : (
        <div className="flex h-[300px] items-center justify-center bg-slate-100 rounded-xl border-2 border-border">
          <span className="animate-pulse font-bold text-navy">Game is running... (auto finish in 5s)</span>
        </div>
      )}
    </div>
  );
}
