export type NavLink = {
  href: string;
  label: string;
  pageTitle?: string;
};

export type NavLinkGroup = {
  pageTitle: string;
  links: NavLink[];
};

export type NavUser = {
  email?: string;
  fullName?: string;
};

export interface NavUserAvatarProps {
  user: NavUser;
  size?: "sm" | "default" | "lg";
}

export interface NavAccountButtonProps {
  user: NavUser;
}

export interface NavMobileMenuProps {
  links: ReadonlyArray<NavLink>;
  user: NavUser | null;
}
