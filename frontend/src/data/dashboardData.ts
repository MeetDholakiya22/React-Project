
import type { StatItem, Activity, SalesData } from "../types/index";

export const stats: StatItem[] = [
  {
    id: 1,
    title: "Total Revenue",
    value: "₹12,45,000",
    change: "+12.5%",
    trend: "up",
    description: "Compared to last month"
  },
  {
    id: 2,
    title: "Total Customers",
    value: "1,250",
    change: "+8.2%",
    trend: "up",
    description: "Compared to last month"
  },
  {
    id: 3,
    title: "Active Projects",
    value: "48",
    change: "+5.4%",
    trend: "up",
    description: "Compared to last month"
  },
  {
    id: 4,
    title: "Pending Tasks",
    value: "126",
    change: "-3.1%",
    trend: "down",
    description: "Compared to last month"
  }
];

export const activities: Activity[] = [
  {
    id: 1,
    name: "Meet Patel",
    action: "created a new lead",
    target: "ABC Technologies",
    time: "10 minutes ago",
    initials: "MP"
  },
  {
    id: 2,
    name: "Rahul Shah",
    action: "completed project",
    target: "Website Redesign",
    time: "30 minutes ago",
    initials: "RS"
  },
  {
    id: 3,
    name: "Priya Mehta",
    action: "updated task",
    target: "API Integration",
    time: "1 hour ago",
    initials: "PM"
  },
  {
    id: 4,
    name: "Aarav Joshi",
    action: "added a customer",
    target: "Tech Solutions",
    time: "2 hours ago",
    initials: "AJ"
  }
];

export const salesData: SalesData[] = [
  { month: "Jan", revenue: 40000, expenses: 24000 },
  { month: "Feb", revenue: 52000, expenses: 30000 },
  { month: "Mar", revenue: 45000, expenses: 28000 },
  { month: "Apr", revenue: 65000, expenses: 35000 },
  { month: "May", revenue: 58000, expenses: 32000 },
  { month: "Jun", revenue: 78000, expenses: 41000 },
  { month: "Jul", revenue: 85000, expenses: 45000 }
];
