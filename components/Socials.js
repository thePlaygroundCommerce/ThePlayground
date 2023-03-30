import React from 'react'
import { Button, ButtonGroup } from 'react-bootstrap'
import { IconContext } from 'react-icons'
import { FaFacebookF, FaInstagram, FaSnapchatGhost, FaTwitter } from 'react-icons/fa'

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

export default Socials