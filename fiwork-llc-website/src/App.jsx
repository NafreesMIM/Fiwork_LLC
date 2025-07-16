// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { auth } from './firebaseConfig';
import { onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

// Import your page components
import HomePage from './pages/HomePage';
import PortfolioPage from './pages/PortfolioPage';
import ServicesPage from './pages/ServicesPage';
import BriefFormPage from './pages/BriefFormPage'; // Changed to a full page
import ThankYouPage from './pages/ThankYouPage';
import ContactPage from './pages/ContactPage';
import AdminDashboard from './pages/AdminDashboard'; // For the admin side

// Main application component
function App() {
  const [user, setUser] = useState(null); // Firebase authenticated user
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoadingAuth(false);
    });
    return () => unsubscribe(); // Cleanup subscription
  }, []);

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error signing in with Google:", error.message);
      // Display error to user
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  // Simple PrivateRoute component for admin access
  const PrivateRoute = ({ children, allowedUid }) => {
    if (loadingAuth) return <div className="loading-spinner"></div>; // Or a loading indicator
    return user && user.uid === allowedUid ? children : <Navigate to="/auth-required" replace />;
  };

  // Define your specific admin UID here
  // IMPORTANT: In a real app, manage admin roles more securely, e.g., via Firestore rules
  const ADMIN_UID = "YOUR_ADMIN_FIREBASE_UID"; // Replace with your actual Firebase User UID for admin

  return (
    <Router>
      <div className="app-container">
        <header className="main-header">
          <nav className="navbar">
            <Link to="/" className="logo">Fiwork<span>_LLC</span></Link>
            <ul className="nav-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/portfolio">Portfolio</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              {/* Conditional rendering for admin link and auth */}
              {user && user.uid === ADMIN_UID && (
                <li><Link to="/admin">Admin</Link></li>
              )}
              <li className="auth-status">
                {user ? (
                  <>
                    <span>Hi, {user.displayName || 'Designer'}!</span>
                    <button onClick={handleSignOut} className="auth-button sign-out">Sign Out</button>
                  </>
                ) : (
                  <button onClick={handleGoogleSignIn} className="auth-button sign-in">Sign In (Admin)</button>
                )}
              </li>
            </ul>
          </nav>
        </header>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/brief/:package?" element={<BriefFormPage />} /> {/* Optional package param */}
            <Route path="/thank-you/:briefId?" element={<ThankYouPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route
              path="/admin"
              element={
                <PrivateRoute allowedUid={ADMIN_UID}>
                  <AdminDashboard />
                </PrivateRoute>
              }
            />
            <Route path="/auth-required" element={<div className="auth-message"><h2>Access Denied</h2><p>You need to be signed in as an administrator to view this page.</p><button onClick={handleGoogleSignIn}>Sign In as Admin</button></div>} />
            <Route path="*" element={<div className="not-found"><h2>404 - Page Not Found</h2><p>The page you are looking for does not exist.</p><Link to="/">Go Home</Link></div>} />
          </Routes>
        </main>

        <footer className="main-footer">
          <p>&copy; {new Date().getFullYear()} Fiwork LLC. All rights reserved.</p>
          <div className="footer-links">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;