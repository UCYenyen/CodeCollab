"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import type { GameProps } from "@/types/assessment";

const SHAPES = ["🔴", "🔵", "🟢", "🟡"];
const ROUNDS = 5;

interface Round {
  pattern: string[];
  options: string[];
  answer: string;
}

function generateRound(): Round {
  const a = SHAPES[Math.floor(Math.random() * 4)] ?? "🔴";
  const b = SHAPES[Math.floor(Math.random() * 4)] ?? "🔵";
  const pattern = [a, b, a, b, a];
  const answer = b;
  const options = [...SHAPES].sort(() => Math.random() - 0.5);
  return { pattern, options, answer };
}

export function PatternBuilder({ onComplete }: GameProps) {
  const [phase, setPhase] = useState<"idle" | "playing" | "done">("idle");
  const [roundIndex, setRoundIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);

  const rounds = useMemo(
    () => Array.from({ length: ROUNDS }, generateRound),
    [phase === "idle"],
  );

  const startGame = () => {
    setRoundIndex(0);
    setCorrect(0);
    setPhase("playing");
  };

  const handlePick = (option: string) => {
    if (feedback) return;
    const round = rounds[roundIndex];
    if (!round) return;
    const isCorrect = option === round.answer;
    if (isCorrect) setCorrect((c) => c + 1);
    setFeedback(isCorrect ? "correct" : "wrong");

    setTimeout(() => {
      setFeedback(null);
      if (roundIndex + 1 >= ROUNDS) {
        const finalCorrect = correct + (isCorrect ? 1 : 0);
        const score = Math.round((finalCorrect / ROUNDS) * 100);
        setPhase("done");
        onComplete(score);
      } else {
        setRoundIndex((i) => i + 1);
      }
    }, 600);
  };

  const round = rounds[roundIndex];

  return (
    <div className="w-full max-w-2xl bg-white p-6 rounded-3xl border-4 border-navy shadow-[8px_8px_0px_0px_var(--navy)]">
      <h2 className="font-display text-2xl text-navy mb-2">Pattern Builder</h2>
      <p className="text-muted-foreground mb-4">What comes next in the pattern?</p>

      {phase === "idle" && (
        <Button onClick={startGame} className="w-full bg-primary text-white h-12 rounded-xl">
          Start Game
        </Button>
      )}

      {phase === "playing" && round && (
        <div className="space-y-6">
          <div className="text-sm font-bold text-navy">Round {roundIndex + 1}/{ROUNDS}</div>
          <div className="flex items-center justify-center gap-3 text-4xl bg-cream p-4 rounded-xl border-2 border-border">
            {round.pattern.map((s, i) => (
              <span key={i}>{s}</span>
            ))}
            <span className="text-muted-foreground">?</span>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {round.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handlePick(opt)}
                disabled={!!feedback}
                className={`h-20 text-4xl rounded-xl border-2 border-navy bg-white hover:bg-cream transition-all ${
                  feedback && opt === round.answer ? "bg-green-200" : ""
                } ${feedback === "wrong" && opt !== round.answer ? "opacity-50" : ""}`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}

      {phase === "done" && (
        <div className="text-center text-lg font-bold text-navy">All done! Great work!</div>
      )}
    </div>
  );
}
