import { SignInForm } from "@/components/features/auth/sign-in-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-muted/20">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold tracking-tight text-center">
            Sign in to your account
          </CardTitle>
          <CardDescription className="text-center">
            Enter your email below to sign in
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignInForm />
        </CardContent>
      </Card>
    </div>
  );
}
