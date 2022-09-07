import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import classes from "./SentMail.module.css";
import { useDispatch } from "react-redux";
import { mailActions } from "../../store/mailReducer";
import { Link } from "react-router-dom";

const SentMail = () => {
  const loggedInEmail = useSelector((state) => state.auth.email);
  const emailEndPoint = loggedInEmail.replace(/[^a-zA-Z0-9 ]/g, "");
  const [sentEmails, setSentEmails] = useState([]);
  const [deleted, setDeleted] = useState(false);
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
        const deleteMailHandler = (id) => {
          setDeleted(false);
          fetch(
            `https://my-chat-app-2b721-default-rtdb.firebaseio.com/${emailEndPoint}/sent/${id}.json`,
            {
              method: "DELETE",
            }
          )
            .then((res) => {
              if (res.ok) {
                return res.json();
              }
            })
            .then((data) => {
              console.log(data);
              setDeleted(true);
              console.log(deleted);
              // navigate("/");
            })
            .catch((err) => {
              throw new Error(err.message);
            });
        };
        const emailList = loadedData.map((item) => {
          return (
            <div className={classes.sentMailItem}>
              <Link to={`/sent-email/${item.id}`}>
                <p>to: {item.toEmail}</p>
                <p>{item.sub}</p>
              </Link>
              <button onClick={deleteMailHandler.bind(null, item.id)}>X</button>
            </div>
          );
        });
        setSentEmails(emailList);
      } catch (err) {
        console.log(err.message);
      }
    }
    fetchData();
  }, [emailEndPoint, dispatch, deleted]);

  return (
    <div className={classes.sent}>
      <h1>Sent</h1>
      <div className={classes.sentMailItems}>{sentEmails}</div>
    </div>
  );
};
export default SentMail;
