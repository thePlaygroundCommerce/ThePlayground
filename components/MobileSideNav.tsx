/* eslint-disable react/react-in-jsx-scope */
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

type Props = {
  navs: { headerNavs: Nav[], footerNavs: Nav[] };
}

const MobileSideNav = ({ navs }: Props) => {
  const path = usePathname()
  const { drawerKit: { open }, handleUIChange } = useUIKit();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if(show) setShow(false)
  }, [path])

  const handleSideNavOnClick = () => { setShow(!show); handleUIChange({ open: !open }) };

  return (
    <>
      <button onClick={handleSideNavOnClick}>
        <LuMenu/>
      </button>
        <Portal rootId="drawerContainer">
          <Drawer
            placement="left"
            closeButton={false}
            size={325}
            open={open && show}
            onClose={handleSideNavOnClick}
          >
            <Drawer.Body className="p-0 h-full" style={{ maxHeight: undefined }}>
              <SideNav onClose={handleSideNavOnClick} navs={navs} />
            </Drawer.Body>
          </Drawer>
        </Portal>
    </>
  )
}

export default MobileSideNav