import { Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import BadgeIcon from '@mui/icons-material/Badge';
import LogoutIcon from '@mui/icons-material/Logout';
import Link from 'next/link';
import Image from 'next/image'
import LogoImage from '../images/lemondrop.png'
import { useRouter } from 'next/router';

const drawerWidth = 240;
const SidebarEmployee = () => {
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
                        query: {role:'Employee'}
                    }}>
                    <ListItemButton>
                        <ListItemIcon>
                            <BadgeIcon />
                        </ListItemIcon>
                        <ListItemText primary='Employee Info' />
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

export default SidebarEmployee
