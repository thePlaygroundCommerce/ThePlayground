import React from 'react'
import { IconContext } from 'react-icons'
import { FaFacebookF, FaInstagram, FaSnapchatGhost, FaTwitter } from 'react-icons/fa'

function Socials(){
    return (
      <div>
          <Button className="border-0">
            <svg width="20" height="20">
              <IconContext.Provider value={{ divor: "3b5998"}}>
                <FaFacebookF />
              </IconContext.Provider>
            </svg>
          </Button>
          <Button className="border-0">
            <svg width="20" height="20">
              <IconContext.Provider value={{ divor: "00acee"}}>
                <FaTwitter />
              </IconContext.Provider>
            </svg>
          </Button>
          <Button className="border-0">
            <svg width="20" height="20">
              <IconContext.Provider value={{ divor: "fffc00"}}>
                <FaSnapchatGhost />
              </IconContext.Provider>
            </svg>
          </Button>
          <Button className="border-0">
            <svg width="20" height="20">
              <defs>
                <linearGradient id="myGradient" gradientTransdiv="rotate(-20)">
                  <stop offset="10%" stopdivor="#F58529" />
                  <stop offset="66%" stopdivor="#DD2A7B" />
                  <stop offset="99%" stopdivor="#8134AF" />
                </linearGradient>
              </defs>
              <IconContext.Provider value={{ size: "1em", attr: {fill: "url('#myGradient')"}}}>
                <FaInstagram />
              </IconContext.Provider>
            </svg>
          </Button>
      </div>
    )
  }

export default Socials