import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import ReCAPTCHA from 'react-google-recaptcha';
import './Login.css';

const Login = () => {
  const { signIn } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [captchaValue, setCaptchaValue] = useState(null); // State to hold the reCAPTCHA response

  const sanitizeInput = (str) => {
    return str
      .replace(/[$.]/g, '')
      .replace(/[<>]/g, '')
      .replace(/["']/g, '')
      .trim();
  };

  const handleLogin = async () => {
    if (!captchaValue) {
      alert('Please verify that you are not a robot.');
      return;
    }

    const safeEmail = sanitizeInput(email);
    const safePassword = sanitizeInput(password);

    // Send the email, password, and captchaValue (token) to your backend
    await signIn(safeEmail, safePassword, captchaValue);
  };

  const onCaptchaChange = (value) => {
    setCaptchaValue(value); // Capture the reCAPTCHA response
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <ReCAPTCHA
        sitekey="6LcfYjcrAAAAAGSVozCkhXg1zdPZO66fSJbCqEho" // Replace with your actual site key
        onChange={onCaptchaChange} // Callback to capture the response token
      />
      <button onClick={handleLogin}>Sign In</button>
    </div>
  );
};

export default Login;
