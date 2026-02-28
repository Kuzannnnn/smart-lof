import React, { useState } from 'react';
import { Settings as SettingsIcon, Bell, Cpu, Timer, ShieldAlert, RefreshCw, Save, ArrowLeft } from 'lucide-react';

const Settings = ({ setCurrentView }) => {
  const [settings, setSettings] = useState({
    autoStir: true,
    stirDuration: 5,
    tempThreshold: 35,
    phLowerLimit: 6.5,
    phUpperLimit: 8.5,
    loggingInterval: 15,
    alertNotifications: true
  });

  const handleToggle = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSlider = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: parseInt(value) }));
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">System Settings</h1>
          <p className="text-gray-500 font-medium mt-1">Configure Smart LOF hardware and monitoring logic.</p>
        </div>
        <button 
          onClick={() => setCurrentView('overview')}
          className="flex items-center gap-2 text-sm font-bold text-emerald-600 hover:text-emerald-700 transition-colors bg-emerald-50 px-4 py-2 rounded-xl"
        >
          <ArrowLeft size={18} /> Back to Overview
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Hardware Control Section */}
        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 space-y-6">
          <h3 className="text-lg font-black text-gray-800 flex items-center gap-2">
            <Cpu size={20} className="text-emerald-500" /> Reactor Control
          </h3>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
              <div>
                <p className="font-bold text-gray-700">Automated Stirring</p>
                <p className="text-xs text-gray-400">Trigger motor based on methane accumulation.</p>
              </div>
              <button 
                onClick={() => handleToggle('autoStir')}
                className={`w-12 h-6 rounded-full transition-colors relative ${settings.autoStir ? 'bg-emerald-500' : 'bg-gray-300'}`}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${settings.autoStir ? 'right-1' : 'left-1'}`} />
              </button>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-sm font-bold text-gray-600">
                <span className="flex items-center gap-2"><Timer size={16}/> Stir Duration</span>
                <span className="text-emerald-600">{settings.stirDuration} Minutes</span>
              </div>
              <input 
                type="range" min="1" max="30" 
                value={settings.stirDuration}
                onChange={(e) => handleSlider('stirDuration', e.target.value)}
                className="w-full accent-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* Threshold Safety Section */}
        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 space-y-6">
          <h3 className="text-lg font-black text-gray-800 flex items-center gap-2">
            <ShieldAlert size={20} className="text-red-500" /> Safety Thresholds
          </h3>
          
          <div className="space-y-4">
            <div className="p-4 bg-red-50 rounded-2xl border border-red-100">
              <label className="text-xs font-black text-red-600 uppercase tracking-wider">Critical Temperature (°C)</label>
              <input 
                type="number" 
                value={settings.tempThreshold}
                onChange={(e) => handleSlider('tempThreshold', e.target.value)}
                className="w-full bg-transparent text-xl font-bold text-red-900 outline-none mt-1"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-2xl">
                <label className="text-xs font-bold text-gray-400 uppercase">Min pH</label>
                <input 
                  type="number" step="0.1"
                  value={settings.phLowerLimit}
                  onChange={(e) => handleSlider('phLowerLimit', e.target.value)}
                  className="w-full bg-transparent text-lg font-bold text-gray-700 outline-none"
                />
              </div>
              <div className="p-4 bg-gray-50 rounded-2xl">
                <label className="text-xs font-bold text-gray-400 uppercase">Max pH</label>
                <input 
                  type="number" step="0.1"
                  value={settings.phUpperLimit}
                  onChange={(e) => handleSlider('phUpperLimit', e.target.value)}
                  className="w-full bg-transparent text-lg font-bold text-gray-700 outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Data & Alerts Section */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-6">
            <div className="p-4 bg-emerald-100 rounded-2xl text-emerald-600">
              <RefreshCw size={24} />
            </div>
            <div>
              <p className="font-black text-gray-900">Data Sync Interval</p>
              <p className="text-sm text-gray-500 font-medium">Currently logging every {settings.loggingInterval} minutes to Supabase.</p>
            </div>
          </div>
          <button className="w-full md:w-auto bg-gray-900 text-white font-black px-10 py-4 rounded-2xl hover:bg-gray-800 transition-all flex items-center justify-center gap-2 shadow-xl">
            <Save size={20} /> Save System Configuration
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;