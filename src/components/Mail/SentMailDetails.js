import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import classes from "./SentMailDetails.module.css";
const MailDetail = () => {
  const [item, setItem] = useState("");
  const loggedInEmail = useSelector((state) => state.auth.email);
  const parentMailEndPoint = loggedInEmail.replace(/[^a-zA-Z0-9 ]/g, "");
  const params = useParams();

  console.log(params.sentId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://my-chat-app-2b721-default-rtdb.firebaseio.com/${parentMailEndPoint}/sent/${params.sentId}.json`
        );
        const data = await response.json();
        console.log(data);

        setItem(data);
      } catch (err) {
        throw new Error("something went wrong");
      }
    };
    fetchData();
  }, [params.sentId, parentMailEndPoint]);

  return (
    <div className={classes.sentMailDetails}>
      <h3>To: {item.toEmail}</h3>
      <br />
      <p>Sub: {item.sub}</p>
      <br />
      <p>{item.text}</p>
      <br />
      <p>{item.date}</p>
      <br />
    </div>
  );
};
export default MailDetail;
