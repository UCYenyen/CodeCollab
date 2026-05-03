"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import type { GameProps } from "@/types/assessment";

interface Scenario {
  text: string;
  answer: string;
}

const SCENARIOS: Scenario[] = [
  { text: "Your friend shares their favorite snack with you.", answer: "😊" },
  { text: "You lost your favorite toy.", answer: "😢" },
  { text: "Someone took your turn in line.", answer: "😠" },
  { text: "You see a big spider on the wall.", answer: "😨" },
  { text: "It's your birthday and everyone is cheering!", answer: "🎉" },
  { text: "You finished a hard puzzle all by yourself.", answer: "😎" },
];

const EMOTIONS = ["😊", "😢", "😠", "😨", "🎉", "😎"];
const ROUNDS = 5;

export function EmotionMatch({ onComplete }: GameProps) {
  const [phase, setPhase] = useState<"idle" | "playing" | "done">("idle");
  const [roundIndex, setRoundIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);

  const rounds = useMemo(
    () => [...SCENARIOS].sort(() => Math.random() - 0.5).slice(0, ROUNDS),
    [phase === "idle"],
  );

  const startGame = () => {
    setRoundIndex(0);
    setCorrect(0);
    setPhase("playing");
  };

  const handlePick = (emoji: string) => {
    if (feedback) return;
    const round = rounds[roundIndex];
    if (!round) return;
    const isCorrect = emoji === round.answer;
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
      <h2 className="font-display text-2xl text-navy mb-2">Emotion Match</h2>
      <p className="text-muted-foreground mb-4">How would they feel?</p>

      {phase === "idle" && (
        <Button onClick={startGame} className="w-full bg-primary text-white h-12 rounded-xl">
          Start Game
        </Button>
      )}

      {phase === "playing" && round && (
        <div className="space-y-6">
          <div className="text-sm font-bold text-navy">Round {roundIndex + 1}/{ROUNDS}</div>
          <div className="bg-cream p-6 rounded-xl border-2 border-border text-center text-lg text-navy">
            {round.text}
          </div>
          <div className="grid grid-cols-3 gap-3">
            {EMOTIONS.map((emoji) => (
              <button
                key={emoji}
                onClick={() => handlePick(emoji)}
                disabled={!!feedback}
                className={`h-20 text-4xl rounded-xl border-2 border-navy bg-white hover:bg-cream transition-all ${
                  feedback && emoji === round.answer ? "bg-green-200" : ""
                } ${feedback === "wrong" && emoji !== round.answer ? "opacity-50" : ""}`}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      )}

      {phase === "done" && (
        <div className="text-center text-lg font-bold text-navy">All done!</div>
      )}
    </div>
  );
}
