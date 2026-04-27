import Link from "next/link";
import { Plus } from "lucide-react";

export function AddChildCard() {
  return (
    <Link
      href="/auth/sign-up/child-profile"
      className="group flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-navy/30 bg-white/50 p-6 transition-all hover:border-navy hover:bg-white hover:shadow-[4px_4px_0px_0px_var(--navy)]"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-dashed border-navy/40 text-navy/40 transition-colors group-hover:border-navy group-hover:text-navy">
        <Plus className="h-6 w-6" />
      </div>
      <span className="text-sm font-bold text-navy/50 transition-colors group-hover:text-navy">
        Add Child Profile
      </span>
    </Link>
  );
}
