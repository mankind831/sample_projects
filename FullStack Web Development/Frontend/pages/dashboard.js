import { useRouter } from 'next/router'
import React from 'react'
import AdminPage from './administrator'
import CompanyPage from './company'
import EmployeePage from './employee'
import EmployerPage from './employer'

const Dashboard = () => {
    const router = useRouter().query.role
    const routerData = useRouter().query.type
    const pageDisplay = 
      router === 'Administrator' && routerData === 'admin'  ? <AdminPage/> : 
      (router === 'Administrator' && routerData === 'company' ? <CompanyPage /> :
      (router === 'Employee' ? <EmployeePage /> : <EmployerPage />))
  return (
    <div>
      {pageDisplay}
    </div>
  )
}

export default Dashboard
