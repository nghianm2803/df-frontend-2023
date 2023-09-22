import React, { useEffect, useState } from "react";
import DeleteBook from "./DeleteBook";

function TableBook({ books, setBooks, deleteBook }) {
  const [deleteModal, setDeleteModal] = useState(false);
  const [bookToDelete, setBookToDelete] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  function loadBooksFromLocalStorage() {
    const storedBooks = JSON.parse(localStorage.getItem("books"));
    if (storedBooks) {
      setBooks(storedBooks);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    loadBooksFromLocalStorage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDeleteBook = () => {
    setDeleteModal(true);
  };

  const confirmDelete = () => {
    deleteBook(bookToDelete);
    setDeleteModal(false);
    setBookToDelete(null);
  };

  return (
    <>
      {isLoading ? (
        <div className="loader">Loading...</div>
      ) : (
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
                      onClick={() => {
                        setBookToDelete(book);
                        handleDeleteBook();
                      }}
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
              closeDeleteBook={() => setDeleteModal(false)}
              deleteBook={confirmDelete}
              bookToDelete={bookToDelete}
            />
          )}
        </div>
      )}
    </>
  );
}

export default TableBook;
