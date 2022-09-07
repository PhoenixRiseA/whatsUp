import { useRef, useState } from "react";
import classes from "./AuthForm.module.css";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/authReducer";
import { useNavigate } from "react-router-dom";

const AuthForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();

  const [loginState, setLoginState] = useState(true);
  const [loading, setLoading] = useState(false);
  const switchModeHandler = (e) => {
    e.preventDefault();
    setLoginState((state) => !state);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    let enteredConfirmedPassword;
    if (!loginState) {
      enteredConfirmedPassword = confirmPasswordInputRef.current.value;
      if (enteredPassword !== enteredConfirmedPassword) {
        console.log("passwords do not match");

        throw new Error("passwords do not match");
      }
    }
    let url;
    if (loginState) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAYWy75MlnHEXyGt5vSCKX9YcvdJhsxLmQ";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAYWy75MlnHEXyGt5vSCKX9YcvdJhsxLmQ";
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setLoading(false);
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        console.log("in authForm", data.idToken);
        dispatch(
          authActions.login({ token: data.idToken, email: enteredEmail })
        );
        navigate("/chat-away", { replace: true });
        // console.log("haha");
      })
      .catch((err) => {
        let errorMessage = "authentication failed";
        console.log(err.message);
        alert(errorMessage);
      });

    emailInputRef.current.value = "";
    passwordInputRef.current.value = "";
  };
  const forgotPasswordHandler = () => {
    navigate("/forgot-password");
  };
  // const forgotPasswordHandler = (e) => {
  //   const enteredEmail = emailInputRef.current.value;
  //   e.preventDefault();

  //   fetch(
  //     "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAYWy75MlnHEXyGt5vSCKX9YcvdJhsxLmQ",
  //     {
  //       method: "POST",
  //       body: JSON.stringify({
  //         requestType: "PASSWORD_RESET",
  //         email: enteredEmail,
  //       }),
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   )
  //     .then((res) => {
  //       if (res.ok) {
  //         return res.json();
  //       }
  //     })
  //     .then((data) => console.log(data))
  //     .catch((err) => {
  //       let errorMessage = "Could not send verification email try again";
  //       alert(errorMessage);
  //       throw new Error(err.message);
  //     });
  // };

  return (
    <section className={classes.auth}>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Username/Email</label>
          <input type="email" ref={emailInputRef} required />
          <label htmlFor="password">Password</label>
          <input type="password" ref={passwordInputRef} />
          {!loginState ? (
            <div>
              <label htmlFor="password">Confirm Password</label>

              <input type="password" ref={confirmPasswordInputRef} />
            </div>
          ) : (
            ""
          )}
        </div>
        <div className={classes.actions}>
          {loading && <button>loading</button>}
          {!loading && (
            <button type="submit">{loginState ? "Sign In" : "Sign Up"}</button>
          )}
          {loginState && (
            <button
              className={classes.transparent}
              onClick={forgotPasswordHandler}
            >
              Forgot Password?
            </button>
          )}
          {loginState ? (
            <button onClick={switchModeHandler}>Create new account</button>
          ) : (
            <button onClick={switchModeHandler}>
              Have an existing account?
            </button>
          )}
        </div>
      </form>
    </section>
  );
};
export default AuthForm;
