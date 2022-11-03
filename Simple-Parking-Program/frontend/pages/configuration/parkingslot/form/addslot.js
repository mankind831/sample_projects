//Needed imports to run this component
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Container, TextField, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import Layout from '../../../component/layout'
import {postData} from '../../../util/dbFunctions'

const AddSlot = () => {//Component for add new parkingslot
  const router = useRouter()

  const [inputValue, setInputValue] = useState({slot:'',gateway:''})//useState varaible

  //function handles input to the state
  const handleInputForm = (event) => {
    const fieldName = event.target.getAttribute("name")
    const fieldValue = event.target.value
    const newFormData = {...inputValue}
    newFormData[fieldName] = fieldValue
    setInputValue(newFormData)
  }

  //function handles saving data to the server
  const handleSaveData = async () => {
    if(await postData('parkingslot',inputValue) !== ''){
        router.push({
            pathname:'/configuration/parkingslot'
        })
    }
  }

  return (
    <Layout>
      <Container>
         <br />
         <br />
         {/* Page Header */}
         <Typography variant='h5'>Add New Parking Slot</Typography>
         <br />
         {/* Page Body */}
         <TextField 
            id="slot" 
            name="slot"
            label="Slot No."  
            variant="outlined"
            value={inputValue.slot}
            onChange={handleInputForm}   
            sx={{width:500}}/> <br/><br/>
        <TextField 
            id="gateway"
            name='gateway'
            label="Gateway" 
            variant="outlined"
            value={inputValue.gateway}
            onChange={handleInputForm}   
            sx={{width:500}}/> <br/><br/>
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

export default AddSlot
