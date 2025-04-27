import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithPopup, signOut } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';
import { useAuth } from '../hooks/useAuth';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [error, setError] = useState(null);

  const signInWithGoogle = async () => {
    try {
      setError(null);
      await signInWithPopup(auth, googleProvider);
      navigate('/profile');
    } catch (error) {
      setError('Failed to log in. Please try again.');
      console.error('Error logging in:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      setError('Failed to log out. Please try again.');
      console.error('Error logging out:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="login-container">
      <h1>Student Recommendation System 🚀</h1>
      {user ? (
        <div className="logged-in">
          <h2>Welcome, {user.displayName || user.email}!</h2>
          <p>You are logged in. Explore your profile or get recommendations.</p>
          <button onClick={() => navigate('/profile')} className="action-button">
            Go to Profile
          </button>
          <button onClick={handleLogout} className="logout-button">
            Log Out
          </button>
        </div>
      ) : (
        <div className="logged-out">
          <h2>Log In</h2>
          <p>Log in with Google to access your personalized recommendations.</p>
          <button onClick={signInWithGoogle} className="google-button">
            Log in with Google
          </button>
          <p>
            New user? <Link to="/signup">Sign up here</Link>.
          </p>
          {error && <p className="error">{error}</p>}
        </div>
      )}
    </div>
  );
};

export default Login;