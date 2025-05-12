import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";

const App = () => {
  return (
    <AuthProvider>
      <Navbar />
      <div className="p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </AuthProvider>
  );
};

export default App;
