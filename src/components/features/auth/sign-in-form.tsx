"use client";

import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSignIn } from "@/hooks/use-sign-in";
import { usePasswordVisibility } from "@/hooks/use-password-visibility";
import { LoginTypeTabs } from "./login-type-tabs";
import { SignInGoogleButton } from "./sign-in-google-button";

export function SignInForm() {
  const { form, isLoading, loginType, setLoginType, onSubmit, signInWithGoogle } = useSignIn();
  const { showPassword, toggle: togglePassword } = usePasswordVisibility();
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <div className="w-full max-w-md">
      <div className="mb-8 text-center">
        <h1 className="font-display text-5xl font-bold text-navy">Welcome Back!</h1>
        <p className="mt-2 text-muted-foreground">
          Sign in to see your child&apos;s progress 📊
        </p>
      </div>

      <div className="rounded-2xl border-2 border-navy bg-white p-6 shadow-[4px_4px_0px_0px_var(--navy)]">
        <LoginTypeTabs activeType={loginType} onTypeChange={setLoginType} />

        <form onSubmit={onSubmit} className="mt-5 space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="email" className="font-bold text-navy">
              Email Address
            </Label>
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
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="password" className="font-bold text-navy">
              Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                autoCapitalize="none"
                autoComplete="current-password"
                disabled={isLoading}
                className="rounded-xl border-2 border-border bg-cream pl-10 pr-10 focus:border-primary"
                {...register("password")}
              />
              <button
                type="button"
                onClick={togglePassword}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-destructive">{errors.password.message}</p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember" className="cursor-pointer text-sm font-medium text-navy">
                Remember me
              </Label>
            </div>
            <Link
              href="/auth/forgot-password"
              className="text-sm font-medium text-accent hover:text-accent/80"
            >
              Forgot password?
            </Link>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-xl border-2 border-navy bg-primary py-6 text-base font-bold text-white shadow-[3px_3px_0px_0px_var(--navy)] hover:bg-primary-hover active:shadow-none active:translate-x-0.75 active:translate-y-0.75 transition-all"
          >
            {isLoading && (
              <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            )}
            Sign In →
          </Button>
        </form>

        <div className="relative my-5 flex items-center gap-4">
          <div className="flex-1 border-t border-border" />
          <span className="text-sm text-muted-foreground">or</span>
          <div className="flex-1 border-t border-border" />
        </div>

        <SignInGoogleButton onClick={signInWithGoogle} disabled={isLoading} />
      </div>

      <div className="mt-6 text-center">
        <Link
          href="/auth/sign-up"
          className="text-sm font-bold text-primary hover:text-primary-hover"
        >
          New to BrainSpark? Create a free account →
        </Link>
      </div>
    </div>
  );
}
