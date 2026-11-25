export interface StatItem {
  id: number;
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  description: string;
}

export interface Activity {
  id: number;
  name: string;
  action: string;
  target: string;
  time: string;
  initials: string;
}

export interface SalesData {
  month: string;
  revenue: number;
  expenses: number;
}