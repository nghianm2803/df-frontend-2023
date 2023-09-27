import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Avatar from '../assets/avatar.png'

const MainHeader = () => {
  return (
    <div className="fixed inset-x-0 top-0 bg-white dark:bg-gray-950 z-[10] shadow-lg h-fit border-b border-zinc-300 py-2">
      <div className="flex items-center justify-between h-full gap-2 mx-auto max-w-7xl">
        <Link href="/" className="flex items-center gap-2">
          <p className="rounded-lg border-2 border-b-4 border-r-4 border-black px-2 py-1 text-xl font-bold transition-all hover:-translate-y-[2px] md:block dark:border-white">
            Bookstore
          </p>
        </Link>
        <Link
          href="https://github.com/nghianm2803"
          className="flex items-center float-right"
          target="_blank"
        >
          <Image
            src={Avatar}
            alt="Avatar"
            className="inline-block h-10 w-10 rounded-full ring-2 ring-white mr-2"
            priority
          />
          <div className="flex items-center"> Du Xa Xiu</div>
        </Link>
      </div>
    </div>
  )
}

export default MainHeader
