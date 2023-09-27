import React from 'react'
import MainHeader from '../layouts/MainHeader'
import MainBody from '../layouts/MainBody'

export default function Home() {
  return (
    <main className="flex flex-col justify-between p-20">
      <MainHeader />
      <MainBody />
    </main>
  )
}
