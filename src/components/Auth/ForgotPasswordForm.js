import React, { useRef } from "react";
import classes from "./ForgotPasswordForm.module.css";
const ForgotPasswordForm = () => {
  const emailRef = useRef();
  const submitHandler = (e) => {
    e.preventDefault();
    const enteredEmail = emailRef.current.value;
    e.preventDefault();

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAYWy75MlnHEXyGt5vSCKX9YcvdJhsxLmQ",
      {
        method: "POST",
        body: JSON.stringify({
          requestType: "PASSWORD_RESET",
          email: enteredEmail,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        alert("reset link for password has been sent to entered email");
        console.log(data);
      })
      .catch((err) => {
        let errorMessage = "Could not send verification email try again";
        alert(errorMessage);
        throw new Error(err.message);
      });
  };
  return (
    <section className={classes.forgot}>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Enter Email</label>
          <input type="email" ref={emailRef}></input>
        </div>
        <div className={classes.actions}>
          <button type="submit">Reset with email</button>
        </div>
      </form>
    </section>
  );
};
export default ForgotPasswordForm;
