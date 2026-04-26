import { usePasswordStrength } from "@/hooks/use-password-strength";
import type { PasswordStrengthBarProps } from "@/types/auth-components";

export function PasswordStrengthBar({ password }: PasswordStrengthBarProps) {
  const { strength, label, segments } = usePasswordStrength(password);

  if (strength === "empty") return null;

  const segmentColor =
    strength === "weak"
      ? "bg-destructive"
      : strength === "fair"
      ? "bg-yellow-cta"
      : "bg-accent";

  const labelColor =
    strength === "weak"
      ? "text-destructive"
      : strength === "fair"
      ? "text-yellow-cta"
      : "text-accent";

  return (
    <div className="space-y-1">
      <div className="flex gap-1">
        {segments.map((filled, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-all ${filled ? segmentColor : "bg-gray-200"}`}
          />
        ))}
      </div>
      <p className={`text-xs font-medium ${labelColor}`}>{label}</p>
    </div>
  );
}
