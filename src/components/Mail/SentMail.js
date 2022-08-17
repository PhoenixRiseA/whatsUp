import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import classes from "./SentMail.module.css";
import { useDispatch } from "react-redux";
import { mailActions } from "../../store/mailReducer";
import { Link } from "react-router-dom";
// import SentItem from "./SentItem";

const SentMail = () => {
  const loggedInEmail = useSelector((state) => state.auth.email);
  const emailEndPoint = loggedInEmail.replace(/[^a-zA-Z0-9 ]/g, "");
  const [sentEmails, setSentEmails] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `https://my-chat-app-2b721-default-rtdb.firebaseio.com/${emailEndPoint}/sent.json`
        );
        const data = await response.json();
        console.log(data);
        const loadedData = [];

        for (const key in data) {
          loadedData.push({
            id: key,
            toEmail: data[key].toEmail,
            text: data[key].text,
            sub: data[key].sub,
          });
        }
        console.log(loadedData);
        dispatch(mailActions.replace(loadedData));
        const emailList = loadedData.map((item) => {
          return (
            <Link to={`/sent-email/${item.id}`}>
              <li>
                <p>to: {item.toEmail}</p>
                <p>{item.sub}</p>
                <button>X</button>
              </li>
            </Link>
          );
        });
        setSentEmails(emailList);
      } catch (err) {
        console.log(err.message);
      }
    }
    fetchData();
  }, [emailEndPoint, dispatch]);

  return (
    <div className="sent">
      <h1>Sent</h1>
      <ul className={classes.emailList}>{sentEmails}</ul>
    </div>
  );
};
export default SentMail;
