import { useState, useRef } from "react";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import classes from "./ChatPage.module.css";
import { useSelector } from "react-redux";

// import { useState } from "react";
const ChatPage = () => {
  const enteredEmailRef = useRef();
  const enteredSubRef = useRef();
  const loggedInEmail = useSelector((state) => state.auth.email);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const handleEditorChange = (state) => {
    setEditorState(state);
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    const enteredEmail = enteredEmailRef.current.value;
    const enteredSub = enteredSubRef.current.value;

    const item = convertToRaw(editorState.getCurrentContent());
    const text = item.blocks[0].text;
    const input = {
      toEmail: enteredEmail,
      fromEmail: loggedInEmail,
      sub: enteredSub,
      text: text,
      seen: false,
      date: new Date().toString(),
    };
    const emailEndPoint = enteredEmail.replace(/[^a-zA-Z0-9 ]/g, "");
    const parentEmailEndPoint = loggedInEmail.replace(/[^a-zA-Z0-9 ]/g, "");

    try {
      const response = await fetch(
        `https://my-chat-app-2b721-default-rtdb.firebaseio.com/${emailEndPoint}/inbox/.json`,
        {
          method: "POST",
          body: JSON.stringify(input),
        }
      );
      const data = await response.json();

      console.log(data);
      enteredEmailRef.current.value = "";
      enteredSubRef.current.value = "";
    } catch (err) {
      console.log(err.message);
      throw new Error("email could not be sent");
    }

    try {
      const response = await fetch(
        `https://my-chat-app-2b721-default-rtdb.firebaseio.com/${parentEmailEndPoint}/sent.json`,
        {
          method: "POST",
          body: JSON.stringify(input),
        }
      );
      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.log(err.message);
      throw new Error("email could not be sent");
    }
  };

  return (
    <form className={classes.main} onSubmit={submitHandler}>
      <h1>Mail away!</h1>
      <div className={classes.to}>
        <label>To:</label>
        <br />
        <input type="email" id="email" ref={enteredEmailRef} required />
        <br />
        <label>Sub:</label>
        <br />
        <input type="text" ref={enteredSubRef} />
      </div>
      <div className={classes.text}>
        <Editor
          defaultEditorState={editorState}
          onEditorStateChange={handleEditorChange}
          wrapperClassName="wrapper-class"
          editorClassName="editor-class"
          toolbarClassName="toolbar-class"
        />
      </div>
      <div className={classes.actions}>
        <button type="submit">Send</button>
      </div>
    </form>
  );
};
export default ChatPage;
