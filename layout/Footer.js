import React from 'react'
import Image from 'next/image'
import styles from '../styles/Home.module.css';
import Box from '@mui/material/Box';
export const Footer = () => {
  return (
    <footer className={styles.footer}>
   
      <Box>Land a Hand to little friends{'//'}</Box>
      <Box className={styles.logo}>
      <a
      href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
      target="_blank"
      rel="noopener noreferrer"
      >
       <Image src="/datadog.svg" alt="Vercel Logo" width={102} height={36} />
      </a>
      </Box>
      <Box>{'//click Dog to donate'}</Box>
      
  
  </footer>
  )
}
