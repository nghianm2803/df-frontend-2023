import React from "react";
import { AiOutlineSearch } from "react-icons/ai";

function SearchBar() {
  return (
    <div className="search-container">
      <form id="search-form">
        <input type="text" placeholder="Search books" name="search" />
        <button type="submit" className="icon">
          <AiOutlineSearch />
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
