import Header from "components/Header";
import Footer from "components/Footer";
import SideNav from "./SideNav";

const MainLayout = ({ children }) => {
  return (
    <div>
      <div sm={2}>
        <SideNav />
      </div>
      <div>
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
