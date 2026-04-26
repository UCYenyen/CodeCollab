"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  parentAccountSchema,
  type ParentAccountSchema,
} from "@/validations/auth";
import { createClient } from "@/lib/supabase/client";

export function useSignUp() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClient();

  const form = useForm<ParentAccountSchema>({
    resolver: zodResolver(parentAccountSchema),
    defaultValues: { agreeTerms: false, agreeAge: false },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    setIsLoading(true);

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
        fullName: data.fullName,
      }),
    });

    const json = await res.json() as { error?: string; userId?: string; message?: string };

    if (!res.ok) {
      setIsLoading(false);
      toast.error(json.error ?? "Sign up failed. Please try again.");
      return;
    }

    setIsLoading(false);
    router.push("/auth/sign-up/child-profile");
  });

  const signUpWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?signup=true`,
      },
    });
  };

  return { form, isLoading, onSubmit, signUpWithGoogle };
}
