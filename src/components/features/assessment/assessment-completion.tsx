import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";
import type { AssessmentResult, Domain, AdaptationLevel } from "@/types/assessment";
import { useRouter } from "next/navigation";

interface AssessmentCompletionProps {
  result: AssessmentResult | null;
}

export function AssessmentCompletion({ result }: AssessmentCompletionProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!result) return null;

  const handleDashboardClick = async () => {
    setIsSubmitting(true);
    try {
      const childId = sessionStorage.getItem("assessmentChildId");

      if (!childId) {
        throw new Error("Missing childId. Please start the assessment from the dashboard.");
      }

      const response = await fetch(`/api/children/${childId}/assessment-complete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ result }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("API Error:", errorData);
        throw new Error(errorData.error || "Failed to save assessment");
      }

      sessionStorage.removeItem("assessmentChildId");
      router.push("/dashboard");
    } catch (error) {
      console.error("Error saving assessment:", error);
      setIsSubmitting(false);
    }
  };

  const data = Object.entries(result.scores).map(([domain, score]) => ({
    domain,
    score,
    fullMark: 100,
  }));

  const getAdaptationBadge = (level: AdaptationLevel) => {
    switch (level) {
      case "Priority Training":
        return <span className="bg-destructive/10 text-destructive text-xs px-2 py-1 rounded-full font-bold">Priority</span>;
      case "Balanced Training":
        return <span className="bg-yellow-cta/20 text-yellow-600 text-xs px-2 py-1 rounded-full font-bold">Balanced</span>;
      case "Reinforcement Mode":
        return <span className="bg-accent/20 text-accent text-xs px-2 py-1 rounded-full font-bold">Reinforcement</span>;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center max-w-2xl w-full p-8 bg-white rounded-3xl border-4 border-navy shadow-[8px_8px_0px_0px_var(--navy)]">
      <h1 className="font-display text-4xl text-navy mb-2">
        Your Brain Map is Ready! 🧠✨
      </h1>
      <p className="text-muted-foreground mb-8 text-center">
        Based on your gameplay, here is your cognitive profile.
        <br />
        <span className="font-bold text-navy">Confidence Level: {result.confidenceLevel}%</span>
      </p>

      <div className="w-full h-[300px] mb-8">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
            <PolarGrid stroke="var(--border)" />
            <PolarAngleAxis dataKey="domain" tick={{ fill: "var(--navy)", fontWeight: "bold", fontSize: 12 }} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
            <Radar
              name="Brain Power"
              dataKey="score"
              stroke="var(--primary)"
              fill="var(--primary)"
              fillOpacity={0.5}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {Object.entries(result.scores).map(([domain, score]) => (
          <div key={domain} className="flex items-center justify-between p-4 rounded-xl border-2 border-border bg-cream">
            <span className="font-bold text-navy">{domain}</span>
            <div className="flex items-center gap-3">
              <span className="text-lg font-display text-primary">{score}</span>
              {getAdaptationBadge(result.adaptation[domain as Domain])}
            </div>
          </div>
        ))}
      </div>

      <Button
        onClick={handleDashboardClick}
        disabled={isSubmitting}
        className="w-full text-lg h-16 rounded-2xl border-2 border-navy bg-primary font-bold text-white shadow-[4px_4px_0px_0px_var(--navy)] hover:bg-primary-hover active:shadow-none active:translate-x-1 active:translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Saving..." : "Go to Dashboard →"}
      </Button>
    </div>
  );
}
