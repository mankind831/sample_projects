//Needed imports to run this component
import { faCarSide, faSquarePlus, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import _ from 'lodash'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Layout from '../../component/layout'
import { deleteData, fetchData } from '../../util/dbFunctions'

const VehicleType = () => {//Component for Displaying Vehicle Types
  
  const [typeList, setTypeList] = useState([])//useState Variable

  useEffect(() => {//useEffect for fetching data from server
    const fetchingData = async() => {
        setTypeList(_.sortBy(await fetchData('vehicletype'),['vehicleType']))
    }
    fetchingData()
  },[])

  //function handles deleting data
  const handleDeleteItem = async (item) => {
    if(await deleteData('vehicletype',`typeID=${item.typeID}`) !== ''){
        setTypeList(await fetchData('vehicletype'))
    }
  }

  //function for display data to the table
  const DisplayType = () => {
    const rows = _.map(typeList,(item,index) => {
        return(
            <TableRow key={index}>
                <TableCell size='small'>
                    <FontAwesomeIcon icon={faCarSide} className='fa-2x'/>
                </TableCell>
                <TableCell size='small'>{item.typeID}</TableCell>
                <TableCell size='small'>{item.vehicleType}</TableCell>
                <TableCell size='small'> P {parseFloat(item.price).toFixed(2)}</TableCell>
                <TableCell size='small'>
                    <Button variant='contained' color='error' sx={{fontWeight:'bold',width:300, height:35}} onClick={async () => handleDeleteItem(item)}>
                        <FontAwesomeIcon icon={faTrashCan} className='fa-1x' />
                        &nbsp;
                        Delete Vehicle Type
                    </Button>
                </TableCell>
            </TableRow>
        )
    })

    return <TableBody>{rows}</TableBody>
  }

  return (
    <Layout>
        <Container maxWidth='xl' sx={{width:3000}}>
            <br />
            {/* Page Header */}
            <div className='flex'>
                <Typography variant='h5' sx={{fontWeight:'bold'}}>
                    List of Vehicle Type
                </Typography>
            </div>
            <br />
            {/* Page Body */}
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 600 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead sx={{backgroundColor:'darkgreen', height:20}}>
                            <TableRow>
                                <TableCell sx={{backgroundColor:'navy', color:'white',width:75}}></TableCell>
                                <TableCell sx={{backgroundColor:'navy', color:'white',fontWeight:'bold', width:400}}>Type ID</TableCell>
                                <TableCell sx={{backgroundColor:'navy', color:'white',fontWeight:'bold', width:300}}>Vehicle Type</TableCell>
                                <TableCell sx={{backgroundColor:'navy', color:'white',fontWeight:'bold', width:300}}>Price</TableCell>
                                <TableCell sx={{backgroundColor:'navy', color:'white'}}></TableCell>
                            </TableRow>
                        </TableHead>
                        <DisplayType />
                    </Table>
                </TableContainer>
            </Paper>
            <br />
            <br />
            {/* Page Footer */}
            <Link href={{pathname:'/configuration/vehicletype/form'}}>
                <Button variant='contained' color='success' sx={{fontWeight:'bold',width:325, height:50}}>
                    <FontAwesomeIcon icon={faSquarePlus} className='fa-2x' />
                    &nbsp;
                    Add New Vehicle Type
                </Button>
            </Link>
        </Container>
    </Layout>
  )
}

export default VehicleType
