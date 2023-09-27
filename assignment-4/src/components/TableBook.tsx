import React from 'react'
import { IBook } from '../lib/book'
import EmptyData from '../components/EmptyData'

interface TableBookProps {
  books: IBook[]
}

function TableBook({ books }): JSX.Element {
  return (
    <div className="pt-8 m-4">
      <table className="border-collapse border border-slate-300 w-full text-lg">
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
                <div className="flex w-3">
                  <button
                    className="bg-white rounded-md p-2 mr-3 cursor-pointer border text-green-500 text-lg transition hover:border-green-500 hover:bg-gray-200"
                    // onClick={() => {
                    //   handleEditBook(book)
                    // }}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-white rounded-md p-2 mr-3 cursor-pointer border text-red-500 text-lg transition hover:border-red-500 hover:bg-gray-200"
                    // onClick={() => {
                    //   handleDeleteBook(book)
                    // }}
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
    </div>
  )
}

export default TableBook
