"use client";

import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSignUp } from "@/hooks/use-sign-up";
import { usePasswordVisibility } from "@/hooks/use-password-visibility";
import { PasswordStrengthBar } from "./password-strength-bar";
import { SignInGoogleButton } from "./sign-in-google-button";

export function SignUpForm() {
  const { form, isLoading, onSubmit, signUpWithGoogle } = useSignUp();
  const { showPassword, toggle: togglePassword } = usePasswordVisibility();
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = form;

  const password = watch("password") ?? "";
  const agreeTerms = watch("agreeTerms");
  const agreeAge = watch("agreeAge");

  return (
    <div className="w-full max-w-md">
      <div className="mb-6 text-center">
        <h1 className="font-display text-4xl font-bold text-navy">Create Your Account</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          You&apos;re the parent/guardian — we&apos;ll set up your child next 👨‍👩‍👧
        </p>
      </div>

      <div className="rounded-2xl border-2 border-navy bg-white p-6 shadow-[4px_4px_0px_0px_var(--navy)]">
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="fullName" className="font-bold text-navy">Full Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="fullName"
                type="text"
                placeholder="Jane Smith"
                autoComplete="name"
                disabled={isLoading}
                className="rounded-xl border-2 border-border bg-cream pl-10 focus:border-primary"
                {...register("fullName")}
              />
            </div>
            {errors.fullName && <p className="text-sm text-destructive">{errors.fullName.message}</p>}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="email" className="font-bold text-navy">Email Address</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="hello@example.com"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                disabled={isLoading}
                className="rounded-xl border-2 border-border bg-cream pl-10 focus:border-primary"
                {...register("email")}
              />
            </div>
            {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="password" className="font-bold text-navy">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                autoCapitalize="none"
                autoComplete="new-password"
                disabled={isLoading}
                className="rounded-xl border-2 border-border bg-cream pl-10 pr-10 focus:border-primary"
                {...register("password")}
              />
              <button
                type="button"
                onClick={togglePassword}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            <PasswordStrengthBar password={password} />
            {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="confirmPassword" className="font-bold text-navy">Confirm Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                autoCapitalize="none"
                autoComplete="new-password"
                disabled={isLoading}
                className="rounded-xl border-2 border-border bg-cream pl-10 focus:border-primary"
                {...register("confirmPassword")}
              />
            </div>
            {errors.confirmPassword && <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>}
          </div>

          <div className="space-y-2.5">
            <div className="flex items-start gap-2">
              <Checkbox
                id="agreeTerms"
                checked={agreeTerms}
                onCheckedChange={(v) => setValue("agreeTerms", !!v, { shouldValidate: true })}
                className="mt-0.5"
              />
              <Label htmlFor="agreeTerms" className="cursor-pointer text-sm font-medium leading-snug text-navy">
                I agree to the{" "}
                <Link href="/terms" className="text-primary underline hover:text-primary-hover">Terms of Service</Link>
                {" "}&{" "}
                <Link href="/privacy" className="text-primary underline hover:text-primary-hover">Privacy Policy</Link>
              </Label>
            </div>
            {errors.agreeTerms && <p className="text-sm text-destructive">{errors.agreeTerms.message}</p>}

            <div className="flex items-start gap-2">
              <Checkbox
                id="agreeAge"
                checked={agreeAge}
                onCheckedChange={(v) => setValue("agreeAge", !!v, { shouldValidate: true })}
                className="mt-0.5"
              />
              <Label htmlFor="agreeAge" className="cursor-pointer text-sm font-medium leading-snug text-navy">
                I confirm I am 18 years of age or older
              </Label>
            </div>
            {errors.agreeAge && <p className="text-sm text-destructive">{errors.agreeAge.message}</p>}
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-xl border-2 border-navy bg-primary py-6 text-base font-bold text-white shadow-[3px_3px_0px_0px_var(--navy)] hover:bg-primary-hover active:shadow-none active:translate-x-0.75 active:translate-y-0.75 transition-all"
          >
            {isLoading && (
              <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            )}
            Continue to Child Profile →
          </Button>
        </form>

        <div className="relative my-4 flex items-center gap-4">
          <div className="flex-1 border-t border-border" />
          <span className="text-xs text-muted-foreground">Or sign up faster with:</span>
          <div className="flex-1 border-t border-border" />
        </div>

        <SignInGoogleButton onClick={signUpWithGoogle} disabled={isLoading} label="Continue with Google" />
      </div>

      <div className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/auth/sign-in" className="font-bold text-primary hover:text-primary-hover">
          Sign In →
        </Link>
      </div>
    </div>
  );
}
