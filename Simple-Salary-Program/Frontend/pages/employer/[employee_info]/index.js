import React, { useState, useEffect } from 'react'
import Layout from '../../components/layout-employer'
import { Table, TableBody, TableCell, TableHead, TableRow, TextField, Button, Container, Typography, FormControl, InputLabel, OutlinedInput, InputAdornment, Box, Tab } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import _ from 'lodash'
import { useRouter } from 'next/router'
import EventBusyIcon from '@mui/icons-material/EventBusy';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import PaidIcon from '@mui/icons-material/Paid';
import format from 'date-fns/format'
import { deleteData, fetchData, postData } from '../../util/dbFunctions'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import EventNoteIcon from '@mui/icons-material/EventNote';
import dayjs from 'dayjs'
import Image from 'next/image'


const EmployeeInfo = () => {
  const router = useRouter()
  const companyID = localStorage.getItem("compID")
  const employeeID = router.query.employee_info === undefined ? localStorage.getItem("employee_info") : router.query.employee_info

  const [empValue, setEmpValue] = useState({fname:'',lname:'',jobtitle:'',hourlyRate: '',employmentType:'',})
  const [leaveData, setLeaveData] = useState([])
  const [absentData, setAbsentData] = useState([])
  const [overtimeData, setOvertimeData] = useState([])
  const [dailyWage, setDailyWage] = useState('0')
  const [leaveFilter, setLeaveFilter] = useState({from:dayjs(new Date()),to:dayjs(new Date())})
  const [absentFilter, setAbsentFilter] = useState({from:dayjs(new Date()),to:dayjs(new Date())})
  const [overtimeFilter, setOvertimeFilter] = useState({from:dayjs(new Date()),to:dayjs(new Date())})
  const [payrollFilter, setPayrollFilter] = useState(dayjs(new Date()))
  const [payrollValue, setPayrollValue] = useState({payableleave:'0',leave:'0',absent:'0',overtime:'0',monthlySalary:'0'})
  const [leaveConditionFilter, setLeaveConditionFilter] = useState('')
  const [overtimeConditionFilter, setOvertimeConditionFilter] = useState('')
  const [absentConditionFilter, setAbsentConditionFilter] = useState('')
  const [picValue, setPicValue] = useState("")
  const [tabValue, setTabValue] = useState('1')

  useEffect(() => {
    const fetchingData = async () => {
      const fetchedEmployeeData = await fetchData('employer/employee',`empID=${employeeID}`)
      const fetchedDailyWage = await fetchData('employer/employee',`empID=${employeeID}&column=dailyWage`)
      const fetchedLeaveData = await fetchData(`employer/${employeeID}/leave`,leaveConditionFilter)
      const fetchedAbsentData = await fetchData(`employer/${employeeID}/absent`,absentConditionFilter)
      const fetchedOvertimeData = await fetchData(`employer/${employeeID}/overtime`,overtimeConditionFilter)
      const fetchedImageData = await fetchData('upload_employee',`empID=${employeeID}`)
      setEmpValue(fetchedEmployeeData[0])
      setDailyWage(fetchedDailyWage)
      setLeaveData(_.sortBy(fetchedLeaveData,data => data.dateStarted))
      setAbsentData(_.sortBy(fetchedAbsentData,data => data.dateStarted))
      setOvertimeData(_.sortBy(fetchedOvertimeData,(data) => data.dateAvailed))
      setPicValue(fetchedImageData.length > 0 ? fetchedImageData[0].urlImage : "https://i.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U")
    }
    fetchingData()
  },[employeeID,leaveConditionFilter,absentConditionFilter,overtimeConditionFilter])

  const handleTabChange = (event, newValue) =>{
    setTabValue(newValue)
  }

  const handleDeleteAbsent = async (transNo) => {
    if(await deleteData(`employer/${employeeID}/absent`,`transNo=${transNo}`) !== ''){
      setAbsentConditionFilter(' ')
    }
  }

  const handleDeleteLeave = async (transNo) => {
    if(await deleteData(`employer/${employeeID}/leave`,`transNo=${transNo}`) !== ''){
      setLeaveConditionFilter(' ')
    }
  }

  const handleLeaveStatusApproved = async (record) => {
    if(await postData(`employer/${employeeID}/leave`,
      {dateStarted:record.dateStarted,dateEnded:record.dateEnded,reason:record.reason,status:'Approved'},
      `transNo=${record.transNo}`) !== ''){
      setLeaveConditionFilter(' ')
    }
  }

  const handleOTStatusApproved = async (record) => {
    if(await postData(`employer/${employeeID}/overtime`,
      {dateAvailed:record.dateAvailed,timeStarted:record.timeStarted,timeEnded:record.timeEnded,status:'Approved'},
      `transNo=${record.transNo}`) !== ''){
        setOvertimeConditionFilter(' ')
      }
  }

  const handleDeleteOvertime = async (transNo) => {
    if(await deleteData(`employer/${employeeID}/overtime`,`transNo=${transNo}`) !== ''){
      setOvertimeConditionFilter(' ')
    }
  }

  const handleComputeSalary = async () => {
    setPayrollValue({
      payableleave:await fetchData('employer/employee',
        `empID=${employeeID}&month=${dayjs(payrollFilter).format('MM')}&year=${dayjs(payrollFilter).format('YYYY')}&column=payableLeave`),
      leave:await fetchData('employer/employee',
        `empID=${employeeID}&month=${dayjs(payrollFilter).format('MM')}&year=${dayjs(payrollFilter).format('YYYY')}&column=totalLeave`),
      absent:await fetchData('employer/employee',
        `empID=${employeeID}&month=${dayjs(payrollFilter).format('MM')}&year=${dayjs(payrollFilter).format('YYYY')}&column=totalAbsent`),
      overtime:await fetchData('employer/employee',
        `empID=${employeeID}&month=${dayjs(payrollFilter).format('MM')}&year=${dayjs(payrollFilter).format('YYYY')}&column=totalOvertime`),
      monthlySalary:await fetchData('employer/employee',
        `empID=${employeeID}&month=${dayjs(payrollFilter).format('MM')}&year=${dayjs(payrollFilter).format('YYYY')}&column=monthlySalary`),
    })
  }

  const handleFilterCondition = (type) =>{
    switch(type){
      case 'leave':
        setLeaveConditionFilter(`from=${leaveFilter.from}&to=${leaveFilter.to}`)
        break;
      case 'overtime':
        setOvertimeConditionFilter(`from=${overtimeFilter.from}&to=${overtimeFilter.to}`)
        break;
      case 'absent':
        setAbsentConditionFilter(`from=${absentFilter.from}&to=${absentFilter.to}`)
        break;
      default:
        break;
    }
  }

  const handleCancelFilterCondition = (type) => {
    switch(type){
      case 'leave':
          setLeaveConditionFilter('')
          break;
      case 'overtime':
          setOvertimeConditionFilter('')
          break;
      case 'absent':
          setAbsentConditionFilter('')
          break;
      default:
        break;
    }
  }

  const DisplayOT = () => {
    const rows = _.map(overtimeData,(item,index) => {
      return(
        <TableRow key={index}>
          <TableCell><EventNoteIcon/></TableCell>
          <TableCell>{item.dateAvailed}</TableCell>
          <TableCell>{item.timeStarted}</TableCell>
          <TableCell>{item.timeEnded}</TableCell>
          <TableCell>{item.status}</TableCell>
          <TableCell>
            <Button variant='contained' onClick={() => handleOTStatusApproved(item)} disabled={item.status === 'Approved' ? true : false} color='info'><LibraryAddCheckIcon />&nbsp;Approve Request</Button>
            &nbsp;&nbsp;
            <Button variant='contained' onClick={async () => await handleDeleteOvertime(item.transNo)}  color='error'><HighlightOffIcon />&nbsp;Delete Overtime</Button>
          </TableCell>
        </TableRow>
      )
    })

    return <TableBody>{rows}</TableBody>
  }

  const DisplayLeave = () => {
    const rows = _.map(leaveData,(item,index) => {
      return(
        <TableRow key={index}>
          <TableCell><EventNoteIcon/></TableCell>
          <TableCell>{item.dateStarted}</TableCell>
          <TableCell>{item.dateEnded}</TableCell>
          <TableCell>{item.reason}</TableCell>
          <TableCell>{item.status}</TableCell>
          <TableCell>
            <Button variant='contained' onClick={() => handleLeaveStatusApproved(item)} disabled={item.status === 'Approved' ? true : false} color='info'><LibraryAddCheckIcon />&nbsp;Approve Request</Button>
            &nbsp;&nbsp;
            <Button variant='contained' onClick={async () => await handleDeleteLeave(item.transNo)}  color='error'><HighlightOffIcon />&nbsp;Delete Absent</Button>
          </TableCell>
        </TableRow>
      )
    })
    return <TableBody>{rows}</TableBody>
  }

  const DisplayAbsent = () => {
    const rows = _.map(absentData,(item,index) => {
      return(
        <TableRow key={index}>
          <TableCell><EventNoteIcon/></TableCell>
          <TableCell>{item.dateStarted}</TableCell>
          <TableCell>{item.dateEnded}</TableCell>
          <TableCell>{item.reason}</TableCell>
          <TableCell>
            <Button variant='contained' onClick={async () => await handleDeleteAbsent(item.transNo)}  color='error'><HighlightOffIcon />&nbsp;Delete Absent</Button>
          </TableCell>
        </TableRow>
      )
    })
    return <TableBody>{rows}</TableBody>
  }

  const handleAbsentRedirect = () =>{
    localStorage.setItem('empID',employeeID)
    router.push({
      pathname: '/employer/[employee_info]/add_absent',
      query: {employee_info:employeeID}
    })
  }

  const handleLeaveRedirect = () =>{
    localStorage.setItem('empID',employeeID)
    router.push({
      pathname: '/employer/[employee_info]/add_leave',
      query: {employee_info:employeeID}
    })
  }

  const handleOvertimeRedirect = () =>{
    localStorage.setItem('empID',employeeID)
    router.push({
      pathname: '/employer/[employee_info]/add_overtime',
      query: {employee_info:employeeID}
    })
  }

  return (
    <Layout>
        <Container>
        <br />
        <div className='flex justify-between'>
        <Typography variant='h5'>Employee Information</Typography>
        <Typography variant='h6'>{format(new Date(), "MMMM yyyy")}</Typography>
        </div>
        <br />
        <div className='flex justify-between'>
          <div>
            {picValue && (<Image className='rounded' src={picValue} alt='' width={320} height={350} />)}
          </div>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <div>
            <TextField 
              id="fname"
              name='fname'
              label="First Name"  
              variant="outlined"
              value={empValue.fname}
              sx={{width:395}}/> &nbsp;
            <TextField 
              id="lname" 
              name='lname'
              label="Last Name"  
              variant="outlined"
              value={empValue.lname}
              sx={{width:395}}/> &nbsp;&nbsp;  <br/><br/>
            <TextField 
              id="jobtitle" 
              name='jobtitle'
              label="Position"  
              variant="outlined"
              value={empValue.jobtitle}
              sx={{width:590}}/>&nbsp;&nbsp;
            <FormControl>
                <InputLabel htmlFor='hourlyRate'>Salary per Hour</InputLabel>
                <OutlinedInput 
                  id='hourlyRate'
                  name='hourlyRate'
                  sx={{width:200}}
                  value={empValue.hourlyRate+".00"}
                  inputProps={{style:{textAlign:'right'}}}
                  startAdornment={
                    <InputAdornment position="start">$</InputAdornment>
                  }
                  label="Salary per Hour"
                /> <br />
            </FormControl>
            <TextField 
              id="employmentType" 
              name='employmentType'
              label="Employment Status"  
              variant="outlined"
              value={empValue.employmentType}
              sx={{width:590}}/>&nbsp;&nbsp;
            <FormControl>
                <InputLabel htmlFor='salary'>Daily Salary</InputLabel>
                <OutlinedInput 
                  id='dailySalary'
                  name='dailySalary'
                  sx={{width:200}}
                  value={(dailyWage+".00") || '0'}
                  inputProps={{style:{textAlign:'right'}}}
                  startAdornment={
                    <InputAdornment position="start">$</InputAdornment>
                  }
                  label="Daily Salary"
                /> <br />
            </FormControl>
          </div>
        </div>
        <br />
        <TabContext value={tabValue}>
          <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
            <TabList onChange={handleTabChange} aria-label='Employee Tab'>
              <Tab label="Payroll" sx={{fontWeight:'bold'}} value="1" />
              <Tab label="Overtime" sx={{fontWeight:'bold'}} value="2" />
              <Tab label="Leave" sx={{fontWeight:'bold'}} value="3" />
              <Tab label="Absent" sx={{fontWeight:'bold'}} value="4" />
            </TabList>
          </Box>
          <TabPanel value='1'>
              <FormControl>
                  <InputLabel htmlFor='payableLeave'>Remaining Payable Leave</InputLabel>
                  <OutlinedInput 
                    id='payableLeave'
                    name='payableLeave'
                    data-testid='payableLeave'
                    sx={{width:195}}
                    value={payrollValue.payableleave}
                    inputProps={{style:{textAlign:'right'}}}
                    label="Remaining Payable Leave"
                  /> <br />
              </FormControl>&nbsp;&nbsp;
              <FormControl>
                  <InputLabel htmlFor='leave'>Total Leave</InputLabel>
                  <OutlinedInput 
                    id='leave'
                    name='leave'
                    sx={{width:195}}
                    data-testid='leave'
                    value={payrollValue.leave}
                    inputProps={{style:{textAlign:'right'}}}
                    label="Total Leave"
                  /> <br />
              </FormControl>&nbsp;&nbsp;
              <FormControl>
                  <InputLabel htmlFor='overtime'>Total Overtime</InputLabel>
                  <OutlinedInput 
                    id='overtime'
                    name='overtime'
                    sx={{width:195}}
                    data-testid='overtime'
                    value={payrollValue.overtime}
                    inputProps={{style:{textAlign:'right'}}}
                    label="Total Overtime"
                  /> <br />
              </FormControl>&nbsp;&nbsp;
              <FormControl>
                  <InputLabel htmlFor='absent'>Total Absent</InputLabel>
                  <OutlinedInput 
                    id='absent'
                    name='absent'
                    data-testid='absent'
                    sx={{width:190}}
                    value={payrollValue.absent}
                    inputProps={{style:{textAlign:'right'}}}
                    label="Total Absent"
                  /> <br />
              </FormControl><br />
              <FormControl>
                  <InputLabel htmlFor='salary'>Monthly Salary</InputLabel>
                  <OutlinedInput 
                    id='monthSalary'
                    name='monthSalary'
                    data-testid='monthSalary'
                    sx={{width:800}}
                    value={payrollValue.monthlySalary+".00"}
                    inputProps={{style:{textAlign:'right'}}}
                    startAdornment={
                      <InputAdornment position="start">$</InputAdornment>
                    }
                    label="This Month Salary"
                  /> <br />
              </FormControl><br />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker 
                      id='payrollDate' 
                      name='payrollDate'
                      views={['month','year']} 
                      label='Month Year'
                      minDate={dayjs('2000-01-01')}
                      maxDate={dayjs('2030-12-31')} 
                      value={payrollFilter} 
                      renderInput={(params) => <TextField {...params} sx={{width:400,backgroundColor:'white'}}/>}
                      onChange={(newValue) => {setPayrollFilter(newValue)}}/> &nbsp; &nbsp;
              </LocalizationProvider>&nbsp;
              <Button variant='contained' onClick={async () => {handleComputeSalary()}} sx={{height:55, width:300}}>
                <PaidIcon/>&nbsp;
                  Compute Salary
              </Button>
          </TabPanel>
          <TabPanel value='2'>
            <div className='flex justify-between'>
              <div>
                <Button variant='contained' onClick={handleOvertimeRedirect}>
                  <EventBusyIcon />&nbsp;
                  Add Employee Overtime
                </Button>
              </div>
              <div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker 
                        id='OTDateFrom' 
                        name='OTDateFrom' 
                        label='Date From'
                        minDate={dayjs('2000-01-01')}
                        maxDate={dayjs('2030-12-31')} 
                        value={overtimeFilter.from} 
                        renderInput={(params) => <TextField {...params} InputLabelProps={{style:{color:'black',fontWeight:'bold'}}} sx={{width:150,backgroundColor:'white'}} size={'small'} />}
                        onChange={(newValue) => {setOvertimeFilter({from:newValue,to:overtimeFilter.to})}}/> &nbsp; &nbsp;
                    <DatePicker 
                        id='OTDateTo' 
                        name='OTDateTo' 
                        label='Date To'
                        minDate={dayjs('2000-01-01')}
                        maxDate={dayjs('2030-12-31')} 
                        value={overtimeFilter.to} 
                        renderInput={(params) => <TextField {...params} InputLabelProps={{style:{color:'black',fontWeight:'bold'}}} sx={{width:150,backgroundColor:'white'}} size={'small'} />}
                        onChange={(newValue) => {setOvertimeFilter({from:overtimeFilter.from,to:newValue})}} /> &nbsp; &nbsp;
                </LocalizationProvider>
                <Button variant='contained' onClick={() => handleFilterCondition('overtime')} color='warning'>Filter</Button> &nbsp;
                <Button variant='contained' onClick={() => handleCancelFilterCondition('overtime')} color='success'>Clear</Button>
              </div>
            </div><br />
            <Table sx={{width:'100%'}}>
              <TableHead sx={{backgroundColor:'yellow'}}>
                <TableRow>
                  <TableCell sx={{color:'black', fontWeight:'bold', width: 60}}></TableCell>
                  <TableCell sx={{color:'black', fontWeight:'bold', width: 150}}>Date</TableCell>
                  <TableCell sx={{color:'black', fontWeight:'bold', width: 125}}>Time From</TableCell>
                  <TableCell sx={{color:'black', fontWeight:'bold', width: 125}}>Time To</TableCell>
                  <TableCell sx={{color:'black', fontWeight:'bold', width: 150}}>Status</TableCell>
                  <TableCell sx={{color:'black', fontWeight:'bold'}}>
                  </TableCell>
                </TableRow>
              </TableHead>
              <DisplayOT />
            </Table><br />
          </TabPanel>
          <TabPanel value='3'>
            <div className='flex justify-between'>
              <div>
                <Button variant='contained' onClick={handleLeaveRedirect}>
                  <EventBusyIcon />&nbsp;
                  Add Employee Leave
                </Button>
              </div>
              <div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker 
                        id='leaveDateFrom' 
                        name='leaveDateFrom' 
                        label='Date From'
                        minDate={dayjs('2000-01-01')}
                        maxDate={dayjs('2030-12-31')} 
                        value={leaveFilter.from} 
                        renderInput={(params) => <TextField {...params} InputLabelProps={{style:{color:'black',fontWeight:'bold'}}} sx={{width:150,backgroundColor:'white'}} size={'small'} />}
                        onChange={(newValue) => {setLeaveFilter({from:newValue,to:leaveFilter.to})}}/> &nbsp; &nbsp;
                    <DatePicker 
                        id='leaveDateTo' 
                        name='leaveDateTo' 
                        label='Date To'
                        minDate={dayjs('2000-01-01')}
                        maxDate={dayjs('2030-12-31')} 
                        value={leaveFilter.to} 
                        renderInput={(params) => <TextField {...params} InputLabelProps={{style:{color:'black',fontWeight:'bold'}}} sx={{width:150,backgroundColor:'white'}} size={'small'} />}
                        onChange={(newValue) => {setLeaveFilter({from:leaveFilter.from,to:newValue})}} /> &nbsp; &nbsp;
                </LocalizationProvider>
                <Button variant='contained' onClick={() => handleFilterCondition('leave')} color='warning'>Filter</Button> &nbsp;
                <Button variant='contained' onClick={() => handleCancelFilterCondition('leave')} color='success'>Clear</Button>
              </div>
            </div><br />
            <Table sx={{width:'100%'}}>
              <TableHead sx={{backgroundColor:'yellow'}}>
                <TableRow>
                  <TableCell sx={{color:'black', fontWeight:'bold', width: 60}}></TableCell>
                  <TableCell sx={{color:'black', fontWeight:'bold', width: 125}}>From</TableCell>
                  <TableCell sx={{color:'black', fontWeight:'bold', width: 125}}>To</TableCell>
                  <TableCell sx={{color:'black', fontWeight:'bold', width: 150}}>Reason</TableCell>
                  <TableCell sx={{color:'black', fontWeight:'bold', width: 150}}>Status</TableCell>
                  <TableCell sx={{color:'black', fontWeight:'bold'}}>
                  </TableCell>
                </TableRow>
              </TableHead>
              <DisplayLeave />
            </Table><br />
          </TabPanel>
          <TabPanel value='4'>
            <div className='flex justify-between'>
              <div>
                <Button variant='contained' onClick={handleAbsentRedirect}>
                  <EventBusyIcon />&nbsp;
                  Add Employee Absent
                </Button>
              </div>
              <div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker 
                        id='absentDateFrom' 
                        name='absentDateFrom' 
                        label='Date From'
                        minDate={dayjs('2000-01-01')}
                        maxDate={dayjs('2030-12-31')} 
                        value={absentFilter.from} 
                        renderInput={(params) => <TextField {...params} InputLabelProps={{style:{color:'black',fontWeight:'bold'}}} sx={{width:150,backgroundColor:'white'}} size={'small'} />}
                        onChange={(newValue) => {setAbsentFilter({from:newValue,to:absentFilter.to})}}/> &nbsp; &nbsp;
                    <DatePicker 
                        id='absentDateTo' 
                        name='absentDateTo' 
                        label='Date To'
                        minDate={dayjs('2000-01-01')}
                        maxDate={dayjs('2030-12-31')} 
                        value={absentFilter.to} 
                        renderInput={(params) => <TextField {...params} InputLabelProps={{style:{color:'black',fontWeight:'bold'}}} sx={{width:150,backgroundColor:'white'}} size={'small'} />}
                        onChange={(newValue) => {setAbsentFilter({from:absentFilter.from,to:newValue})}} /> &nbsp; &nbsp;
                </LocalizationProvider>
                <Button variant='contained' onClick={() => handleFilterCondition('absent')} color='warning'>Filter</Button> &nbsp;
                <Button variant='contained' onClick={() => handleCancelFilterCondition('absent')} color='success'>Clear</Button>
              </div>
            </div><br />
            <Table>
              <TableHead sx={{backgroundColor:'yellow'}}>
                <TableRow>
                    <TableCell sx={{color:'black', fontWeight:'bold', width: 60}}></TableCell>
                    <TableCell sx={{color:'black', fontWeight:'bold', width: 175}}>From</TableCell>
                    <TableCell sx={{color:'black', fontWeight:'bold', width: 175}}>To</TableCell>
                    <TableCell sx={{color:'black', fontWeight:'bold', width: 200}}>Reason</TableCell>
                    <TableCell sx={{color:'black', fontWeight:'bold'}}>
                    </TableCell>
                </TableRow>
              </TableHead>
              <DisplayAbsent />
            </Table>
            <br />
          </TabPanel>
        </TabContext>
        </Container>
    </Layout>
  )
}

export default EmployeeInfo