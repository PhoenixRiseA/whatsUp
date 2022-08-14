import Layout from "./components/Layout/Layout";
import { Route, Routes, Navigate } from "react-router-dom";
import AuthPage from "./components/Pages/AuthPage";
// import Home from "./components/Pages/Home";
import ChatPage from "./components/Pages/ChatPage";
import { useSelector } from "react-redux";

function App() {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/auth" />} exact />
        {!isAuth && <Route path="/auth" element={<AuthPage />}></Route>}
        {isAuth && <Route path="/chat-away" element={<ChatPage />}></Route>}
      </Routes>
    </Layout>
  );
}

export default App;
