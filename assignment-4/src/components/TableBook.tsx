import React, { useCallback, useEffect, useRef, useState } from 'react'
import { IBook } from '../lib/book'
import EmptyData from '../components/EmptyData'
import DeleteBook from './DeleteBook'
import LoadingSkeleton from './LoadingSkeleton'
import EditBook from './EditBook'
import Pagination from './Pagination'

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

  const prevPageRef = useRef(currentPage)
  useEffect(() => {
    if (currentPage !== prevPageRef.current) {
      const params = `?page=${currentPage}`
      // console.log("Updating URL with params:", params);
      window.history.replaceState({}, '', params)

      prevPageRef.current = currentPage
    }
  }, [currentPage])

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
  }

  const startIndex = (currentPage - 1) * 5
  const endIndex = startIndex + 5
  const slicedBooks = books.slice(startIndex, endIndex)

  return (
    <div>
      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        <div className="pt-8 m-4 h-96 min-h-full">
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
              {slicedBooks.map((book: IBook, index: number) => (
                <tr key={index}>
                  <td className="data-cell">{book.name}</td>
                  <td className="data-cell">{book.author}</td>
                  <td className="data-cell">{book.topic}</td>
                  <td className="data-cell">
                    <div className="flex w-1">
                      <button
                        className="bg-white rounded-md p-2 mr-3 cursor-pointer border text-blue-500 text-lg transition hover:border-blue-500 hover:bg-gray-200"
                        // onClick={() => {
                        //   handleEditBook(book)
                        // }}
                      >
                        View
                      </button>
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
    </div>
  )
}

export default TableBook
