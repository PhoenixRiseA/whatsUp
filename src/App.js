import Layout from "./components/Layout/Layout";
// import { Route, Routes, Navigate } from "react-router-dom";
import AuthPage from "./components/Pages/AuthPage";
function App() {
  return (
    <Layout>
      {/* <Routes>
        <Route path="/" element={<Navigate to="/auth" />} exact />
        <Route path="/auth" element={<AuthPage />}></Route>
      </Routes> */}
      <AuthPage />
    </Layout>
  );
}

export default App;
