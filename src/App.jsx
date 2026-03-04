import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { supabase } from './supabaseClient';

// Page & Component Imports
import Dashboard from './pages/Dashboard.jsx';
import LoginForm from './components/LoginForm.jsx';
import RegisterForm from './components/RegistrationForm.jsx';

function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check current session on load
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Listen for sign-in/sign-out changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  if (loading) return null;

  return (
    <Router>
      <Routes>
        {/* Auth Routes: Redirect to Dashboard if session exists */}
        <Route 
          path="/login" 
          element={!session ? <LoginForm supabase={supabase} /> : <  to="/" />} 
        />
        <Route 
          path="/register" 
          element={!session ? <RegisterForm /> : <Navigate to="/" />} 
        />

        {/* Dashboard Routes: Catch-all path that handles sub-navigation */}
        <Route 
          path="/*" 
          element={session ? <Dashboard onLogout={handleLogout} user={session.user} /> : <Navigate to="/login" />} 
        />
      </Routes>
    </Router>
  );
}

export default App;