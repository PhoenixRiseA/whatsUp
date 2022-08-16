import Layout from "./components/Layout/Layout";
import { Route, Routes, Navigate } from "react-router-dom";
import AuthPage from "./components/Pages/AuthPage";
// import Home from "./components/Pages/Home";
import ChatPage from "./components/Pages/ChatPage";
import { useSelector } from "react-redux";
import SentMail from "./components/Mail/SentMail";

function App() {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  return (
    <Layout>
      <Routes>
        {!isAuth && <Route path="/auth" element={<AuthPage />}></Route>}
        {isAuth && <Route path="/chat-away" element={<ChatPage />}></Route>}
        {isAuth && <Route path="/sent-email" element={<SentMail />}></Route>}
        <Route
          path="*"
          element={
            !isAuth ? <Navigate to="/auth" /> : <Navigate to="/chat-away" />
          }
        ></Route>
      </Routes>
    </Layout>
  );
}

export default App;
