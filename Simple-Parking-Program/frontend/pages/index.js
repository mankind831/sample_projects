//Needed imports to run this page
import { Button, Container, Dialog, Table, TableBody, TableCell, TableRow, TableHead, 
  Typography, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Autocomplete, FormControl, OutlinedInput, InputLabel, InputAdornment } from '@mui/material'
import React, { useState, useEffect } from 'react'
import Layout from './component/layout'
import { fetchData, postData } from './util/dbFunctions'
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import _ from 'lodash'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { format } from 'date-fns'

const Index = () => {
  const optionGateway = ['A','B','C'] //Gateway Options

  //Usestates for Dialogboxes
  const [openCheckIn, setOpenCheckIn] = useState(false)
  const [openHistory, setOpenHistory] = useState(false)
  const [openCheckOut, setOpenCheckOut] = useState(false)

  //Usestates for various function
  const [slotsData, setSlotsData] = useState([])
  const [valueGateway, setValueGateway] = useState(optionGateway[0])
  const [datetimeInValue,  setDateTimeInValue] = useState(new Date())
  const [dateTimeOutValue,  setDateTimeOutValue] = useState(new Date())
  const [optionVehicle, setOptionVehicle] = useState([])
  const [valueVehicle, setValueVehicle] = useState('')
  const [inputValue, setInputValue] = useState('')
  const [transactionList, setTransactionList] = useState([])
  const [transItem, setTransItem] = useState({gateway:'',slot:'',transNo:'',dateTimeIn:'', dateTimeOut:'', totalBill:'',plateNo:'',typeID:''})

  //useEffect for fetching data from backend
  useEffect(() => {
    const fetchingData = async () => {
      const fetchedSlotsData = await fetchData('parkingslot')
      const fetchedOptionVehicle = await fetchData('vehicletype')
      const fetchedTransactionData = await fetchData('parkingtransaction')
      const arrOptions = _.map(fetchedOptionVehicle, (item) => item.vehicleType).filter((item) => item !== 'Whole Day' && item !== 'Default')
      setSlotsData(_.sortBy(fetchedSlotsData,['gateway','slot']))
      setOptionVehicle(arrOptions)
      setValueVehicle(arrOptions[0])
      setTransactionList(fetchedTransactionData)
    }
    fetchingData()
  },[])

  //Handles Open Dialog Box for Check In
  const handleClickOpenCheckIn = () => {
    setOpenCheckIn(true)
  }

  //Handles Close Dialog Box for Check In
  const handleClickCloseCheckIn = () => {
    setOpenCheckIn(false)
  }

  //Handles Open History Dialog Box
  const handleHistoryOpen = () => {
    setOpenHistory(true)
  }

  //Handles Close History Dialog Box
  const handleHistoryClose = () => {
    setOpenHistory(false)
  }

  //Handles Open Check-Out Dialog Box
  const handleCheckOutOpen = (item) => {
    const tempObj = {
      gateway: item.gateway,
      slot: item.slot,
      transNo: item.transNo,
      dateTimeIn: item.dateTimeIn,
      dateTimeOut:'',
      totalBill:'0.00',
      plateNo: item.plateNo,
      typeID: item.typeID
    }
    setTransItem(tempObj)
    setOpenCheckOut(true)
  }

  //Handles Close Check-Out Dialog Box
  const handleCheckOutClose = async () => {
    const fetchedSlotsData = await fetchData('parkingslot')
    console.log(fetchedSlotsData)
    setSlotsData(_.sortBy(fetchedSlotsData,['gateway','slot']))
    const fetchedTransactionData = await fetchData('parkingtransaction')
    setTransactionList(fetchedTransactionData)
    setOpenCheckOut(false)
  }

  //Handles Client CheckOut
  const handleClientCheckOut = async () => {
    const tempData = {
      gateway: transItem.gateway,
      slot: transItem.slot,
      transNo: transItem.transNo,
      dateTimeIn: transItem.dateTimeIn,
      dateTimeOut: format(new Date(dateTimeOutValue),"MM/dd/yyyy p"),
      totalBill: '0.00',
      plateNo: transItem.plateNo,
      typeID: transItem.typeID
    }
    const postedData = await postData('parkingtransaction',tempData)
    if(postedData.results !== ''){
      const tempObj = {
        gateway: transItem.gateway,
        slot: transItem.slot,
        transNo: transItem.transNo,
        dateTimeIn: transItem.dateTimeIn,
        dateTimeOut: transItem.dateTimeOut,
        totalBill: postedData.totalBill,
        plateNo: transItem.plateNo,
        typeID: transItem.typeID
      }
      setTransItem(tempObj)
    }
  }

  //Handles Client CheckIn
  const handleClientCheckIn = async () => {
    const dataTemp = {
      gateway: valueGateway,
      dateTimeIn: datetimeInValue,
      vehicleType: valueVehicle,
      plateNo: inputValue
    }
    if(await postData('parkingslot', dataTemp,'checkIn=true') !== ''){
      const fetchedSlotsData = await fetchData('parkingslot')
      setSlotsData(_.sortBy(fetchedSlotsData,['gateway','slot']))
      setInputValue('')
      handleClickCloseCheckIn()
    }
  }

  //Displaying Transaction History to Table
  const DisplayHistory = () =>{
    const rows = _.map(transactionList, (history,index) => {
      return(
        <TableRow key={index}>
          <TableCell>{history.transNo}</TableCell>
          <TableCell>{history.plateNo}</TableCell>
          <TableCell>{history.dateTimeIn}</TableCell>
          <TableCell>{history.dateTimeOut}</TableCell>
          <TableCell>₱&nbsp;{parseFloat(history.totalBill).toFixed(2)}</TableCell>
        </TableRow>
      )
    })
    return <TableBody>{rows}</TableBody>
  }

  //Creating tablecell for interface design purposes
  const UpperDisplay = () => {
    var tablecells = [];
    for(var i=0; i<15; i++){
       tablecells.push(<TableCell key={i} sx={{width:75, borderBottom:"none"}}> </TableCell>)
    }
    return tablecells
  }

  //Display all parking slots to the table
  const MiddleDisplay = () =>{
    const displayIndex = [0,5,10,15,20,25]
    const displayRows = _.map(displayIndex, (indexItem,index) => {
      return (
        <TableRow key={index}>
          <TableCell sx={{border:1,backgroundColor:'lightblue'}}>
            <Button variant='contained' color={slotsData[indexItem].status === 'Vacant' ? 'success' : 'error'} disabled={slotsData[indexItem].status === 'Vacant' ? true : false} onClick={() => {handleCheckOutOpen(slotsData[indexItem])}}>
              {slotsData[indexItem].gateway}-{slotsData[indexItem].slot}
            </Button>
          </TableCell>
          <TableCell sx={{border:1,backgroundColor:'lightblue'}}>
            <Button variant='contained' color={slotsData[indexItem+1].status === 'Vacant' ? 'success' : 'error'} disabled={slotsData[indexItem+1].status === 'Vacant' ? true : false} onClick={() => {handleCheckOutOpen(slotsData[indexItem+1])}}>
              {slotsData[indexItem+1].gateway}-{slotsData[indexItem+1].slot}
            </Button>
          </TableCell>
          <TableCell sx={{border:1,backgroundColor:'lightblue'}}>
            <Button variant='contained' color={slotsData[indexItem+2].status === 'Vacant' ? 'success' : 'error'} disabled={slotsData[indexItem+2].status === 'Vacant' ? true : false} onClick={() => {handleCheckOutOpen(slotsData[indexItem+2])}}>
              {slotsData[indexItem+2].gateway}-{slotsData[indexItem+2].slot}
            </Button>
          </TableCell>
          <TableCell sx={{border:1,backgroundColor:'lightblue'}}>
            <Button variant='contained' color={slotsData[indexItem+3].status === 'Vacant' ? 'success' : 'error'} disabled={slotsData[indexItem+3].status === 'Vacant' ? true : false}  onClick={() => {handleCheckOutOpen(slotsData[indexItem+3])}}>
              {slotsData[indexItem+3].gateway}-{slotsData[indexItem+3].slot}
            </Button>
          </TableCell>
          <TableCell sx={{border:1,backgroundColor:'lightblue'}}>
            <Button variant='contained' color={slotsData[indexItem+4].status === 'Vacant' ? 'success' : 'error'} disabled={slotsData[indexItem+4].status === 'Vacant' ? true : false} onClick={() => {handleCheckOutOpen(slotsData[indexItem+4])}}>
              {slotsData[indexItem+4].gateway}-{slotsData[indexItem+4].slot}
            </Button>
          </TableCell>
          <TableCell sx={{border:1,backgroundColor:'lightgreen'}}>
            <Button variant='contained' color={slotsData[indexItem+30].status === 'Vacant' ? 'success' : 'error'} disabled={slotsData[indexItem+30].status === 'Vacant' ? true : false} onClick={() => {handleCheckOutOpen(slotsData[indexItem+30])}}>
              {slotsData[indexItem+30].gateway}-{slotsData[indexItem+30].slot}
            </Button>
          </TableCell>
          <TableCell sx={{border:1,backgroundColor:'lightgreen'}}>
            <Button variant='contained' color={slotsData[indexItem+31].status === 'Vacant' ? 'success' : 'error'} disabled={slotsData[indexItem+31].status === 'Vacant' ? true : false} onClick={() => {handleCheckOutOpen(slotsData[indexItem+31])}}>
              {slotsData[indexItem+31].gateway}-{slotsData[indexItem+31].slot}
            </Button>
            </TableCell>
          <TableCell sx={{border:1,backgroundColor:'lightgreen'}}>
            <Button variant='contained' color={slotsData[indexItem+32].status === 'Vacant' ? 'success' : 'error'} disabled={slotsData[indexItem+32].status === 'Vacant' ? true : false} onClick={() => {handleCheckOutOpen(slotsData[indexItem+32])}}>
              {slotsData[indexItem+32].gateway}-{slotsData[indexItem+32].slot}
            </Button>
          </TableCell>
          <TableCell sx={{border:1,backgroundColor:'lightgreen'}}>
            <Button variant='contained' color={slotsData[indexItem+33].status === 'Vacant' ? 'success' : 'error'} disabled={slotsData[indexItem+33].status === 'Vacant' ? true : false} onClick={() => {handleCheckOutOpen(slotsData[indexItem+33])}}>
              {slotsData[indexItem+33].gateway}-{slotsData[indexItem+33].slot}
            </Button>
          </TableCell>
          <TableCell sx={{border:1,backgroundColor:'lightgreen'}}>
            <Button variant='contained' color={slotsData[indexItem+34].status === 'Vacant' ? 'success' : 'error'} disabled={slotsData[indexItem+34].status === 'Vacant' ? true : false} onClick={() => {handleCheckOutOpen(slotsData[indexItem+34])}}>
              {slotsData[indexItem+34].gateway}-{slotsData[indexItem+34].slot}
            </Button>
          </TableCell>
          <TableCell sx={{border:1,backgroundColor:'lightgray'}}>
            <Button variant='contained' color={slotsData[indexItem+60].status === 'Vacant' ? 'success' : 'error'} disabled={slotsData[indexItem+60].status === 'Vacant' ? true : false} onClick={() => {handleCheckOutOpen(slotsData[indexItem+60])}} >
              {slotsData[indexItem+60].gateway}-{slotsData[indexItem+60].slot}
            </Button>
          </TableCell>
          <TableCell sx={{border:1,backgroundColor:'lightgray'}}>
            <Button variant='contained' color={slotsData[indexItem+61].status === 'Vacant' ? 'success' : 'error'} disabled={slotsData[indexItem+61].status === 'Vacant' ? true : false} onClick={() => {handleCheckOutOpen(slotsData[indexItem+61])}}>
              {slotsData[indexItem+61].gateway}-{slotsData[indexItem+61].slot}
            </Button>
          </TableCell>
          <TableCell sx={{border:1,backgroundColor:'lightgray'}}>
            <Button variant='contained' color={slotsData[indexItem+62].status === 'Vacant' ? 'success' : 'error'} disabled={slotsData[indexItem+62].status === 'Vacant' ? true : false} onClick={() => {handleCheckOutOpen(slotsData[indexItem+62])}} >
              {slotsData[indexItem+62].gateway}-{slotsData[indexItem+62].slot}
            </Button>
          </TableCell>
          <TableCell sx={{border:1,backgroundColor:'lightgray'}}>
            <Button variant='contained' color={slotsData[indexItem+63].status === 'Vacant' ? 'success' : 'error'} disabled={slotsData[indexItem+63].status === 'Vacant' ? true : false} onClick={() => {handleCheckOutOpen(slotsData[indexItem+63])}} >
              {slotsData[indexItem+63].gateway}-{slotsData[indexItem+63].slot}
            </Button>
          </TableCell>
          <TableCell sx={{border:1,backgroundColor:'lightgray'}}>
            <Button variant='contained' color={slotsData[indexItem+64].status === 'Vacant' ? 'success' : 'error'} disabled={slotsData[indexItem+64].status === 'Vacant' ? true : false} onClick={() => {handleCheckOutOpen(slotsData[indexItem+64])}} >
              {slotsData[indexItem+64].gateway}-{slotsData[indexItem+64].slot}
            </Button>
          </TableCell>
        </TableRow>
      )
    })
    return displayRows
  }

  return (
    <Layout>
      <Container>
        {/* Page Header */}
        <Typography variant='h5'>
          Parking Area
        </Typography>
        <br />
        {/* Page Body */}
        {/* Table for displaying the parking slots */}
        <Table sx={{border:1}}>
          <TableBody>
            <TableRow>
              <TableCell sx={{border:1, fontWeight:'bold'}} rowSpan={8} align='center'>Gateway A<br /><ArrowForwardIcon /></TableCell>
              <UpperDisplay />
              <TableCell sx={{border:1, fontWeight:'bold'}} rowSpan={8} align='center'>Gateway C<br /><ArrowBackIcon /></TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{border:1, borderTop:0, fontWeight:'bold'}} colSpan={15} align='center'>Gateway B<br /><ArrowDownwardIcon /></TableCell>
            </TableRow>
            {slotsData.length > 0 ? <MiddleDisplay />  : null}
            <TableRow>
              <TableCell sx={{border:1, fontWeight:'bold'}} colSpan={17} align='center'>EXIT<br /><ArrowDownwardIcon /><ArrowDownwardIcon /></TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <br /><br />
        {/* Page Body */}
        <Button variant='contained' color='success' sx={{width:300,  height:50}} onClick={handleClickOpenCheckIn}><DriveEtaIcon />&nbsp;&nbsp;Add New Client</Button>
        &nbsp;&nbsp;
        <Button variant='contained' color='warning' sx={{width:300,  height:50}} onClick={handleHistoryOpen}><ReceiptLongIcon />&nbsp;&nbsp;Transaction History</Button>
      </Container>
      {/* Dialog box for client checkin */}
      <Dialog open={openCheckIn} maxWidth={'xl'} onClose={handleClickCloseCheckIn}>
        <DialogTitle>
          <center>Check In Client</center>
        </DialogTitle>
        <DialogContent>
          <br />
          <TextField
           id='plateNo'
           name='plateNo'
           sx={{width:500}}
           variant='outlined'
           label='PlateNo'
           value={inputValue}
           onChange={(event) => {setInputValue(event.target.value)}}
           /><br /><br />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                id="checkInDateTime"
                name="checkInDateTime"
                renderInput={(props) => <TextField sx={{width:500}} {...props} />}
                label="Check In Date and Time"
                value={datetimeInValue}
                onChange={(newValue) => {setDateTimeInValue(newValue);}}
              />
          </LocalizationProvider>
          <br /><br />
          <Autocomplete
              id="gateway"
              options={optionGateway}
              value={valueGateway}
              onChange={(event,newInputValue) => {setValueGateway(newInputValue)}}
              sx={{ width: 500 }}
              renderInput={(params) => <TextField {...params} label="Gateway" />}
            /><br />
          <Autocomplete
              id="vehicletype"
              options={optionVehicle}
              value={valueVehicle || ''}
              onChange={(event,newInputValue) => {setValueVehicle(newInputValue)}}
              sx={{ width: 500 }}
              renderInput={(params) => <TextField {...params} label="Vehicle Type" />}
            /><br />
        </DialogContent>
        <DialogActions>
          <Button variant='contained' color='success' onClick={async () => handleClientCheckIn()}>Add Client</Button>
          &nbsp;&nbsp;&nbsp;
          <Button variant='contained' color='error' onClick={handleClickCloseCheckIn}>Close</Button>
        </DialogActions>
      </Dialog>
      {/* Dialog Box for Transaction History */}
      <Dialog
        open={openHistory}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth={'xl'}>
        <DialogTitle id="alert-dialog-title">
          <Typography align='center'>Transaction History</Typography>
        </DialogTitle>
        <DialogContent>
            <br />
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Transaction No</TableCell>
                  <TableCell>Plate No</TableCell>
                  <TableCell>Check In Date and Time</TableCell>
                  <TableCell>Check Out Date and Time</TableCell>
                  <TableCell>Total Bill</TableCell>
                </TableRow>
              </TableHead>
              <DisplayHistory />
            </Table>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleHistoryClose} variant='contained' color="error">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      {/* Dialog Box for Check Out Parking Area */}
      <Dialog
        open={openCheckOut}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth={'xl'}>
        <DialogTitle id="alert-dialog-title">
          <Typography align='center'>Check Out Parking Area {transItem.gateway}-{transItem.slot}</Typography>
        </DialogTitle>
        <DialogContent>
            <br />
            <TextField 
              id="plateNoCheckOut"
              name="plateNoCheckOut"
              variant='outlined'
              label="Transaction No."
              value={transItem.transNo}
              sx={{width:500}}
            /><br /><br />
            <TextField 
              id="plateNoCheckOut"
              name="plateNoCheckOut"
              variant='outlined'
              label="Vehicle Plate No."
              value={transItem.plateNo}
              sx={{width:500}}
            /><br /><br />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                id="checkOutDateTime"
                name="checkOutDateTime"
                renderInput={(props) => <TextField sx={{width:500}} {...props} />}
                label="Check Out Date and Time"
                value={dateTimeOutValue}
                onChange={(newValue) => {setDateTimeOutValue(newValue)}}
                />
            </LocalizationProvider>
            <br /><br />
            <FormControl>
              <InputLabel htmlFor="outlined-adornment-amount">Total Bill</InputLabel>
              <OutlinedInput
                id="totalBill"
                name="totalBill"
                inputProps={{style:{textAlign:'right'}}}
                value={parseFloat(transItem.totalBill).toFixed(2)}
                sx={{width:500}}
                startAdornment={<InputAdornment position="start">₱</InputAdornment>}
                label="Total Bill"
              />
            </FormControl><br /><br />
        </DialogContent>
        <DialogActions>
          <Button variant='contained' onClick={handleClientCheckOut} disabled={transItem.totalBill === "0.00" ? false : true} color="success">
            Check Out
          </Button>
          <Button onClick={async () => {handleCheckOutClose()}} variant='contained' color="error">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Layout>
  )
}

export default Index
