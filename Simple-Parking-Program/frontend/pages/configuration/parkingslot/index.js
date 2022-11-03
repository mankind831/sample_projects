import { faSquareParking, faSquarePlus, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import _ from 'lodash'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Layout from '../../component/layout'
import { deleteData, fetchData } from '../../util/dbFunctions'

const ParkingSlot = () => {//Component for displaying ParkingSlot
  
  const [slotList, setSlotList] = useState([])//useState variable for storing data

  useEffect(() => {//useEffect for fetchingData from database
    const fetchingData = async() => {
        setSlotList(_.sortBy(await fetchData('parkingslot'),['gateway','slot']))
    }
    fetchingData()
  },[])

  //function for deleting data
  const handleDeleteItem = async (item) => {
    if(await deleteData('parkingslot',`slot=${item.slot}&gateway=${item.gateway}`) !== ''){
        setSlotList(_.sortBy(await fetchData('parkingslot'),['gateway','slot']))
    }
  }

  //function for displaying datat to the table
  const DisplaySlot = () => {
    const rows = _.map(slotList,(item,index) => {
        return(
            <TableRow key={index}>
                <TableCell size='small'>
                    <FontAwesomeIcon icon={faSquareParking} className='fa-2x'/>
                </TableCell>
                <TableCell size='small'>{item.slot}</TableCell>
                <TableCell size='small'>{item.gateway}</TableCell>
                <TableCell size='small'>{item.status}</TableCell>
                <TableCell size='small'>
                    <Button variant='contained' color='error' sx={{fontWeight:'bold',width:300, height:35}} onClick={async () => handleDeleteItem(item)}>
                        <FontAwesomeIcon icon={faTrashCan} className='fa-1x' />
                        &nbsp;
                        Delete Parking Slot
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
                    List of Parking Slot
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
                                <TableCell sx={{backgroundColor:'navy', color:'white',fontWeight:'bold', width:300}}>Slot No.</TableCell>
                                <TableCell sx={{backgroundColor:'navy', color:'white',fontWeight:'bold', width:300}}>Gateway</TableCell>
                                <TableCell sx={{backgroundColor:'navy', color:'white',fontWeight:'bold', width:300}}>Status</TableCell>
                                <TableCell sx={{backgroundColor:'navy', color:'white'}}></TableCell>
                            </TableRow>
                        </TableHead>
                        <DisplaySlot />
                    </Table>
                </TableContainer>
            </Paper>
            <br />
            <br />
            {/* Page Footer */}
            <Link href={{pathname:'/configuration/parkingslot/form'}}>
                <Button variant='contained' color='success' sx={{fontWeight:'bold',width:325, height:50}}>
                    <FontAwesomeIcon icon={faSquarePlus} className='fa-2x' />
                    &nbsp;
                    Add New Slot
                </Button>
            </Link>
        </Container>
    </Layout>
  )
}

export default ParkingSlot
