import React from 'react'
import MainBody from './MainBody'
import MainFooter from './MainFooter'
import MainHeader from './MainHeader'

function MainLayout() {
  return (
    <div className=''>
      <MainHeader />
      <MainBody />
      <MainFooter />
    </div>
  )
}

export default MainLayout
