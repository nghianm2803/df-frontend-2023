import React, { useCallback, useEffect, useRef, useState } from 'react'
import { IBook } from '../interface/book'
import EmptyData from '../components/EmptyData'
import DeleteBook from './DeleteBook'
import LoadingSkeleton from './LoadingSkeleton'
import EditBook from './EditBook'
import Pagination from './Pagination'
import { redirect } from 'next/navigation'

interface TableBookProps {
  books: IBook[]
  setBooks: React.Dispatch<React.SetStateAction<IBook[]>>
  deleteBook: (book: IBook) => void
  editBook: (book: IBook) => void
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  searchQuery: string
}

function TableBook({
  books,
  setBooks,
  deleteBook,
  editBook,
  currentPage,
  setCurrentPage,
  searchQuery,
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

  const prevPageRef = useRef(currentPage)
  const prevQueryRef = useRef(searchQuery)
  useEffect(() => {
    if (
      currentPage !== prevPageRef.current ||
      searchQuery !== prevQueryRef.current
    ) {
      const params = `?query=${searchQuery}&page=${currentPage}`
      window.history.replaceState({}, '', params)

      prevPageRef.current = currentPage
      prevQueryRef.current = searchQuery
    }
  }, [currentPage, searchQuery])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const pageParam = params.get('page')
    if (pageParam !== null) {
      const currentPageNumber = parseInt(pageParam, 10) || 1
      setCurrentPage(currentPageNumber)
    } else {
      setCurrentPage(1)
    }
  }, [setCurrentPage])

  const onChangePageNumber = useCallback(
    (numPage: number) => {
      setCurrentPage(numPage)
    },
    [setCurrentPage],
  )

  const handleViewBook = (book: IBook) => {
    console.log('go to detail book view', book.id)
  }

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
      setCurrentPage(currentPage - 1)
    }
  }

  const startIndex = (currentPage - 1) * 5
  const endIndex = startIndex + 5
  const slicedBooks = books.slice(startIndex, endIndex)

  return (
    <div>
      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        <div className="pt-3 m-4 h-96 min-h-full">
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
                        onClick={() => {
                          handleViewBook(book)
                        }}
                      >
                        View
                      </button>
                      <button
                        className="bg-white rounded-md p-2 mr-3 cursor-pointer border text-[#55d244] text-lg transition hover:border-[#42c031] hover:bg-gray-200"
                        onClick={() => {
                          handleEditBook(book)
                        }}
                      >
                        Edit
                      </button>

                      <button
                        className="bg-white rounded-md p-2 mr-3 cursor-pointer border text-[#d2445a] text-lg transition hover:border-red-500 hover:bg-gray-200"
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
