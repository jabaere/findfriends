import React, { useState,useEffect } from 'react'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { useRouter } from 'next/router';
import { GiHollowCat } from "react-icons/gi";
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import SearchIcon from '@mui/icons-material/Search';
import Avatar from '@mui/material/Avatar';
import {useWindowSize} from '../hooks/windowSize'
import {MobileHeaderModal} from './MobileHeader'
export const Header = () => {
  
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const router = useRouter()
  const isAnnnouncements = router.pathname === '/announcements/page/[page]' 
  const {user,logoutUser,handleSearch} = useContext(AuthContext)
  const window = useWindowSize()
 

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSearchText = (e) => {
    handleSearch(e.target.value)
    console.log(e.target.value)
    //setSearchText(e.target.value)
  }
 
  return (
  <>
  {
    window.width > 600 ?
    <header className={styles.header}>
    <div className={styles.logo}>
      <Link href='/'>
        <a>
          <GiHollowCat style={{width:'72px',height:'42px'}}/>
        </a>
      </Link> 
     {isAnnnouncements && <Paper
      component="form"
      sx={{display: 'flex', alignItems: 'center', width: 250, backgroundColor:'gold' }}
    >
       <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search friends"
        inputProps={{ 'aria-label': 'search friends' }}
        onChange={handleSearchText}
      />
      <IconButton 
          type="submit" 
          sx={{ p: '10px' }} 
          aria-label="search" 
          /*</Paper>onClick={()=> router.push(`?filters[title][$contains]=${searchText}`)} */>
        <SearchIcon />
      </IconButton>
      </Paper>
     }
    </div>
    
    {!user? <div className={styles.loginRegister}>
          <Link href='/announcements'><a>Find your future friend</a></Link>
          <Link href='/login'><a>login/register</a></Link>
         
      </div> 
      :
      <div className={styles.loginRegister}>
        <Link href='/announcements/page/1'><a>Find your future friend</a></Link>
        <Link href='/profile'><a>{user.email}</a></Link>
 
      <Avatar 
        variant="rounded"
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{
          cursor:'pointer',
          bgcolor: "cadetblue" 
        }}
         >
        {user && user.email.slice(0,1)}
      </Avatar>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        sx={{
          fontFamily: 'Fredoka'
        }}
      >
        <MenuItem 
           onClick={handleClose}  
           sx={{
          fontFamily: 'Fredoka'
        }}>
          <Link href='/profile'><a>Profile</a></Link>
        </MenuItem>
        <MenuItem 
           onClick={handleClose}
           sx={{
           fontFamily: 'Fredoka'
          }}
           >
           <Link href='/NewAnnouncements'><a>Add statement</a></Link>  
          </MenuItem>
        <MenuItem 
          onClick={handleClose}
          sx={{
            fontFamily: 'Fredoka'
          }}
          >
            <Link href='/UserAnnouncements'><a>My statements</a></Link>
          </MenuItem>
        <MenuItem 
         onClick={logoutUser}
         sx={{
          fontFamily: 'Fredoka'
        }}
         >
           Logout
          </MenuItem>
      </Menu>
    </div>

    }
    </header>
    :
    <MobileHeaderModal/>
  }
  
  </>
   
  )
}
