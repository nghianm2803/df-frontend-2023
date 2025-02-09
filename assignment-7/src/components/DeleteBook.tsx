import React from 'react'
import { mutate } from 'swr'
import { Book } from '../generated/model/book'
import {
  deleteBook,
  getGetBookKey,
  getGetBooksKey,
} from '../generated/book/book'

interface DeleteBookProps {
  closeDeleteBook: () => void
  bookToDelete: Book | null
}

function DeleteBook({
  closeDeleteBook,
  bookToDelete,
}: DeleteBookProps): JSX.Element {
  const confirmDelete = () => {
    if (bookToDelete) {
      const id = Number(bookToDelete.id)
      deleteBook(Number(id)).then(() => {
        mutate(getGetBookKey(id), undefined, true)
        mutate(getGetBooksKey(), undefined, true)
        closeDeleteBook()
      })
    }
  }

  return (
    <div className="fixed top-32 w-full h-full block px-1 py-4 left-0 right-0 overflow-auto z-10 bg-transparent">
      <div className="m-auto bg-white dark:bg-slate-800 p-5 border rounded-md w-96 shadow-2xl popoutModal animation-popoutModal">
        <div className="flex flex-row justify-between">
          <h2 className="text-gray-800 dark:text-white font-bold text-2xl">
            Delete book
          </h2>
          <button className="btn-close" onClick={closeDeleteBook}>
            &times;
          </button>
        </div>
        <div className="flex flex-col align-middle justify-center text-center m-3">
          <p className="text-center dark:text-slate-200">
            Do you want to delete <b>{`${bookToDelete?.name}`}</b> book?
          </p>
        </div>

        <div className="text-right mt-5">
          <div className="flex justify-center">
            <button
              type="button"
              className="btn-primary"
              onClick={confirmDelete}
            >
              Delete
            </button>
            <button
              type="button"
              className="btn-secondary"
              onClick={closeDeleteBook}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeleteBook
