
import { Badge } from "@fluentui/react-components";
import type { CustomerStatus } from "../../types";

interface Props {
  status: CustomerStatus;
}

export default function CustomerStatusBadge({
  status,
}: Props) {
  const appearance =
    status === "Active"
      ? "filled"
      : status === "Inactive"
      ? "outline"
      : "tint";

  const color =
    status === "Active"
      ? "success"
      : status === "Inactive"
      ? "danger"
      : "informative";

  return (
    <Badge appearance={appearance} color={color}>
      {status}
    </Badge>
  );
}
