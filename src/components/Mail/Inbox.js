import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import InboxItem from "./InboxItem";

const Inbox = () => {
  const loggedInEmail = useSelector((state) => state.auth.email);
  const parentMailEndPoint = loggedInEmail.replace(/[^a-zA-Z0-9 ]/g, "");
  const [receivedEmails, setReceivedEmails] = useState([]);
  const [unseenMail, setUnseenMail] = useState(0);
  useEffect(() => {
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
          email: data[key].email,
          text: data[key].text,
          sub: data[key].sub,
          key: key,
          seen: data[key].seen,
        });
      }
      let unseen = 0;

      const emailList = loadedData.map((item) => {
        if (item.seen === false) {
          unseen++;
        }
        return (
          <InboxItem
            id={item.id}
            email={item.email}
            sub={item.sub}
            text={item.text}
            seen={item.seen}
          />
        );
      });
      setUnseenMail(unseen);
      setReceivedEmails(emailList);
    };
    fetchData();
  }, [parentMailEndPoint]);
  return (
    <div>
      <h1>Inbox</h1>
      <h2>Unread messages:{unseenMail}</h2>

      <ul>{receivedEmails}</ul>
    </div>
  );
};
export default Inbox;
