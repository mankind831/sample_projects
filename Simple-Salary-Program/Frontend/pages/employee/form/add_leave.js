import { Container, TextField, Typography, Button } from '@mui/material'
import React, { useState } from 'react'
import Layout from '../../components/layout-employee'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { format } from 'date-fns'
import EventBusyIcon from '@mui/icons-material/EventBusy'
import { useDispatch } from 'react-redux'
import { addEmpLeave } from '../../store/reducers/empLeaveSlice'
import { useRouter } from 'next/router'

const AddLeave = () => {
    const employeeID = localStorage.getItem('employeeID')
    const router = useRouter()
    const dispatch = useDispatch()
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
            status: 'Pending'
        }

        if(await postData(`employer/${employeeID}/leave`,saveData) !== ''){
            router.push({
                pathname: '/dashboard',
                query: {'role': 'Employee'}
            })
        }
    }  

  return (
    <Layout>
        <Container>
            <br />
            <Typography variant='h5'>Add Employee Leave</Typography>
            <br />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker 
                    id='datefrom' 
                    name='datefrom' 
                    label='Date From' 
                    value={dfValue} 
                    inputFormat='MM/DD/YYYY' 
                    sx={{width:800}}
                    renderInput={(params) => <TextField {...params} sx={{width:500}}/>}
                    onChange={(newValue) => {setDFValue(format(new Date(newValue),"MM/dd/yyyy"))}}/> &nbsp; &nbsp;
                <br /><br />
                <DatePicker 
                    id='dateto' 
                    name='dateto' 
                    label='Date To' 
                    value={dtValue} 
                    sx={{width:800}}
                    inputFormat='MM/DD/YYYY'
                    renderInput={(params) => <TextField {...params} sx={{width:500}} />}
                    onChange={(newValue) => {setDTValue(format(new Date(newValue),"MM/dd/yyyy"))}}/><br /><br />
            </LocalizationProvider>
            <TextField id="reason" label="Reason" onChange={handleInputForm} value={reason} variant="outlined" sx={{width:500}}/><br/><br/>
            <Button variant="contained" onClick={handleSaveData} ><EventBusyIcon/>&nbsp;Request Leave</Button>       
        </Container>
    </Layout>
  )
}

export default AddLeave
