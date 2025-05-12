// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'

const Navbar = () => (
  <nav>
    <Link to="/">Home</Link> | <Link to="/about">About</Link> | <Link to="/login">Login</Link> | <Link to="/signup">Sign Up</Link>
  </nav>
);

export default Navbar;
