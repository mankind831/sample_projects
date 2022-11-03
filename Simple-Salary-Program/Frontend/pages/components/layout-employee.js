import React from 'react'
import MenuEmployee from '../navbars/sidebar-employee'

const LayoutEmployee = ({children}) => {
    return (
      <div className="flex flex-wrap overflow-hidden">
          <MenuEmployee />
          <div className="overflow-hidden">
              {children}
          </div>
      </div>
    )
  }
  
  export default LayoutEmployee
  