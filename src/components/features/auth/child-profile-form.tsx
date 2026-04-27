"use client";

import { ArrowLeft, Eye, EyeOff, Lock, Mail, UserRound } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Controller } from "react-hook-form";
import { useChildProfile } from "@/hooks/use-child-profile";
import { usePasswordVisibility } from "@/hooks/use-password-visibility";
import { AvatarPicker } from "./avatar-picker";
import { DifficultyPicker } from "./difficulty-picker";

const GENDER_OPTIONS = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "non-binary", label: "Non-binary" },
  { value: "prefer-not-to-say", label: "Prefer not to say" },
];

export function ChildProfileForm() {
  const { form, isLoading, onSubmitAndContinue, onSubmitAndAddAnother } = useChildProfile();
  const { showPassword, toggle: togglePassword } = usePasswordVisibility();
  const {
    register,
    control,
    formState: { errors },
  } = form;

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

        <form onSubmit={onSubmitAndContinue} className="space-y-5">
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
              <Label htmlFor="gender" className="font-bold text-navy">Gender</Label>
              <div className="relative">
                <UserRound className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <select
                  id="gender"
                  disabled={isLoading}
                  className="w-full appearance-none rounded-xl border-2 border-border bg-cream py-2.5 pl-10 pr-8 text-sm font-medium text-navy focus:border-primary focus:outline-none"
                  {...register("gender")}
                >
                  <option value="">Select gender</option>
                  {GENDER_OPTIONS.map((g) => (
                    <option key={g.value} value={g.value}>
                      {g.label}
                    </option>
                  ))}
                </select>
              </div>
              {errors.gender && <p className="text-sm text-destructive">{errors.gender.message}</p>}
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
            <Controller
              control={control}
              name="avatar"
              render={({ field }) => (
                <AvatarPicker value={field.value} onChange={field.onChange} />
              )}
            />
            {errors.avatar && <p className="text-sm text-destructive">{errors.avatar.message}</p>}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="childEmail" className="font-bold text-navy">Child&apos;s Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="childEmail"
                type="email"
                placeholder="child@example.com"
                autoCapitalize="none"
                autoComplete="off"
                autoCorrect="off"
                disabled={isLoading}
                className="rounded-xl border-2 border-border bg-cream pl-10 focus:border-primary"
                {...register("childEmail")}
              />
            </div>
            <p className="text-xs text-muted-foreground">This will be used for your child&apos;s login.</p>
            {errors.childEmail && <p className="text-sm text-destructive">{errors.childEmail.message}</p>}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="childPassword" className="font-bold text-navy">Child&apos;s Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="childPassword"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                autoCapitalize="none"
                autoComplete="new-password"
                disabled={isLoading}
                className="rounded-xl border-2 border-border bg-cream pl-10 pr-10 focus:border-primary"
                {...register("childPassword")}
              />
              <button
                type="button"
                onClick={togglePassword}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.childPassword && <p className="text-sm text-destructive">{errors.childPassword.message}</p>}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="confirmChildPassword" className="font-bold text-navy">Confirm Child&apos;s Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="confirmChildPassword"
                type="password"
                placeholder="••••••••"
                autoCapitalize="none"
                autoComplete="new-password"
                disabled={isLoading}
                className="rounded-xl border-2 border-border bg-cream pl-10 focus:border-primary"
                {...register("confirmChildPassword")}
              />
            </div>
            {errors.confirmChildPassword && <p className="text-sm text-destructive">{errors.confirmChildPassword.message}</p>}
          </div>

          <div className="space-y-2">
            <Label className="font-bold text-navy">Difficulty Preference</Label>
            <Controller
              control={control}
              name="difficulty"
              render={({ field }) => (
                <DifficultyPicker value={field.value} onChange={field.onChange} />
              )}
            />
            {errors.difficulty && <p className="text-sm text-destructive">{errors.difficulty.message}</p>}
          </div>

          <div className="flex gap-3">
            <Button
              type="button"
              onClick={onSubmitAndAddAnother}
              disabled={isLoading}
              className="flex-1 rounded-xl border-2 border-navy bg-white py-6 text-base font-bold text-navy shadow-[3px_3px_0px_0px_var(--navy)] hover:bg-cream active:shadow-none active:translate-x-0.75 active:translate-y-0.75 transition-all"
            >
              {isLoading && (
                <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-navy border-t-transparent" />
              )}
              + Add Another
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="flex-1 rounded-xl border-2 border-navy bg-primary py-6 text-base font-bold text-white shadow-[3px_3px_0px_0px_var(--navy)] hover:bg-primary-hover active:shadow-none active:translate-x-0.75 active:translate-y-0.75 transition-all"
            >
              {isLoading && (
                <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              )}
              Done →
            </Button>
          </div>
        </form>
      </div>

      <p className="mt-4 text-center text-xs text-muted-foreground">
        You can add more children or change settings later from the dashboard.
      </p>
    </div>
  );
}
