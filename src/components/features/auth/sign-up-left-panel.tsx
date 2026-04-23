import { Lock, Mail, Zap } from "lucide-react";

const FEATURES = [
  { icon: <Lock className="h-4 w-4 text-accent" />, title: "100% Secure", desc: "SSL encrypted & data protected" },
  { icon: <Mail className="h-4 w-4 text-yellow-cta" />, title: "No Ads, Ever", desc: "Clean, distraction-free learning" },
  { icon: <Mail className="h-4 w-4 text-primary" />, title: "Weekly Progress Reports", desc: "Stay in the loop every week" },
];

export function SignUpLeftPanel() {
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
        <div className="absolute right-8 top-16 flex h-11 w-11 items-center justify-center rounded-full bg-white/20 text-xl">
          🏆
        </div>
        <div className="absolute right-4 top-36 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-lg">
          ✏️
        </div>
        <div className="absolute left-6 bottom-8 flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-base">
          ⭐
        </div>

        <div className="mb-6 self-start">
          <div className="relative rounded-2xl bg-white px-4 py-2 shadow-md">
            <span className="text-sm font-bold text-navy">Let&apos;s get you set up! 🎉</span>
            <div className="absolute -bottom-2 left-6 h-0 w-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-white" />
          </div>
        </div>

        <div className="select-none text-8xl">🧠</div>
        <div className="mt-1 text-2xl">✏️</div>
      </div>

      <div className="space-y-3">
        {FEATURES.map((f, i) => (
          <div key={i} className="flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10">
              {f.icon}
            </div>
            <div>
              <p className="text-sm font-bold text-white">{f.title}</p>
              <p className="text-xs text-white/60">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
