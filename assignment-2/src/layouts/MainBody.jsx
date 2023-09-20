import React, { useState } from "react";
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

  const handleAddBook = () => {
    setAddModal(true);
  };

  const handleClose = () => {
    setAddModal(false);
  };

  const addBook = (newBook) => {
    const newBooks = [...books, newBook];
    setBooks(newBooks);

    localStorage.setItem("books", JSON.stringify(newBooks));
  };

  return (
    <div>
      <div className="search-add">
        <SearchBar />
        <button type="submit" className="btnPrimary" onClick={handleAddBook}>
          Add Book
        </button>
      </div>
      {addModal && (
        <AddBook open={addModal} handleClose={handleClose} addBook={addBook} />
      )}
      <TableBook books={books} />
    </div>
  );
}

export default MainBody;
