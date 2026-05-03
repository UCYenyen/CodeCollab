"use client";

import type { Target } from "@/types/games/target-rush";

interface TargetCircleProps {
  target: Target;
  onClickTarget: (targetId: number, targetType: "target" | "distractor") => void;
}

export function TargetCircle({ target, onClickTarget }: TargetCircleProps) {
  const isTarget = target.type === "target";
  const isClicked = target.clicked;

  return (
    <button
      onClick={() => onClickTarget(target.id, target.type)}
      disabled={isClicked}
      className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all focus:outline-none disabled:opacity-50"
      style={{
        left: `${target.x}px`,
        top: `${target.y}px`,
      }}
    >
      <div
        className={`w-12 h-12 rounded-full border-4 flex items-center justify-center font-bold text-sm cursor-pointer transition-transform hover:scale-110 active:scale-95 ${
          isTarget
            ? "bg-red-400 border-red-600 text-white"
            : "bg-blue-400 border-blue-600 text-white"
        } ${isClicked ? "opacity-60 scale-75" : ""}`}
      >
        {isTarget ? "✓" : "✗"}
      </div>
    </button>
  );
}
