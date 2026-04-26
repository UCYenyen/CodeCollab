import { cn } from "@/lib/utils";
import type { WaveDividerProps } from "@/types/landing";

export function WaveDivider({ className, flip = false }: WaveDividerProps) {
  return (
    <svg
      viewBox="0 0 1440 70"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      className={cn(
        "block w-full h-[70px]",
        flip && "scale-y-[-1]",
        className
      )}
    >
      <path
        d="M0,35 C240,70 480,0 720,35 C960,70 1200,0 1440,35 L1440,70 L0,70 Z"
        fill="currentColor"
      />
    </svg>
  );
}
