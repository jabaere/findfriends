import React, { useState,useContext} from 'react'
import styles from '../styles/Home.module.css'
import { Header } from './Header'
import { Footer } from './Footer'
import {Alertjs} from './Alert'

export default function Layout({ children }) {
  
  return (
    <>
      <Header />
      <Alertjs/>
      <main className={styles.main}>{children}</main>
      <Footer />
    </>
  )
}
