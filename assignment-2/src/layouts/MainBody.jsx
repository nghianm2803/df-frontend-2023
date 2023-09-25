import React, { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import TableBook from "../components/TableBook";
import AddBook from "../components/AddBook";
import Toast from "../components/Toast";
import { BOOKS } from "../constant/book";

function MainBody() {
  const [addModal, setAddModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [books, setBooks] = useState(BOOKS);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const handleAddBook = () => {
    setAddModal(true);
  };

  const handleCloseAddBook = () => {
    setAddModal(false);
  };

  const openToast = () => {
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 2000);
  };

  const closeToast = () => {
    setShowToast(false);
    setToastMessage("");
  };

  const addBook = (newBook) => {
    const newBooks = [...books, newBook];
    setBooks(newBooks);
    openToast();
    const message = `Add <b>${newBook.name}</b> successful!`;
    setToastMessage(message);

    localStorage.setItem("books", JSON.stringify(newBooks));
  };

  const deleteBook = (bookToDelete) => {
    const updatedBooks = books.filter((book) => book.id !== bookToDelete.id);
    setBooks(updatedBooks);
    openToast();

    const message = `Delete <b>${bookToDelete.name}</b> successful!`;
    setToastMessage(message);
    localStorage.setItem("books", JSON.stringify(updatedBooks));
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  useEffect(() => {
    const formattedQuery = searchQuery.trim().toLowerCase();
    const filtered = books.filter((book) =>
      book.name.toLowerCase().includes(formattedQuery)
    );
    setFilteredBooks(filtered);
  }, [searchQuery, books]);

  const displayedBooks = filteredBooks || books;

  return (
    <>
      <div className="searchAdd">
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
      {showToast && <Toast message={toastMessage} closeToast={closeToast} />}
      <TableBook
        books={displayedBooks}
        setBooks={setBooks}
        deleteBook={deleteBook}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
}

export default MainBody;
