
import { Badge } from "@fluentui/react-components";
import type { LeadStatus } from "../../types";

interface Props {
  status: LeadStatus;
}

function LeadStatusBadge({ status }: Props) {
  const colors: Record<
    LeadStatus,
    "informative" | "warning" | "success" | "danger" | "subtle"
  > = {
    New: "informative",
    Contacted: "warning",
    Qualified: "success",
    Converted: "success",
    Lost: "danger"
  };

  return (
    <Badge appearance="tint" color={colors[status]}>
      {status}
    </Badge>
  );
}

export default LeadStatusBadge;
