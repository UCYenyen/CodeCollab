import { Check } from "lucide-react";
import type { AvatarPickerProps } from "@/types/auth-components";

const AVATARS = [
  { id: "space", emoji: "🚀", label: "Space" },
  { id: "chef", emoji: "👨‍🍳", label: "Chef" },
  { id: "explorer", emoji: "🗺️", label: "Explorer" },
  { id: "scientist", emoji: "🔬", label: "Scientist" },
  { id: "artist", emoji: "🎨", label: "Artist" },
  { id: "athlete", emoji: "🏃", label: "Athlete" },
];

export function AvatarPicker({ value, onChange }: AvatarPickerProps) {
  return (
    <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
      {AVATARS.map((avatar) => {
        const isSelected = value === avatar.id;
        return (
          <button
            key={avatar.id}
            type="button"
            onClick={() => onChange(avatar.id)}
            className={`relative flex flex-col items-center gap-1 rounded-xl border-2 p-2 transition-all ${
              isSelected
                ? "border-primary bg-primary/10"
                : "border-gray-200 bg-white hover:border-primary/40"
            }`}
          >
            {isSelected && (
              <div className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary">
                <Check className="h-3 w-3 text-white" />
              </div>
            )}
            <span className="text-2xl">{avatar.emoji}</span>
            <span className={`text-xs font-medium ${isSelected ? "text-primary" : "text-navy"}`}>
              {avatar.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
