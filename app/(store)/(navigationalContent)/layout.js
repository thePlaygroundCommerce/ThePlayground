import SideNav from "components/SideNav";

export default async function Layout({ children }) {

  return (
    <div className="grid grid-cols-9 p-4">
      <div className="col-span-1 pl-4">
        <SideNav />
      </div>
      <div className="col-span-8">{children}</div>
    </div>
  );
}
