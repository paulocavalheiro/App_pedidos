import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Cardapio.module.css'
import Card from '../Layout_conponent/Card'

const Home: NextPage = () => {
   return (
      <>
         <div className={styles.title_container}>
            <h1 className={styles.title}>
               Restaurante<span>App</span>
            </h1>
         </div>
      </>
   )
}

export default Home
