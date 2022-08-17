import Layout from "./components/Layout/Layout";
import { Route, Routes, Navigate } from "react-router-dom";
import AuthPage from "./components/Pages/AuthPage";
// import Home from "./components/Pages/Home";
import ChatPage from "./components/Pages/ChatPage";
import { useSelector } from "react-redux";
import SentMail from "./components/Mail/SentMail";
import Inbox from "./components/Mail/Inbox";
import MailDetail from "./components/Mail/MailDetail";
import SentMailDetails from "./components/Mail/SentMailDetails";

function App() {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  return (
    <Layout>
      <Routes>
        {!isAuth && <Route path="/auth" element={<AuthPage />}></Route>}
        {isAuth && <Route path="/chat-away" element={<ChatPage />}></Route>}
        {isAuth && <Route path="/sent-email" element={<SentMail />}></Route>}
        {isAuth && <Route path="/inbox" element={<Inbox />}></Route>}
        {isAuth && (
          <Route path="/inbox/:inboxId" element={<MailDetail />}></Route>
        )}
        {isAuth && (
          <Route
            path="/sent-email/:sentId"
            element={<SentMailDetails />}
          ></Route>
        )}
        <Route
          path="*"
          element={!isAuth ? <Navigate to="/auth" /> : <Navigate to="/Inbox" />}
        ></Route>
      </Routes>
    </Layout>
  );
}

export default App;
