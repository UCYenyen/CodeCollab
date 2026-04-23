import { SignInLeftPanel } from "@/components/features/auth/sign-in-left-panel";
import { SignInForm } from "@/components/features/auth/sign-in-form";

export default function SignInPage() {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <SignInLeftPanel />
      <div className="flex min-h-screen items-center justify-center bg-secondary px-8 py-12">
        <SignInForm />
      </div>
    </div>
  );
}
