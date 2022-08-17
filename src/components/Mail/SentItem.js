// import classes from "./SentIem.module.css";
import { Link } from "react-router-dom";
const SentItem = (props) => {
  console.log(props.id);
  return (
    <Link to={`/sent-email/${props.id}`}>
      <li>
        <p>{props.email}</p>
        <p>{props.sub}</p>
        <button>X</button>
      </li>
    </Link>
  );
};
export default SentItem;
