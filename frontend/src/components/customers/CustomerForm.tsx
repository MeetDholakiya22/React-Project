
import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogSurface,
  DialogBody,
  DialogTitle,
  DialogContent,
  DialogActions,
  Field,
  Input,
  Select,
  Textarea,
} from "@fluentui/react-components";

import type {
  Customer,
  CustomerFormData,
} from "../../types";

interface Props {
  open: boolean;
  customer?: Customer | null;
  onClose: () => void;
  onSubmit: (data: CustomerFormData) => Promise<void>;
}

const emptyForm: CustomerFormData = {
  name: "",
  email: "",
  phone: "",
  company: "",
  type: "Individual",
  status: "Prospect",
  city: "",
  country: "India",
  assignedTo: "",
  notes: "",
};

export default function CustomerForm({
  open,
  customer,
  onClose,
  onSubmit,
}: Props) {
  const [form, setForm] =
    useState<CustomerFormData>(emptyForm);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      setForm(
        customer
          ? {
              name: customer.name,
              email: customer.email,
              phone: customer.phone,
              company: customer.company,
              type: customer.type,
              status: customer.status,
              city: customer.city,
              country: customer.country,
              assignedTo: customer.assignedTo,
              notes: customer.notes,
            }
          : { ...emptyForm }
      );
      setError("");
    }
  }, [open, customer]);

  const handleChange = (
    field: keyof CustomerFormData,
    value: string
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setError("");

    if (!form.name.trim()) {
      setError("Customer name is required");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!/^\+?[0-9\s()-]{7,20}$/.test(form.phone)) {
      setError("Please enter a valid phone number");
      return;
    }

    try {
      setSaving(true);

      await onSubmit({
        ...form,
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        phone: form.phone.trim(),
        company: form.company.trim(),
      });

      onClose();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to save customer"
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(_, data) => {
      if (!data.open && !saving) onClose();
    }}>
      <DialogSurface>
        <form onSubmit={handleSubmit}>
          <DialogBody>
            <DialogTitle>
              {customer ? "Edit Customer" : "Add Customer"}
            </DialogTitle>

            <DialogContent>
              {error && (
                <p role="alert" style={{ color: "red" }}>
                  {error}
                </p>
              )}

              <Field label="Customer Name" required>
                <Input
                  value={form.name}
                  placeholder="Enter customer name"
                  onChange={(_, data) =>
                    handleChange("name", data.value)
                  }
                />
              </Field>

              <Field label="Email Address" required>
                <Input
                  type="email"
                  value={form.email}
                  placeholder="Enter email"
                  onChange={(_, data) =>
                    handleChange("email", data.value)
                  }
                />
              </Field>

              <Field label="Phone Number" required>
                <Input
                  value={form.phone}
                  placeholder="Enter phone number"
                  onChange={(_, data) =>
                    handleChange("phone", data.value)
                  }
                />
              </Field>

              <Field label="Company">
                <Input
                  value={form.company}
                  placeholder="Enter company"
                  onChange={(_, data) =>
                    handleChange("company", data.value)
                  }
                />
              </Field>

              <Field label="Customer Type">
                <Select
                  value={form.type}
                  onChange={(_, data) =>
                    handleChange("type", data.value)
                  }
                >
                  <option value="Individual">Individual</option>
                  <option value="Business">Business</option>
                </Select>
              </Field>

              <Field label="Status">
                <Select
                  value={form.status}
                  onChange={(_, data) =>
                    handleChange("status", data.value)
                  }
                >
                  <option value="Prospect">Prospect</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </Select>
              </Field>

              <Field label="City">
                <Input
                  value={form.city}
                  placeholder="Enter city"
                  onChange={(_, data) =>
                    handleChange("city", data.value)
                  }
                />
              </Field>

              <Field label="Country">
                <Input
                  value={form.country}
                  onChange={(_, data) =>
                    handleChange("country", data.value)
                  }
                />
              </Field>

              <Field label="Assigned To">
                <Input
                  value={form.assignedTo}
                  placeholder="Enter employee name"
                  onChange={(_, data) =>
                    handleChange("assignedTo", data.value)
                  }
                />
              </Field>

              <Field label="Notes">
                <Textarea
                  value={form.notes}
                  placeholder="Enter customer notes"
                  onChange={(_, data) =>
                    handleChange("notes", data.value)
                  }
                />
              </Field>
            </DialogContent>

            <DialogActions>
              <Button
                type="button"
                onClick={onClose}
                disabled={saving}
              >
                Cancel
              </Button>

              <Button
                appearance="primary"
                type="submit"
                disabled={saving}
              >
                {saving ? "Saving..." : customer ? "Update Customer" : "Save Customer"}
              </Button>
            </DialogActions>
          </DialogBody>
        </form>
      </DialogSurface>
    </Dialog>
  );
}
