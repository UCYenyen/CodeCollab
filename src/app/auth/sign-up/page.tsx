import { SignUpForm } from "@/components/features/auth/sign-up-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-muted/20">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold tracking-tight text-center">
            Create an account
          </CardTitle>
          <CardDescription className="text-center">
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignUpForm />
        </CardContent>
      </Card>
    </div>
  );
}
