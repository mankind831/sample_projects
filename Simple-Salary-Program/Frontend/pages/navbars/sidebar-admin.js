import { AppBar, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutIcon from '@mui/icons-material/Logout';
import Link from 'next/link';
import Image from 'next/image'
import LogoImage from '../images/lemondrop.png'
import StorefrontIcon from '@mui/icons-material/Storefront';
import { useRouter } from 'next/router';

const drawerWidth = 240;
const SidebarAdmin = () => {
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
                            role:'Administrator',
                            type: 'company'
                        }
                    }}>
                    <ListItemButton>
                        <ListItemIcon>
                            <StorefrontIcon />
                        </ListItemIcon>
                        <ListItemText primary='Companies' />
                    </ListItemButton>
                    </Link>
                </ListItem>
                <ListItem key={2}>
                    <Link href={{
                        pathname: '/dashboard',
                        query: {
                            role:'Administrator',
                            type: 'admin'
                        }
                    }}>
                    <ListItemButton>
                        <ListItemIcon>
                            <AccountBoxIcon />
                        </ListItemIcon>
                        <ListItemText primary='Users' />
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

export default SidebarAdmin
