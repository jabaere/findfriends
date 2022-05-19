import React, { useState,useEffect } from 'react'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Button from '@mui/material/Button';
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
import MenuIcon from '@mui/icons-material/Menu';
import {useWindowSize} from '../hooks/windowSize'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CancelTwoToneIcon from '@mui/icons-material/CancelTwoTone';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const MobileHeaderModal = () =>  {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [auth,setAuth] = useState(true)
  const [anchorEl, setAnchorEl] = useState(null);
  //const [searchText,setSearchText] = useState(null)
  const [email] = useState('kobriashvili@gmail.com')
  // open = Boolean(anchorEl);
  const router = useRouter()
  const isAnnnouncements = router.pathname === '/announcements' 

  const {user,logoutUser,handleSearch} = useContext(AuthContext)
  const window = useWindowSize()
  useEffect(()=> {
    console.log(window)
  })

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleSearchText = (e) => {
    handleSearch(e.target.value)
    console.log(e.target.value)
    //setSearchText(e.target.value)
  }

  return (
    <div>
        <Box style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:10}}>
        <MenuIcon onClick={handleOpen}/>
        {isAnnnouncements && <Paper
      component="form"
      sx={{display: 'flex', width: 250, backgroundColor:'gold' }}
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
     <Box></Box>
     </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{backgroundColor:'gray'}}
      >
       <header className={styles.header}>
           <Box style={{width:'100%', display:'flex',justifyContent:'flex-end',padding:10,cursor:'pointer'}}>
       <CancelTwoToneIcon onClick={handleClose} sx={{color:'gold'}}/>
       </Box>
    <div className={styles.logo}>
      <Link href='/'>
        <a>
          <GiHollowCat style={{width: window.size > 600 ? '72px' : '142px',height:window.size > 600 ?'42px' : '110px',color:'gold'}}/>
        </a>
      </Link> 
  
    </div>
    
    {!user? <div className={styles.loginRegisterMobile}>
          <Box 
            onClick={handleClose}
            style={{
                border:'2px solid gold',
                padding:7,
                borderRadius:4,
                color: 'wheat'
                }}
            >
                <Link href='/announcements'><a>Find your future friend</a></Link>
            </Box>
          <Box
            onClick={handleClose} 
            style={{
                border:'2px solid gold',
                padding:7,
                borderRadius:4,
                color: 'wheat'
                }}
            >
                <Link href='/login'><a>login/register</a></Link>
          </Box>
         
      </div> 
      :
      <div className={styles.loginRegisterMobile}>
        <Box 
          onClick={handleClose}
          style={{
              border:'2px solid gold',
              padding:7,
              borderRadius:4,
              color: 'wheat'
             }}
          >
              <Link href='/announcements'><a>Find your future friend</a></Link>
        </Box>
        <Box 
          onClick={handleClose}
          style={{
              border:'2px solid cadetblue',
              padding:7,
              borderRadius:4,
              color: 'wheat'
              }}
          >
                  <Link href='/profile'><a>{user.email}</a></Link>
        </Box>
 
      <Avatar 
        variant="rounded"
        id="basic-button"
        aria-controls={anchorEl ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={anchorEl ? 'true' : undefined}
        onClick={handleOpenMenu}
        sx={{
          cursor:'pointer',
          bgcolor: "cadetblue",
          color:'black',
          width:200
        }}
         >
       Profile Menu
      </Avatar>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={anchorEl}
        onClose={handleCloseMenu}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        sx={{
          fontFamily: 'Fredoka'
        }}
      >
        <MenuItem 
           onClick={()=>(handleCloseMenu(),handleClose())}  
           sx={{
          fontFamily: 'Fredoka'
        }}>
          <Link href='/profile'><a>Profile</a></Link>
        </MenuItem>
        <MenuItem 
           onClick={()=>(handleCloseMenu(),handleClose())}
           sx={{
           fontFamily: 'Fredoka'
          }}
           >
           <Link href='/newAnnouncement'><a>Add statement</a></Link>  
          </MenuItem>
        <MenuItem 
          onClick={()=> (handleCloseMenu(),handleClose())}
          sx={{
            fontFamily: 'Fredoka'
          }}
          >
            <Link href='/userAnnouncements'><a>My statements</a></Link>
          </MenuItem>
        <MenuItem 
         onClick={()=> (logoutUser(),handleClose())}
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
      </Modal>
    
    </div>
  );
}
