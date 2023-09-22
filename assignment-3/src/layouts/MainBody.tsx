import React, { useCallback, useEffect, useState } from 'react'
import SearchBar from '../components/SearchBar'
import TableBook from '../components/TableBook'
import AddBook from '../components/AddBook'
import { IBook } from '../components/BookModel'
import Toast from '../components/Toast'
import Pagination from '../components/Pagination'

function MainBody(): JSX.Element {
  const [addModal, setAddModal] = useState<boolean>(false)
  const [showToast, setShowToast] = useState<boolean>(false)
  const [toastMessage, setToastMessage] = useState<string>('')
  const [books, setBooks] = useState<IBook[]>([
    {
      id: 1,
      name: 'Refactoring',
      author: 'Martin Fowler',
      topic: 'Programming',
    },
    {
      id: 2,
      name: 'Designing Data-Intensive Applications',
      author: 'Martin Kleppmann',
      topic: 'Database',
    },
    {
      id: 3,
      name: 'The Phoenix Project',
      author: 'Gene Kim',
      topic: 'DevOps',
    },
  ])
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [filteredBooks, setFilteredBooks] = useState<IBook[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [filteredTotalCount, setFilteredTotalCount] = useState(books.length)

  const onChangePageNumber = useCallback((numPage: number) => {
    setCurrentPage(numPage)
  }, [])

  const handleAddBook = () => {
    setAddModal(true)
  }

  const handleCloseAddBook = () => {
    setAddModal(false)
  }

  const openToast = () => {
    setShowToast(true)

    setTimeout(() => {
      setShowToast(false)
    }, 2000)
  }

  const closeToast = () => {
    setShowToast(false)
    setToastMessage('')
  }

  const addBook = (newBook: IBook) => {
    const newBooks = [...books, newBook]
    setBooks(newBooks)
    openToast()
    const message = `Add <b>${newBook.name}</b> successful!`
    setToastMessage(message)

    localStorage.setItem('books', JSON.stringify(newBooks))
  }

  const deleteBook = (bookToDelete: IBook) => {
    const updatedBooks = books.filter((book) => book.id !== bookToDelete.id)
    setBooks(updatedBooks)
    openToast()
    const message = `Delete <b>${bookToDelete.name}</b> successful!`
    setToastMessage(message)

    localStorage.setItem('books', JSON.stringify(updatedBooks))
    if (displayedBooks.length === 1) {
      setCurrentPage(1)
    }
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    setCurrentPage(1)
  }

  useEffect(() => {
    const formattedQuery = searchQuery.trim().toLowerCase()
    const filtered = books.filter((book: IBook) =>
      book.name.toLowerCase().includes(formattedQuery),
    )
    setFilteredBooks(filtered)

    setFilteredTotalCount(filtered.length)
  }, [searchQuery, books])

  let displayedBooks: IBook[] = []

  if (searchQuery) {
    displayedBooks = filteredBooks
  } else {
    displayedBooks = books
  }

  return (
    <>
      <div className="search-add">
        <SearchBar onSearch={handleSearch} />
        <button type="submit" className="btnPrimary" onClick={handleAddBook}>
          Add Book
        </button>
      </div>
      {addModal && (
        <AddBook closeAddBook={handleCloseAddBook} addBook={addBook} />
      )}
      {showToast && <Toast message={toastMessage} closeToast={closeToast} />}
      <TableBook
        books={displayedBooks}
        setBooks={setBooks}
        deleteBook={deleteBook}
      />
      {displayedBooks.length >= 5 || currentPage > 1 ? (
        <Pagination
          totalCount={filteredTotalCount}
          currentPage={currentPage}
          pageSize={5}
          onChangePage={onChangePageNumber}
        />
      ) : null}
    </>
  )
}

export default MainBody
