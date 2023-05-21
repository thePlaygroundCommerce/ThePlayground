import {Container, Row, Col, Nav, Navbar, ButtonGroup, Button} from 'react-bootstrap'
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
      <Container fluid className={`${styles.container} d-flex justify-content-center`}>
        <Row className="align-items-center w-75">
          <Col className="text-light d-flex justify-content-center"><Link href="/store">Store</Link></Col>
          <Col className="text-light d-flex justify-content-center"><Link href="/store">Blog</Link></Col>
          <Col className="text-light d-flex justify-content-center"><object type="image/svg+xml" data="SWANKmagnifier.svg" width="300" height="300" /></Col>
          <Col className="text-light d-flex justify-content-center"><Link href="/store">Vlog</Link></Col>
          <Col className="text-light d-flex justify-content-center"><Link href="/store">About</Link></Col>
        </Row>
        
      </Container>
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
      <Container className="p-0" fluid> 
        <Navbar className="mb-3 p-0" bg="light" variant="light">
          <Container fluid>
            <Row className="p-0 m-0">
              <Col>
                <Nav > 
                  <Nav.Item as={Link} href='/blog'>BLOG</Nav.Item>
                </Nav>
              </Col>
            </Row>
          </Container>
        </Navbar>
        <Row className="p-4 pb-0">
          <Col sm={2}>
            <SideMenu/>
          </Col>
          <Col sm={8}>
            {/* <Store catalogItems={catalogItems} /> */}
          </Col>
          <Col sm={2} className="d-flex flex-column justify-content-between">
            <div style={{position: "fixed", height: "50vh"}} className="d-flex flex-column justify-content-between">              
              <IconContext.Provider value={{size: "1.5em", className: "mx-auto"}}>
                <FaShoppingCart />
              </IconContext.Provider>
              <Socials />
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  )
}
