import { Check } from "lucide-react";
import type { DifficultyPickerProps } from "@/types/auth-components";

const DIFFICULTIES = [
  { id: "starting", emoji: "🐣", label: "Just Starting" },
  { id: "ready", emoji: "🚀", label: "Ready to Play" },
  { id: "challenge", emoji: "🏆", label: "Challenge Me!" },
];

export function DifficultyPicker({ value, onChange }: DifficultyPickerProps) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {DIFFICULTIES.map((diff) => {
        const isSelected = value === diff.id;
        return (
          <button
            key={diff.id}
            type="button"
            onClick={() => onChange(diff.id)}
            className={`relative flex flex-col items-center justify-center gap-2 rounded-xl border-2 px-2 py-4 text-center transition-all ${
              isSelected
                ? "border-primary bg-primary text-white shadow-[2px_2px_0px_0px_var(--navy)]"
                : "border-gray-200 bg-white text-navy hover:border-primary/40"
            }`}
          >
            {isSelected && (
              <div className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-navy">
                <Check className="h-3 w-3 text-white" />
              </div>
            )}
            <span className="text-2xl">{diff.emoji}</span>
            <span className="text-xs font-bold leading-tight">{diff.label}</span>
          </button>
        );
      })}
    </div>
  );
}
