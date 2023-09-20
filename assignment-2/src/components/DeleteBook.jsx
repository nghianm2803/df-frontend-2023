import React, { useState } from "react";

function DeleteBook({ open, closeDeleteBook, deleteBook, bookToDelete }) {
  const [confirmationMessage, setConfirmationMessage] = useState("");

  // Function to handle book deletion
  const handleDelete = () => {
    if (bookToDelete) {
      deleteBook(bookToDelete);
      setConfirmationMessage(`Book "${bookToDelete.name}" has been deleted.`);
    }
  };

  return (
    <div
      id="deleteBookModal"
      className="modal"
      open={open}
      onClose={closeDeleteBook}
    >
      <div className="modal-content">
        <div className="modal-header">
          <h2>Delete book</h2>
          <span className="close" onClick={closeDeleteBook}>
            &times;
          </span>
        </div>
        <div className="modal-body">
          <p id="confirm-message">
            {confirmationMessage || "Do you want to delete this book?"}
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
  );
}

export default DeleteBook;
