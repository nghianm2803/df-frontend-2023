import React from 'react'
import { IBook } from './BookModel'

interface DeleteBookProps {
  closeDeleteBook: () => void
  deleteBook: (book: IBook | null) => void
  bookToDelete: IBook | null
}

function DeleteBook({
  closeDeleteBook,
  deleteBook,
  bookToDelete,
}: DeleteBookProps): JSX.Element {
  const handleDelete = () => {
    if (bookToDelete) {
      deleteBook(bookToDelete)
    }
    closeDeleteBook()
  }

  return (
    <div id="deleteBookModal" className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Delete book</h2>
          <button className="close" onClick={closeDeleteBook}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          <p id="confirm-message">
            Do you want to delete <b>{`${bookToDelete?.name}`}</b> book?
          </p>
        </div>

        <div className="modal-footer">
          <button
            type="button"
            className="btnPrimary"
            id="deleteBtnConfirm"
            onClick={handleDelete}
          >
            Delete
          </button>
          <button
            type="button"
            className="btnSecondary"
            id="cancelBtn"
            onClick={closeDeleteBook}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteBook
