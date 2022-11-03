//Needed imports to run this component
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Container, FormControl, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import Layout from '../../../component/layout'
import {postData} from '../../../util/dbFunctions'

const AddVehicle = () => {//Component for add new vehicletype
  const router = useRouter()
  const [inputValue, setInputValue] = useState({vehicleType:'',price:''})//useState Variable

  //function handles for inputing data to useState variable
  const handleInputForm = (event) => {
    const fieldName = event.target.getAttribute("name")
    const fieldValue = event.target.value
    const newFormData = {...inputValue}
    newFormData[fieldName] = fieldValue
    setInputValue(newFormData)
  }

  //function for saving the data
  const handleSaveData = async () => {
    if(await postData('vehicletype',inputValue) !== ''){
        router.push({
            pathname:'/configuration/vehicletype'
        })
    }
  }

  return (
    <Layout>
      <Container>
         <br />
         <br />
         {/* Page Header */}
         <Typography variant='h5'>Add New Vehicle Type</Typography>
         <br />
         {/* Page Body */}
         <TextField 
            id="vehicleType" 
            name="vehicleType"
            label="Vehicle Type"  
            variant="outlined"
            value={inputValue.vehicleType}
            onChange={handleInputForm}   
            sx={{width:500}}/> <br/><br/>
        <FormControl>
            <InputLabel htmlFor='price'>Price</InputLabel>
            <OutlinedInput 
            id='price'
            name='price'
            value={inputValue.price}
            label='Price'
            onChange={handleInputForm}
            startAdornment={<InputAdornment position='start'>₱</InputAdornment>}
            endAdornment={<InputAdornment position='end'>.00</InputAdornment>}
            sx={{width:500}}
            inputProps={{style:{textAlign:'right'}}}
            />
        </FormControl>
        <br /><br />
        {/* Page Footer */}
        <Button variant='contained' sx={{fontWeight:'bold',width:325, height:50}} onClick={handleSaveData} >
            <FontAwesomeIcon icon={faFloppyDisk} className='fa-2x' />
            &nbsp;
            Save Information
        </Button>
      </Container>
    </Layout>
  )
}

export default AddVehicle
