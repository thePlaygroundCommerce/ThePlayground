import { AppProps } from "types";

type Props = AppProps & {};

export default async function Layout({ children }: Readonly<Props>) {  
  return (
    <div className="h-full my-8 mx-4">{children}</div>
  );
}
