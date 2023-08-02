import {FaShoppingCart, FaFacebookF, FaTwitter, FaSnapchatGhost, FaInstagram} from 'react-icons/fa'
import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.scss'
import { IconContext } from 'react-icons/lib'

export default function HomeLayout (){
  return (
    <>
      <Head>
        <title>SWANK Home</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://use.typekit.net/oqk1epv.css"></link>
      </Head>
      <div fluid className={`${styles.div} flex justify-content-center`}>
        <div className="items-center w-75">
          <div className="text-light flex justify-content-center"><Link href="/store">Store</Link></div>
          <div className="text-light flex justify-content-center"><Link href="/store">Blog</Link></div>
          <div className="text-light flex justify-content-center"><object type="image/svg+xml" data="SWANKmagnifier.svg" width="300" height="300" /></div>
          <div className="text-light flex justify-content-center"><Link href="/store">Vlog</Link></div>
          <div className="text-light flex justify-content-center"><Link href="/store">About</Link></div>
        </div>
        
      </div>
      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </>
  )
}
export function StoreLayout({ catalogItems }){
  return (
    <>
      <Header />
      <div className="p-0" fluid> 
        <divbar className="mb-3 p-0" bg="light" variant="light">
          <div fluid>
            <div className="p-0 m-0">
              <div>
                <div > 
                  <div as={Link} href='/blog'>BLOG</div>
                </div>
              </div>
            </div>
          </div>
        </divbar>
        <div className="p-4 pb-0">
          <div sm={2}>
            <SideMenu/>
          </div>
          <div sm={8}>
            {/* <Store catalogItems={catalogItems} /> */}
          </div>
          <div sm={2} className="flex flex-divumn justify-content-between">
            <div style={{position: "fixed", height: "50vh"}} className="flex flex-divumn justify-content-between">              
              <IconContext.Provider value={{size: "1.5em", className: "mx-auto"}}>
                <FaShoppingCart />
              </IconContext.Provider>
              <Socials />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
