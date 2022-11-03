import { Button, Card, Container, TextField, Typography, Autocomplete, CardContent, FormControl, InputLabel, Input, InputAdornment, IconButton} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LoginIcon from '@mui/icons-material/Login';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import _ from 'lodash'
import { postData, fetchData } from './util/dbFunctions'

const Login = () => {
    const router = useRouter()

    const [accountValue, setAccountValue] = useState({username:'', password:''})
    const [errorValue, setErrorValue] = useState(null)
    const [passwordValue, setPasswordValue] = useState(false)
    const [accountType, setAccountType] = useState('')
    const [accntID, setAccntID] = useState('')
    const [acctValue, setAcctValue] = useState({})

    
    const handleInputForm = (event) => {
        const fieldName = event.target.getAttribute("name")
        const fieldValue = event.target.value
        const newFormData = {...accountValue}
        newFormData[fieldName] = fieldValue
        setAccountValue(newFormData)
        errorMessage(false)
      }

    const handleRedirect = async () => {
        if(await checkAccount(accountValue.username,accountValue.password) === true){
            if(accountType === 'Administrator'){
                router.push({
                    pathname:'/dashboard',
                    query: {role:accountType,
                            type:'admin'}
                })
            }else if(accountType  === 'Employee'){
                localStorage.setItem('employeeID',await retreiveEmpID())
                router.push({
                    pathname:'/dashboard',
                    query: { role:accountType}
                })
            }else if(accountType  === 'Employer'){
                const emplyrInfo = await fetchData('employer',`accountID=${accntID}`)
                localStorage.setItem('compID',emplyrInfo[0].compID)
                localStorage.setItem('employer',accntID)
                router.push({
                    pathname:'/dashboard',
                    query: { role:accountType }
                })
            }
        }else{
            errorMessage(true)
        }
    }

    const checkAccount = async (username, password) => {
        const chkLoginValue = await postData("login",{email:username,password:password})
        if(chkLoginValue.result === true){
            setAccountType(chkLoginValue.role)
            setAccntID(chkLoginValue.accountID)
        }
        return chkLoginValue.result
    }

    const retreiveEmpID = async () => {
        const fetchedEmployeeData = await fetchData('employer/employee',`accountID=${accntID}`)
        return fetchedEmployeeData[0].empID
    } 

    const errorMessage = (boolChoose) => {  
        if(boolChoose === true){
             setErrorValue(<Typography align='center' fontSize={"small"} color={'red'}>No account matches with that username or password</Typography>)
        }
        else{
            setErrorValue(null)
        }
    }

    const handleClickShowPassword = () => {
        setPasswordValue(!passwordValue);
      };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
        };

  return (
    <Container>
        <div className="flex flex-wrap overflow-hidden">
            <div className="w-full overflow-hidden">
                <Card sx={{height:100}}>
                    &nbsp;
                </Card>
            </div>
            <div className="w-full overflow-hidden flex justify-center">
                <div className='drop-shadow-2xl border-bold'>
                <Card sx={{width:400, height: 500}} variant='outlined'  >
                    <CardContent>
                        <div className='flex justify-center'>
                            <AccountCircleIcon sx={{width:100, height:100}}/>
                        </div>
                        <br />
                        <br />
                        <div className='flex justify-center'>
                            <Typography variant='h6' >Login to your Acccount</Typography>
                        </div>
                        <br />
                        {errorValue}
                        <br />
                        <div className=''>
                            <Container>
                                <TextField id="username" data-testid='username' name="username" label='Email Address' variant='standard' sx={{width:320}} onChange={handleInputForm} /><br/><br/>
                                <FormControl sx={{width: 320}} variant="standard">
                                    <InputLabel htmlFor='password'>Password</InputLabel>
                                    <Input
                                    id="password"
                                    name='password'
                                    data-testid='password'
                                    type={passwordValue ? 'text' : 'password'} 
                                    variant="standard" 
                                    value={accountValue.password}
                                    onChange={handleInputForm}
                                    endAdornment={
                                        <InputAdornment position='end'>
                                        <IconButton
                                            arial-label="togle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end">
                                            {passwordValue ? <Visibility/> : <VisibilityOff/>}
                                        </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Password">
                                    </Input>            
                                </FormControl>
                            </Container>
                        </div>
                        <br /><br /><br />
                        <div className='flex justify-center'>
                            <Button 
                                id='loginButton' 
                                namne='loginButton'
                                variant='contained'
                                data-testid='loginButton' 
                                size='large' 
                                color='success' 
                                sx={{width:350}}
                                onClick={handleRedirect}>
                                <LoginIcon />&nbsp;Login
                            </Button>
                        </div>
                    </CardContent>
                </Card>
                </div>
            </div>
        </div>
    </Container>
  )
}

export default Login
