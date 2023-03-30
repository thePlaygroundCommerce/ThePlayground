import Link from 'next/link'
import React from 'react'
import { Nav } from 'react-bootstrap'

function SideNav(props){
    return(
      <div className={`${props.className}`} style={{position: "fixed"}}>
        <Nav>
          <Nav.Item as={Link} href='/new'>NEW RELEASES</Nav.Item>
        </Nav>
        <Nav>
          <Nav.Item as={Link} href='/mens'>MENS</Nav.Item>
        </Nav>
        <Nav>
          <Nav.Item as={Link} href='/womens'>WOMENS</Nav.Item>
        </Nav>
        <Nav>
          <Nav.Item as={Link} href='/kids'>KIDS</Nav.Item>
        </Nav>
      </div>
    )
  }

export default SideNav