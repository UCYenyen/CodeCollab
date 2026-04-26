import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { NavUserAvatarProps } from "@/types/navbar";

function getInitials(fullName?: string, email?: string): string {
  if (fullName) {
    const parts = fullName.trim().split(" ");
    return parts.length > 1
      ? `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
      : parts[0][0].toUpperCase();
  }
  return email?.[0]?.toUpperCase() ?? "?";
}

export function NavUserAvatar({ user, size = "default" }: NavUserAvatarProps) {
  return (
    <Avatar
      size={size}
      className="border-2 border-r-4 border-b-4"
    >
      <AvatarFallback className="bg-primary text-white font-bold">
        {getInitials(user.fullName, user.email)}
      </AvatarFallback>
    </Avatar>
  );
}
