import "./DataTable.css";

const EmptyState = ({
  title = "No records found",
  description = "Try adjusting your filters or search query.",
  action
}) => {
  return (
    <div className="empty-state">
      <h3>{title}</h3>
      <p>{description}</p>
      {action}
    </div>
  );
};

export default EmptyState;
