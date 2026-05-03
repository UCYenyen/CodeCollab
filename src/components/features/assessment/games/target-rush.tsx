"use client";

import { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useGameMetrics } from "@/hooks/use-game-metrics";
import { useTargetRush } from "@/hooks/use-target-rush";
import { TargetCircle } from "./target-circle";
import type { GameProps } from "@/types/assessment";

export function TargetRush({ onComplete }: GameProps) {
  const { recordAttempt, finishGame } = useGameMetrics({ onComplete });
  const { targets, isGameActive, metrics, startGame, endGame, handleTargetClick } = useTargetRush();
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const [timeLeft, setTimeLeft] = useState(30);

  const handleGameStart = () => {
    startGame();
    setTimeLeft(30);
  };

  useEffect(() => {
    if (!isGameActive) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          endGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isGameActive, endGame]);

  useEffect(() => {
    if (isGameActive) return;

    recordAttempt(metrics.accuracy);
    finishGame();
  }, [isGameActive, metrics.accuracy, recordAttempt, finishGame]);

  return (
    <div className="w-full max-w-2xl bg-white p-6 rounded-3xl border-4 border-navy shadow-[8px_8px_0px_0px_var(--navy)]">
      <div className="mb-4">
        <h2 className="font-display text-2xl text-navy mb-2">Target Rush</h2>
        <p className="text-muted-foreground">Tap only the RED circles as fast as you can!</p>
      </div>

      {!isGameActive ? (
        <div className="space-y-4">
          <div className="bg-cream rounded-xl p-4 border-2 border-border">
            <div className="text-sm text-muted-foreground mb-2">Score: {metrics.score}</div>
            <div className="text-sm text-muted-foreground mb-2">Accuracy: {Math.round(metrics.accuracy)}%</div>
            <div className="text-sm text-muted-foreground">Correct: {metrics.correctClicks} | Incorrect: {metrics.incorrectClicks}</div>
          </div>
          <Button onClick={handleGameStart} className="w-full bg-primary text-white h-12 rounded-xl font-bold">
            {metrics.score > 0 ? "Play Again" : "Start Game"}
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between px-4 py-3 bg-cream rounded-xl border-2 border-border">
            <div className="text-sm font-bold text-navy">Time: {timeLeft}s</div>
            <div className="text-sm font-bold text-navy">Score: {metrics.score}</div>
            <div className="text-sm font-bold text-navy">Accuracy: {Math.round(metrics.accuracy)}%</div>
          </div>

          <div
            ref={gameAreaRef}
            className="relative w-full h-100 bg-slate-50 rounded-xl overflow-hidden cursor-crosshair border-2 border-border"
            style={{ touchAction: "none" }}
          >
            {targets.map((target) => (
              <TargetCircle
                key={target.id}
                target={target}
                onClickTarget={handleTargetClick}
              />
            ))}
          </div>

          <div className="text-center text-xs text-muted-foreground">
            {targets.length === 0 && "Waiting for targets..."}
          </div>
        </div>
      )}
    </div>
  );
}
