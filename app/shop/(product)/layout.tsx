import { LayoutPageProps } from "app/layout";

export const metadata = {
  title: "The Playground | Shop",
};

export default function Layout({ children }: LayoutPageProps) {  
  return (
    <div className="my-4 mx-4">{children}</div>
  );
}
