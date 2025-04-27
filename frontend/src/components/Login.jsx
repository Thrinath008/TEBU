import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/profile'); // Navigate to profile page after login
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  return (
    <div className="login-container">
      <h1>Student Recommendation System 🚀</h1>
      <h2>Login</h2>
      <button onClick={signInWithGoogle} className="google-button">
        Sign in with Google
      </button>
    </div>
  );
};

export default Login;