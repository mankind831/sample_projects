import { Container, TextField, Typography, Button } from '@mui/material'
import React, { useState } from 'react'
import Layout from '../../components/layout-employer'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { format } from 'date-fns'
import EventBusyIcon from '@mui/icons-material/EventBusy'
import { useRouter } from 'next/router'
import { postData } from '../../util/dbFunctions'

const AddOvertime = () => {
    const employeeID = localStorage.getItem('empID')
    const router = useRouter()
    const [dateValue, setDateValue] = useState(format(new Date,'MM/dd/yyyy'))
    const [dfValue, setDFValue] = useState(new Date())
    const [dtValue, setDTValue] = useState(new Date())

    const handleSaveData = async () => {
        const saveData = {
            dateAvailed: dateValue,
            timeStarted: format(new Date(dfValue),"hh:mm:ss a"),
            timeEnded: format(new Date(dtValue),"hh:mm:ss a"),
            status: 'Approved'
        }

        if(await postData(`employer/${employeeID}/overtime`,saveData) !== ''){
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
            <Typography variant='h5'>Add Employee Overtime</Typography>
            <br />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker 
                    id='timefrom' 
                    name='timefrom' 
                    label='Date' 
                    value={dateValue} 
                    inputFormat='MM/DD/YYYY' 
                    renderInput={(params) => <TextField {...params} sx={{width:500}} />}
                    onChange={(newValue) => {setDateValue(format(new Date(newValue),"MM/dd/yyyy"))}}/> &nbsp; &nbsp;
                <br /><br />
                <TimePicker 
                    id='timefrom' 
                    name='timefrom' 
                    label='Time Started' 
                    value={dfValue}
                    views={['hours', 'minutes', 'seconds']}
                    inputFormat={"hh:mm:ss a"} 
                    renderInput={(params) => <TextField {...params} sx={{width:500}} />}
                    onChange={(newValue) => {setDFValue(new Date(newValue))}}/> &nbsp; &nbsp;
                <br /><br />
                <TimePicker 
                    id='timeto' 
                    name='timeto' 
                    label='Time Ended' 
                    value={dtValue} 
                    views={['hours', 'minutes', 'seconds']}
                    inputFormat={"hh:mm:ss a"}  
                    renderInput={(params) => <TextField {...params} sx={{width:500}} />}
                    onChange={(newValue) => {setDTValue(new Date(newValue),"hh:mm:ss a")}}/><br /><br />
            </LocalizationProvider>
            <Button variant="contained" onClick={handleSaveData} ><EventBusyIcon/>&nbsp;Add Overtime</Button>       
        </Container>
    </Layout>
  )
}

export default AddOvertime
