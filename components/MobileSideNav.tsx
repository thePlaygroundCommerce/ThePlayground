 
'use client'

import { useState, useEffect } from 'react';
import Portal from './Portal';
import { Nav } from 'app/layout';
import { usePathname } from 'next/navigation';

type Props = {
  logo: JSX.Element
  navs: { headerNavs: Nav[], footerNavs?: Nav[] };
}

const MobileSideNav = ({ navs, logo }: Props) => {
  const path = usePathname()
  // const { drawerKit: { open }, handleUIChange } = useUIKit();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (show) setShow(false)
  }, [path])

  // const handleSideNavOnClick = () => { setShow(!show); handleUIChange({ open: !open }) };

  return (
    <>
      {/* <Hamburger {...{ open, setOpen: handleSideNavOnClick }} /> */}
      <Portal rootId="drawerContainer">
        {/* <Drawer
        className='fixed top-0 bg-white z-[5000] w-full h-screen'
          placement="left"
          closeButton={false}
          open={open && show}
          onClose={handleSideNavOnClick}
        >
          <Drawer.Body className="p-0 h-full" style={{ maxHeight: undefined }}>
            <SideNav open logo={logo} onClose={handleSideNavOnClick} navs={navs} />
          </Drawer.Body>
        </Drawer> */}
      </Portal>
    </>
  )
}

export default MobileSideNav