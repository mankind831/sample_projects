import { Container, TextField, Typography, Button } from '@mui/material'
import React, { useState } from 'react'
import Layout from '../../components/layout-employer'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { format } from 'date-fns'
import EventBusyIcon from '@mui/icons-material/EventBusy'
import { useRouter } from 'next/router'
import { postData } from '../../util/dbFunctions'

const AddAbsent = () => {
    const employeeID = localStorage.getItem('empID')
    const router = useRouter()
    const [dfValue, setDFValue] = useState(format(new Date(),'MM/dd/yyyy'))
    const [dtValue, setDTValue] = useState(format(new Date(),'MM/dd/yyyy'))

    const [reason, setReason] = useState('')

    const handleInputForm = (event) => {
        const fieldValue = event.target.value
        setReason(fieldValue)
    }

    const handleSaveData = async () => {
        const saveData = {
            reason: reason,
            dateStarted: dfValue,
            dateEnded: dtValue,
            status: 'Approved'
        }

        if(await postData(`employer/${employeeID}/absent`,saveData) !== ''){
            router.push({
                pathname: '/employer/[employee_info]',
                query: {employee_info: employeeID}
            })
        }
    }   

  return (
    <Layout>
        <Container>
            <br />
            <Typography variant='h5'>Add Employee Absent</Typography>
            <br />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker 
                    id='datefrom' 
                    name='datefrom' 
                    label='Date From' 
                    value={dfValue} 
                    inputFormat='MM/DD/YYYY' 
                    sx={{width:800}}
                    renderInput={(params) => <TextField {...params} />}
                    onChange={(newValue) => {setDFValue(format(new Date(newValue),"MM/dd/yyyy"))}}/> &nbsp; &nbsp;
                <DatePicker 
                    id='dateto' 
                    name='dateto' 
                    label='Date To' 
                    value={dtValue} 
                    sx={{width:800}}
                    inputFormat='MM/DD/YYYY'
                    renderInput={(params) => <TextField {...params} />}
                    onChange={(newValue) => {setDTValue(format(new Date(newValue),"MM/dd/yyyy"))}}/><br /><br />
            </LocalizationProvider>
            <TextField id="reason" label="Reason" onChange={handleInputForm} value={reason} variant="outlined" sx={{width:535}}/><br/><br/>
            <Button variant="contained" onClick={handleSaveData} ><EventBusyIcon/>&nbsp;Add Absent</Button>       
        </Container>
    </Layout>
  )
}

export default AddAbsent
