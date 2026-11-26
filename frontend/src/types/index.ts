// types/index.ts

// Dashboard types and interfaces
export interface StatItem {
  id: number;
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  description: string;
}

// Activity types and interfaces
export interface Activity {
  id: number;
  name: string;
  action: string;
  target: string;
  time: string;
  initials: string;
}

// Sales data types and interfaces
export interface SalesData {
  month: string;
  revenue: number;
  expenses: number;
}

// Lead types and interfaces
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
  status: "New" | "Contacted" | "Qualified" | "Converted" | "Lost";
  priority: "Low" | "Medium" | "High";
  assignedTo: string;
  createdAt: string;
}

// Customer types and interfaces
export type CustomerType = "Individual" | "Business";

export type CustomerStatus =
  | "Active"
  | "Inactive"
  | "Prospect";

export interface Customer {
  id: string;
  customerCode: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  type: CustomerType;
  status: CustomerStatus;
  city: string;
  country: string;
  assignedTo: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export type CustomerFormData = Omit<
  Customer,
  "id" | "customerCode" | "createdAt" | "updatedAt"
>;

export interface CustomerListResponse {
  data: Customer[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
