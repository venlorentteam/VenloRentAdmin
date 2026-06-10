import "./DataTable.css";

const DataTable = ({
  columns = [],
  rows = [],
  getRowKey,
  emptyState,
  onRowClick
}) => {
  const hasRows = rows.length > 0;

  return (
    <div className="data-table">
      <div
        className="data-table__header"
        style={{ gridTemplateColumns: columns.map(column => column.width || "1fr").join(" ") }}
      >
        {columns.map(column => (
          <div key={column.key}>
            {column.label}
          </div>
        ))}
      </div>

      {hasRows ? (
        rows.map((row, index) => (
          <button
            className="data-table__row"
            key={getRowKey ? getRowKey(row) : row.id || index}
            onClick={() => onRowClick?.(row)}
            style={{ gridTemplateColumns: columns.map(column => column.width || "1fr").join(" ") }}
            type="button"
          >
            {columns.map(column => (
              <div className="data-table__cell" key={column.key}>
                {column.render ? column.render(row) : row[column.key]}
              </div>
            ))}
          </button>
        ))
      ) : (
        <div className="data-table__empty">
          {emptyState}
        </div>
      )}
    </div>
  );
};

export default DataTable;
