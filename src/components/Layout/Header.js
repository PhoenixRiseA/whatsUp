import classes from "./Header.module.css";
import { NavLink } from "react-router-dom";
// import AuthPage from "../Pages/AuthPage";
const Header = () => {
  return (
    <header className={classes.header}>
      <ul>
        <li>
          {/* <NavLink
            className={(navData) => (navData.isActive ? classes.active : "")}
            to="/auth"
          >
            Login/Signup
          </NavLink> */}
          Login
        </li>
        <li>home</li>
        <li>Products</li>
        <li>About us</li>
        <li>Contact us</li>
      </ul>
    </header>
  );
};
export default Header;
