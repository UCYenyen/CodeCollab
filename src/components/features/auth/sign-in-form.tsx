"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema, type SignInSchema } from "@/validations/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function SignInForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: SignInSchema) => {
    setIsLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    setIsLoading(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Successfully signed in");
    router.refresh();
    router.push("/");
  };

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
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              placeholder="••••••••"
              type="password"
              autoCapitalize="none"
              autoComplete="current-password"
              disabled={isLoading}
              {...register("password")}
            />
            {errors?.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>
          <Button disabled={isLoading}>
            {isLoading && (
              <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            )}
            Sign In
          </Button>
        </div>
      </form>
      <div className="flex flex-col space-y-2 text-center text-sm">
        <Link
          href="/auth/forgot-password"
          className="hover:underline text-muted-foreground"
        >
          Forgot your password?
        </Link>
        <Link
          href="/auth/sign-up"
          className="hover:underline text-muted-foreground"
        >
          Don&apos;t have an account? Sign Up
        </Link>
      </div>
    </div>
  );
}
