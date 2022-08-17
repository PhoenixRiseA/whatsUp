import classes from "./InboxItem.module.css";
import { Link } from "react-router-dom";

const InboxItem = (props) => {
  console.log(props.id);

  return (
    <Link to={`/inbox/${props.id}`}>
      <li className={classes.listItem}>
        {props.seen === true ? "" : "*"}
        <p>from:{props.email}</p>

        <p>{props.sub}</p>
        <button>X</button>
      </li>
    </Link>
  );
};
export default InboxItem;
