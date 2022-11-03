import { FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, Typography, Button, Container, TextField} from '@mui/material'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import Layout from '../../components/layout-employer'
import _ from 'lodash'
import { SaveAlt } from '@mui/icons-material'
import { fetchData, postData } from '../../util/dbFunctions';

const EmployeePassword = () => {
    const router = useRouter()
    const accountID = useRouter().query.id

    const [empValue, setEmpValue] = useState({password1: '',password2: ''})
    const [accountData, setAccountData] = useState({fname:'',lname:'',password:'',role:'',email:''})
    const [password1Value, setPassword1Value] = useState(false)
    const [password2Value, setPassword2Value] = useState(false)
    const [error1Value, setError1Value]= useState(false)
    const [error2Value, setError2Value]= useState(false)
    const [errorMessage, setErrorMessage] = useState(null)

    useEffect(() => {
        const fetchingData = async() => {
            const fetchedAccountData = await fetchData('adminlist',`accountID=${accountID}`)
            setAccountData(fetchedAccountData[0])
        }
        fetchingData()
    },[accountID])

    const handleClickShowPassword1 = () => {
        setPassword1Value(!password1Value);
      };
    
    const handleClickShowPassword2 = () => {
        setPassword2Value(!password2Value);
      };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };
    
    const handleInputForm = (event) => {
        const fieldName = event.target.getAttribute("name")
        const fieldValue = event.target.value
        const newFormData = {...empValue}
        newFormData[fieldName] = fieldValue
        setEmpValue(newFormData)
        setError1Value(false)
        setError2Value(false)
        setErrorMessage(null)
    }

    const handleSaveData = async () => {
        if(empValue.password1 === empValue.password2){
            const tempData = {
                fname:accountData.fname,lname:accountData.lname,password:empValue.password1,role:accountData.role,email:accountData.email
            }
            console.log(tempData)
            if(await postData('adminlist',tempData,`accountID=${accountID}&changepassword=yes`) !== ''){
                router.push({
                pathname:'/dashboard',
                query: {role:'Employer'}
                })
            }    
        }else{
            setError1Value(true)
            setError2Value(true)
            setErrorMessage(<Typography align='left' fontSize={"medium"} color={'red'}>Password Missmatch</Typography>)
        }
    }

    return (
        <Layout>
            <Container>
                <br />
                <Typography variant='h5'>Update Password</Typography>
                <br />
                <div>
                {errorMessage}
                <br/>
                <FormControl sx={{width: 800}} variant='outlined'>
                <InputLabel htmlFor='password1'>Password</InputLabel>
                <OutlinedInput
                  id="password1"
                  name='password1'
                  error={error1Value}
                  type={password1Value ? 'text' : 'password'} 
                  variant="outlined" 
                  value={empValue.password1}
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
                  value={empValue.password2}
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
                </div>
                <div>
                    <Button variant="contained" onClick={handleSaveData} color='success'><SaveAlt />&nbsp;Update Password</Button>
                </div>
            </Container>
        </Layout>
  )
}

export default EmployeePassword