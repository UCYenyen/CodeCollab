import { ChildProfileLeftPanel } from "@/components/features/auth/child-profile-left-panel";
import { ChildProfileForm } from "@/components/features/auth/child-profile-form";
import { SignUpSteps } from "@/components/features/auth/sign-up-steps";

export default function ChildProfilePage() {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <ChildProfileLeftPanel />
      <div className="flex min-h-screen flex-col items-center justify-center bg-muted px-8 py-12">
        <div className="mb-8 w-full max-w-lg">
          <SignUpSteps currentStep={2} />
        </div>
        <ChildProfileForm />
      </div>
    </div>
  );
}
