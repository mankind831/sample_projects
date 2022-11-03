import { TextField, Typography, Button, Container} from '@mui/material'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Layout from '../../components/layout-employee'
import _ from 'lodash'
import { SaveAlt } from '@mui/icons-material'
import {updateEmployeeIndiInfo} from '../../store/reducers/employeeSlice'
import { fetchData, postData } from '../../util/dbFunctions'

const EmployeeUpdate = () => {
    const router = useRouter()
    const employeeID = typeof window !== "undefined" ? localStorage.getItem('employeeID'):null
    const dispatch = useDispatch()
    
    const [empValue, setEmpValue] = useState({fname:'',lname:'',jobtitle:'',hourlyRate: '',employmentType:'',accountID:'',companyID:''})

    useEffect(() => {
        const fetchingData = async() => {
            const fetchedEmployeeData = await fetchData('employer/employee',`empID=${employeeID}`)
            setEmpValue(fetchedEmployeeData[0])
        }
        fetchingData()
    },[employeeID])

    const handleInputForm = (event) => {
        const fieldName = event.target.getAttribute("name")
        const fieldValue = event.target.value
        const newFormData = {...empValue}
        newFormData[fieldName] = fieldValue
        setEmpValue(newFormData)
    }

    const handleSaveData = async () => {
        if(await postData('employer/employee',empValue,`empID=${employeeID}`) !== ''){
            router.push({
                pathname:'/dashboard',
                query: {role:'Employee'}
            })
        }
    }

    return (
        <Layout>
            <Container>
                <br />
                <Typography variant='h5'>Update Employee Information</Typography>
                <br />
                <div>
                    <TextField 
                        id="fname"
                        name='fname'
                        label="First Name"  
                        variant="outlined"
                        value={empValue.fname}
                        onChange={handleInputForm}
                        sx={{width:500}}/><br /><br />
                    <TextField 
                        id="lname" 
                        name='lname'
                        label="Last Name"  
                        variant="outlined"
                        value={empValue.lname}
                        onChange={handleInputForm}
                        sx={{width:500}}/><br /><br />
                    <TextField 
                        id="jobtitle" 
                        name='jobtitle'
                        label="Position"  
                        variant="outlined"
                        value={empValue.jobtitle}
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

export default EmployeeUpdate