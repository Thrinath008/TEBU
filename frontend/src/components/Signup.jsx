import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';
import { useAuth } from '../hooks/useAuth';
import './Signup.css';

const Signup = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [error, setError] = useState(null);

  const signUpWithGoogle = async () => {
    try {
      setError(null);
      await signInWithPopup(auth, googleProvider);
      navigate('/profile');
    } catch (error) {
      setError('Failed to sign up. Please try again.');
      console.error('Error signing up:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (user) {
    return (
      <div className="signup-container">
        <h1>Student Recommendation System 🚀</h1>
        <div className="logged-in">
          <h2>Welcome, {user.displayName || user.email}!</h2>
          <p>You are already signed in. Explore your profile or get recommendations.</p>
          <button onClick={() => navigate('/profile')} className="action-button">
            Go to Profile
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="signup-container">
      <h1>Student Recommendation System 🚀</h1>
      <div className="logged-out">
        <h2>Sign Up</h2>
        <p>Create a new account with Google to access personalized recommendations.</p>
        <button onClick={signUpWithGoogle} className="google-button">
          Sign up with Google
        </button>
        <p>
          Already have an account? <Link to="/">Log in here</Link>.
        </p>
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
};

export default Signup;