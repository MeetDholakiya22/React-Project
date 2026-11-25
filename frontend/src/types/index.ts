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


export type LeadStatus =
  | "New"
  | "Contacted"
  | "Qualified"
  | "Converted"
  | "Lost";

export type LeadPriority =
  | "Low"
  | "Medium"
  | "High";

export interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  source: string;
  status: LeadStatus;
  priority: LeadPriority;
  assignedTo: string;
  createdAt: string;
}
