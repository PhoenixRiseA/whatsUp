import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
const MailDetail = () => {
  const [item, setItem] = useState("");
  const loggedInEmail = useSelector((state) => state.auth.email);
  const parentMailEndPoint = loggedInEmail.replace(/[^a-zA-Z0-9 ]/g, "");
  const params = useParams();

  console.log(params.sentId);
  const mails = useSelector((state) => state.sent.items);
  console.log(mails);

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
    <div>
      <p>mailItem</p>
      <h2>{item.email}</h2>
      <p>{item.sub}</p>
      <p>{item.text}</p>
      <p>{item.date}</p>
    </div>
  );
};
export default MailDetail;
