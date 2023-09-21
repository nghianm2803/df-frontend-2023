import React, { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import TableBook from "../components/TableBook";
import AddBook from "../components/AddBook";

function MainBody() {
  const [addModal, setAddModal] = useState(false);
  const [books, setBooks] = useState([
    {
      id: 1,
      name: "Refactoring",
      author: "Martin Fowler",
      topic: "Programming",
    },
    {
      id: 2,
      name: "Designing Data-Intensive Applications",
      author: "Martin Kleppmann",
      topic: "Database",
    },
    {
      id: 3,
      name: "The Phoenix Project",
      author: "Gene Kim",
      topic: "DevOps",
    },
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);

  const handleAddBook = () => {
    setAddModal(true);
  };

  const handleCloseAddBook = () => {
    setAddModal(false);
  };

  const addBook = (newBook) => {
    const newBooks = [...books, newBook];
    setBooks(newBooks);

    localStorage.setItem("books", JSON.stringify(newBooks));
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    const formattedQuery = searchQuery.trim().toLowerCase();
    if (formattedQuery === "") {
      setFilteredBooks([]);
    } else {
      const filtered = books.filter((book) =>
        book.name.toLowerCase().includes(formattedQuery)
      );
      setFilteredBooks(filtered);
    }
  }, [searchQuery, books]);

  const displayedBooks = filteredBooks.length > 0 ? filteredBooks : books;

  return (
    <div>
      <div className="search-add">
        <SearchBar onSearch={handleSearch} />
        <button type="submit" className="btnPrimary" onClick={handleAddBook}>
          Add Book
        </button>
      </div>
      {addModal && (
        <AddBook
          open={addModal}
          closeAddBook={handleCloseAddBook}
          addBook={addBook}
        />
      )}
      <TableBook books={displayedBooks} setBooks={setBooks} />
    </div>
  );
}

export default MainBody;
