import Layout from "./components/Layout/Layout";
import { Route, Routes, Navigate } from "react-router-dom";
import AuthPage from "./components/Pages/AuthPage";
import React, { Suspense } from "react";
import ChatPage from "./components/Pages/ChatPage";
import { useSelector } from "react-redux";
import SentMail from "./components/Mail/SentMail";
import Inbox from "./components/Mail/Inbox";
// import InboxMailDetail from "./components/Mail/inboxMailDetail";
// import SentMailDetails from "./components/Mail/SentMailDetails";
import ForgotPasswordPage from "./components/Pages/ForgotPasswordPage";
// import About from "./components/Pages/About";
import LoadingSpinner from "./components/Layout/UI/LoadingSpinner";
import "./App.css";
const About = React.lazy(() => import("./components/Pages/About"));
const SentMailDetails = React.lazy(() =>
  import("./components/Mail/SentMailDetails")
);
const InboxMailDetail = React.lazy(() =>
  import("./components/Mail/inboxMailDetail")
);
function App() {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  return (
    <Layout>
      <Suspense
        fallback={
          <div className="center">
            <LoadingSpinner />
          </div>
        }
      >
        <Routes>
          {!isAuth && <Route path="/auth" element={<AuthPage />}></Route>}
          {!isAuth && (
            <Route
              path="/forgot-password"
              element={<ForgotPasswordPage />}
            ></Route>
          )}
          <Route path="/about" element={<About />}></Route>
          {isAuth && <Route path="/chat-away" element={<ChatPage />}></Route>}
          {isAuth && <Route path="/sent-email" element={<SentMail />}></Route>}
          {isAuth && <Route path="/inbox" element={<Inbox />}></Route>}
          {isAuth && (
            <Route path="/inbox/:inboxId" element={<InboxMailDetail />}></Route>
          )}
          {isAuth && (
            <Route
              path="/sent-email/:sentId"
              element={<SentMailDetails />}
            ></Route>
          )}
          <Route
            path="*"
            element={
              !isAuth ? <Navigate to="/auth" /> : <Navigate to="/Inbox" />
            }
          ></Route>
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;
