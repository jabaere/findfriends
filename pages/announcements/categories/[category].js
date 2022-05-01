import React, { useState,useEffect } from 'react'
//import announcements from "../announcements.json"
import AnnouncementCards from "../../../layout/announcementCards"
import {fromImageToUrl} from "../../../utils/Constants"
import styles from "../../../styles/Cards.module.css"
import { API_URL } from '../../../utils/Constants'
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import { useRouter } from 'next/router'

 const FilterData = ({announcements}) => {
  const router = useRouter()
  const [category,setCategory]= useState('announcements')

  const handleCheckbox = (e) => {
     setCategory(e.target.value)
     console.log(e.target.value)
     //router.push(category)
     //router.replace(url, as, options)
     //router.push(`/announcements?filters[category][$eq]=${e.target.value}`)
  }

  useEffect(() => {
    console.log('category')
    console.log(router)
    },[category]);


  return (
    <div className={styles.cardsContainer} id="dasda">

      <Box sx={{width: 200, display:'flex', justifyContent:'flex-start', padding: 1}}>
      
      <FormGroup aria-label="position" column>
      <FormLabel component="legend" sx={{display:'flex',justifyContent:'flex-start',width:"100%"}}>Categories</FormLabel>
      <FormControlLabel
          value="dogs"
          control={<Checkbox/>}
          label="Dogs"
          labelPlacement="end"
          onChange={handleCheckbox}
        />
       <FormControlLabel
          value="cats"
          control={<Checkbox />}
          label="Cats"
          labelPlacement="end"
          onChange={handleCheckbox}
        />
      
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
      {announcements.data.map(announcement=> (
            <div className={styles.cards} key={announcement.attributes.title}>
               <AnnouncementCards 
                 title={announcement.attributes.title} 
                 image={fromImageToUrl(announcement.attributes.image.data && announcement.attributes.image.data.attributes)}
                 description={announcement.attributes.description.slice(0,25).concat('...')}
                 announcement={announcement.attributes.slug}
                 />

            </div>
      ))}
      </Box>
      
      </div>
  )
}

export async function getServerSideProps({params:{category}}){
    
  const res = await fetch(`${API_URL}/api/announcements?filters[category][$eq]=${category}?populate=*`)
  const announcements = await res.json()
  return{
      props: {
        announcements
      },
  }
}

export default FilterData




