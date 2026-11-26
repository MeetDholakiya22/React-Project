
import { useCallback, useEffect, useState } from "react";
import type { Lead } from "../../types";
import {
  getLeads,
  createLead,
  updateLead as updateLeadApi,
  deleteLead as deleteLeadApi,
} from "../../services/leadService";

export function useLeads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // GET: Load leads from MongoDB
  const loadLeads = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getLeads();
      setLeads(data);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to load leads"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadLeads();
  }, [loadLeads]);

  // CREATE: Add lead to MongoDB
  const addLead = useCallback(async (lead: Lead) => {
    try {
      setError("");

      const newLead = await createLead(lead);
      setLeads((previous) => [newLead, ...previous]);

      return newLead;
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to add lead"
      );
      throw error;
    }
  }, []);

  // UPDATE: Update lead in MongoDB
  const updateLead = useCallback(async (updatedLead: Lead) => {
    try {
      setError("");

      const id = updatedLead.id;

      if (!id) {
        throw new Error("Lead ID is missing");
      }

      const updated = await updateLeadApi(id, updatedLead);

      setLeads((previous) =>
        previous.map((lead) =>
          lead.id === id ? updated : lead
        )
      );

      return updated;
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to update lead"
      );
      throw error;
    }
  }, []);

  // DELETE: Delete lead from MongoDB
  const deleteLead = useCallback(async (id: string) => {
    try {
      setError("");

      await deleteLeadApi(id);

      setLeads((previous) =>
        previous.filter((lead) => lead.id !== id)
      );
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to delete lead"
      );
      throw error;
    }
  }, []);

  return {
    leads,
    loading,
    error,
    addLead,
    updateLead,
    deleteLead,
    refreshLeads: loadLeads,
  };
}
