// src/pages/Dashboard.jsx
import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Play } from 'lucide-react';

// Component Imports
import Navbar from '../components/Navbar.jsx';
import SensorGrid from '../components/SensorGrid.jsx';
import Analytics from '../components/Analytics.jsx';
import BatchHistory from '../components/BatchHistory.jsx'; 
import ActiveBatches from '../components/ActiveBatches.jsx';
import Profile from './Profile.jsx'; 
import Settings from './Settings.jsx';

const Dashboard = ({ onLogout, user }) => {
  // Synchronized state for the user's name
  const [profileName, setProfileName] = useState(user?.user_metadata?.full_name || "Raven Dale");

  const handleProfileUpdate = (newName) => {
    setProfileName(newName);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col overflow-x-hidden">
      {/* Navbar now relies on URL location instead of local state */}
      <Navbar 
        onLogout={onLogout} 
        user={user} 
        displayName={profileName} 
      />

      <main className="flex-1 p-4 md:p-6 max-w-7xl mx-auto w-full mt-4 md:mt-6 mb-20 md:mb-12">
        <Routes>
          {/* VIEW 1: OVERVIEW */}
          <Route path="/overview" element={
            <div className="space-y-6 md:space-y-8 animate-in fade-in duration-500 w-full">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 w-full">
                <div className="w-full md:w-auto">
                  <h1 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">System Overview</h1>
                  <p className="text-sm md:text-base text-gray-500 font-medium italic mt-1">Live monitoring of the Smart LOF reactor environment.</p>
                </div>
                <button className="w-full md:w-auto bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-all transform active:scale-95 flex items-center justify-center gap-2">
                  <Play size={18} fill="currentColor" /> Run Manual Stir
                </button>
              </div>
              <SensorGrid />
              <ActiveBatches /> 
            </div>
          } />

          {/* VIEW 2: ANALYTICS */}
          <Route path="/analytics" element={<Analytics />} />
          
          {/* VIEW 3: HISTORY */}
          <Route path="/history" element={<BatchHistory />} />
          
          {/* VIEW 4: PROFILE */}
          <Route path="/profile" element={
            <Profile 
              user={user} 
              onProfileUpdate={handleProfileUpdate} 
            />
          } />
          
          {/* VIEW 5: SETTINGS */}
          <Route path="/settings" element={<Settings />} />

          {/* DEFAULT REDIRECT */}
          <Route path="*" element={<Navigate to="/overview" replace />} />
        </Routes>
      </main>
    </div>  
  );
};

export default Dashboard;