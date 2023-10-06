'use client'

import React from 'react'
import MainLayout from '../layouts/MainLayout'
import { ThemeProvider } from 'next-themes'
import { BookProvider } from '../contexts/bookContext'

export default function Home() {
  return (
    <ThemeProvider attribute="class">
      <BookProvider>
        <div className="flex flex-col justify-between min-h-screen dark:bg-slate-800">
          <MainLayout />
        </div>
      </BookProvider>
    </ThemeProvider>
  )
}
