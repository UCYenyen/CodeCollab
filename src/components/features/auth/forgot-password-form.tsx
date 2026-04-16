"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  forgotPasswordSchema,
  type ForgotPasswordSchema,
} from "@/validations/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { useState } from "react";
import Link from "next/link";

export function ForgotPasswordForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const supabase = createClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordSchema) => {
    setIsLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
      redirectTo: `${window.location.origin}/auth/callback?next=/auth/reset-password`,
    });

    setIsLoading(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    setSubmitted(true);
    toast.success("Password reset link sent to your email");
  };

  if (submitted) {
    return (
      <div className="text-center text-sm space-y-4">
        <p>A password reset link has been sent to your email.</p>
        <Link
          href="/auth/sign-in"
          className="hover:underline text-muted-foreground font-medium"
        >
          Return to Sign In
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              {...register("email")}
            />
            {errors?.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>
          <Button disabled={isLoading}>
            {isLoading && (
              <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            )}
            Send Reset Link
          </Button>
        </div>
      </form>
      <div className="text-center text-sm">
        <Link
          href="/auth/sign-in"
          className="hover:underline text-muted-foreground"
        >
          Back to Sign In
        </Link>
      </div>
    </div>
  );
}
