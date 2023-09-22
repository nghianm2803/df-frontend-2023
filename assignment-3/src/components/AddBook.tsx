import React, { useState, ChangeEvent, FormEvent } from 'react'
import { IBook } from './BookModel'

interface AddBookProps {
  closeAddBook: () => void
  addBook: (book: IBook) => void
}

function AddBook({ closeAddBook, addBook }: AddBookProps): JSX.Element {
  const [name, setName] = useState<string>('')
  const [author, setAuthor] = useState<string>('')
  const [topic, setTopic] = useState<string>('Programming')
  const [nameError, setNameError] = useState<boolean>(false)
  const [authorError, setAuthorError] = useState<boolean>(false)

  const topics = [
    { label: 'Programming', value: 'Programming' },
    { label: 'Database', value: 'Database' },
    { label: 'DevOps', value: 'DevOps' },
  ]

  function ValidateInput() {
    if (name.trim() === '') {
      setNameError(true)
    }
    if (author.trim() === '') {
      setAuthorError(true)
    }
  }

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setTopic(e.target.value)
  }

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    ValidateInput()
    if (name.trim() === '' || author.trim() === '') {
      return
    }

    const bookId = Math.floor(Math.random() * 1000)
    const newBook: IBook = {
      id: bookId,
      name,
      author,
      topic,
    }

    addBook(newBook)
    // console.log('New Book:', newBook);

    setName('')
    setAuthor('')
    setTopic('')

    closeAddBook()
  }

  return (
    <div id="addBookModal" className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Add book</h2>
          <button className="close" onClick={closeAddBook}>
            &times;
          </button>
        </div>
        <form onSubmit={submit}>
          <div className="modal-body">
            <div className="finput">
              <label htmlFor="fname">
                {' '}
                <input
                  type="text"
                  placeholder="Book name"
                  id="fname"
                  name="fname"
                  autoFocus
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value)
                    setNameError(false)
                  }}
                />
              </label>

              {nameError && (
                <p className="error-message">Name field is required.</p>
              )}
            </div>
            <div className="finput">
              <label htmlFor="fauthor">
                <input
                  type="text"
                  placeholder="Author"
                  id="fauthor"
                  name="fauthor"
                  value={author}
                  onChange={(e) => {
                    setAuthor(e.target.value)
                    setAuthorError(false)
                  }}
                />
              </label>

              {authorError && (
                <p className="error-message">Author field is required.</p>
              )}
            </div>
            <div className="finput">
              <label htmlFor="ftopic">
                {' '}
                <select onChange={handleChange} value={topic}>
                  {topics.map((topic, index) => (
                    <option key={index} value={topic.value}>
                      {topic.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>
          <div className="modal-footer">
            <button type="submit" className="btnPrimary" id="createBtn">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddBook
