import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InboxItem from "./InboxItem";
// import { useNavigate } from "react-router-dom";
import { inboxMailActions } from "../../store/inboxMailReducer";
import classes from "./Inbox.module.css";

const Inbox = () => {
  const dispatch = useDispatch();
  const loggedInEmail = useSelector((state) => state.auth.email);
  const parentMailEndPoint = loggedInEmail.replace(/[^a-zA-Z0-9 ]/g, "");
  const [receivedEmails, setReceivedEmails] = useState([]);
  const [unseenMail, setUnseenMail] = useState(0);
  //   const navigate = useNavigate();
  const [deleted, setDeleted] = useState(false);
  useEffect(() => {
    const intervalId = setInterval(() => {
      const fetchData = async () => {
        const response = await fetch(
          `https://my-chat-app-2b721-default-rtdb.firebaseio.com/${parentMailEndPoint}/inbox.json`
        );
        const data = await response.json();
        console.log(data);
        const loadedData = [];

        for (const key in data) {
          loadedData.push({
            id: key,
            toEmail: data[key].toEmail,
            fromEmail: data[key].fromEmail,
            text: data[key].text,
            sub: data[key].sub,
            key: key,
            seen: data[key].seen,
          });
        }
        dispatch(inboxMailActions.replace(loadedData));
        let unseen = 0;

        const deleteMailHandler = (id) => {
          setDeleted(false);
          fetch(
            `https://my-chat-app-2b721-default-rtdb.firebaseio.com/${parentMailEndPoint}/inbox/${id}.json`,
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
          if (item.seen === false) {
            unseen++;
          }
          return (
            <InboxItem
              id={item.id}
              toEmail={item.toEmail}
              fromEmail={item.fromEmail}
              sub={item.sub}
              text={item.text}
              seen={item.seen}
              onDelete={deleteMailHandler.bind(null, item.id)}
            />
          );
        });
        setUnseenMail(unseen);
        setReceivedEmails(emailList);
      };
      fetchData();
    }, 2000);
    return () => clearInterval(intervalId);
  }, [parentMailEndPoint, deleted, dispatch]);
  return (
    <div className={classes.inbox}>
      <h1>Inbox</h1>
      <h2>Unread messages:{unseenMail}</h2>

      <div className={classes.inboxItems}>{receivedEmails}</div>
    </div>
  );
};
export default Inbox;
