import React, { useEffect, useState } from "react";
import DeleteBook from "./DeleteBook"; // Import the DeleteBook component

function TableBook({ books, setBooks, openDeleteModal, closeDeleteBook }) {
  const [deleteModal, setDeleteModal] = useState(false);

  function loadBooksFromLocalStorage() {
    const storedBooks = JSON.parse(localStorage.getItem("books"));
    if (storedBooks) {
      setBooks(storedBooks);
    }
  }

  useEffect(() => {
    loadBooksFromLocalStorage();
  }, []);

  const handleDeleteBook = () => {
    setDeleteModal(true);
  };

  const handleCloseDeleteBook = () => {
    setDeleteModal(false);
  };

  const deleteBook = (bookToDelete) => {
    const updatedBooks = books.filter((book) => book.id !== bookToDelete.id);
    setBooks(updatedBooks);

    localStorage.setItem("books", JSON.stringify(updatedBooks));
  };

  return (
    <div className="table-container">
      <table id="myTable">
        <thead>
          <tr className="table-header">
            <th style={{ width: "10%" }}>ID</th>
            <th style={{ width: "50%" }}>Name</th>
            <th style={{ width: "20%" }}>Author</th>
            <th style={{ width: "20%" }}>Topic</th>
            <th style={{ width: "10%" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <tr key={index}>
              <td>{book.id}</td>
              <td>{book.name}</td>
              <td>{book.author}</td>
              <td>{book.topic}</td>
              <td>
                <button
                  className="deletebtn"
                  onClick={() => handleDeleteBook()}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {deleteModal && (
        <DeleteBook
          open={deleteModal}
          closeDeleteBook={handleCloseDeleteBook}
          deleteBook={deleteBook}
        />
      )}
    </div>
  );
}

export default TableBook;
