
import {
  Input,
  Select,
  Field,
} from "@fluentui/react-components";
import { Search20Regular } from "@fluentui/react-icons";

interface Props {
  search: string;
  setSearch: (value: string) => void;
  status: string;
  setStatus: (value: string) => void;
  type: string;
  setType: (value: string) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
  order: string;
  setOrder: (value: string) => void;
}

export default function CustomerFilters({
  search,
  setSearch,
  status,
  setStatus,
  type,
  setType,
  sortBy,
  setSortBy,
  order,
  setOrder,
}: Props) {
  return (
    <div
      style={{
        display: "flex",
        gap: 12,
        flexWrap: "wrap",
        alignItems: "end",
        marginBottom: 20,
      }}
    >
      <div style={{ flex: "2 1 250px" }}>
        <Field label="Search Customers">
          <Input
            value={search}
            contentBefore={<Search20Regular />}
            placeholder="Search name, company, email or phone..."
            onChange={(_, data) => setSearch(data.value)}
          />
        </Field>
      </div>

      <div style={{ minWidth: 140 }}>
        <Field label="Status">
          <Select
            value={status}
            onChange={(_, data) => setStatus(data.value)}
          >
            <option value="">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Prospect">Prospect</option>
          </Select>
        </Field>
      </div>

      <div style={{ minWidth: 140 }}>
        <Field label="Customer Type">
          <Select
            value={type}
            onChange={(_, data) => setType(data.value)}
          >
            <option value="">All Types</option>
            <option value="Individual">Individual</option>
            <option value="Business">Business</option>
          </Select>
        </Field>
      </div>

      <div style={{ minWidth: 140 }}>
        <Field label="Sort By">
          <Select
            value={sortBy}
            onChange={(_, data) => setSortBy(data.value)}
          >
            <option value="createdAt">Created Date</option>
            <option value="name">Customer Name</option>
            <option value="company">Company</option>
          </Select>
        </Field>
      </div>

      <div style={{ minWidth: 120 }}>
        <Field label="Order">
          <Select
            value={order}
            onChange={(_, data) => setOrder(data.value)}
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </Select>
        </Field>
      </div>
    </div>
  );
}
