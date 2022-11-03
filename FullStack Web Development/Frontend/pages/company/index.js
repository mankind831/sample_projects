import { Table, TableBody, TableCell, TableHead, TableRow, Button, Container, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Layout from '../components/layout-admin'
import Link from 'next/link'
import _ from 'lodash'
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import AddBoxIcon from '@mui/icons-material/AddBox';
import axios from 'axios'
import { fetchData } from '../util/dbFunctions'
import BusinessIcon from '@mui/icons-material/Business';

const Index = () => {

    const [companyList, setCompanyList] = useState([])

    useEffect(() => {
        const fetchingData = async () =>{
            setCompanyList(await fetchData('company'))
        }
        fetchingData()
    },[])

  const DisplayTable = () =>{
    const rows = _.map(companyList,(record,index) => {
        return(
            <TableRow key={index}>
                <TableCell><BusinessIcon/></TableCell>
                <TableCell>{record.name}</TableCell>
                <TableCell>{record.address}</TableCell>
                <TableCell>{record.monthlyLeave}</TableCell>
                <TableCell>{record.monthlyOvertime}</TableCell>
                <TableCell>
                    <Link href={{
                        pathname: '/company/form',
                        query: {id:record.compID}}}>
                        <Button variant="contained" color="success">
                            <DriveFileRenameOutlineIcon/>&nbsp;Update Company Info
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
        <Container sx={{width:3000}}><br />
        <Typography variant='h5'>Company List</Typography><br />
            <Table>
                <TableHead sx={{backgroundColor:'yellow'}}>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell sx={{color:'black', fontWeight:'bold'}}>Company Name</TableCell>
                        <TableCell sx={{color:'black', fontWeight:'bold'}}>Address</TableCell>
                        <TableCell sx={{color:'black', fontWeight:'bold'}}>Leave Limit</TableCell>
                        <TableCell sx={{color:'black', fontWeight:'bold'}}>Overtime Limit</TableCell>
                        <TableCell sx={{color:'black', fontWeight:'bold'}}></TableCell>
                    </TableRow>
                </TableHead>
                <DisplayTable />
            </Table><br />
        <Link href={{pathname: '/company/form'}}>  
            <Button variant="contained" ><AddBoxIcon/>&nbsp;Add Company</Button>            
        </Link>
        </Container>
    </Layout>
  )
}

export default Index