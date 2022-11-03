import React from 'react'
import MenuEmployer from '../navbars/sidebar-employer'

const LayoutEmployer = ({children}) => {
    return (
      <div className="flex flex-wrap overflow-hidden">
          <MenuEmployer />
          <div className="overflow-hidden">
              {children}
          </div>
      </div>
    )
  }
  
  export default LayoutEmployer