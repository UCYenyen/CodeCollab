import { Check } from "lucide-react";

const STEPS = [
  { number: 1, line1: "Parent", line2: "Account" },
  { number: 2, line1: "Child", line2: "Profile" },
  { number: 3, line1: "All", line2: "Done!" },
];

interface SignUpStepsProps {
  currentStep: 1 | 2 | 3;
}

export function SignUpSteps({ currentStep }: SignUpStepsProps) {
  return (
    <div className="flex items-start justify-center">
      {STEPS.map((step, index) => {
        const isDone = step.number < currentStep;
        const isActive = step.number === currentStep;
        return (
          <div key={step.number} className="flex items-start">
            <div className="flex flex-col items-center">
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-full border-2 text-sm font-bold transition-colors ${
                  isDone
                    ? "border-accent bg-accent text-white"
                    : isActive
                    ? "border-primary bg-primary text-white"
                    : "border-gray-300 bg-white text-gray-400"
                }`}
              >
                {isDone ? <Check className="h-4 w-4" /> : step.number}
              </div>
              <div
                className={`mt-1 text-center text-xs font-bold leading-tight ${
                  isActive ? "text-primary" : isDone ? "text-accent" : "text-gray-400"
                }`}
              >
                <div>{step.line1}</div>
                <div>{step.line2}</div>
              </div>
            </div>
            {index < STEPS.length - 1 && (
              <div
                className={`mx-2 mt-4 h-0.5 w-12 shrink-0 transition-colors ${
                  step.number < currentStep ? "bg-accent" : "bg-gray-300"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
