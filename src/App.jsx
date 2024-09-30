import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import PrivateRoute from "./components/PrivateRoute";
import { auth } from "./config/config";

const App = () => {
  const [loading, setLoading] = useState(true); // State to manage loading
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    // Listen for changes in user authentication state
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, navigate to home page
        navigate("/");
      } else {
        // User is signed out, navigate to login page
        // navigate("/login");
      }
      setLoading(false); // Set loading to false after checking auth state
    });

    // Cleanup the subscription on unmount
    return () => unsubscribe();
  }, [navigate]);

  // Render loading state while checking authentication
  if (loading) {
    return <div>Loading...</div>; // You can replace this with a loading spinner or any other component
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Toaster />
    </>
  );
};

export default App;
