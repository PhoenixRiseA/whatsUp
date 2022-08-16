import { useEffect } from "react";
import { useSelector } from "react-redux";

const SentMail = () => {
  const enteredEmail = useSelector((state) => state.auth.email);
  const emailEndPoint = enteredEmail.replace(/[^a-zA-Z0-9 ]/g, "");
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `https://my-chat-app-2b721-default-rtdb.firebaseio.com/${emailEndPoint}.json`
        );
        const data = await response.json();
        console.log(data);
      } catch (err) {
        console.log(err.message);
      }
    }
    fetchData();
  }, [emailEndPoint]);
  return (
    <div className="sent">
      <h1>Sent</h1>
    </div>
  );
};
export default SentMail;
