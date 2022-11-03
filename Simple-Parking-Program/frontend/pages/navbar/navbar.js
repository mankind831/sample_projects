//Needed Imports to run this component
import { Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCar, faGears } from "@fortawesome/free-solid-svg-icons"
import Link from 'next/link';
import Image from 'next/image'
import { useRouter } from 'next/router';

const drawerWidth = 240;
const NavBar = () => {//Componet for NavBar
  return (
    <div>
      <Box className='flex'>
        <Drawer sx={{ width: drawerWidth, flexShrink: 0,'& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box', },}} variant='permanent' anchor="left" >
            <Toolbar>
                {/* <Image src={LogoImage}  alt=''/> */}
            </Toolbar>
            <Divider />
            <List>
                <ListItem key={1}>
                    <Link href={{pathname:'/'}}>
                        <ListItemButton>
                            <ListItemIcon>
                                <FontAwesomeIcon icon={faCar} />
                            </ListItemIcon> 
                            <ListItemText primary='Parking Area' />
                        </ListItemButton>
                    </Link>
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem key={2}>
                    <Link href={{
                        pathname: '/configuration/parkingslot'
                    }}>
                        <ListItemButton>
                            <ListItemIcon>
                                <FontAwesomeIcon icon={faGears} />
                            </ListItemIcon>
                            <ListItemText primary='Parking Slot' />
                        </ListItemButton>
                    </Link>
                </ListItem>
            </List>
            <List>
                <ListItem key={3}>
                    <Link href={{
                        pathname: '/configuration/vehicletype'
                    }}>
                        <ListItemButton>
                            <ListItemIcon>
                                <FontAwesomeIcon icon={faGears} />
                            </ListItemIcon>
                            <ListItemText primary='Vehicle Types' />
                        </ListItemButton>
                    </Link>
                </ListItem>
            </List>
        </Drawer>
      </Box>
    </div>
  )
}

export default NavBar
