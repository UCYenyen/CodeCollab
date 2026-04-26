import type { LoginTypeTabsProps } from "@/types/auth-components";

export function LoginTypeTabs({ activeType, onTypeChange }: LoginTypeTabsProps) {
  return (
    <div className="flex w-full gap-1 rounded-xl border-2 border-navy bg-white p-1">
      <button
        type="button"
        onClick={() => onTypeChange("parent")}
        className={`flex-1 rounded-lg py-2.5 text-sm font-bold transition-colors ${
          activeType === "parent"
            ? "bg-primary text-white shadow-sm"
            : "text-navy hover:bg-gray-100"
        }`}
      >
        Parent Login
      </button>
      <button
        type="button"
        onClick={() => onTypeChange("child")}
        className={`flex-1 rounded-lg py-2.5 text-sm font-bold transition-colors ${
          activeType === "child"
            ? "bg-primary text-white shadow-sm"
            : "text-navy hover:bg-gray-100"
        }`}
      >
        Child Login
      </button>
    </div>
  );
}
