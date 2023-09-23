import React from 'react'
import Logo from '../assets/logo.png'
import Avatar from '../assets/avatar.png'

function MainHeader() {
  return (
    <div className="header">
      <div className="headerLeft">
        <a href="/" className="logo">
          <img src={Logo} alt="logo" className="logo" />
          Bookstore
        </a>
      </div>
      <div className="headerRight">
        <a
          href="https://github.com/nghianm2803"
          target="_blank"
          rel="noreferrer"
        >
          <img src={Avatar} alt="avatar" className="avatar" />
          Du Xa Xiu
        </a>
      </div>
    </div>
  )
}

export default MainHeader
