import { SignUpLeftPanel } from "@/components/features/auth/sign-up-left-panel";
import { SignUpForm } from "@/components/features/auth/sign-up-form";
import { SignUpSteps } from "@/components/features/auth/sign-up-steps";

export default function SignUpPage() {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <SignUpLeftPanel />
      <div className="flex min-h-screen flex-col items-center justify-center bg-secondary px-8 py-12">
        <div className="mb-8 w-full max-w-md">
          <SignUpSteps currentStep={1} />
        </div>
        <SignUpForm />
      </div>
    </div>
  );
}
