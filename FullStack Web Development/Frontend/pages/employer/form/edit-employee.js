import React, {useEffect, useState} from 'react'
import { Button, TextField, Container, Typography, Autocomplete, FormControl, InputLabel, OutlinedInput, InputAdornment, Dialog, DialogContent, DialogContentText, DialogActions } from '@mui/material'
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import  _ from 'lodash'
import { useRouter } from 'next/router';
import { updateEmployee } from '../../store/reducers/employeeSlice'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { fetchData, postData } from '../../util/dbFunctions'

const EditEmployee = () => {
  const routerData = localStorage.getItem('compID')
  const employeeID = useRouter().query.id
  const router = useRouter()
  const optionsType = ['Fulltime','Parttime']

  const [valueType, setValueType] = useState('')
  const [valueAccount, setValueAccount] = useState('')
  const [optAccnt, setOptAccnt] = useState([])
  const [successDialog, setSuccessDialog] = useState(false)
  const [empValue,setEmpValue] = useState({fname:'',lname:'',jobtitle:'',hourlyRate:''})

  useEffect(() => {
    const fetchingData = async () => {
      const fetchedEmployeeData = await fetchData('employer/employee',`empID=${employeeID}`)
      const fetchedAccountData = await fetchData('adminlist',`role=Employee`)
      const fetchedEmployeeAccountData = await fetchData('adminlist',`accountID=${fetchedEmployeeData[0].accountID}`)
      const arrData = _.map(fetchedAccountData,account => account.email)
      arrData.push(fetchedEmployeeAccountData[0].email)
      setEmpValue(fetchedEmployeeData[0])
      setValueType(fetchedEmployeeData[0].employmentType)
      setOptAccnt(arrData)
      setValueAccount(fetchedEmployeeAccountData[0].email)
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

  const handleSuccesOpen = () =>{
    setSuccessDialog(true)
  }

  const handleSuccessClose = () =>{
    setSuccessDialog(false)
    router.push({
      pathname:'/dashboard',
      query:{
        role:'Employer'
      }
    })
  }

  const handleSaveData = async () =>{
    const blankData = {
      fname:'',
      lname:'',
      jobtitle:'',
      hourlyRate:'0'
    }
    // const filterAccount = _.filter(accountData,{'username':valueAccount})
    const tempData = {
      fname:empValue.fname,
      lname:empValue.lname,
      jobtitle:empValue.jobtitle,
      hourlyRate:empValue.hourlyRate,
      employmentType:valueType,
      compID:routerData,
      accountID: await getAccountID()
    }

    if(await postData('employer/employee',tempData,`empID=${employeeID}`) !== ''){
      handleSuccesOpen()
    }

    // dispatch(updateEmployee([savedData,employeeID]))
    // handleSuccesOpen()
  }

  const  getAccountID = async () => {
    const accntID = await fetchData('adminlist',`email=${valueAccount}`)
    return accntID[0].accountID
  }

  return (
    <Container>
    <br />
    <br />
      <Container>
        <Typography variant='h5'>Update Employee Infromation</Typography>
        <br />
        <TextField 
          id="fname"
          name='fname'
          label="First Name"  
          variant="outlined"
          value={empValue.fname}
          onChange={handleInputForm}
          sx={{width:395}}/> &nbsp;
        <TextField 
          id="lname" 
          name='lname'
          label="Last Name"  
          variant="outlined"
          value={empValue.lname}
          onChange={handleInputForm} 
          sx={{width:395}}/> &nbsp;&nbsp;  <br/><br/>
        <TextField 
          id="jobtitle" 
          name='jobtitle'
          label="Position"  
          variant="outlined"
          value={empValue.jobtitle}
          onChange={handleInputForm}
          sx={{width:590}}/>&nbsp;&nbsp;
          <FormControl>
            <InputLabel htmlFor='hourlyRate'>Salary per Hour</InputLabel>
            <OutlinedInput 
              id='hourlyRate'
              name='hourlyRate'
              sx={{width:200}}
              value={empValue.hourlyRate}
              onChange={handleInputForm}
              inputProps={{style:{textAlign:'right'}}}
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
              label="Salary per Hour"
            />
          </FormControl>
          <br /><br />
        <Autocomplete
            id="role"
            name="role"
            value={valueType || null}
            onChange={(event, newValue) => {setValueType(newValue)}}
            disableClearable
            sx={{width:800}}
            options={optionsType}
            renderInput={(params) => (
              <TextField {...params} label="Employment Status" variant="outlined" />
            )}
          /><br />
        <Autocomplete
            id="accountName"
            name="accountName"
            value={valueAccount || null}
            onChange={(event, newValue) => {setValueAccount(newValue)}}
            disableClearable
            sx={{width:800}}
            options={optAccnt}
            renderInput={(params) => (
              <TextField {...params} label="Assign Account" variant="outlined" />
            )}
          />
        <br /><br />
        <Button variant="contained" onClick={handleSaveData}><SaveAltIcon/>&nbsp;Update Employee</Button>
      </Container>
      <Dialog
        id="successDialog"
        open={successDialog}
        onClose={handleSuccessClose}
        aria-labelledby="Success"
        aria-describedby="Success"
        fullWidth={true}>
        <DialogContent>
          <DialogContentText id="successDialog-content" fontSize={"large"}>
            <CheckCircleOutlineIcon color="success" fontSize={"large"}/>
            &nbsp;New Employee Information is updated.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant='contained' onClick={handleSuccessClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}

export default EditEmployee
