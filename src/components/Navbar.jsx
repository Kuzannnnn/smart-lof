import React, { useState } from 'react';
import { Leaf, LogOut, User, Settings, ChevronDown, Bell, Menu, X } from 'lucide-react';

const Navbar = ({ onLogout, user, currentView, setCurrentView }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // New state for mobile

  const getTabClass = (tabName) => {
    return currentView === tabName
      ? "text-emerald-600 font-bold border-b-4 border-emerald-500 py-4 md:py-7 px-1 transition-all"
      : "text-gray-500 hover:text-gray-900 font-medium py-4 md:py-7 px-1 transition-colors border-b-4 border-transparent";
  };

  const fullName = user?.user_metadata?.full_name || "Administrator";
  const initials = fullName.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);

  const handleNavClick = (view) => {
    setCurrentView(view);
    setIsMobileMenuOpen(false); // Close mobile menu on click
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-20 flex-wrap">
        
        {/* Left: Logo */}
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-tr from-emerald-400 to-green-600 rounded-lg text-white shadow-md">
            <Leaf size={20} />
          </div>
          <span className="text-xl font-black text-gray-900">Smart LOF</span>
        </div>

        {/* Center: Desktop Links (Hidden on mobile) */}
        <div className="hidden md:flex items-center space-x-8">
          <button onClick={() => handleNavClick('overview')} className={getTabClass('overview')}>Overview</button>
          <button onClick={() => handleNavClick('analytics')} className={getTabClass('analytics')}>Analytics</button>
          <button onClick={() => handleNavClick('history')} className={getTabClass('history')}>Batch History</button>
        </div>

        {/* Right: Desktop Profile & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <button className="hidden md:block text-gray-400 hover:text-emerald-600 relative">
            <Bell size={22} />
            <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white"></span>
          </button>

          {/* Mobile Hamburger Button */}
          <button 
            className="md:hidden p-2 text-gray-500 hover:text-emerald-600 focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          {/* Desktop Profile Dropdown (Hidden on mobile) */}
          <div className="hidden md:block relative">
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-3 hover:bg-gray-50 p-2 rounded-xl transition-all border border-transparent"
            >
              <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 font-black">{initials}</div>
              <div className="text-left">
                <p className="text-sm font-bold text-gray-700 leading-tight">{fullName}</p>
              </div>
              <ChevronDown size={18} className="text-gray-400" />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-3 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50">
                <button onClick={() => { handleNavClick('profile'); setIsDropdownOpen(false); }} className="flex w-full items-center gap-3 px-5 py-3 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-700"><User size={18} /> Profile</button>
                <button onClick={() => { handleNavClick('settings'); setIsDropdownOpen(false); }} className="flex w-full items-center gap-3 px-5 py-3 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-700"><Settings size={18} /> Settings</button>
                <div className="h-px bg-gray-100 my-2 mx-4"></div>
                <button onClick={onLogout} className="flex w-full items-center gap-3 px-5 py-3 text-sm font-bold text-red-600 hover:bg-red-50"><LogOut size={18} /> Sign Out</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown (Flex Column) */}
      {isMobileMenuOpen && (
        <div className="md:hidden flex flex-col bg-white border-t border-gray-100 w-full px-4 pt-2 pb-6 shadow-lg absolute left-0 top-20 z-40">
          <button onClick={() => handleNavClick('overview')} className="py-3 text-left font-bold text-gray-700 border-b border-gray-50">Overview</button>
          <button onClick={() => handleNavClick('analytics')} className="py-3 text-left font-bold text-gray-700 border-b border-gray-50">Analytics</button>
          <button onClick={() => handleNavClick('history')} className="py-3 text-left font-bold text-gray-700 border-b border-gray-50">Batch History</button>
          <button onClick={() => handleNavClick('profile')} className="py-3 text-left font-bold text-gray-700 border-b border-gray-50">My Profile</button>
          <button onClick={onLogout} className="py-3 text-left font-bold text-red-600 mt-2 flex items-center gap-2"><LogOut size={18}/> Sign Out</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;