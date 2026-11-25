
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@fluentui/react-components";
import { Add20Regular } from "@fluentui/react-icons";

import type { Lead } from "../types";
import { useLeads } from "../features/leads/useLeads";

import LeadForm from "../components/leads/LeadForm";
import LeadTable from "../components/leads/LeadTable";
import LeadFilters from "../components/leads/LeadFilters";

function Leads() {
  const {
    leads,
    addLead,
    updateLead,
    deleteLead
  } = useLeads();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const formSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showForm) {
        formSectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start"
        });
    }
  }, [showForm]);

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        lead.name.toLowerCase().includes(searchText) ||
        lead.company.toLowerCase().includes(searchText) ||
        lead.email.toLowerCase().includes(searchText);

      const matchesStatus =
        status === "All" || lead.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [leads, search, status]);

  const handleAdd = useCallback(() => {
    setSelectedLead(null);
    setShowForm(true);
  }, []);

  const handleEdit = useCallback((lead: Lead) => {
    setSelectedLead(lead);
    setShowForm(true);
  }, []);

  const handleDelete = useCallback((id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this lead?"
    );

    if (confirmed) {
      deleteLead(id);
    }
  }, [deleteLead]);

  const handleSave = (lead: Lead) => {
    if (selectedLead) {
      updateLead(lead);
    } else {
      addLead(lead);
    }

    setShowForm(false);
    setSelectedLead(null);
  };

  const handleCancel = () => {
    setShowForm(false);
    setSelectedLead(null);
  };

  const qualifiedCount = leads.filter(
    (lead) => lead.status === "Qualified"
  ).length;

  const newCount = leads.filter(
    (lead) => lead.status === "New"
  ).length;

  const convertedCount = leads.filter(
    (lead) => lead.status === "Converted"
  ).length;

  return (
    <div className="leads-page">

      <div className="page-heading">
        <div>
          <h1>Lead Management</h1>
          <p>Manage and track your business leads.</p>
        </div>

        {!showForm && (
          <Button
            appearance="primary"
            icon={<Add20Regular />}
            onClick={handleAdd}
          >
            Add New Lead
          </Button>
        )}
      </div>

      <div className="lead-summary">
        <div className="summary-card">
          <span>Total Leads</span>
          <h2>{leads.length}</h2>
        </div>

        <div className="summary-card">
          <span>New Leads</span>
          <h2>{newCount}</h2>
        </div>

        <div className="summary-card">
          <span>Qualified Leads</span>
          <h2>{qualifiedCount}</h2>
        </div>

        <div className="summary-card">
          <span>Converted Leads</span>
          <h2>{convertedCount}</h2>
        </div>
      </div>

      {showForm && (
        <div
          className="lead-form-container"
          ref={formSectionRef}
          tabIndex={-1}
        >
          <div className="section-heading">
            <div>
              <h3>
                {selectedLead ? "Edit Lead" : "Create New Lead"}
              </h3>
              <p>Enter the lead information below.</p>
            </div>
          </div>

          <LeadForm
            key={selectedLead?.id ?? "new-lead"}
            selectedLead={selectedLead}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        </div>
      )}

      <div className="lead-list-container">

        <div className="section-heading">
          <div>
            <h3>All Leads</h3>
            <p>{filteredLeads.length} records found</p>
          </div>
        </div>

        <LeadFilters
          search={search}
          setSearch={setSearch}
          status={status}
          setStatus={setStatus}
        />

        <LeadTable
          leads={filteredLeads}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

      </div>
    </div>
  );
}

export default Leads;
