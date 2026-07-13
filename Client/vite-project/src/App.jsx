import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';

import Home from './Pages/Home';
import Login from './Pages/Login';
import Builder from './Pages/Builder';
import Billing from './Pages/Billing';

import Navbaar from './Components/Navbar';
import ProtectedRoutes from './Components/ProtectedRoutes';
import {Toaster} from 'react-hot-toast';
export const ServerUrl = "http://localhost:5000";
export const CLIENT_URL = "http://localhost:5173";

axios.defaults.withCredentials = true;

function App() {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchCurrentUser = async () => {

      try {

        const res = await axios.get(
          ServerUrl + "/api/user/current-user"
        );

        console.log(res.data);

        setUser(res.data.user);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };

    fetchCurrentUser();

  }, []);

  useEffect(() => {
    if (user?._id) {
      const script = document.createElement("script");
      script.src = `${CLIENT_URL}/assistant.js`;
      script.dataset.userId = user._id;
      script.async = true;
      script.id = "dynamic-assistant-script";
      document.body.appendChild(script);

      return () => {
        const existingScript = document.getElementById("dynamic-assistant-script");
        if (existingScript) {
          existingScript.remove();
        }
        const popup = document.querySelector(".shifra-popup");
        if (popup) {
          popup.remove();
        }
        const openBtn = document.querySelector(".shifra-open-btn");
        if (openBtn) {
          openBtn.remove();
        }
      };
    }
  }, [user]);

  return (
<>
  <Toaster position='top-right' />
    <Routes>

      <Route
        path="/login"
        element={<Login setUser={setUser} />}
      />

      <Route
        path="/"
        element={
          <ProtectedRoutes user={user} loading={loading}>
            <>
              <Navbaar user={user} setUser={setUser} />
              <Home user={user} />
            </>
          </ProtectedRoutes>
        }
      />

      <Route
        path="/builder"
        element={
          <ProtectedRoutes user={user} loading={loading}>
            <>
              <Navbaar user={user} setUser={setUser} />
              <Builder user={user} setUser={setUser} />
            </>
          </ProtectedRoutes>
        }
      />

      <Route
        path="/billing"
        element={
          <ProtectedRoutes user={user} loading={loading}>
            <>
              <Navbaar user={user} setUser={setUser} />
              <Billing user={user} setUser={setUser} />
            </>
          </ProtectedRoutes>
        }
      />

      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />

    </Routes>
</>


  );
}

export default App;