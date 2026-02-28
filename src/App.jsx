import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import Dashboard from './pages/Dashboard.jsx';
import LoginForm from './components/LoginForm.jsx';
import RegisterForm from './components/RegistrationForm.jsx';

function App() {
  const [session, setSession] = useState(null);
  const [authView, setAuthView] = useState('login');
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
    await supabase.auth.signOut(); // Triggers the state change to null
  };

  if (loading) return null; // Prevents showing login form while checking session

  if (session) {
    return <Dashboard onLogout={handleLogout} user={session.user} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {authView === 'login' ? (
        <LoginForm 
          supabase={supabase} 
          onSwitchToRegister={() => setAuthView('register')} 
        />
      ) : (
        <RegisterForm 
          onSwitchToLogin={() => setAuthView('login')} 
        />
      )}
    </div>
  );
}

export default App;