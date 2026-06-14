const StatusBadge = ({ status }) => {

  const getClass = () => {
    switch (status.toLowerCase()) {
      case "approved":
      case "verified":
      case "completed":
        return "badge badge-success";

      case "pending":
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
      {status}
    </span>
  );
};

export default StatusBadge;