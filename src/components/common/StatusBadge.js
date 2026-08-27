const StatusBadge = ({ status }) => {

  const getClass = () => {
    switch (status.toLowerCase()) {
      case "approved":
      case "verified":
      case "completed":
      case "matched":
        return "badge badge-success";

      case "pending":
       case "open":
        return "badge badge-warning";

      case "rejected":
      case "flagged":
      case "cancelled":
      case "closed":
      case "failed":
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