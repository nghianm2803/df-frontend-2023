'use client'

import Link from 'next/link'
import { AiOutlineLeft } from 'react-icons/ai'
import { useState } from 'react'
import { Book } from '../../../generated/model/book'
import MainHeader from '../../../layouts/MainHeader'
import DeleteBook from '../../../components/DeleteBook'
import EmptyData from '../../../components/EmptyData'
import AuthRequire from '../../AuthRequire'
import { useGetBook } from '../../../generated/book/book'
import LoadingSkeleton from '../../../components/LoadingSkeleton'

interface BookDetailProps {
  id: string
}

function Page({ params: { id } }: { params: BookDetailProps }) {
  const { data: detailBook, isLoading } = useGetBook(Number(id))
  const [deleteModal, setDeleteModal] = useState(false)
  const [bookToDelete, setBookToDelete] = useState<Book | null>(null)

  const handleDeleteBook = (book: Book) => {
    setBookToDelete(book)
    setDeleteModal(true)
  }

  return isLoading ? (
    <div className="h-[20vh]">
      <LoadingSkeleton />
    </div>
  ) : (
    <AuthRequire>
      <div className="min-h-screen px-p50 mt-m30 leading-[1.5] dark:bg-slate-800">
        <MainHeader />
        {detailBook && detailBook.data ? (
          <div className="px-5 pt-5 dark:bg-slate-800">
            <Link
              href="/"
              className="text-primary font-bold flex items-center mb-m30 text-red-500"
            >
              <AiOutlineLeft className="font-bold" />{' '}
              <span className="">Back</span>
            </Link>
            <div className="flex flex-col gap-2">
              <h2 className="text-gray-800 dark:text-white font-bold text-2xl py-5">
                {detailBook?.data.name}
              </h2>
              <p>
                <span className="text-gray-800 dark:text-white text-base font-semibold">
                  Author:&nbsp;
                </span>
                <span className="dark:text-white">
                  {detailBook?.data.author}
                </span>
              </p>
              <p>
                <span className="text-gray-800 dark:text-white text-base font-semibold">
                  Topic:&nbsp;
                </span>
                <span className="dark:text-white">
                  {detailBook?.data.topic?.name}
                </span>
              </p>
            </div>
            <button
              onClick={() =>
                detailBook.data && handleDeleteBook(detailBook.data)
              }
              className="text-left text-red-500 font-semibold underline cursor-pointer mt-5 mr-2"
            >
              Delete
            </button>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center dark:bg-slate-800">
            <EmptyData />
            <Link href="/">
              <button className="bg-green-300  text-center w-32 h-10 rounded mt-4 ">
                Go to Home
              </button>
            </Link>
          </div>
        )}
        {deleteModal && (
          <DeleteBook
            closeDeleteBook={() => setDeleteModal(false)}
            bookToDelete={bookToDelete}
          />
        )}
      </div>
    </AuthRequire>
  )
}

export default Page
