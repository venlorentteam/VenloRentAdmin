import "./DataTable.css";

const DataTable = ({
  columns,
  data,
  renderActions
}) => {

  return (
    <div className="data-table">

      <div
        className="table-header"
        style={{
          gridTemplateColumns:
            `repeat(${columns.length},1fr) ${
              renderActions ? "120px" : ""
            }`
        }}
      >
        {columns.map(column => (
          <div key={column.key}>
            {column.label}
          </div>
        ))}

        {renderActions && (
          <div>Action</div>
        )}
      </div>

      {data.map(row => (

        <div
          key={row.id}
          className="table-row"
          style={{
            gridTemplateColumns:
              `repeat(${columns.length},1fr) ${
                renderActions ? "120px" : ""
              }`
          }}
        >

          {columns.map(column => (
            <div key={column.key}>
              {row[column.key]}
            </div>
          ))}

          {renderActions && (
            <div>
              {renderActions(row)}
            </div>
          )}

        </div>

      ))}

    </div>
  );
};

export default DataTable;