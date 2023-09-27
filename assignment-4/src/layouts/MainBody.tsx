'use client'

import React, { useState } from 'react'
import SearchBar from '../components/SearchBar'
import TableBook from '../components/TableBook'
import { BOOKS } from '../constant/book'
import { IBook } from '../lib/book'
import AddBook from '../components/AddBook'

function MainBody(): JSX.Element {
  const [addModal, setAddModal] = useState<boolean>(false)

  const [books, setBooks] = useState<IBook[]>(BOOKS)

  const handleAddBook = () => {
    setAddModal(true)
  }

  const handleCloseAddBook = () => {
    setAddModal(false)
  }

  const addBook = (newBook: IBook) => {
    const newBooks = [...books, newBook]
    setBooks(newBooks)
    // openToast()
    // const message = `Add <b>${newBook.name}</b> successful!`
    // setToastMessage(message)

    localStorage.setItem('books', JSON.stringify(newBooks))
  }

  const deleteBook = (bookToDelete: IBook) => {
    const updatedBooks = books.filter((book) => book.id !== bookToDelete.id)
    setBooks(updatedBooks)
    // openToast()
    // const message = `Delete <b>${bookToDelete.name}</b> successful!`
    // setToastMessage(message)

    localStorage.setItem('books', JSON.stringify(updatedBooks))
    // if (displayedBooks.length === 1) {
    //   setCurrentPage(1)
    // }
  }

  return (
    <>
      <div className="flex justify-between m-8">
        <SearchBar />
        <button type="submit" className="btn-primary" onClick={handleAddBook}>
          Add Book
        </button>
      </div>
      {addModal && (
        <AddBook closeAddBook={handleCloseAddBook} addBook={addBook} />
      )}
      <TableBook books={books} setBooks={setBooks} deleteBook={deleteBook} />
    </>
  )
}

export default MainBody
