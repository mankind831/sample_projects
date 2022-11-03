import React, {useEffect, useState} from 'react'
import Layout from '../../components/layout-admin'
import { Button, TextField, Container, Typography, Autocomplete, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, Dialog, DialogContent, DialogContentText, DialogActions } from '@mui/material'
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import _  from 'lodash';
import { useRouter } from 'next/router';
import { fetchData, postData } from '../../util/dbFunctions'

const AddAdmin = () => {
  const router = useRouter()
  const [addValue, setAddValue] = useState({ 
      fname:'', 
      lname:'', 
      email:'',  
      password1:'', 
      password2:''})
  const optionsType = ['Administrator', 'Employee','Employer']
  const [companyOptions, setCompanyOptions] = useState([])
  const [valueType, setValueType] = useState(optionsType[0])
  const [companyValue, setCompanyValue] = useState()
  const [cmbDisabled, setCmbDisabled] = useState(true)
  const [password1Value, setPassword1Value] = useState(false)
  const [password2Value, setPassword2Value] = useState(false)
  const [error1Value, setError1Value]= useState(false)
  const [error2Value, setError2Value]= useState(false)
  const [errorDialog, setErrorDialog] = useState(false)
  const [successDialog, setSuccessDialog] = useState(false)
  
  useEffect(() => {
    const fetchingData = async () => {
       setCompanyOptions(_.map(await fetchData('company'),compData => compData.name)) 
    }
    fetchingData()
  },[])

  const handleInputForm = (event) => {
    const fieldName = event.target.getAttribute("name")
    const fieldValue = event.target.value
    const newFormData = {...addValue}
    newFormData[fieldName] = fieldValue
    setAddValue(newFormData)
    setError1Value(false)
    setError2Value(false)
  }

  const handleClickShowPassword1 = () => {
    setPassword1Value(!password1Value);
  };

  const handleClickShowPassword2 = () => {
    setPassword2Value(!password2Value);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSuccesOpen = () =>{
    setSuccessDialog(true)
  }

  const handleSuccessClose = () =>{
    setSuccessDialog(false)
    router.push({
      pathname:'/dashboard',
      query:{
        role:'Administrator',
        type:'admin'
      }
    })
  }

  const handleErrorOpen = () => {
    setErrorDialog(true)
  }

  const handleErrorClose = () => {
    setErrorDialog(false)
  }

  const handleSaveData = async (event) =>{
    if(checkPassword(addValue["password1"],addValue["password2"])){
      const blankAddData ={
        fname:'', 
        lname:'', 
        email:'',
        password1:'', 
        password2:''
      }

      const tempData = {
        email:addValue.email,
        fname:addValue.fname,
        lname:addValue.lname,
        password:addValue.password1,
        role:valueType,
        companyName:companyValue
      }
      
      if(await postData('adminlist',tempData) !== ""){
        handleSuccesOpen()
        setAddValue(blankAddData)
      }
      // dispatch(addAccount(AddTempData))
      // setAddValue(blankAddData)
      // handleSuccesOpen()  
    }else{
      setError1Value(true)
      setError2Value(true)
      handleErrorOpen()
    }
  }

  const checkPassword = (password1,password2) => {
    var boolPassword = false
    if(password1 === password2){
      boolPassword = true
    }
    return boolPassword
  } 

  return (
    <Layout>
        <Container>
          <br />
          <br />
          <Container>
              <Typography variant='h5'>Add New User</Typography>
              <br />
              <TextField 
                id="fname" 
                name="fname"
                label="First Name"  
                variant="outlined"
                value={addValue.fname}
                onChange={handleInputForm}   
                sx={{width:800}}/> <br/><br/>
              <TextField 
                id="lname"
                name='lname'
                label="Last Name" 
                variant="outlined"
                value={addValue.lname}
                onChange={handleInputForm}   
                sx={{width:800}}/> <br/><br/>
              <TextField 
                id="email"
                name='email'
                label="Email Address" 
                variant="outlined"
                value={addValue.email}
                onChange={handleInputForm}   
                sx={{width:800}}/> <br/><br/>
              <Autocomplete 
                value={valueType} 
                onChange={(event, newValue) => {
                  setValueType(newValue)
                  if(newValue === 'Employer'){
                    setCmbDisabled(false)
                  }else{
                    setCmbDisabled(true)
                  }
                }}
                id="role"
                name="role"
                options={optionsType}
                sx={{ width: 800 }}
                renderInput={(params) => <TextField {...params} variant='outlined' label="Role" />}
                /><br/>
              <FormControl sx={{width: 800}} variant='outlined'>
                <InputLabel htmlFor='password1'>Password</InputLabel>
                <OutlinedInput
                  id="password1"
                  name='password1'
                  error={error1Value}
                  type={password1Value ? 'text' : 'password'} 
                  variant="outlined" 
                  value={addValue.password1}
                  onChange={handleInputForm}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        arial-label="togle password visibility"
                        onClick={handleClickShowPassword1}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {password1Value ? <Visibility/> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password">
                </OutlinedInput>            
              </FormControl> <br /><br />
              <FormControl sx={{width: 800}} variant='outlined'>
                <InputLabel htmlFor='password2'>Re-Type Password</InputLabel>
                <OutlinedInput
                  id="password2"
                  name='password2'
                  error={error2Value}
                  type={password2Value ? 'text' : 'password'} 
                  variant="outlined" 
                  value={addValue.password2}
                  onChange={handleInputForm}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        arial-label="togle password visibility"
                        onClick={handleClickShowPassword2}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {password2Value ? <Visibility/> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Re-Type Password">
                </OutlinedInput>            
              </FormControl> <br /><br />
              <Autocomplete 
                value={companyValue || null}
                onChange={(event, newValue) => {setCompanyValue(newValue)}}
                id="company"
                disabled={cmbDisabled}
                name="company"
                options={companyOptions}
                sx={{ width: 800 }}
                renderInput={(params) => <TextField {...params} variant='outlined' label="Company" />}
                /><br/>
              <Button variant="contained" onClick={handleSaveData} ><SaveAltIcon />&nbsp;Add Account</Button>
          </Container>
          <Dialog
            id="errorDialog"
            open={errorDialog}
            onClose={handleErrorClose}
            aria-labelledby="Error"
            aria-describedby="Error"
            fullWidth={true}>
            <DialogContent>
              <DialogContentText id="errorDialog-content" fontSize={"large"}>
                  <ErrorIcon color="error" fontSize={"large"}/> &nbsp;
                  Passwords Missmatch. Please check the passwords!!
              </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant='contained' onClick={handleErrorClose}>Close</Button>
            </DialogActions>
          </Dialog>
          <Dialog
            id="successDialog"
            open={successDialog}
            onClose={handleSuccessClose}
            aria-labelledby="Success"
            aria-describedby="Success"
            fullWidth={true}>
            <DialogContent>
              <DialogContentText id="errorDialog-content" fontSize={"large"}>
                <CheckCircleOutlineIcon color="success" fontSize={"large"}/>
                &nbsp;New Account Data is added.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button variant='contained' onClick={handleSuccessClose}>Close</Button>
            </DialogActions>
          </Dialog>
        </Container>
    </Layout>
  )
}


export default AddAdmin
