
import {
  Dialog,
  DialogSurface,
  DialogBody,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@fluentui/react-components";

import type { Customer } from "../../types";

interface Props {
  customer: Customer | null;
  onClose: () => void;
}

export default function CustomerDetails({
  customer,
  onClose,
}: Props) {
  if (!customer) return null;

  const fields = [
    ["Customer Code", customer.customerCode],
    ["Name", customer.name],
    ["Email", customer.email],
    ["Phone", customer.phone],
    ["Company", customer.company],
    ["Type", customer.type],
    ["Status", customer.status],
    ["City", customer.city],
    ["Country", customer.country],
    ["Assigned To", customer.assignedTo],
    ["Notes", customer.notes],
  ];

  return (
    <Dialog
      open={Boolean(customer)}
      onOpenChange={(_, data) => {
        if (!data.open) onClose();
      }}
    >
      <DialogSurface>
        <DialogBody>
          <DialogTitle>Customer Details</DialogTitle>

          <DialogContent>
            {fields.map(([label, value]) => (
              <div
                key={label}
                style={{
                  padding: "10px 0",
                  borderBottom: "1px solid #eee",
                }}
              >
                <strong>{label}</strong>
                <div>{value || "-"}</div>
              </div>
            ))}
          </DialogContent>

          <DialogActions>
            <Button appearance="primary" onClick={onClose}>
              Close
            </Button>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
}
