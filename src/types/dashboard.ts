export type ChildAccentColor = "primary" | "accent";

export type AssessmentScores = {
  attention: number;
  memory: number;
  logic: number;
  motoric: number;
  social: number;
};

export type ChildDashboardData = {
  id: string;
  name: string;
  age: number;
  grade: number;
  coins: number;
  gender: "Male" | "Female";
  avatarKey: string;
  weeklyCoins: number;
  accentColor: ChildAccentColor;
  hasCompletedPreAssessment: boolean;
  assessmentScores: AssessmentScores | null;
};

export type SubjectStatData = {
  id: string;
  subject: string;
  score: number;
  change: number;
  icon: React.ReactNode;
  bgColor: string;
  iconColor: string;
};

export type ChartDataPoint = {
  day: string;
  [childId: string]: number | string;
};

export type ProgressMode = "weekly" | "monthly";

export type SidebarChildItem = {
  id: string;
  name: string;
};
