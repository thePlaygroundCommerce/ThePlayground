import { AppProps } from "types"

type Props = {} & AppProps

const Layout = ({ children }: Props) => {
  return (
    <div className="flex justify-center py-12">{children}</div>
  )
}

export default Layout