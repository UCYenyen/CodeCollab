import { ShieldCheck, Zap } from "lucide-react";

const CHILDREN = [
  { emoji: "👧", name: "Emma" },
  { emoji: "👦", name: "Liam" },
  { emoji: "👦", name: "Zara" },
];

export function ChildProfileLeftPanel() {
  return (
    <div className="relative hidden h-full flex-col bg-navy p-10 text-white lg:flex">
      <div className="flex items-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
          <Zap className="h-5 w-5 fill-white text-white" />
        </div>
        <span className="text-xl font-bold">
          <span className="text-white">Brain</span>
          <span className="text-primary">Spark</span>
        </span>
      </div>

      <div className="relative flex flex-1 flex-col items-center justify-center">
        <div className="absolute right-10 top-8 flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-lg">
          🎉
        </div>
        <div className="absolute left-4 top-24 flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-lg">
          🎈
        </div>
        <div className="absolute left-8 bottom-24 flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-base">
          ⭐
        </div>

        <div className="mb-6 self-start">
          <div className="relative rounded-2xl bg-white px-4 py-2 shadow-md">
            <span className="text-sm font-bold text-navy">Tell us about your child! 🎉</span>
            <div className="absolute -bottom-2 left-6 h-0 w-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-white" />
          </div>
        </div>

        <div className="select-none text-7xl">🧠</div>
        <div className="-mt-2 select-none text-3xl">🎈</div>

        <p className="mt-6 text-center text-sm font-medium text-white/70">
          Almost there! Just a few details about your little learner.
        </p>

        <div className="mt-4 flex gap-4">
          {CHILDREN.map((child) => (
            <div key={child.name} className="flex flex-col items-center gap-1">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-2xl">
                {child.emoji}
              </div>
              <span className="text-xs font-medium text-white/70">{child.name}</span>
            </div>
          ))}
        </div>
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
