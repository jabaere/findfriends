import React from 'react'
import Image from 'next/image'
import styles from '../styles/Home.module.css';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
    <a
      href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
      target="_blank"
      rel="noopener noreferrer"
    >
      <span>Land a Hand to little friends{' //'}</span>
      <span className={styles.logo}>
      <Image src="/datadog.svg" alt="Vercel Logo" width={102} height={36} />
      
      </span>
      <span>{'// click DOG to donate'}  </span>
      
    </a>
  </footer>
  )
}
