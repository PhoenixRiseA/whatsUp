import Header from "./Header";
import { Fragment } from "react";
import SideBar from "./SideBar";

const Layout = (props) => {
  return (
    <Fragment>
      <Header />
      <SideBar />
      <main>{props.children}</main>
    </Fragment>
  );
};
export default Layout;
