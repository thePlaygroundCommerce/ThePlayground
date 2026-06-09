'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
  className: string
  clx: string
  pth: string
  href: string
}

const NavLink = ({ children, className, clx, pth, ...rest }: Props) => {
  const path = usePathname()
  return (
    <Link {...rest} className={clsx(path === pth ? clx : className)}>{children}</Link>
  )
}

export default NavLink