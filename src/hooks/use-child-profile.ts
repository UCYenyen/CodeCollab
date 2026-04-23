"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { childProfileSchema, type ChildProfileSchema } from "@/validations/auth";
import { createClient } from "@/lib/supabase/client";

export function useChildProfile() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClient();

  const form = useForm<ChildProfileSchema>({
    resolver: zodResolver(childProfileSchema),
    defaultValues: { age: "8", avatar: "space", difficulty: "ready" },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    setIsLoading(true);

    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      toast.error("Session expired. Please sign in again.");
      router.push("/auth/sign-in");
      return;
    }

    const { error } = await supabase.auth.updateUser({
      data: {
        child_profile: {
          name: data.childName,
          age: data.age,
          dateOfBirth: data.dateOfBirth,
          avatar: data.avatar,
          username: data.username,
          difficulty: data.difficulty,
        },
        onboarding_step: 2,
      },
    });

    setIsLoading(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    router.push("/auth/sign-up/complete");
  });

  return { form, isLoading, onSubmit };
}
