import "./FilterBar.css";

const FilterBar = ({
  filters = []
}) => {

  return (
    <div className="filter-bar">

      {filters.map(filter => (

        <button
          key={filter}
          className="filter-chip"
        >
          {filter}
        </button>

      ))}

    </div>
  );
};

export default FilterBar;