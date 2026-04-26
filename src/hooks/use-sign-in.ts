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

    if (error) {
      setIsLoading(false);
      toast.error(error.message);
      return;
    }

    // Role enforcement: check that the signed-in account matches the selected login tab.
    const role = authData.user?.user_metadata?.role as string | undefined;
    const isChildAccount = role === "child";

    if (loginType === "child" && !isChildAccount) {
      await supabase.auth.signOut();
      setIsLoading(false);
      toast.error("No child account found with these credentials.");
      return;
    }

    if (loginType === "parent" && isChildAccount) {
      await supabase.auth.signOut();
      setIsLoading(false);
      toast.error("No parent account found with these credentials.");
      return;
    }

    setIsLoading(false);
    toast.success("Successfully signed in");
    router.refresh();

    const step = authData.user?.user_metadata?.onboarding_step as number | undefined;
    if (step === 1) {
      router.push("/auth/sign-up/child-profile");
    } else if (step === 2) {
      router.push("/auth/sign-up/complete");
    } else {
      router.push("/");
    }
  });

  const signInWithGoogle = async () => {
    // Google OAuth is only available for parent accounts.
    // Children must sign in with email + password.
    if (loginType === "child") {
      toast.error("Children must sign in with email and password.");
      return;
    }
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  return { form, isLoading, loginType, setLoginType, onSubmit, signInWithGoogle };
}
