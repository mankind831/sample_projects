import { Table, TableHead, TableBody, TableRow, TableCell, Button, Container, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Layout from '../components/layout-admin'
import Link from 'next/link'
import _ from 'lodash'
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { fetchData } from '../util/dbFunctions'
import AccountBoxIcon from '@mui/icons-material/AccountBox';

const Index = () => {

    const [accountList, setAccountList] = useState([])

  useEffect( () => {
    const fetchingData = async () => {
        setAccountList(_.sortBy(await fetchData('adminlist'),data => data.lname))
    }
    fetchingData()
  },[])

  const DisplayTable = () => {
    const rows = _.map(accountList,(record, index) => {
        return(
            <TableRow key={index}>
                <TableCell><AccountBoxIcon/></TableCell>
                <TableCell>{record.fname}</TableCell>
                <TableCell>{record.lname}</TableCell>
                <TableCell>{record.email}</TableCell>
                <TableCell>{record.role}</TableCell>
                <TableCell>
                        <Link href={{
                        pathname: '/administrator/form',
                        query: {id:record.accountID}}}>
                        <Button variant="contained" color="success">
                            <DriveFileRenameOutlineIcon/>&nbsp;Update Account
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
        <Typography variant='h5'>User Accounts</Typography>
        <br />
        <Table>
            <TableHead sx={{backgroundColor:'yellow'}}>
                <TableRow>
                    <TableCell></TableCell>
                    <TableCell sx={{color:'black', fontWeight:'bold'}}>First Name</TableCell>
                    <TableCell sx={{color:'black', fontWeight:'bold'}}>Last Name</TableCell>
                    <TableCell sx={{color:'black', fontWeight:'bold'}}>Email Address</TableCell>
                    <TableCell sx={{color:'black', fontWeight:'bold'}}>Role</TableCell>
                    <TableCell sx={{color:'black', fontWeight:'bold'}}></TableCell>
                </TableRow>
            </TableHead>
            <DisplayTable />
        </Table> <br />
        <Link href={{
            pathname: '/administrator/form'
        }}>  
            <Button variant="contained" ><AddBoxIcon/>&nbsp;Add User</Button>            
        </Link>
        </Container>
    </Layout>
  )
}

export default Index
