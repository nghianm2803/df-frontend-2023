"use client";

import React, { useState } from 'react'
import SearchBar from '../components/SearchBar'
import TableBook from '../components/TableBook'
import { BOOKS } from '../constant/book'
import { IBook } from '../lib/book'

function MainBody(): JSX.Element {
  const [books, setBooks] = useState<IBook[]>(BOOKS)

  return (
    <>
      <div className="flex justify-between m-8">
        <SearchBar />
        <button type="submit" className="btn-primary">
          Add Book
        </button>
      </div>
      <TableBook books={books} />
    </>
  )
}

export default MainBody
