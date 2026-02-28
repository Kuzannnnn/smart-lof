import React, { useState } from 'react';
import { Lock, Mail, Leaf, Loader2, ArrowRight } from 'lucide-react';

// Added onSwitchToRegister prop to handle navigation to the registration form
const LoginForm = ({ supabase, onSwitchToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Supabase handles the authentication and session update automatically
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    
    if (error) { 
      setError(error.message); 
      setLoading(false); 
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 px-4">
      <div className="max-w-md w-full bg-white/90 backdrop-blur-xl rounded-[2.5rem] shadow-2xl p-10 border border-white/50 transform transition-all duration-500 hover:shadow-emerald-500/20">
        
        <div className="text-center mb-10">
          <div className="inline-flex p-5 bg-gradient-to-tr from-green-400 to-emerald-600 rounded-3xl mb-6 text-white shadow-lg shadow-green-500/30 transform transition-transform duration-500 hover:rotate-12 hover:scale-110">
            <Leaf size={42} fill="currentColor" />
          </div>
          <h2 className="text-4xl font-black text-gray-900 tracking-tight">Smart LOF</h2>
          <p className="text-emerald-600 font-bold mt-2 uppercase tracking-widest text-xs">Reactor Management</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2 group">
            <label className="text-xs font-bold text-gray-500 uppercase ml-1 group-focus-within:text-emerald-600 transition-colors">
              Email Address
            </label>
            <div className="relative overflow-hidden rounded-2xl transition-all duration-300 focus-within:ring-4 focus-within:ring-emerald-500/20">
              <Mail className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-emerald-500 transition-colors z-10" size={20} />
              <input
                type="email"
                required
                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-transparent focus:bg-white focus:border-emerald-500 outline-none transition-all font-medium text-gray-800"
                placeholder="name@ustp.edu.ph"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2 group">
            <label className="text-xs font-bold text-gray-500 uppercase ml-1 group-focus-within:text-emerald-600 transition-colors">
              Password
            </label>
            <div className="relative overflow-hidden rounded-2xl transition-all duration-300 focus-within:ring-4 focus-within:ring-emerald-500/20">
              <Lock className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-emerald-500 transition-colors z-10" size={20} />
              <input
                type="password"
                required
                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-transparent focus:bg-white focus:border-emerald-500 outline-none transition-all font-medium text-gray-800"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 p-4 rounded-2xl border border-red-100 animate-pulse">
              <p className="text-red-500 text-sm font-bold text-center">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="group w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-black py-4 rounded-2xl shadow-xl shadow-green-500/30 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-green-500/40 active:scale-95 flex items-center justify-center gap-3 mt-8"
          >
            {loading ? <Loader2 className="animate-spin" size={22} /> : (
              <>Access Dashboard <ArrowRight size={20} className="transform transition-transform duration-300 group-hover:translate-x-1" /></>
            )}
          </button>
        </form>

        {/* Added Navigation to Registration Form */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 font-medium text-sm">
            New administrator?{' '}
            <button 
              onClick={onSwitchToRegister}
              className="text-emerald-600 font-bold hover:underline transition-all"
            >
              Create an Account
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;