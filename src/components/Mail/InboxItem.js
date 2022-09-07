import classes from "./InboxItem.module.css";
import { Link } from "react-router-dom";
import React from "react";

const InboxItem = (props) => {
  console.log(props.id);

  return (
    <div className={classes.inboxItem}>
      {props.seen === true ? "" : "*"}
      <Link to={`/inbox/${props.id}`}>
        <p>From: {props.fromEmail}</p>

        <p>{props.sub}</p>
      </Link>

      <button onClick={props.onDelete}>X</button>
    </div>
  );
};
export default React.memo(InboxItem);
