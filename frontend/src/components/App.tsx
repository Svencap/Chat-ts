/* eslint-disable react/prop-types */
/* eslint-disable object-curly-newline */
/* eslint-disable quotes */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  BrowserRouter,
} from "react-router-dom";

import "../App.css";

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

import LoginPage from "./Login";
import NotFoundPage from "./Not_FoundPage.jsx";
import SingUpPage from "./SignUp";
import Navbar from "./HeaderNavbar";
import routes from "../routes.js";
import AuthContext from "../contexts/index";
import useAuth from "../hooks/index";
import Chat from "./Chat/Chat";

type ProviderProps = {
  children: JSX.Element | JSX.Element[];
}


const AuthProvider = ({ children }: ProviderProps) => {
  const [loggedIn, setLoggedIn] = useState<boolean>();

  const logIn = () => setLoggedIn(true);
  const user = JSON.parse(localStorage.getItem("user") || 'null');

  const logOut = () => {
    localStorage.removeItem("user");
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ loggedIn, logIn, logOut, user }}>
      {children}
    </AuthContext.Provider>
  );
};

// Пофиксить PrivateRoute;

const PrivateRoute = ({ children }: any) => {
  const auth = useAuth();
  const location = useLocation();

  return auth.user ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path={routes.loginPagePath()} element={<LoginPage />} />
          <Route path={routes.signupPagePath()} element={<SingUpPage />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route
            path="/"
            element={(
              <PrivateRoute>
                <Chat />
              </PrivateRoute>
            )}
          />
        </Routes>
        <ToastContainer />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
