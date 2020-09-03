import {Container, Row, Col, Nav, Navbar, ButtonGroup, Button} from 'react-bootstrap'
import {FaShoppingCart, FaFacebookF, FaTwitter, FaSnapchatGhost, FaInstagram} from 'react-icons/fa'
import Store from '../inventory'
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
          <Col className="text-light d-flex justify-content-center"><Link href="/store"><a>Store</a></Link></Col>
          <Col className="text-light d-flex justify-content-center"><Link href="/store"><a>Blog</a></Link></Col>
          <Col className="text-light d-flex justify-content-center"><object type="image/svg+xml" data="SWANKmagnifier.svg" width="300" height="300" /></Col>
          <Col className="text-light d-flex justify-content-center"><Link href="/store"><a>Vlog</a></Link></Col>
          <Col className="text-light d-flex justify-content-center"><Link href="/store"><a>About</a></Link></Col>
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
export function StoreLayout({children}){
  return (
    <>
      <Header />
      <Container className="p-0" fluid> 
        <Navbar className="mb-3 p-0" bg="light" variant="light">
          <Container fluid>
            <Row className="p-0 m-0">
              <Col>
                <Nav > 
                  <Nav.Item><Link href='/blog' passHref><Nav.Link>BLOG</Nav.Link></Link></Nav.Item>
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
            <Store />
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
function Header(){
  return (
    <Head>
      <title>SWANK Store</title>
      <link rel="icon" href="/favicon.ico" />
      <link rel="stylesheet" href="https://use.typekit.net/oqk1epv.css"></link>
    </Head>
  )
}
function Footer(){
  return(
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
  )
}
function SideMenu(props){
  return(
    <div className={`${props.className}`} style={{position: "fixed"}}>
      <Nav>
        <Nav.Item>
          <Link href='/new' passHref><Nav.Link>NEW RELEASES</Nav.Link></Link>
        </Nav.Item>
      </Nav>
      <Nav>
        <Nav.Item>
          <Link href='/mens' passHref><Nav.Link>MENS</Nav.Link></Link>
        </Nav.Item>
      </Nav>
      <Nav>
        <Nav.Item>
          <Link href='/womens' passHref><Nav.Link>WOMENS</Nav.Link></Link>
        </Nav.Item>
      </Nav>
      <Nav>
        <Nav.Item>
          <Link href='/kids' passHref><Nav.Link>KIDS</Nav.Link></Link>
        </Nav.Item>
      </Nav>
    </div>
  )
}
function Socials(){
  return (
    <ButtonGroup>
        <Button className="border-0">
          <svg width="20" height="20">
            <IconContext.Provider value={{ color: "3b5998"}}>
              <FaFacebookF />
            </IconContext.Provider>
          </svg>
        </Button>
        <Button className="border-0">
          <svg width="20" height="20">
            <IconContext.Provider value={{ color: "00acee"}}>
              <FaTwitter />
            </IconContext.Provider>
          </svg>
        </Button>
        <Button className="border-0">
          <svg width="20" height="20">
            <IconContext.Provider value={{ color: "fffc00"}}>
              <FaSnapchatGhost />
            </IconContext.Provider>
          </svg>
        </Button>
        <Button className="border-0">
          <svg width="20" height="20">
            <defs>
              <linearGradient id="myGradient" gradientTransform="rotate(-20)">
                <stop offset="10%" stopColor="#F58529" />
                <stop offset="66%" stopColor="#DD2A7B" />
                <stop offset="99%" stopColor="#8134AF" />
              </linearGradient>
            </defs>
            <IconContext.Provider value={{ size: "1em", attr: {fill: "url('#myGradient')"}}}>
              <FaInstagram />
            </IconContext.Provider>
          </svg>
        </Button>
    </ButtonGroup>
  )
}