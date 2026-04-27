"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { childProfileSchema, type ChildProfileSchema } from "@/validations/auth";

const DEFAULT_VALUES = { gender: "", avatar: "space", difficulty: "ready" };

export function useChildProfile() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ChildProfileSchema>({
    resolver: zodResolver(childProfileSchema),
    defaultValues: DEFAULT_VALUES,
  });

  const createChild = async (data: ChildProfileSchema, addAnother: boolean) => {
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

    if (addAnother) {
      form.reset(DEFAULT_VALUES);
      toast.success(`${data.childName} was added! Add another child or click Done when you're finished.`);
    } else {
      router.push("/auth/sign-up/complete");
    }
  };

  const onSubmitAndContinue = form.handleSubmit((data) => createChild(data, false));
  const onSubmitAndAddAnother = form.handleSubmit((data) => createChild(data, true));

  return { form, isLoading, onSubmitAndContinue, onSubmitAndAddAnother };
}
