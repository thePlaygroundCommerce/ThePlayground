import { AppProps } from "index"

type Props = { children: any }

const Layout = ({ children }: LayoutProps<"/account">) => {
  return (
    <div className="flex justify-center py-24">{children}</div>
  )
}

export default Layout