import { useRouter } from 'next/router'
import React from 'react'
import AddSlot from './addslot'

const Index = () => {
    const router = useRouter().query.id
    const pageDisplay = <AddSlot />
  return (
    <div>
      {pageDisplay}
    </div>
  )
}

export default Index
