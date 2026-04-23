import { Clock, Info } from "lucide-react";

const QUIZ_ITEMS = [
  { emoji: "⚡", label: "Attention & Focus", time: "~3 min", bg: "bg-yellow-cta/20" },
  { emoji: "🧠", label: "Memory", time: "~4 min", bg: "bg-step-3/40" },
  { emoji: "🔍", label: "Logic & Problem Solving", time: "~4 min", bg: "bg-step-2/40" },
  { emoji: "🎯", label: "Fine Motor Skills", time: "~3 min", bg: "bg-step-1/40" },
  { emoji: "❤️", label: "Social Skills", time: "~3 min", bg: "bg-feature-icon-2" },
];

const PENTAGON_OUTER = "80,20 137,61.5 115.3,128.5 44.7,128.5 22.9,61.5";
const PENTAGON_INNER = "80,50 112,72 99,108 61,108 48,72";

const LABELS: { label: string; x: number; y: number; anchor: "middle" | "start" | "end" }[] = [
  { label: "Attention", x: 80, y: 10, anchor: "middle" },
  { label: "Logic", x: 148, y: 62, anchor: "start" },
  { label: "Motor", x: 124, y: 136, anchor: "middle" },
  { label: "Social", x: 36, y: 136, anchor: "middle" },
  { label: "Memory", x: 12, y: 62, anchor: "end" },
];

export function BrainQuizOverview() {
  return (
    <div className="space-y-3">
      <div className="flex gap-4">
        <div className="shrink-0">
          <svg viewBox="0 0 160 155" width="140" height="140" aria-hidden="true">
            <polygon points={PENTAGON_OUTER} fill="none" stroke="var(--border)" strokeWidth="1.5" />
            <polygon points={PENTAGON_INNER} fill="var(--primary)" fillOpacity="0.3" stroke="var(--primary)" strokeWidth="2" />
            {LABELS.map((l) => (
              <text key={l.label} x={l.x} y={l.y} textAnchor={l.anchor} fontSize="9" fill="var(--navy)" fontWeight="600">
                {l.label}
              </text>
            ))}
            {PENTAGON_INNER.split(" ").map((pt, i) => {
              const [cx, cy] = pt.split(",");
              return <circle key={i} cx={cx} cy={cy} r="3.5" fill="var(--primary)" />;
            })}
          </svg>
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-base font-bold text-navy">🎯 The Brain Quiz</p>
          <p className="mt-1 text-xs text-muted-foreground">
            5 fun mini-games to uncover your child&apos;s unique cognitive strengths — one for each brain domain!
          </p>
          <div className="mt-2 inline-flex w-fit items-center gap-1.5 rounded-full border border-navy bg-white px-3 py-1">
            <Clock className="h-3 w-3 text-navy" />
            <span className="text-xs font-bold text-navy">Total: about 17–20 minutes</span>
          </div>
        </div>
      </div>

      <div className="border-t border-border" />

      <div className="space-y-2">
        {QUIZ_ITEMS.map((item) => (
          <div
            key={item.label}
            className={`flex items-center justify-between rounded-xl px-3 py-2.5 ${item.bg}`}
          >
            <div className="flex items-center gap-2.5">
              <span className="text-xl">{item.emoji}</span>
              <span className="text-sm font-bold text-navy">{item.label}</span>
            </div>
            <div className="flex items-center gap-1 rounded-full border border-border bg-white px-2 py-0.5">
              <Clock className="h-3 w-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">{item.time}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-3 rounded-xl bg-accent/15 p-4">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent">
          <Info className="h-4 w-4 text-white" />
        </div>
        <div>
          <p className="text-sm font-bold text-navy">For Parents 👋</p>
          <p className="mt-1 text-xs text-muted-foreground">
            The quiz uses fun mini-games, not questionnaires. Your child will play short games — we&apos;ll automatically measure their scores behind the scenes. No reading required!
          </p>
        </div>
      </div>
    </div>
  );
}
