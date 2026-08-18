import "./FilterBar.css";

const FilterBar = ({
  filters = [],
  activeFilter,
  onFilterChange
}) => {

  return (
    <div className="filter-bar">

      {filters.map(filter => (

        <button
          key={filter}
          className={`filter-chip ${
            activeFilter === filter
              ? "active"
              : ""
          }`}
          onClick={() =>
            onFilterChange(filter)
          }
        >
          {filter}
        </button>

      ))}

    </div>
  );
};

export default FilterBar;