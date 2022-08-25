import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import classes from "./inboxMailDetail.module.css";
const InboxMailDetail = () => {
  const [item, setItem] = useState("");
  const loggedInEmail = useSelector((state) => state.auth.email);
  const parentMailEndPoint = loggedInEmail.replace(/[^a-zA-Z0-9 ]/g, "");
  const params = useParams();
  const dispatch = useDispatch();
  console.log(params.inboxId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://my-chat-app-2b721-default-rtdb.firebaseio.com/${parentMailEndPoint}/inbox/${params.inboxId}.json`
        );
        const data = await response.json();
        console.log(data);
        const loadedData = { ...data, seen: true };
        console.log(loadedData);

        setItem(loadedData);

        fetch(
          `https://my-chat-app-2b721-default-rtdb.firebaseio.com/${parentMailEndPoint}/inbox/${params.inboxId}.json`,
          {
            method: "PUT",
            body: JSON.stringify(loadedData),
          }
        );
      } catch (err) {
        throw new Error("something went wrong");
      }
    };
    fetchData();
  }, [params.inboxId, parentMailEndPoint, dispatch]);
  console.log(item.fromEmail);

  return (
    <div className={classes.inboxMailDetails}>
      <h3>From: {item.fromEmail}</h3>
      <p>sub: {item.sub}</p>
      <p>text: {item.text}</p>
    </div>
  );
};
export default InboxMailDetail;
