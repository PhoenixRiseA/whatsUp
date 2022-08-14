import classes from "./Header.module.css";
import { NavLink } from "react-router-dom";
// import { authActions } from "../../store/authReducer";
import { useSelector } from "react-redux";

const Header = () => {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  return (
    <header className={classes.header}>
      {isAuth && <h1>Welcome to WhatsUp</h1>}
      <ul>
        {!isAuth && (
          <li>
            <NavLink
              className={(navData) => (navData.isActive ? classes.active : "")}
              to="/auth"
            >
              Login/Signup
            </NavLink>
          </li>
        )}
        <li>
          <NavLink
            className={(navData) => (navData.isActive ? classes.active : "")}
            to="/chat-away"
          >
            Chat away
          </NavLink>
        </li>
        <li>Products</li>
        <li>About us</li>
        <li>Contact us</li>
      </ul>
    </header>
  );
};
export default Header;
