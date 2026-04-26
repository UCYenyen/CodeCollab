"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { childProfileSchema, type ChildProfileSchema } from "@/validations/auth";

export function useChildProfile() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ChildProfileSchema>({
    resolver: zodResolver(childProfileSchema),
    defaultValues: { age: "8", avatar: "space", difficulty: "ready" },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    setIsLoading(true);

    const res = await fetch("/api/auth/create-child", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    setIsLoading(false);

    const json = await res.json() as { error?: string };
    if (!res.ok) {
      toast.error(json.error ?? "Something went wrong.");
      return;
    }

    router.push("/auth/sign-up/complete");
  });

  return { form, isLoading, onSubmit };
}
