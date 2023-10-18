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
  currentPage: number
  setCurrentPage: (page: number) => void
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
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([])

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
      currentPage,
      setCurrentPage,
      searchBooks,
      filteredBooks,
    }),
    [books, currentPage, searchBooks, filteredBooks],
  )

  return (
    <BookContext.Provider value={contextValue}>
      {isLoading ? <LoadingSkeleton /> : children}
    </BookContext.Provider>
  )
}
