const StatusBadge = ({ status }) => {
  const normalized = String(status ?? "").toLowerCase();
  const displayStatus = String(status ?? "")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  const getClass = () => {
    switch (normalized) {
      case "approved":
      case "verified":
      case "completed":
        return "badge badge-success";

      case "pending":
      case "submitted":
      case "in_review":
        return "badge badge-warning";

      case "rejected":
      case "flagged":
      case "cancelled":
        return "badge badge-danger";

      default:
        return "badge badge-primary";
    }
  };

  return (
    <span className={getClass()}>
      {displayStatus}
    </span>
  );
};

export default StatusBadge;
