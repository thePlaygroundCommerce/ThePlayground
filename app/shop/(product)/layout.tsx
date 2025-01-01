export const metadata = {
  title: "The Playground | Shop",
};

export default function Layout({ children }: { children: React.ReactNode }) {  
  return (
    <div className="my-4 mx-4">{children}</div>
  );
}
