import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { IBook } from '../interface/book.model'
import { useBookContext } from '../contexts/bookContext'

interface EditBookProps {
  closeEditBook: () => void
  bookToEdit: IBook | null
}

function EditBook({ closeEditBook, bookToEdit }: EditBookProps): JSX.Element {
  const { editBook } = useBookContext()
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

  useEffect(() => {
    if (bookToEdit) {
      setName(bookToEdit.name || '')
      setAuthor(bookToEdit.author || '')
      setTopic(bookToEdit.topic || '')
    }
  }, [bookToEdit])

  function validateInput() {
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
    validateInput()
    if (name.trim() === '' || author.trim() === '') {
      return
    }

    const editedBook: IBook = {
      id: bookToEdit!.id,
      name,
      author,
      topic,
    }

    editBook(editedBook)

    setName('')
    setAuthor('')
    setTopic('')
    closeEditBook()
  }

  return (
    <div className="fixed top-32 w-full h-full block px-1 py-4 left-0 right-0 overflow-auto z-10 bg-transparent">
      <div className="m-auto bg-white dark:bg-slate-800 p-5 border rounded-md w-96 shadow-2xl popoutModal animation-popoutModal">
        <div className="flex flex-row justify-between">
          <h2 className="text-gray-800 dark:text-white font-bold text-2xl">
            Edit book
          </h2>
          <button className="btn-close" onClick={closeEditBook}>
            &times;
          </button>
        </div>
        <form className="space-y-6" onSubmit={submit}>
          <div className="flex flex-col align-middle justify-center m-3">
            <div className="mb-4">
              <label
                htmlFor="fieldName"
                className="block mb-2 text-base font-bold text-gray-700 dark:text-white"
              >
                Name
                <input
                  className="outline-none box-border transition bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-gray-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
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
                <p className="text-base font-bold text-red-600">
                  Name field is required.
                </p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="fieldAuthor"
                className="block mb-2 text-base font-bold text-gray-700 dark:text-white"
              >
                Author
                <input
                  className="outline-none box-border transition bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-gray-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
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
                <p className="text-base font-bold text-red-600">
                  Author field is required.
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="fieldTopic"
                className="block mb-2 text-base font-bold text-gray-700 dark:text-white"
              >
                Topic
                <select
                  id="fieldTopic"
                  className="outline-none box-border transition bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-gray-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  onChange={handleChange}
                  value={topic}
                >
                  {topics.map((topic, index) => (
                    <option key={index} value={topic.value}>
                      {topic.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>
          <div className="text-right mt-5">
            <button type="submit" className="btn-primary">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditBook
