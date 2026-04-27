"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";

export const editChildSchema = z.object({
  childName: z.string().min(2, { message: "Child name must be at least 2 characters" }),
  gender: z.string().min(1, { message: "Please select a gender" }),
  dateOfBirth: z.string().min(1, { message: "Please enter a date of birth" }),
  difficulty: z.string().min(1, { message: "Please select a difficulty" }),
});

export type EditChildSchema = z.infer<typeof editChildSchema>;

interface EditChildFormProps {
  childId: string;
  defaultValues: EditChildSchema;
}

export function EditChildForm({ childId, defaultValues }: EditChildFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<EditChildSchema>({
    resolver: zodResolver(editChildSchema),
    defaultValues,
  });

  const onSubmit = async (data: EditChildSchema) => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/children/${childId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        router.push(`/dashboard/children/${childId}`);
        router.refresh();
      } else {
        const result = await res.json();
        alert(result.error || "Failed to update child");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to update child");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border-2 border-navy bg-white p-6 shadow-[4px_4px_0px_0px_var(--navy)]">
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label className="text-sm font-bold text-navy">Child's Name</Label>
          <Input 
            {...form.register("childName")} 
            className="rounded-xl border-2 border-navy"
          />
          {form.formState.errors.childName && (
            <p className="text-xs text-destructive">{form.formState.errors.childName.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-bold text-navy">Gender</Label>
          <Select
            onValueChange={(value) => form.setValue("gender", value)}
            defaultValue={form.getValues("gender")}
          >
            <SelectTrigger className="rounded-xl border-2 border-navy">
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Male">Boy</SelectItem>
              <SelectItem value="Female">Girl</SelectItem>
            </SelectContent>
          </Select>
          {form.formState.errors.gender && (
            <p className="text-xs text-destructive">{form.formState.errors.gender.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-bold text-navy">Date of Birth</Label>
          <Input 
            type="date"
            {...form.register("dateOfBirth")} 
            className="rounded-xl border-2 border-navy"
          />
          {form.formState.errors.dateOfBirth && (
            <p className="text-xs text-destructive">{form.formState.errors.dateOfBirth.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-bold text-navy">Learning Difficulty</Label>
          <Select
            onValueChange={(value) => form.setValue("difficulty", value)}
            defaultValue={form.getValues("difficulty")}
          >
            <SelectTrigger className="rounded-xl border-2 border-navy">
              <SelectValue placeholder="Select difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="beginner">Beginner (Slow-paced)</SelectItem>
              <SelectItem value="intermediate">Intermediate (Standard)</SelectItem>
              <SelectItem value="advanced">Advanced (Fast-paced)</SelectItem>
            </SelectContent>
          </Select>
          {form.formState.errors.difficulty && (
            <p className="text-xs text-destructive">{form.formState.errors.difficulty.message}</p>
          )}
        </div>

        <div className="pt-4 flex gap-4">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => router.back()}
            className="flex-1 rounded-xl border-2 border-navy font-bold"
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            disabled={isLoading}
            className="flex-1 rounded-xl border-2 border-navy bg-primary font-bold text-white shadow-[3px_3px_0px_0px_var(--navy)] transition-all hover:bg-primary-hover hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5"
          >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
}
