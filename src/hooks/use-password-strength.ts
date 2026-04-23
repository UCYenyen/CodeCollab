"use client";

import { useMemo } from "react";

export type PasswordStrength = "empty" | "weak" | "fair" | "strong" | "very-strong";

export function usePasswordStrength(password: string) {
  return useMemo(() => {
    if (!password) {
      return { strength: "empty" as PasswordStrength, label: "", segments: [false, false, false, false] };
    }

    let score = 0;
    if (password.length >= 8) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^a-zA-Z0-9]/.test(password)) score++;
    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;

    if (score <= 1) {
      return { strength: "weak" as PasswordStrength, label: "Weak — try adding numbers & symbols", segments: [true, false, false, false] };
    }
    if (score === 2) {
      return { strength: "fair" as PasswordStrength, label: "Fair — getting better!", segments: [true, true, false, false] };
    }
    if (score === 3) {
      return { strength: "strong" as PasswordStrength, label: "Strong password!", segments: [true, true, true, false] };
    }
    return { strength: "very-strong" as PasswordStrength, label: "Very strong!", segments: [true, true, true, true] };
  }, [password]);
}
