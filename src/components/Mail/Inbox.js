// import { useEffect } from "react";
// import InboxItem from "./InboxItem";
const Inbox = () => {
  // useEffect(()=>{
  //     const fetchData = async ()=>{
  //         fetch(
  //           `https://my-chat-app-2b721-default-rtdb.firebaseio.com/${emailEndPoint}/inbox.json`
  //         );
  //     };
  //     fetchData();
  // });
  return (
    <div>
      <h1>Inbox</h1>
      {/* <InboxItem /> */}
      <ul>
        <li>
          <p>email@email.com</p>
          <p>rendezvous</p>
          <p>Hi, looking forward to seeing you </p>
        </li>
      </ul>
    </div>
  );
};
export default Inbox;
