import { useRouter } from 'next/router'
import React from 'react'
import AddCompanyPage from './add-company'
import EditCompanyPage from './edit-company'

const Index = () => {
    const router = useRouter().query.id
    const pageDisplay = router === undefined ? <AddCompanyPage/> : <EditCompanyPage />
  return (
    <div>
      {pageDisplay}
    </div>
  )
}

export default Index