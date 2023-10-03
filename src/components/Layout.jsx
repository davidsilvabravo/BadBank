import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = () => {
  const customStyles = {
    paddingTop: "100px",
  };
  return (
    <>
      <Navbar />
      <div className="container" style={customStyles}>
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
