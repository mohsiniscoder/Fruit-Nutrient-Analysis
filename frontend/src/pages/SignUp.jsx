import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import ReCAPTCHA from "react-google-recaptcha";
import './SignUp.css';

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [captchaValue, setCaptchaValue] = useState(null); // <- New state
  const [error, setError] = useState("");
  const { signUp } = useContext(AuthContext);
  const navigate = useNavigate();

  const sanitizeInput = (str) => {
    return str
      .replace(/[$.]/g, "")
      .replace(/[<>]/g, "")
      .replace(/["']/g, "")
      .trim();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPass) {
      return setError("Passwords do not match");
    }

    if (!captchaValue) {
      return setError("Please complete the CAPTCHA");
    }

    try {
      setError("");
      const safeEmail = sanitizeInput(email);
      const safePassword = sanitizeInput(password);

      // Send captchaValue along with email and password
      await signUp(safeEmail, safePassword, captchaValue);

      navigate("/login");
    } catch (err) {
      setError("Failed to create account");
      console.error(err);
    }
  };

  const onCaptchaChange = (value) => {
    setCaptchaValue(value); // Save token
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

        <ReCAPTCHA
          sitekey=" 6LcfYjcrAAAAAGSVozCkhXg1zdPZO66fSJbCqEho"
          onChange={onCaptchaChange}
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
