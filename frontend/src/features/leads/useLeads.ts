
import { useCallback, useEffect, useState } from "react";
import type { Lead } from "../../types";

const STORAGE_KEY = "workflow-pro-leads";

const initialLeads: Lead[] = [
  {
    id: "L001",
    name: "Rahul Patel",
    company: "ABC Technologies",
    email: "rahul@gmail.com",
    phone: "9876543210",
    source: "Website",
    status: "New",
    priority: "High",
    assignedTo: "Meet Patel",
    createdAt: "2026-11-20"
  },
  {
    id: "L002",
    name: "Priya Shah",
    company: "Tech Solutions",
    email: "priya@gmail.com",
    phone: "9876543211",
    source: "Referral",
    status: "Contacted",
    priority: "Medium",
    assignedTo: "Meet Patel",
    createdAt: "2026-11-21"
  },
  {
    id: "L003",
    name: "Aarav Mehta",
    company: "Digital World",
    email: "aarav@gmail.com",
    phone: "9876543212",
    source: "LinkedIn",
    status: "Qualified",
    priority: "High",
    assignedTo: "Rahul Shah",
    createdAt: "2026-11-22"
  }
];

export function useLeads() {
  const [leads, setLeads] = useState<Lead[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) as Lead[] : initialLeads;
    } catch {
      return initialLeads;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
  }, [leads]);

  // CREATE
  const addLead = useCallback((lead: Lead) => {
    setLeads((previous) => [lead, ...previous]);
  }, []);

  // UPDATE
  const updateLead = useCallback((updatedLead: Lead) => {
    setLeads((previous) =>
      previous.map((lead) =>
        lead.id === updatedLead.id ? updatedLead : lead
      )
    );
  }, []);

  // DELETE
  const deleteLead = useCallback((id: string) => {
    setLeads((previous) =>
      previous.filter((lead) => lead.id !== id)
    );
  }, []);

  return {
    leads,
    addLead,
    updateLead,
    deleteLead
  };
}
