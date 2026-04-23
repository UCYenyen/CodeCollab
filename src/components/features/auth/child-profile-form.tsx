"use client";

import { ArrowLeft, Gamepad2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useChildProfile } from "@/hooks/use-child-profile";
import { useUsernameAvailability } from "@/hooks/use-username-availability";
import { AvatarPicker } from "./avatar-picker";
import { DifficultyPicker } from "./difficulty-picker";

const AGE_OPTIONS = Array.from({ length: 13 }, (_, i) => i + 5);

export function ChildProfileForm() {
  const { form, isLoading, onSubmit } = useChildProfile();
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = form;

  const username = watch("username") ?? "";
  const avatar = watch("avatar");
  const difficulty = watch("difficulty");

  const { isAvailable, isChecking } = useUsernameAvailability(username);

  return (
    <div className="w-full max-w-lg">
      <div className="mb-6 text-center">
        <h1 className="font-display text-4xl font-bold text-navy">Your Child&apos;s Profile</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          We&apos;ll use this to personalize their experience 🧒
        </p>
      </div>

      <div className="rounded-2xl border-2 border-navy bg-white p-6 shadow-[4px_4px_0px_0px_var(--navy)]">
        <Link
          href="/auth/sign-up"
          className="mb-4 flex w-fit items-center gap-1 text-sm font-medium text-muted-foreground hover:text-navy"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>

        <form onSubmit={onSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <Label htmlFor="childName" className="font-bold text-navy">Child&apos;s Name</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-base leading-none">🧒</span>
              <Input
                id="childName"
                type="text"
                placeholder="e.g. Liam, Emma..."
                disabled={isLoading}
                className="rounded-xl border-2 border-border bg-cream pl-10 focus:border-primary"
                {...register("childName")}
              />
            </div>
            {errors.childName && <p className="text-sm text-destructive">{errors.childName.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="age" className="font-bold text-navy">Age</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-base leading-none">🎂</span>
                <select
                  id="age"
                  disabled={isLoading}
                  className="w-full appearance-none rounded-xl border-2 border-border bg-cream py-2.5 pl-10 pr-8 text-sm font-medium text-navy focus:border-primary focus:outline-none"
                  {...register("age")}
                >
                  {AGE_OPTIONS.map((age) => (
                    <option key={age} value={String(age)}>
                      {age} years
                    </option>
                  ))}
                </select>
              </div>
              {errors.age && <p className="text-sm text-destructive">{errors.age.message}</p>}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="dateOfBirth" className="font-bold text-navy">Date of Birth</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-base leading-none">📅</span>
                <Input
                  id="dateOfBirth"
                  type="date"
                  disabled={isLoading}
                  className="rounded-xl border-2 border-border bg-cream pl-10 focus:border-primary"
                  {...register("dateOfBirth")}
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="font-bold text-navy">Pick Sparky&apos;s Outfit! 🎨</Label>
            <AvatarPicker value={avatar} onChange={(v) => setValue("avatar", v, { shouldValidate: true })} />
            {errors.avatar && <p className="text-sm text-destructive">{errors.avatar.message}</p>}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="username" className="font-bold text-navy">Child&apos;s Username</Label>
            <div className="relative">
              <Gamepad2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="username"
                type="text"
                placeholder="SuperLiam8"
                disabled={isLoading}
                className="rounded-xl border-2 border-border bg-cream pl-10 pr-24 focus:border-primary"
                {...register("username")}
              />
              {username.length >= 3 && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  {isChecking ? (
                    <span className="text-xs text-muted-foreground">Checking...</span>
                  ) : isAvailable ? (
                    <span className="flex items-center gap-1 rounded-full bg-accent/15 px-2 py-0.5 text-xs font-bold text-accent">
                      ✓ Available!
                    </span>
                  ) : (
                    <span className="text-xs font-bold text-destructive">Taken</span>
                  )}
                </div>
              )}
            </div>
            <p className="text-xs text-muted-foreground">This is what your child will see when they log in.</p>
            {errors.username && <p className="text-sm text-destructive">{errors.username.message}</p>}
          </div>

          <div className="space-y-2">
            <Label className="font-bold text-navy">Difficulty Preference</Label>
            <DifficultyPicker value={difficulty} onChange={(v) => setValue("difficulty", v, { shouldValidate: true })} />
            {errors.difficulty && <p className="text-sm text-destructive">{errors.difficulty.message}</p>}
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-xl border-2 border-navy bg-primary py-6 text-base font-bold text-white shadow-[3px_3px_0px_0px_var(--navy)] hover:bg-primary-hover active:shadow-none active:translate-x-0.75 active:translate-y-0.75 transition-all"
          >
            {isLoading && (
              <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            )}
            Almost There! →
          </Button>
        </form>
      </div>

      <p className="mt-4 text-center text-xs text-muted-foreground">
        You can add more children or change settings later from the dashboard.
      </p>
    </div>
  );
}
