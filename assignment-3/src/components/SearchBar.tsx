import React, { useState } from 'react'
// import { AiOutlineSearch } from 'react-icons/ai'

function SearchBar({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState<string>('')

  const handleSearch = (e) => {
    e.preventDefault()
    onSearch(searchQuery)
  }

  return (
    <div className="search-container">
      <form id="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search books"
          name="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="icon">
          {/* <AiOutlineSearch /> */}
          Search
        </button>
      </form>
    </div>
  )
}

export default SearchBar
