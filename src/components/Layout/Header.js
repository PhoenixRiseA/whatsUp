import classes from "./Header.module.css";
import { NavLink } from "react-router-dom";
import { authActions } from "../../store/authReducer";
import { useSelector, useDispatch } from "react-redux";

const Header = () => {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(authActions.logout());
  };
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
        {isAuth && (
          <li>
            <NavLink
              className={(navData) => (navData.isActive ? classes.active : "")}
              to="/chat-away"
            >
              Chat away
            </NavLink>
          </li>
        )}
        {isAuth && (
          <li>
            <NavLink
              className={(navData) => (navData.isActive ? classes.active : "")}
              to="/sent-email"
            >
              Sent email
            </NavLink>
          </li>
        )}
        <li>Products</li>
        <li>About us</li>
        <li>Contact us</li>
        {isAuth && (
          <li>
            <button onClick={logoutHandler}>Logout</button>
          </li>
        )}
      </ul>
    </header>
  );
};
export default Header;
