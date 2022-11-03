import { TextField, Typography, Button, Container} from '@mui/material'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout-employer'
import _ from 'lodash'
import { SaveAlt } from '@mui/icons-material'
import { fetchData, postData } from '../../util/dbFunctions'

const EmployerUpdate = () => {
    const router = useRouter()
    const companyID = useRouter().query.id
    
    const [empValue, setEmpValue] = useState({name:"",address:"",monthlyLeave:"",monthlyOvertime:""})

    useEffect(() => {
        const fetchingData = async () => {
            const fetchedCompanyData = await fetchData('company',`compID=${companyID}`)
            setEmpValue(fetchedCompanyData[0])
        }
        fetchingData()
    },[companyID])

    const handleInputForm = (event) => {
        const fieldName = event.target.getAttribute("name")
        const fieldValue = event.target.value
        const newFormData = {...empValue}
        newFormData[fieldName] = fieldValue
        setEmpValue(newFormData)
    }

    const handleSaveData = async () => {
        if(await postData('company',empValue,`compID=${companyID}`) !== ''){
            router.push({
                pathname:'/dashboard',
                query: {role:'Employer'}
            })
        }
    }

    return (
        <Layout>
            <Container>
                <br />
                <Typography variant='h5'>Update Company Information</Typography>
                <br />
                <div>
                    <TextField 
                        id="name"
                        name='name'
                        label="Company Name"  
                        variant="outlined"
                        value={empValue.name}
                        onChange={handleInputForm}
                        sx={{width:500}}/><br /><br />
                    <TextField 
                        id="address" 
                        name='address'
                        label="Address"  
                        variant="outlined"
                        value={empValue.address}
                        onChange={handleInputForm}
                        sx={{width:500}}/><br /><br />
                </div>
                <div>
                    <Button variant="contained" onClick={handleSaveData} color='success'><SaveAlt />&nbsp;Update Information</Button>
                </div>
            </Container>
        </Layout>
  )
}

export default EmployerUpdate