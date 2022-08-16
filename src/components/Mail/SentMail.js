import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import classes from "./SentMail.module.css";

const SentMail = () => {
  const enteredEmail = useSelector((state) => state.auth.email);
  const emailEndPoint = enteredEmail.replace(/[^a-zA-Z0-9 ]/g, "");
  const [sentEmails, setSentEmails] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `https://my-chat-app-2b721-default-rtdb.firebaseio.com/${emailEndPoint}/sent.json`
        );
        const data = await response.json();
        const loadedData = [];

        for (const key in data) {
          loadedData.push({
            id: key,
            email: data[key].email,
            text: data[key].text,
            sub: data[key].sub,
          });
        }

        const emailList = loadedData.map((item) => (
          <li>
            <p>{item.email}</p>
            <p>{item.sub}</p>
            <p>{item.text}</p>
          </li>
        ));
        setSentEmails(emailList);
      } catch (err) {
        console.log(err.message);
      }
    }
    fetchData();
  }, [emailEndPoint]);

  return (
    <div className="sent">
      <h1>Sent</h1>
      <ul className={classes.emailList}>{sentEmails}</ul>
    </div>
  );
};
export default SentMail;
