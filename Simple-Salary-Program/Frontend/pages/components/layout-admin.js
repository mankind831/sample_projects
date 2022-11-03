import React from 'react'
import MenuAdmin from '../navbars/sidebar-admin'

const LayoutAdmin = ({children}) => {
  return (
    <div className="flex flex-wrap overflow-hidden">
        <MenuAdmin />
        <div className="overflow-hidden">
            {children}
        </div>
    </div>
  )
}

export default LayoutAdmin
