import React, { useCallback, useEffect, useState, useRef } from "react";
import DeleteBook from "./DeleteBook";
import Pagination from "./Pagination";
import EmptyData from "./EmptyData";
import EditBook from "./EditBook";

function TableBook({
  books,
  setBooks,
  deleteBook,
  editBook,
  currentPage,
  setCurrentPage,
}) {
  const [editModal, setEditModal] = useState(false);
  const [bookToEdit, setBookToEdit] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [bookToDelete, setBookToDelete] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const prevPageRef = useRef(currentPage);
  useEffect(() => {
    if (currentPage !== prevPageRef.current) {
      const params = `?page=${currentPage}`;
      // console.log("Updating URL with params:", params);
      window.history.replaceState({}, "", params);

      prevPageRef.current = currentPage;
    }
  }, [currentPage]);

  const onChangePageNumber = useCallback(
    (numPage) => {
      setCurrentPage(numPage);
      localStorage.setItem("currentPage", numPage.toString());
    },
    [setCurrentPage]
  );

  useEffect(() => {
    const storedPage = localStorage.getItem("currentPage");
    if (storedPage) {
      setCurrentPage(parseInt(storedPage));
    }
  }, [setCurrentPage]);

  useEffect(() => {
    try {
      const storedBooksString = localStorage.getItem("books");
      if (storedBooksString) {
        const storedBooks = JSON.parse(storedBooksString);
        setBooks(storedBooks);
      }
    } catch (error) {
      console.error("Error get books from localStorage:", error);
    }
    setIsLoading(false);
  }, [setBooks]);

  const handleEditBook = (book) => {
    setBookToEdit(book);
    setEditModal(true);
  };

  const handleDeleteBook = (book) => {
    setBookToDelete(book);
    setDeleteModal(true);
  };

  const confirmDelete = () => {
    deleteBook(bookToDelete);
    setDeleteModal(false);
    setBookToDelete(null);
  };

  const startIndex = (currentPage - 1) * 5;
  const endIndex = startIndex + 5;
  const slicedBooks = books.slice(startIndex, endIndex);

  return (
    <>
      {isLoading ? (
        <div className="loader">Loading...</div>
      ) : (
        <div className="tableContainer">
          <table id="myTable">
            <thead>
              <tr className="tableHeader">
                <th style={{ width: "50%" }}>Name</th>
                <th style={{ width: "20%" }}>Author</th>
                <th style={{ width: "20%" }}>Topic</th>
                <th style={{ width: "10%" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {slicedBooks.map((book, index) => (
                <tr key={index}>
                  <td>{book.name}</td>
                  <td>{book.author}</td>
                  <td>{book.topic}</td>
                  <td>
                    <div className="action">
                      <button
                        className="editbtn"
                        onClick={() => {
                          handleEditBook(book);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="deletebtn"
                        onClick={() => {
                          handleDeleteBook(book);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {slicedBooks.length === 0 ? <EmptyData /> : null}
          {editModal && (
            <EditBook
              closeEditBook={() => setEditModal(false)}
              bookToEdit={bookToEdit}
              editBook={editBook}
            />
          )}
          {deleteModal && (
            <DeleteBook
              closeDeleteBook={() => setDeleteModal(false)}
              deleteBook={confirmDelete}
              bookToDelete={bookToDelete}
            />
          )}
        </div>
      )}
      {slicedBooks.length >= 5 || currentPage > 1 ? (
        <Pagination
          totalCount={books.length}
          currentPage={currentPage}
          pageSize={5}
          onChangePage={onChangePageNumber}
        />
      ) : null}
    </>
  );
}

export default TableBook;
