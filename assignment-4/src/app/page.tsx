'use client'

import React from 'react'
import MainLayout from '../layouts/MainLayout'
import { ThemeProvider } from 'next-themes'

export default function Home() {
  return (
    <ThemeProvider attribute="class">
      <div className="flex flex-col justify-between px-20 pt-20 min-h-screen dark:bg-slate-800">
        <MainLayout />
      </div>
    </ThemeProvider>
  )
}
