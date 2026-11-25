
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@fluentui/react-components";

import type { Lead } from "../../types";

const leadSchema = z.object({
  name: z.string().min(3, "Name must contain at least 3 characters"),
  company: z.string().min(2, "Company name is required"),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().regex(/^[0-9]{10}$/, "Enter a valid 10-digit phone number"),
  source: z.string().min(1, "Select a source"),
  status: z.enum(["New", "Contacted", "Qualified", "Converted", "Lost"]),
  priority: z.enum(["Low", "Medium", "High"]),
  assignedTo: z.string().min(1, "Select an employee")
});

type LeadFormValues = z.infer<typeof leadSchema>;

interface LeadFormProps {
  selectedLead: Lead | null;
  onSave: (lead: Lead) => void;
  onCancel: () => void;
}

function LeadForm({
  selectedLead,
  onSave,
  onCancel
}: LeadFormProps) {

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      name: selectedLead?.name ?? "",
      company: selectedLead?.company ?? "",
      email: selectedLead?.email ?? "",
      phone: selectedLead?.phone ?? "",
      source: selectedLead?.source ?? "",
      status: selectedLead?.status ?? "New",
      priority: selectedLead?.priority ?? "Medium",
      assignedTo: selectedLead?.assignedTo ?? ""
    }
  });

  const submitForm = (data: LeadFormValues) => {
    const lead: Lead = {
      ...data,
      id: selectedLead?.id ?? crypto.randomUUID(),
      createdAt: selectedLead?.createdAt ??
        new Date().toISOString().slice(0, 10)
    };

    onSave(lead);
  };

  return (
    <form
      className="lead-form"
      onSubmit={handleSubmit(submitForm)}
    >
      <div className="form-grid">

        <div className="form-field">
          <label>Lead Name *</label>
          <input {...register("name")} placeholder="Enter lead name" />
          {errors.name && <span className="error">{errors.name.message}</span>}
        </div>

        <div className="form-field">
          <label>Company *</label>
          <input {...register("company")} placeholder="Enter company name" />
          {errors.company && <span className="error">{errors.company.message}</span>}
        </div>

        <div className="form-field">
          <label>Email *</label>
          <input {...register("email")} type="email" placeholder="Enter email" />
          {errors.email && <span className="error">{errors.email.message}</span>}
        </div>

        <div className="form-field">
          <label>Phone *</label>
          <input {...register("phone")} placeholder="10-digit phone number" />
          {errors.phone && <span className="error">{errors.phone.message}</span>}
        </div>

        <div className="form-field">
          <label>Source *</label>
          <select {...register("source")}>
            <option value="">Select source</option>
            <option value="Website">Website</option>
            <option value="Referral">Referral</option>
            <option value="LinkedIn">LinkedIn</option>
            <option value="Advertisement">Advertisement</option>
          </select>
          {errors.source && <span className="error">{errors.source.message}</span>}
        </div>

        <div className="form-field">
          <label>Status</label>
          <select {...register("status")}>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Qualified">Qualified</option>
            <option value="Converted">Converted</option>
            <option value="Lost">Lost</option>
          </select>
        </div>

        <div className="form-field">
          <label>Priority</label>
          <select {...register("priority")}>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <div className="form-field">
          <label>Assigned To *</label>
          <select {...register("assignedTo")}>
            <option value="">Select employee</option>
            <option value="Meet Patel">Meet Patel</option>
            <option value="Rahul Shah">Rahul Shah</option>
            <option value="Priya Mehta">Priya Mehta</option>
          </select>
          {errors.assignedTo && (
            <span className="error">{errors.assignedTo.message}</span>
          )}
        </div>

      </div>

      <div className="form-actions">
        <Button appearance="secondary" onClick={onCancel}>
          Cancel
        </Button>

        <Button appearance="primary" type="submit">
          {selectedLead ? "Update Lead" : "Create Lead"}
        </Button>
      </div>
    </form>
  );
}

export default LeadForm;
