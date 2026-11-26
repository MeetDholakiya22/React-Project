
const API_URL = "http://localhost:5000/api/leads";

export interface LeadData {
  _id?: string;
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  source: string;
  status: "New" | "Contacted" | "Qualified" | "Converted" | "Lost";
  priority: "Low" | "Medium" | "High";
  assignedTo: string;
  createdAt?: string;
  updatedAt?: string;
}

const normalizeLead = (lead: LeadData): LeadData => ({
  ...lead,
  id: lead._id || lead.id,
});

// GET all leads
export const getLeads = async (): Promise<LeadData[]> => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch leads");
  }

  const data = await response.json();

  return data.map(normalizeLead);
};

// CREATE lead
export const createLead = async (data: LeadData) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to create lead");
  }

  return response.json();
};

// UPDATE lead
export const updateLead = async (
  id: string,
  data: Partial<LeadData>
) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to update lead");
  }

  const updatedLead = await response.json();

  return normalizeLead(updatedLead);
};

// DELETE lead
export const deleteLead = async (id: string) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete lead");
  }

  return response.json();
};
