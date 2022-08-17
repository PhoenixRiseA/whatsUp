import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { mailActions } from "../../store/mailReducer";
const MailDetail = () => {
  const [item, setItem] = useState("");
  const loggedInEmail = useSelector((state) => state.auth.email);
  const parentMailEndPoint = loggedInEmail.replace(/[^a-zA-Z0-9 ]/g, "");
  const params = useParams();
  const dispatch = useDispatch();
  console.log(params.inboxId);
  const mails = useSelector((state) => state.mail.items);
  console.log(mails);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://my-chat-app-2b721-default-rtdb.firebaseio.com/${parentMailEndPoint}/inbox/${params.inboxId}.json`
        );
        const data = await response.json();
        console.log(data);
        const loadedData = { ...data, seen: true };
        dispatch(mailActions.replace(loadedData));
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

  return (
    <div>
      <p>mailItem</p>
      <h2>{item.email}</h2>
      <p>{item.sub}</p>
      <p>{item.text}</p>
    </div>
  );
};
export default MailDetail;
