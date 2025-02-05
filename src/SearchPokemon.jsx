import { useState } from "react";

const Search = ({onSearch}) => {
  const [query, setQuery] = useState("");

  const handleChange = (event) => {
    const value = event.target.value;
    setQuery(value);
    onSearch(value);

  }
  return ( 
    <div className="search-component">
      <input type="text" value={query} onChange={handleChange} placeholder="Search Pokemon" />
    </div>
   );
}
 
export default Search;