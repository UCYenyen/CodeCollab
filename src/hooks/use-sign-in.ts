"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { signInSchema, type SignInSchema } from "@/validations/auth";
import { createClient } from "@/lib/supabase/client";
import type { LoginType } from "@/types/auth-components";

export function useSignIn() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [loginType, setLoginType] = useState<LoginType>("parent");
  const supabase = createClient();

  const form = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = form.handleSubmit(async (data: SignInSchema) => {
    setIsLoading(true);
    const { data: authData, error } = await supabase.auth.signInWithPassword({
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

    const step = authData.user?.user_metadata?.onboarding_step;
    if (step === 1) {
      router.push("/auth/sign-up/child-profile");
    } else if (step === 2) {
      router.push("/auth/sign-up/complete");
    } else {
      router.push("/");
    }
  });

  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  return { form, isLoading, loginType, setLoginType, onSubmit, signInWithGoogle };
}
