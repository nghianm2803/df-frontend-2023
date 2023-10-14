'use client'

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import LoadingSkeleton from '../components/LoadingSkeleton'
import { Book } from '../generated/model/book'
import { useGetBooks } from '../generated/book/book'

interface BookContextProps {
  books: Book[]
  deleteBook: (book: Book) => void
  currentPage: number
  setCurrentPage: (page: number) => void
  toastMessage: string
  setToastMessage: (message: string) => void
  showToast: boolean
  setShowToast: (show: boolean) => void
  closeToast: () => void
  searchBooks: (query: string) => void
  filteredBooks: Book[]
}

const BookContext = createContext<BookContextProps | undefined>(undefined)

export function useBookContext(): BookContextProps {
  const context = useContext(BookContext)
  if (context === undefined) {
    throw new Error('useBookContext must be used within a BookProvider')
  }
  return context
}

export function BookProvider({ children }: { children: React.ReactNode }) {
  const { data: booksData, error } = useGetBooks()
  const [books, setBooks] = useState<Book[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState<string>('')
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([])

  const openToast = () => {
    setShowToast(true)

    setTimeout(() => {
      setShowToast(false)
    }, 1500)
  }

  const closeToast = () => {
    setShowToast(false)
    setToastMessage('')
  }

  useEffect(() => {
    if (booksData) {
      setBooks(booksData?.data || [])
      setIsLoading(false)
    }
    if (error) {
      console.error('Error getting books from the API:', error)
      setIsLoading(false)
    }
  }, [booksData, error])

  const deleteBook = useCallback(
    (bookToDelete: Book) => {
      const updatedBooks = books.filter((book) => book.id !== bookToDelete.id)
      setBooks(updatedBooks)
      openToast()
      const message = `Delete book ${bookToDelete.name} successful!`
      setToastMessage(message)

      localStorage.setItem('books', JSON.stringify(updatedBooks))
    },
    [books],
  )

  const searchBooks = useCallback(
    (query: string) => {
      const formattedQuery = query.trim().toLowerCase()
      const filtered = books.filter((book: Book) =>
        book.name.toLowerCase().includes(formattedQuery),
      )
      setFilteredBooks(filtered)
    },
    [books],
  )

  useEffect(() => {
    setFilteredBooks(books)
  }, [books])

  const contextValue = useMemo(
    () => ({
      books,
      deleteBook,
      currentPage,
      setCurrentPage,
      toastMessage,
      setToastMessage,
      showToast,
      setShowToast,
      closeToast,
      searchBooks,
      filteredBooks,
    }),
    [
      books,
      deleteBook,
      currentPage,
      toastMessage,
      showToast,
      searchBooks,
      filteredBooks,
    ],
  )

  return (
    <BookContext.Provider value={contextValue}>
      {isLoading ? <LoadingSkeleton /> : children}
    </BookContext.Provider>
  )
}
