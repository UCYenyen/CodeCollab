export type LoginType = "parent" | "child";

export type PasswordStrength = "empty" | "weak" | "fair" | "strong" | "very-strong";

export interface LoginTypeTabsProps {
  activeType: LoginType;
  onTypeChange: (type: LoginType) => void;
}

export interface SignUpStepsProps {
  currentStep: 1 | 2 | 3;
}

export interface CompleteActionsProps {
  childName: string;
}

export interface DifficultyPickerProps {
  value: string;
  onChange: (value: string) => void;
}

export interface AvatarPickerProps {
  value: string;
  onChange: (value: string) => void;
}

export interface GoogleButtonProps {
  onClick: () => void;
  disabled?: boolean;
  label?: string;
}

export interface PasswordStrengthBarProps {
  password: string;
}
