"use client";

import { useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import type { GameProps } from "@/types/assessment";

const COLORS = [
  { id: 0, bg: "bg-red-500", active: "bg-red-300" },
  { id: 1, bg: "bg-blue-500", active: "bg-blue-300" },
  { id: 2, bg: "bg-green-500", active: "bg-green-300" },
  { id: 3, bg: "bg-yellow-400", active: "bg-yellow-200" },
];

const SEQUENCE_LENGTH = 5;

export function MemoryLights({ onComplete }: GameProps) {
  const [phase, setPhase] = useState<"idle" | "showing" | "input" | "done">("idle");
  const [sequence, setSequence] = useState<number[]>([]);
  const [userInput, setUserInput] = useState<number[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [correct, setCorrect] = useState(0);

  const startGame = () => {
    const newSeq = Array.from({ length: SEQUENCE_LENGTH }, () => Math.floor(Math.random() * 4));
    setSequence(newSeq);
    setUserInput([]);
    setCorrect(0);
    setPhase("showing");
  };

  useEffect(() => {
    if (phase !== "showing") return;
    let i = 0;
    const interval = setInterval(() => {
      if (i >= sequence.length) {
        clearInterval(interval);
        setActiveIndex(null);
        setPhase("input");
        return;
      }
      setActiveIndex(sequence[i] ?? null);
      setTimeout(() => setActiveIndex(null), 400);
      i++;
    }, 700);
    return () => clearInterval(interval);
  }, [phase, sequence]);

  const handleClick = (id: number) => {
    if (phase !== "input") return;
    const newInput = [...userInput, id];
    setUserInput(newInput);
    if (sequence[newInput.length - 1] === id) {
      setCorrect((c) => c + 1);
    }
    if (newInput.length >= sequence.length) {
      setPhase("done");
    }
  };

  const finish = useCallback(() => {
    const score = Math.round((correct / SEQUENCE_LENGTH) * 100);
    onComplete(score);
  }, [correct, onComplete]);

  useEffect(() => {
    if (phase === "done") {
      const t = setTimeout(finish, 600);
      return () => clearTimeout(t);
    }
  }, [phase, finish]);

  return (
    <div className="w-full max-w-2xl bg-white p-6 rounded-3xl border-4 border-navy shadow-[8px_8px_0px_0px_var(--navy)]">
      <h2 className="font-display text-2xl text-navy mb-2">Memory Lights</h2>
      <p className="text-muted-foreground mb-4">
        {phase === "idle" && "Watch the sequence and tap the colors in order!"}
        {phase === "showing" && "Watch carefully..."}
        {phase === "input" && `Your turn! ${userInput.length}/${sequence.length}`}
        {phase === "done" && "Great job!"}
      </p>

      {phase === "idle" ? (
        <Button onClick={startGame} className="w-full bg-primary text-white h-12 rounded-xl">
          Start Game
        </Button>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {COLORS.map((c) => (
            <button
              key={c.id}
              onClick={() => handleClick(c.id)}
              disabled={phase !== "input"}
              className={`h-32 rounded-xl border-2 border-navy transition-all ${
                activeIndex === c.id ? c.active : c.bg
              } ${phase === "input" ? "hover:opacity-80 cursor-pointer" : "cursor-default"}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
