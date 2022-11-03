import { useRouter } from 'next/router'
import React from 'react'
import AddType from './addtype'

const Index = () => {
    const router = useRouter().query.id
    const pageDisplay = <AddType />
  return (
    <div>
      {pageDisplay}
    </div>
  )
}

export default Index
