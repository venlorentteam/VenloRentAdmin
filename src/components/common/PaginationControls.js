import "./PaginationControls.css";

const PaginationControls = ({ pagination, onPageChange, onLimitChange }) => {
  const { page, limit, totalItems, totalPages } = pagination;

  if (!totalItems) return null;

  return (
    <div className="pagination-controls">
      <div className="pagination-summary">
        Showing {page} of {totalPages} page{totalPages === 1 ? "" : "s"} from {totalItems} item{totalItems === 1 ? "" : "s"}
      </div>

      <div className="pagination-actions">
        <button
          className="pagination-btn"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
        >
          Previous
        </button>

        <span className="pagination-page">
          {page} / {totalPages}
        </span>

        <button
          className="pagination-btn"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
        >
          Next
        </button>

        <select
          className="pagination-limit"
          value={limit}
          onChange={(e) => onLimitChange(Number(e.target.value))}
        >
          <option value={10}>10 / page</option>
          <option value={20}>20 / page</option>
          <option value={50}>50 / page</option>
        </select>
      </div>
    </div>
  );
};

export default PaginationControls;
