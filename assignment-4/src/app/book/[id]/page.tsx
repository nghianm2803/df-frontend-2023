'use client'

import Link from 'next/link'
import { AiOutlineLeft } from 'react-icons/ai'
import { IBook } from '../../../interface/book.model'
import { useEffect, useState } from 'react'
import MainHeader from '../../../layouts/MainHeader'
import DeleteBook from '../../../components/DeleteBook'
import { ThemeProvider } from 'next-themes'
import { BOOKS } from '../../../constant/book'
import Toast from '../../../components/Toast'
import EmptyData from '../../../components/EmptyData'

interface BookDetailProps {
  id: string
}

function Page({ params: { id } }: { params: BookDetailProps }) {
  const [bookDetail, setBookDetail] = useState<IBook | null>(null)
  const [deleteModal, setDeleteModal] = useState<boolean>(false)
  const [bookToDelete, setBookToDelete] = useState<any>(null)
  const [showToast, setShowToast] = useState<boolean>(false)
  const [toastMessage, setToastMessage] = useState<string>('')
  const [books, setBooks] = useState<IBook[]>(BOOKS)
  const [notFound, setNotFound] = useState<boolean>(false)
  console.log('Books id:', id)

  const fetchBookDetail = (id: string) => {
    try {
      const books = JSON.parse(localStorage.getItem('books') || '[]') as IBook[]
      const book = books.filter((book: IBook) => book.id === parseInt(id))[0]

      if (book) {
        setBookDetail(book)
      } else {
        setNotFound(true)
      }
    } catch (error) {
      console.error('Error getting book from local storage:', error)
    }
  }

  useEffect(() => {
    fetchBookDetail(id)
  }, [id])
  console.log('Book detail:', bookDetail)

  const openToast = () => {
    setShowToast(true)

    setTimeout(() => {
      setShowToast(false)
    }, 1500)
  }

  const closeToast = () => {
    setShowToast(false)
    setToastMessage('')
  }

  const deleteBook = (bookToDelete: IBook) => {
    const updatedBooks = books.filter((book) => book.id !== bookToDelete.id)
    setBooks(updatedBooks)
    openToast()
    const message = `Delete <b>${bookToDelete.name}</b> successful!`
    setToastMessage(message)

    localStorage.setItem('books', JSON.stringify(updatedBooks))
    if (bookToDelete.id === parseInt(id)) {
      setNotFound(true)
    }
  }

  const handleDeleteBook = (book: IBook) => {
    setBookToDelete(book)
    setDeleteModal(true)
  }

  const confirmDelete = () => {
    console.log('Confirm delete')
    console.log('Book to delete:', bookToDelete)
    deleteBook(bookToDelete)

    setDeleteModal(false)
    console.log('Close confirm delete')
  }

  if (notFound) {
    return (
      <div className="flex flex-col justify-center items-center">
        <EmptyData />
        <Link href="/">
          <button className="bg-green-300  text-center w-32 h-10 rounded mt-4">
            Go to Home
          </button>
        </Link>
      </div>
    )
  }

  return (
    <ThemeProvider attribute="class">
      <div className="min-h-screen px-p50 mt-m30 leading-[1.5] dark:bg-slate-800">
        <MainHeader />
        {bookDetail ? (
          <div className="px-5 pt-5">
            <Link
              href="/"
              className="text-primary font-bold flex items-center mb-m30 text-red-500"
            >
              <AiOutlineLeft className="font-bold" />{' '}
              <span className="">Back</span>
            </Link>
            <div className="flex flex-col gap-2">
              <h2 className="text-gray-800 dark:text-white font-bold text-2xl py-5">
                {bookDetail?.name}
              </h2>
              <p>
                <span className="text-gray-800 dark:text-white text-base font-semibold">
                  Author:&nbsp;
                </span>
                <span className="dark:text-white">{bookDetail?.author}</span>
              </p>
              <p>
                <span className="text-gray-800 dark:text-white text-base font-semibold">
                  Topic:&nbsp;
                </span>
                <span className="dark:text-white">{bookDetail?.topic}</span>
              </p>
              <p
                onClick={() => {
                  handleDeleteBook(bookDetail)
                }}
                className="text-red-500 font-semibold underline cursor-pointer mt-5"
              >
                Delete
              </p>
            </div>
          </div>
        ) : (
          <div role="status" className="max-w-sm animate-pulse pt-10">
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
            <span className="sr-only">Loading...</span>
          </div>
        )}
        {showToast && <Toast />}
        {deleteModal && (
          <DeleteBook
            closeDeleteBook={() => setDeleteModal(false)}
            bookToDelete={bookToDelete}
          />
        )}
      </div>
    </ThemeProvider>
  )
}

export default Page
