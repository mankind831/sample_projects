import React from 'react'
import NavBar from '../navbar/navbar'

const Layout = ({children}) => {
  return (
    <div className="flex flex-wrap overflow-hidden">
        <NavBar />
        <div>
            {children}
        </div>
    </div>
  )
}

export default Layout
