import React, { useState,useEffect,useContext } from 'react'
import announcements from "../announcements.json"
import AnnouncementCards from "../layout/announcementCards"
import {fromImageToUrl} from "../utils/Constants"
import styles from "../styles/Cards.module.css"
import { API_URL } from '../utils/Constants'
import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import { useRouter } from 'next/router'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import AuthContext from "../context/AuthContext";
import Alert from '@mui/material/Alert';

var number = 1

 const Announcements = ({announcements}) => {
  const router = useRouter()
  const [category,setCategory]= useState('all')
  const [page, setPage] = useState(1);
  const {searchText} = useContext(AuthContext)
  const [data,setData] = useState([])
  const handleCheckbox = (e) => {
     setCategory(e.target.value)
     console.log(e.target.value)
     //router.push(category)
     //router.replace(url, as, options)
     //router.push(`/announcements/categories/${e.target.value}`)
  }

  const test = (e) =>{
      
  }
  //not found content

  //not found content

  const handlePaginationChange = (e, value) => {
    console.log(e)
    console.log(value)
    number=value
    console.log(number)
    setPage(value);
    router.push(`?populate=*&pagination[pageSize]=10&pagination[page]=${number}`, undefined, { shallow: true });
  }

 
  useEffect(() => {
    if(category ==='cat' || category==='dog' ){
      const result = announcements.data
      .filter(a=> a.attributes.category===category)
      .filter(a => a.attributes.title.toLowerCase().includes(searchText.toLowerCase()));
      console.log('search')
      console.log('searchtext' + " "+ Boolean(searchText))
      console.log('category' + " "+category)
      setData(result)
      
    }else if(searchText) {

      const result = announcements.data
     .filter(a => a.attributes.title.toLowerCase().includes(searchText.toLowerCase()));
      setData(result)
      console.log('searchtext' + " "+ Boolean(searchText))
      console.log('category' + " "+category)
      console.log('other category')
   }else{
    console.log('other')
    console.log('searchtext' + " "+ Boolean(searchText))
      console.log('category' + " "+category)
     setData(announcements.data)
   }

   console.log('paginationpage'+ ' ' + announcements.meta.pagination.page)
    },[searchText,category,number,announcements]);





 


  return (
    <>
    <div className={styles.cardsContainer} id="dasda">

      <Box sx={{width: 200, display:'flex', justifyContent:'flex-start', padding: 1}}>
      
      <FormGroup aria-label="position" column>
      <FormLabel component="legend" sx={{display:'flex',justifyContent:'flex-start',width:"100%"}}>Categories</FormLabel>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={category}
        onChange={handleCheckbox}
       
      >
      <FormControlLabel
          value="all"
          control={<Radio  
            sx={{
              "&.MuiRadio-root":{
              color:'gray'
            }
          }} 
          />}
          label="All"
          labelPlacement="end"
         
        />
      <FormControlLabel
          value="dog"
          control={<Radio 
            sx={{
               "&.MuiRadio-root":{
                color:'gray'
              }
            }}
          />}
          label="Dogs"
          labelPlacement="end"
          
        />
       <FormControlLabel
          value="cat"
          control={<Radio  
            sx={{
              "&.MuiRadio-root":{
                color:'gray'
              }
            }}
          />}
          label="Cats"
          labelPlacement="end"
         
        />
      </RadioGroup>
     {/*
      <FormLabel component="legend" sx={{display:'flex',justifyContent:'flex-start',width:"100%"}}>Cats</FormLabel>
      <FormControlLabel
          value="start"
          control={<Checkbox />}
          label="Start"
          labelPlacement="end"
        />
       <FormControlLabel
          value="start"
          control={<Checkbox />}
          label="Start"
          labelPlacement="end"
        />

        */}
      </FormGroup>
      </Box>
    
  
      <Box className={styles.cardsContainer2}>
      {// !category && !searchText || category==='all'
    data.length > 0?
     data.map(announcement => (
        <div className={styles.cards} key={announcement.attributes.title}>
        <AnnouncementCards 
          title={announcement.attributes.title} 
          image={fromImageToUrl(announcement.attributes.image.data && announcement.attributes.image.data.attributes)}
          description={announcement.attributes.description.slice(0,25).concat('...')}
          announcement={announcement.attributes.slug}
          />
            { console.log('11111')}
        </div>
      ))

      :
      <Stack sx={{ width: '30%' }} spacing={2}>
      <Alert variant="outlined" severity="info" sx={{
        
        fontWeight:'bold',
        border:'2px solid cadetblue',
        "&.MuiAlert-root .MuiAlert-icon": {
          color:'cadetblue',
          fontWeight:'bold'
        }
        
        }}>
      Nothing was found!
      </Alert>
      </Stack>
     
  

}
     
      </Box>
 
      
      </div>
      <Stack spacing={2} sx={{m:'0 auto'}}>
      
      <Pagination 
        count={announcements.meta.pagination.pageCount} 
        variant="outlined" shape="rounded" 
        page={number}
        onChange={handlePaginationChange}
        />
     </Stack>
      </>
  )
}
export async function getStaticProps() {
    const announcement_res = await fetch(`${API_URL}/api/announcements?populate=*&pagination[pageSize]=10&pagination[page]=${number}`)
    const announcements = await announcement_res.json()
    //announcements?filters[category][$eq]=cat
    //announcements?filters[category][$eq]=dog&filters[category][$eq]=cat
    //announcements?filters[title][$contains]=
    return {
      props: {
        announcements,
        number
      }
    }
  }

export default Announcements


/*
export async function getStaticProps() {
  const product_res = await fetch(`${API_URL}/products/`)
  const products = await product_res.json()

  return {
    props: {
        products
    }
  }
}

*/