// src/pages/Dashboard.jsx
import React, { useState } from 'react';
import { Play, ShieldCheck, Wifi } from 'lucide-react';

// Component Imports
import Navbar from '../components/Navbar.jsx';
import SensorGrid from '../components/SensorGrid.jsx';
import Analytics from '../components/Analytics.jsx';
import BatchHistory from '../components/BatchHistory.jsx'; 
import ActiveBatches from '../components/ActiveBatches.jsx'; // <--- New Import
import Profile from './Profile.jsx'; 
import Settings from './Settings.jsx';

const Dashboard = ({ onLogout, user }) => {
  const [currentView, setCurrentView] = useState('overview');

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col overflow-x-hidden">
      <Navbar currentView={currentView} setCurrentView={setCurrentView} onLogout={onLogout} user={user} />

      <main className="flex-1 p-4 md:p-6 max-w-7xl mx-auto w-full mt-4 md:mt-6 mb-20 md:mb-12">
        
        {/* VIEW 1: OVERVIEW */}
        {currentView === 'overview' && (
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

            {/* Replaced old code with the new component */}
            <ActiveBatches /> 

          </div>
        )}

        {/* ... (rest of the views: analytics, history, profile, settings) */}
        {currentView === 'analytics' && <Analytics />}
        {currentView === 'history' && <BatchHistory />}
        {currentView === 'profile' && <Profile setCurrentView={setCurrentView} user={user} />}
        {currentView === 'settings' && <Settings setCurrentView={setCurrentView} />}
        
      </main>

      {/* Footer code remains the same... */}
    </div>  
  );
};

export default Dashboard;