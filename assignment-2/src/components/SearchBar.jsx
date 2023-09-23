import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";

function SearchBar({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <div className="searchContainer">
      <form id="searchForm" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search books"
          name="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="icon">
          <AiOutlineSearch />
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
