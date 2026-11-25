
import { Input } from "@fluentui/react-components";
import { Search20Regular } from "@fluentui/react-icons";

interface LeadFiltersProps {
  search: string;
  setSearch: (value: string) => void;
  status: string;
  setStatus: (value: string) => void;
}

function LeadFilters({
  search,
  setSearch,
  status,
  setStatus
}: LeadFiltersProps) {

  return (
    <div className="lead-filters">

      <Input
        value={search}
        onChange={(_, data) => setSearch(data.value)}
        placeholder="Search name, company or email..."
        contentBefore={<Search20Regular />}
      />

      <select
        value={status}
        onChange={(event) => setStatus(event.target.value)}
      >
        <option value="All">All Statuses</option>
        <option value="New">New</option>
        <option value="Contacted">Contacted</option>
        <option value="Qualified">Qualified</option>
        <option value="Converted">Converted</option>
        <option value="Lost">Lost</option>
      </select>

    </div>
  );
}

export default LeadFilters;
