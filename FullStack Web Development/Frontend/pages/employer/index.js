import { TableHead, Table, TableRow, TableBody, TableCell, Button, Typography, TextField, Container, Box } from '@mui/material'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Layout from '../components/layout-employer'
import PageviewIcon from '@mui/icons-material/Pageview';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { useRouter } from 'next/router';
import _ from 'lodash'
import { format } from 'date-fns';
import { fetchData, postData } from '../util/dbFunctions';
import Image from 'next/image'
import LogoImage from '../images/lemondrop.png'
import EditIcon from '@mui/icons-material/Edit';
import KeyIcon from '@mui/icons-material/Key';
import BadgeIcon from '@mui/icons-material/Badge';  
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';

const Index = () => {
    const router = useRouter()
    const localData = typeof window !== "undefined" ? localStorage.getItem('compID'):null
    const employerAccount = typeof window !== "undefined" ? localStorage.getItem('employer'):null

    const [employeeList, setEmployeeList] = useState([])
    const [companyInfo, setCompanyInfo] = useState({name:'',address:'',monthlyLeave:'',monthlyOvertime:''})
    const [uploadData, setUploadData] = useState(0)
    const [picValue, setPicValue] = useState("")

    useEffect(() => {
        const fetchingData = async () => {
            const fetchedCompanyData = await fetchData('company',`compID=${localData}`)
            const fetchedEmployeeData = await fetchData('employer/employee',`compID=${localData}`)
            const fetchedImageData = await fetchData('upload_company',`compID=${localData}`)
            setCompanyInfo(fetchedCompanyData[0])
            setEmployeeList(_.sortBy(fetchedEmployeeData,employee => employee.lname))
            setPicValue(fetchedImageData.length > 0 ? fetchedImageData[0].urlImage : LogoImage)
            setUploadData(fetchedImageData.length)
        }
        fetchingData()
    },[localData,picValue])

    const handleClickRedirect = () => {
        router.push({
            pathname:'/employer/form',
        })
    }

    const handleRedirectToPage = (employeeID) => {
        localStorage.setItem('employee_info', employeeID)
        router.push({
            pathname:'/employer/[employee_info]',
            query: {employee_info:employeeID}
        })
    }

    const handleUpdateRoute = () => {
        router.push({
          pathname:'/employer/profile/employer_update',
          query: {id:localData}
        })
      }

    const handlePasswordRoute = () => {
        router.push({
          pathname:'/employer/profile/employer_password',
          query: {id:employerAccount}
        })
      }

      const handlePicChange = async (e) => {
        const formData = new FormData()
        formData.append('file',e.target.files[0])
        formData.append('upload_preset','my-uploads')
        const data = await fetch('https://api.cloudinary.com/v1_1/mankind831/image/upload',{
          method: 'POST',
          body: formData
        }).then(r => r.json())
    
        var condition = `compID=${localData}`
    
        if(uploadData > 0){
          condition = `compID=${localData}&update=yes`
        }
    
        if(await postData('upload_company',{urlImage:data.secure_url},condition) !== ''){
          setPicValue(data.secure_url)
        }
      }

    const DisplayList = () =>{
        const rows = _.map(employeeList,(record,index) => {
            return(
                <TableRow key={index}>
                    <TableCell><BadgeIcon/></TableCell>
                    <TableCell>{record.fname}&nbsp;{record.lname}</TableCell>
                    <TableCell>{record.jobtitle}</TableCell>
                    <TableCell>{record.employmentType}</TableCell>
                    <TableCell align='right'>$&nbsp;{record.hourlyRate+".00"}</TableCell>
                    <TableCell>
                        <Button variant='contained' onClick={() => {handleRedirectToPage(record.empID)}} size='large' color="success">
                            <PageviewIcon />&nbsp;
                            View Info
                        </Button>
                    </TableCell>
                    <TableCell>
                        <Link href={{
                            pathname:'/employer/form',
                            query:{id:record.empID}
                        }}>
                            <Button variant='contained' size='large' color="warning">
                                <DriveFileRenameOutlineIcon />
                                &nbsp;Edit Info
                            </Button>
                        </Link>
                    </TableCell>
                </TableRow>
            )
        })
        return <TableBody>{rows}</TableBody>
    }

    return (
        <Layout>
            <Container sx={{width:3000}}>
                <br />
                <div className='flex justify-between'>
                <Typography variant='h5'>Company Information</Typography>
                <Typography variant='h6'>{format(new Date(), "MMMM yyyy")}</Typography>
                </div>
                <br />
                <div className='flex'>
                    <div>
                        {picValue && (<Image src={picValue} sx={{style:{border:1}}} width={300} height={210} alt=''/>)}    
                    </div>
                    &nbsp;&nbsp;&nbsp;
                    <div>
                        <TextField 
                        id="name" 
                        name="name"
                        label="Company Name"  
                        variant="outlined"
                        value={companyInfo.name}
                        sx={{width:800}}
                        /><br /><br />
                        <TextField 
                        id="address" 
                        name="address"
                        label="Company Address"  
                        variant="outlined"
                        value={companyInfo.address}
                        sx={{width:800}}
                        /><br /><br />
                        <TextField 
                        id="monthlyLeave" 
                        name="monthlyLeave"
                        label="Leave Limit per Month"  
                        variant="outlined"
                        value={companyInfo.monthlyLeave}
                        sx={{width:395}}
                        /> &nbsp;
                        <TextField 
                        id="monthlyOvertime" 
                        name="monthlyOvertime"
                        label="Overtime Limit per Month"  
                        variant="outlined"
                        value={companyInfo.monthlyOvertime}
                        sx={{width:395}}
                        />
                    </div>
                </div>
                <br />
                <div>
                    <Button variant="contained" color="success" onClick={handleUpdateRoute} sx={{height:50, width: 290}}><EditIcon />&nbsp;Edit Information</Button>
                    &nbsp;&nbsp;
                    <Button variant="contained" color="warning" onClick={handlePasswordRoute} sx={{height:50 , width: 290}}><KeyIcon />&nbsp;Change Password</Button>
                    &nbsp;&nbsp;
                    <Button variant="contained" color="info" size='medium' sx={{height:50, width: 300}} component='label'>
                        <PhotoCameraIcon />&nbsp;Change Company Picture
                        <input hidden accept='image/*' type='file' id='fileUpload' name='fileUpload' onChange={e => handlePicChange(e)}/>
                    </Button>
                </div>
                <br /><br />
                <Typography variant='h6'>Employee List</Typography>
                <br />
                <Table size="medium" sx={{width:1}}>
                    <TableHead sx={{backgroundColor:'yellow'}}>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell sx={{color:'black', fontWeight:'bold'}}>Name</TableCell>
                            <TableCell sx={{color:'black', fontWeight:'bold'}}>Job Title</TableCell>
                            <TableCell sx={{color:'black', fontWeight:'bold'}}>Status</TableCell>
                            <TableCell sx={{color:'black', fontWeight:'bold'}}>Salary per Hour</TableCell>
                            <TableCell sx={{color:'black', fontWeight:'bold'}}></TableCell>
                            <TableCell sx={{color:'black', fontWeight:'bold'}}></TableCell>
                        </TableRow>
                    </TableHead>
                    <DisplayList />
                </Table>
                <br/>
                <div className='flex justify-between'>
                    <Button variant='contained' size='large' onClick={handleClickRedirect} color="info">
                        <AddBoxIcon /> &nbsp;
                        Add Employee
                    </Button>
                </div>
            </Container>
        </Layout>
        )
    }

export default Index
