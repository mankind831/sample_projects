import React from 'react'
import { useRouter } from 'next/router'
import AddEmployee from './add-employee'
import EditEmployee from './edit-employee'
import Layout from '../../components/layout-employer'

const Index = () => {
  const router = useRouter().query.id
  const pageDisplay = router === undefined ? <AddEmployee/> : <EditEmployee />
  return (
    <Layout>
      {pageDisplay}
    </Layout>
  )
}

export default Index