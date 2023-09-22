import React, { useEffect, useState } from 'react'
import { IBook } from './BookModel'
import DeleteBook from './DeleteBook'

interface TableBookProps {
  books: IBook[]
  setBooks: React.Dispatch<React.SetStateAction<IBook[]>>
  deleteBook: (book: IBook) => void
}

function TableBook({
  books,
  setBooks,
  deleteBook,
}: TableBookProps): JSX.Element {
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

  const handleDeleteBook = () => {
    setDeleteModal(true)
  }

  const confirmDelete = () => {
    deleteBook(bookToDelete)
    setDeleteModal(false)
    setBookToDelete(null)
  }

  return (
    <div>
      {isLoading ? (
        <div className="loader">Loading...</div>
      ) : (
        <div className="table-container">
          <table id="myTable">
            <thead>
              <tr className="table-header">
                <th style={{ width: '50%' }}>Name</th>
                <th style={{ width: '20%' }}>Author</th>
                <th style={{ width: '20%' }}>Topic</th>
                <th style={{ width: '10%' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book: IBook, index: number) => (
                <tr key={index}>
                  <td>{book.name}</td>
                  <td>{book.author}</td>
                  <td>{book.topic}</td>
                  <td>
                    <button
                      className="deletebtn"
                      onClick={() => {
                        setBookToDelete(book)
                        handleDeleteBook()
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
              closeDeleteBook={() => setDeleteModal(false)}
              deleteBook={confirmDelete}
              bookToDelete={bookToDelete}
            />
          )}
        </div>
      )}
    </div>
  )
}

export default TableBook
