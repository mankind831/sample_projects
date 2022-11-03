import { Typography, Container, TextField, Button, Dialog, DialogContent, DialogContentText, DialogActions } from '@mui/material'
import React, { useEffect, useState } from 'react'
import LayoutAdmin from '../../components/layout-admin'
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useRouter } from 'next/router';
import _ from 'lodash'
import { fetchData, postData } from '../../util/dbFunctions'

const EditCompany = () => {
    const router = useRouter()
    const routerData = useRouter().query.id
    const [companyValue, setCompanyValue] = useState({name:'',address:'',monthlyLeave:'',monthlyOvertime:''})
    const [successDialog, setSuccessDialog] = useState(false)

    useEffect(() => {
      const fetchingData = async () => {
        const fetchedData = await fetchData('company',`compID=${routerData}`)
        setCompanyValue(fetchedData[0])
      }
  
      fetchingData()
    },[routerData])

    const handleInputForm = (event) => {
        const fieldName = event.target.getAttribute("name")
        const fieldValue = event.target.value
        const newFormData = {...companyValue}
        newFormData[fieldName] = fieldValue
        setCompanyValue(newFormData)
      }

    const handleSuccesOpen = () =>{
      setSuccessDialog(true)
    }

    const handleSaveData = async () =>{
      const blankData = {
          name:'',
          address:'',
          monthlyLeave:'',
          monthlyOvertime:''
      }

      if(await postData('company',companyValue,`compID=${routerData}`)){
        handleSuccesOpen()
        setCompanyValue(blankData)
      }
    }
    
    const handleSuccessClose = () =>{
      setSuccessDialog(false)
      router.push({
        pathname:'/dashboard',
        query:{
          role:'Administrator',
          type:'company'
        }
      })
    }

  return (
    <LayoutAdmin>
        <Container>
            <br />
            <Typography variant='h5'>Update Company</Typography>
            <br />
            <TextField 
               id="name" 
               name="name"
               label="Company Name"  
               variant="outlined"
               value={companyValue.name}
               onChange={handleInputForm}   
               sx={{width:800}}
            /><br /><br />
            <TextField 
               id="address" 
               name="address"
               label="Company Address"  
               variant="outlined"
               value={companyValue.address}
               onChange={handleInputForm}   
               sx={{width:800}}
            /><br /><br />
            <TextField 
               id="monthlyLeave" 
               name="monthlyLeave"
               label="Leave Limit per Month"  
               variant="outlined"
               value={companyValue.monthlyLeave}
               onChange={handleInputForm}   
               sx={{width:800}}
            /><br /><br />
            <TextField 
               id="monthlyOvertime" 
               name="monthlyOvertime"
               label="Overtime Limit per Month"  
               variant="outlined"
               value={companyValue.monthlyOvertime}
               onChange={handleInputForm}   
               sx={{width:800}}
            /><br /><br />
            <Button variant="contained" onClick={handleSaveData} ><SaveAltIcon />&nbsp;Update Company Information</Button>
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
                &nbsp;Company Information is updated.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button variant='contained' onClick={handleSuccessClose}>Close</Button>
            </DialogActions>
          </Dialog>
    </LayoutAdmin>
  )
}

export default EditCompany