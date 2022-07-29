import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Button from "../../components/Button";
import Image from 'next/image';


export default function Home() {

  return (
    <>
      <Head>
        <title>WatchPoint</title>
        <meta name="landing Page" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>



      <div className={styles.container}>
        <h1>WatchPoint</h1>

        <Image className={styles.logo}
          src='/images/Watchpoint-logo.png'
          height={500}
          width={500}
          alt="Logo">
        </Image>

        <h2>The All - in - One</h2>
        <h2>Health & Fitness Lifestyle Tracker </h2>
        <Button path={'/about'} label={'About WatchPoint'} />

        <Button path={'/createAccount'} label={'Create Account'} />

        <Button path={'/signIn'} label="Sign In" />

      </div>
    </>
  )
}