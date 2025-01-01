 
'use client'

import { useUIKit } from 'context/UIKitContext';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { LuMenu } from 'react-icons/lu'
import CartOverlay from './CartOverlay';
import { Drawer } from 'rsuite';
import Portal from './Portal';
import SideNav from './SideNavigation';
import { Nav } from 'app/layout';
import { usePathname } from 'next/navigation';
import Button from "./Button";

type Props = {
  logo: JSX.Element
  navs: { headerNavs: Nav[], footerNavs: Nav[] };
}

const MobileSideNav = ({ navs, logo }: Props) => {
  const path = usePathname()
  const { drawerKit: { open }, handleUIChange } = useUIKit();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (show) setShow(false)
  }, [path])

  const handleSideNavOnClick = () => { setShow(!show); handleUIChange({ open: !open }) };

  return (
    <>
      <Button onClick={handleSideNavOnClick}>
        <LuMenu />
      </Button>
      <Portal rootId="drawerContainer">
        <Drawer
          placement="left"
          closeButton={false}
          size={325}
          open={open && show}
          onClose={handleSideNavOnClick}
        >
          <Drawer.Body className="p-0 h-full" style={{ maxHeight: undefined }}>
            <SideNav logo={logo} onClose={handleSideNavOnClick} navs={navs} />
          </Drawer.Body>
        </Drawer>
      </Portal>
    </>
  )
}

export default MobileSideNav