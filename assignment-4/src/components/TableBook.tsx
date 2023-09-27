import React, { useEffect, useState } from 'react'
import { IBook } from '../lib/book'
import EmptyData from '../components/EmptyData'
import DeleteBook from './DeleteBook'
import LoadingSkeleton from './LoadingSkeleton'
import EditBook from './EditBook'

interface TableBookProps {
  books: IBook[]
  setBooks: React.Dispatch<React.SetStateAction<IBook[]>>
  deleteBook: (book: IBook) => void
  editBook: (book: IBook) => void
}

function TableBook({
  books,
  setBooks,
  deleteBook,
  editBook,
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
  }

  return (
    <div>
      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        <div className="pt-8 m-4">
          <table className="border-collapse border border-slate-300 w-full text-lg ">
            <thead>
              <tr className="table-row">
                <th className="header-cell">Name</th>
                <th className="header-cell">Author</th>
                <th className="header-cell">Topic</th>
                <th className="header-cell">Action</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book: IBook, index: number) => (
                <tr key={index}>
                  <td className="data-cell">{book.name}</td>
                  <td className="data-cell">{book.author}</td>
                  <td className="data-cell">{book.topic}</td>
                  <td className="data-cell">
                    <div className="flex w-1">
                      <button
                        className="bg-white rounded-md p-2 mr-3 cursor-pointer border text-green-500 text-lg transition hover:border-green-500 hover:bg-gray-200"
                        onClick={() => {
                          handleEditBook(book)
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-white rounded-md p-2 mr-3 cursor-pointer border text-red-500 text-lg transition hover:border-red-500 hover:bg-gray-200"
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
          {books.length === 0 ? <EmptyData /> : null}
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
    </div>
  )
}

export default TableBook
