import React, { useCallback, useEffect, useState } from "react";
import DeleteBook from "./DeleteBook";
import Pagination from "./Pagination";
import EmptyData from "./EmptyData";

function TableBook({
  books,
  setBooks,
  deleteBook,
  currentPage,
  setCurrentPage,
}) {
  const [deleteModal, setDeleteModal] = useState(false);
  const [bookToDelete, setBookToDelete] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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

  const handleDeleteBook = () => {
    setDeleteModal(true);
  };

  const confirmDelete = () => {
    deleteBook(bookToDelete);
    setDeleteModal(false);
    setBookToDelete(null);
    if (slicedBooks.length === 1) {
      setCurrentPage(1);
    }
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
          {slicedBooks.length === 0 ? <EmptyData /> : null}
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
