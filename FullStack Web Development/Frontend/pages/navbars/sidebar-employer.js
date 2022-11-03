import { Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import LogoutIcon from '@mui/icons-material/Logout';
import Image from 'next/image'
import LogoImage from '../images/lemondrop.png'
import { useRouter } from 'next/router';
import Link from 'next/link';

const drawerWidth = 240;
const SidebarEmployer = () => {
    const router = useRouter()
    const handleClickLogout = () =>{
        localStorage.clear()
        router.push({
            pathname:'/'
        })
    }   
  return (
    <div>
      <Box className='flex'>
        <Drawer sx={{ width: drawerWidth, flexShrink: 0,'& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box', },}} variant='permanent' anchor="left" >
            <Toolbar>
                <Image src={LogoImage}  alt=''/>
            </Toolbar>
            <Divider />
            <List>
                <ListItem key={1}>
                    <Link href={{
                        pathname: '/dashboard',
                        query: { 
                            role:'Employer'}
                    }}>
                    <ListItemButton>
                        <ListItemIcon>
                            <AssignmentIndIcon />
                        </ListItemIcon>
                        <ListItemText primary='Employee List' />
                    </ListItemButton>
                    </Link>
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem key={2}>
                        <ListItemButton onClick={handleClickLogout}>
                            <ListItemIcon>
                                <LogoutIcon />
                            </ListItemIcon>
                            <ListItemText primary='Logout' />
                        </ListItemButton>
                </ListItem>
            </List>
        </Drawer>
      </Box>
    </div>
  )
}

export default SidebarEmployer
