import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { mutate } from 'swr'
import { bookSchema, BookSchemaType } from '../schemas/book'
import { Book } from '../generated/model/book'
import { updateBook, getGetBooksKey } from '../generated/book/book'
import { Topic } from '../generated/model'
import { useGetTopics } from '../generated/topic/topic'

interface EditBookProps {
  closeEditBook: () => void
  bookToEdit: Book | null
}

function EditBook({ closeEditBook, bookToEdit }: EditBookProps): JSX.Element {
  const {
    formState: { errors },
    register,
    handleSubmit,
    reset,
  } = useForm<BookSchemaType>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      name: bookToEdit?.name || '',
      author: bookToEdit?.author || '',
      topic: bookToEdit?.topic?.id?.toString() || 'Programming',
    },
  })

  const { data: topicData } = useGetTopics()

  const onSubmit: SubmitHandler<BookSchemaType> = async (data) => {
    if (bookToEdit && typeof bookToEdit.id === 'number') {
      updateBook(bookToEdit.id, {
        name: data.name,
        author: data.author,
        topicId: parseInt(data.topic, 10),
      }).then(() => {
        const key = getGetBooksKey()
        mutate(key)
        reset()
        closeEditBook()
      })
    }
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
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col align-middle justify-center m-3">
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block mb-2 text-base font-bold text-gray-700 dark:text-white"
              >
                Name
                <input
                  {...register('name')}
                  className="outline-none box-border transition bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-gray-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  type="text"
                  placeholder="Book name"
                  id="name"
                  autoFocus
                />
              </label>
              {errors.name && (
                <p className="text-sm font-bold text-red-400">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="author"
                className="block mb-2 text-base font-bold text-gray-700 dark:text-white"
              >
                Author
                <input
                  {...register('author')}
                  className="outline-none box-border transition bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-gray-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  type="text"
                  placeholder="Author"
                  id="author"
                />
              </label>
              {errors.author && (
                <p className="text-sm font-bold text-red-400">
                  {errors.author.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="topic"
                className="block mb-2 text-base font-bold text-gray-700 dark:text-white"
              >
                Topic
                <select
                  {...register('topic')}
                  id="topic"
                  className="outline-none box-border transition bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-gray-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                >
                  <option value="">Select a topic</option>
                  {topicData?.data?.map((topic: Topic) => (
                    <option key={topic.id} value={topic.id}>
                      {topic.name}
                    </option>
                  ))}
                </select>
              </label>
              {errors.topic && (
                <p className="text-sm font-bold text-red-400">
                  {errors.topic.message}
                </p>
              )}
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
