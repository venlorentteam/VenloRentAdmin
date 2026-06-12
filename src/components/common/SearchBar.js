import "./FilterBar.css";

const SearchBar = ({
  placeholder,
  value,
  onChange
}) => {

  return (
    <input
      className="shared-search"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default SearchBar;