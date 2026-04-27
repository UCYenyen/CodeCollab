import { ChildCard } from "./child-card";
import { AddChildCard } from "./add-child-card";
import type { ChildDashboardData } from "@/types/dashboard";

interface ChildrenSectionProps {
  children: ChildDashboardData[];
}

export function ChildrenSection({ children }: ChildrenSectionProps) {
  return (
    <section>
      <h2 className="mb-4 font-display text-xl text-navy">
        My Children
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {children.map((child) => (
          <ChildCard key={child.id} child={child} />
        ))}
        <AddChildCard />
      </div>
    </section>
  );
}
