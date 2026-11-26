
import {
  Button,
  Spinner,
} from "@fluentui/react-components";

import type { Customer } from "../../types";
import CustomerStatusBadge from "./CustomerStatusBadge";

interface Props {
  customers: Customer[];
  loading: boolean;
  onEdit: (customer: Customer) => void;
  onDelete: (customer: Customer) => void;
  onView: (customer: Customer) => void;
}

export default function CustomerTable({
  customers,
  loading,
  onEdit,
  onDelete,
  onView,
}: Props) {
  if (loading) {
    return (
      <div style={{ padding: 40, textAlign: "center" }}>
        <Spinner label="Loading customers..." />
      </div>
    );
  }

  if (!customers.length) {
    return (
      <div style={{ padding: 40, textAlign: "center" }}>
        <h3>No customers found</h3>
        <p>Try changing your search or add a new customer.</p>
      </div>
    );
  }

  return (
    <div style={{ overflowX: "auto" }}>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          textAlign: "left",
        }}
      >
        <thead>
          <tr>
            {[
              "Customer",
              "Company",
              "Email",
              "Phone",
              "Type",
              "Status",
              "Actions",
            ].map((heading) => (
              <th
                key={heading}
                style={{
                  padding: 14,
                  borderBottom: "1px solid #ddd",
                  whiteSpace: "nowrap",
                }}
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td style={{ padding: 14 }}>
                <Button
                  appearance="subtle"
                  onClick={() => onView(customer)}
                >
                  {customer.name}
                </Button>
                <div style={{ fontSize: 12, color: "gray" }}>
                  {customer.customerCode}
                </div>
              </td>

              <td style={{ padding: 14 }}>
                {customer.company || "-"}
              </td>

              <td style={{ padding: 14 }}>
                {customer.email}
              </td>

              <td style={{ padding: 14 }}>
                {customer.phone}
              </td>

              <td style={{ padding: 14 }}>
                {customer.type}
              </td>

              <td style={{ padding: 14 }}>
                <CustomerStatusBadge status={customer.status} />
              </td>

              <td style={{ padding: 14 }}>
                <div style={{ display: "flex", gap: 4 }}>
                  <Button
                    size="small"
                    onClick={() => onEdit(customer)}
                  >
                    Edit
                  </Button>

                  <Button
                    size="small"
                    appearance="subtle"
                    onClick={() => onDelete(customer)}
                  >
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
