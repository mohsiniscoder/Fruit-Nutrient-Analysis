import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import './SignUp.css';

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [error, setError] = useState("");
  const { signUp } = useContext(AuthContext);
  const navigate = useNavigate();

  // 🧼 Sanitize potentially harmful input
  const sanitizeInput = (str) => {
    return str
      .replace(/[$.]/g, "")       // MongoDB injection
      .replace(/[<>]/g, "")       // XSS attack surface
      .replace(/["']/g, "")       // Malicious string injection
      .trim();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPass) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      const safeEmail = sanitizeInput(email);
      const safePassword = sanitizeInput(password);
      await signUp(safeEmail, safePassword);
      navigate("/login");
    } catch (err) {
      setError("Failed to create account");
      console.error(err);
    }
  };

  return (
    <div className="signup-container-wrapper">
      <form onSubmit={handleSubmit} className="signup-container">
        <h2>Create Account</h2>
        {error && <div className="error">{error}</div>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPass}
          onChange={(e) => setConfirmPass(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
        <p>
          Already have an account? <a href="/login">Log in</a>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
