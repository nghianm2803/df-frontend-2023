import React, { useState, ChangeEvent, FormEvent } from 'react'
import { IBook } from '../lib/book'

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
    <div className="block fixed px-1 py-4 pt-40 left-0 right-0 overflow-auto z-10 bg-black">
      <div className="m-auto bg-white p-5 border rounded-md ">
        <div className="flex flex-row justify-between">
          <h2>Add book</h2>
          <button className="btn-close" onClick={closeAddBook}>
            &times;
          </button>
        </div>
        <form onSubmit={submit}>
          <div className="flex flex-col align-middle justify-center text-center m-3">
            <div className="fieldInput">
              <label htmlFor="fieldName">
                Name
                <input
                  type="text"
                  placeholder="Book name"
                  id="fieldName"
                  name="fieldName"
                  autoFocus
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value)
                    setNameError(false)
                  }}
                />
              </label>

              {nameError && (
                <p className="errorMessage">Name field is required.</p>
              )}
            </div>
            <div className="fieldInput">
              <label htmlFor="fieldAuthor">
                Author
                <input
                  type="text"
                  placeholder="Author"
                  id="fieldAuthor"
                  name="fieldAuthor"
                  value={author}
                  onChange={(e) => {
                    setAuthor(e.target.value)
                    setAuthorError(false)
                  }}
                />
              </label>

              {authorError && (
                <p className="errorMessage">Author field is required.</p>
              )}
            </div>
            <div className="fieldInput">
              <label htmlFor="fieldTopic">
                Topic
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
          <div className="modalFooter">
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
