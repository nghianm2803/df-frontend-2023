import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { mutate } from 'swr'
import { bookSchema, BookSchemaType } from '../schemas/book'
import { useGetTopics } from '../generated/topic/topic'
import { createBook, getGetBooksKey } from '../generated/book/book'
import { Topic } from '../generated/model'

interface AddBookProps {
  closeAddBook: () => void
}

function AddBook({ closeAddBook }: AddBookProps): JSX.Element {
  const {
    formState: { errors },
    register,
    handleSubmit,
    reset,
  } = useForm<BookSchemaType>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      name: '',
      author: '',
      topic: '',
    },
  })
  const { data: topicData } = useGetTopics()

  const onSubmit: SubmitHandler<BookSchemaType> = (data) => {
    createBook({
      name: data.name,
      author: data.author,
      topicId: parseInt(data.topic, 10),
    }).then(() => {
      const key = getGetBooksKey()
      mutate(key)
      reset()
      closeAddBook()
    })
  }

  return (
    <div className="w-full h-full block fixed px-1 py-4 left-0 right-0 overflow-auto z-10 bg-transparent">
      <div className="m-auto bg-white dark:bg-slate-800 p-5 border rounded-md w-96 shadow-2xl popoutModal animation-popoutModal">
        <div className="flex flex-row justify-between">
          <h2 className="text-gray-800 dark:text-white font-bold text-2xl">
            Add book
          </h2>
          <button className="btn-close" onClick={closeAddBook}>
            &times;
          </button>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col align-middle justify-center m-3">
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
            <label
              htmlFor="topic"
              className="block mb-2 text-base font-bold text-gray-700 dark:text-white"
            >
              Topic
              <select
                {...register('topic')}
                className="outline-none box-border transition bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-gray-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                id="topic"
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
          <div className="text-right">
            <button type="submit" className="btn-primary">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddBook
