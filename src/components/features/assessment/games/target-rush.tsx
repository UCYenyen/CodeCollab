"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useGameMetrics } from "@/hooks/use-game-metrics";
import type { GameProps } from "@/types/assessment";

export function TargetRush({ onComplete }: GameProps) {
  const { recordAttempt, finishGame } = useGameMetrics({ onComplete });
  const [isPlaying, setIsPlaying] = useState(false);
  const [targets, setTargets] = useState<{ id: number; x: number; y: number; isTarget: boolean }[]>([]);
  const gameAreaRef = useRef<HTMLDivElement>(null);
  
  // Game logic here
  // For now, this is a basic mockup of the game flow
  
  const startGame = () => {
    setIsPlaying(true);
    // spawn targets...
    setTimeout(() => {
      finishGame(); // auto finish after 5s for testing
    }, 5000);
  };

  return (
    <div className="w-full max-w-2xl bg-white p-6 rounded-3xl border-4 border-navy shadow-[8px_8px_0px_0px_var(--navy)]">
      <h2 className="font-display text-2xl text-navy mb-2">Target Rush</h2>
      <p className="text-muted-foreground mb-4">Tap only the RED circles as fast as you can!</p>
      
      {!isPlaying ? (
        <Button onClick={startGame} className="w-full bg-primary text-white h-12 rounded-xl">Start Game</Button>
      ) : (
        <div 
          ref={gameAreaRef} 
          className="relative w-full h-[400px] bg-slate-100 rounded-xl overflow-hidden cursor-crosshair border-2 border-border"
        >
          {/* Render targets here */}
          <div className="absolute inset-0 flex items-center justify-center">
             <span className="animate-pulse font-bold text-navy">Game is running... (auto finish in 5s)</span>
          </div>
        </div>
      )}
    </div>
  );
}
