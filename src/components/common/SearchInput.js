import "./DataTable.css";

const SearchInput = ({
  value,
  onChange,
  placeholder = "Search...",
  className = "",
  ...props
}) => {
  return (
    <input
      className={`search-input${className ? ` ${className}` : ""}`}
      onChange={onChange}
      placeholder={placeholder}
      type="search"
      value={value}
      {...props}
    />
  );
};

export default SearchInput;
