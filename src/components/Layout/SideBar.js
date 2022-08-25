import { NavLink, useNavigate } from "react-router-dom";
// import { authActions } from "../../store/authReducer";
import { useSelector } from "react-redux";
import classes from "./SideBar.module.css";

const SideBar = () => {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const composeHandler = () => {
    navigate("/chat-away");
  };
  return (
    <section className={classes.section}>
      {isAuth && (
        // <div>
        //   <NavLink
        //     className={(navData) => (navData.isActive ? classes.active : "")}
        //     to="/chat-away"
        //   >
        //     Chat away
        //   </NavLink>
        // </div>
        <button onClick={composeHandler}>compose</button>
      )}
      {isAuth && (
        <div>
          <NavLink
            className={(navData) => (navData.isActive ? classes.active : "")}
            to="/sent-email"
          >
            Sent email
          </NavLink>
        </div>
      )}
      {isAuth && (
        <div>
          <NavLink
            className={(navData) => (navData.isActive ? classes.active : "")}
            to="/inbox"
          >
            Inbox
          </NavLink>
        </div>
      )}
    </section>
  );
};
export default SideBar;
