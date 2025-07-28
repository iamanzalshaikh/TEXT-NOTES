// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useContext, useEffect } from "react";
import Login from './pages/Login';
import Home from "./pages/Home";
import Registration from "./pages/Registration";
import AuthProvider from "./context/AuthContext";
import UserContextProvider, { UserDataContext } from "./context/UserContext";

function AppRoutes() {
  const { userData, loading } = useContext(UserDataContext);
  const location = useLocation();

  // Optional: prevent flicker while checking auth
  if (loading) return <p>Loading...</p>;

  return (
    <Routes>
      <Route
        path="/"
        element={userData ? <Home /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/login"
        element={!userData ? <Login /> : <Navigate to="/" replace />}
      />
      <Route
        path="/registration"
        element={!userData ? <Registration /> : <Navigate to="/" replace />}
      />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <UserContextProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </UserContextProvider>
    </AuthProvider>
  );
}

export default App;
