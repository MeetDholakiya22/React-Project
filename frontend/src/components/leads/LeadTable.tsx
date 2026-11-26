
import { Button } from "@fluentui/react-components";
import {
  Edit20Regular,
  Delete20Regular
} from "@fluentui/react-icons";

import type { Lead } from "../../types";
import LeadStatusBadge from "./LeadStatusBadge";

interface LeadTableProps {
  leads: Lead[];
  onEdit: (lead: Lead) => void;
  onDelete: (id: string) => void;
}

function LeadTable({
  leads,
  onEdit,
  onDelete
}: LeadTableProps) {

  if (leads.length === 0) {
    return (
      <div className="empty-state">
        <h3>No leads found</h3>
        <p>Try another search or create a new lead.</p>
      </div>
    );
  }

  return (
    <div className="table-wrapper">
      <table className="lead-table">
        <thead>
          <tr>
            <th>Lead Name</th>
            <th>Company</th>
            <th>Email</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Assigned To</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {leads.map((lead) => (
            <tr key={lead.id}>
              <td>
                <strong>{lead.name}</strong>
              </td>

              <td>{lead.company}</td>
              <td>{lead.email}</td>

              <td>
                <LeadStatusBadge status={lead.status} />
              </td>

              <td>
                <span className={`priority ${lead.priority.toLowerCase()}`}>
                  {lead.priority}
                </span>
              </td>

              <td>{lead.assignedTo}</td>

              <td>
                <div className="table-actions">
                  <Button
                    appearance="subtle"
                    icon={<Edit20Regular />}
                    aria-label={`Edit ${lead.name}`}
                    onClick={() => onEdit(lead)}
                  />

                  <Button
                    appearance="subtle"
                    icon={<Delete20Regular />}
                    aria-label={`Delete ${lead.name}`}
                    onClick={() => onDelete(lead.id)}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LeadTable;
