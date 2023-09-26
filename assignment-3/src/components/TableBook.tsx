import React, { useCallback, useEffect, useState } from 'react'
import { IBook } from './BookModel'
import DeleteBook from './DeleteBook'
import Pagination from './Pagination'
import EmptyData from './EmptyData'
import EditBook from './EditBook'

interface TableBookProps {
  books: IBook[]
  setBooks: React.Dispatch<React.SetStateAction<IBook[]>>
  deleteBook: (book: IBook) => void
  editBook: (book: IBook) => void
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
}

function TableBook({
  books,
  setBooks,
  deleteBook,
  editBook,
  currentPage,
  setCurrentPage,
}: TableBookProps): JSX.Element {
  const [editModal, setEditModal] = useState<boolean>(false)
  const [bookToEdit, setBookToEdit] = useState<any>(null)
  const [deleteModal, setDeleteModal] = useState<boolean>(false)
  const [bookToDelete, setBookToDelete] = useState<any>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    try {
      const storedBooksString = localStorage.getItem('books')
      if (storedBooksString) {
        const storedBooks = JSON.parse(storedBooksString) as IBook[]
        setBooks(storedBooks)
      }
    } catch (error) {
      console.error('Error get books from localStorage:', error)
    }
    setIsLoading(false)
  }, [setBooks])

  const onChangePageNumber = useCallback(
    (numPage: number) => {
      setCurrentPage(numPage)
      localStorage.setItem('currentPage', numPage.toString())
    },
    [setCurrentPage],
  )

  useEffect(() => {
    const storedPage = localStorage.getItem('currentPage')
    if (storedPage) {
      setCurrentPage(parseInt(storedPage, 10))
    }
  }, [setCurrentPage])

  const handleEditBook = (book: IBook) => {
    setBookToEdit(book)
    setEditModal(true)
  }

  const handleDeleteBook = (book: IBook) => {
    setBookToDelete(book)
    setDeleteModal(true)
  }

  const confirmDelete = () => {
    deleteBook(bookToDelete)
    setDeleteModal(false)
    setBookToDelete(null)
    if (slicedBooks.length === 1) {
      setCurrentPage(1)
    }
  }

  const startIndex = (currentPage - 1) * 5
  const endIndex = startIndex + 5
  const slicedBooks = books.slice(startIndex, endIndex)

  return (
    <div>
      {isLoading ? (
        <div className="loader">Loading...</div>
      ) : (
        <div className="tableContainer">
          <table id="myTable">
            <thead>
              <tr className="tableHeader">
                <th style={{ width: '50%' }}>Name</th>
                <th style={{ width: '20%' }}>Author</th>
                <th style={{ width: '20%' }}>Topic</th>
                <th style={{ width: '10%' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {slicedBooks.map((book: IBook, index: number) => (
                <tr key={index}>
                  <td>{book.name}</td>
                  <td>{book.author}</td>
                  <td>{book.topic}</td>
                  <td>
                    <div className="action">
                      <button
                        className="editbtn"
                        onClick={() => {
                          handleEditBook(book)
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="deletebtn"
                        onClick={() => {
                          handleDeleteBook(book)
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
      {/* <p>books count: {books.length}</p>
      <p>Slice books count: {slicedBooks.length}</p> */}
      {slicedBooks.length >= 5 || currentPage > 1 ? (
        <Pagination
          totalCount={books.length}
          currentPage={currentPage}
          pageSize={5}
          onChangePage={onChangePageNumber}
        />
      ) : null}
    </div>
  )
}

export default TableBook
