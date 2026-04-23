import { ShieldCheck, Zap } from "lucide-react";

const CONFETTI = [
  { color: "bg-primary", size: "h-2 w-3", top: "top-16", left: "left-12", rotate: "rotate-12" },
  { color: "bg-yellow-cta", size: "h-3 w-2", top: "top-24", left: "left-1/3", rotate: "-rotate-6" },
  { color: "bg-accent", size: "h-2 w-4", top: "top-20", right: "right-16", rotate: "rotate-45" },
  { color: "bg-step-3", size: "h-3 w-3", top: "top-36", right: "right-8", rotate: "rotate-12" },
  { color: "bg-primary", size: "h-4 w-2", top: "top-48", left: "left-8", rotate: "-rotate-12" },
  { color: "bg-yellow-cta", size: "h-2 w-3", top: "top-56", right: "right-20", rotate: "rotate-6" },
  { color: "bg-accent", size: "h-3 w-2", bottom: "bottom-48", left: "left-16", rotate: "rotate-45" },
  { color: "bg-step-1", size: "h-2 w-4", bottom: "bottom-36", right: "right-12", rotate: "-rotate-6" },
];

export function CompleteLeftPanel() {
  return (
    <div className="relative hidden h-full flex-col overflow-hidden bg-navy p-10 text-white lg:flex">
      <div className="flex items-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
          <Zap className="h-5 w-5 fill-white text-white" />
        </div>
        <span className="text-xl font-bold">
          <span className="text-white">Brain</span>
          <span className="text-primary">Spark</span>
        </span>
      </div>

      {CONFETTI.map((c, i) => (
        <div
          key={i}
          className={`absolute rounded-sm ${c.color} ${c.size} ${c.top ?? ""} ${c.bottom ?? ""} ${c.left ?? ""} ${(c as { right?: string }).right ?? ""} ${c.rotate}`}
        />
      ))}

      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <p className="text-xl font-bold text-yellow-cta">You&apos;re all set! 🎉</p>
        <p className="mt-1 text-sm text-white/70">The adventure starts now!</p>

        <div className="my-6 select-none text-8xl">🧠</div>

        <div className="inline-flex items-center gap-2 rounded-full bg-yellow-cta px-4 py-2">
          <span className="text-sm font-bold text-navy">🏆 Profile Created!</span>
        </div>

        <p className="mt-4 text-sm text-white/70">
          Mia is ready to discover her brain superpowers!
        </p>
      </div>

      <div className="rounded-xl bg-white/10 p-4">
        <div className="flex gap-3">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent">
            <ShieldCheck className="h-4 w-4 text-white" />
          </div>
          <div>
            <p className="text-sm font-bold text-white">Your child&apos;s data is always safe</p>
            <p className="mt-1 text-xs text-white/70">
              We&apos;re COPPA-compliant and never share your child&apos;s personal information with third parties.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
