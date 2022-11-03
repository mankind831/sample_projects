import { useRouter } from 'next/router'
import React from 'react'
import AddUserPage from './add-administrator'
import EditUserPage from './edit-administrator'

const Index = () => {
    const router = useRouter().query.id
    const pageDisplay = router === undefined ? <AddUserPage/> : <EditUserPage/>
  return (
    <div>
      {pageDisplay}
    </div>
  )
}

export default Index
