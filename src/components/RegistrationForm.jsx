import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { Mail, Lock, User, ArrowRight, Leaf, Loader2 } from 'lucide-react';
import { supabase } from '../supabaseClient';

const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize navigation hook
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Register user in Supabase Auth
    const { data, error: authError } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          full_name: formData.name, // Key used by SQL trigger
          display_name: formData.name,
        }
      }
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
    } else {
      // Success logic
      alert("Registration successful! Please check your email or try signing in.");
      navigate('/login'); // Redirect to login route after success
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 px-4 font-sans">
      <div className="max-w-md w-full bg-white/90 backdrop-blur-xl rounded-[2.5rem] shadow-2xl p-10 border border-white/50 animate-in fade-in zoom-in duration-500">
        
        <div className="text-center mb-10">
          <div className="inline-flex p-5 bg-gradient-to-tr from-green-400 to-emerald-600 rounded-3xl mb-6 text-white shadow-lg">
            <Leaf size={42} fill="currentColor" />
          </div>
          <h2 className="text-4xl font-black text-gray-900 tracking-tight">Create Account</h2>
          <p className="text-emerald-600 font-bold mt-2 uppercase tracking-widest text-xs tracking-tighter">Smart LOF Administrator</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2 group">
            <label className="text-xs font-bold text-gray-500 uppercase ml-1">Full Name</label>
            <div className="relative overflow-hidden rounded-2xl focus-within:ring-4 focus-within:ring-emerald-500/20">
              <User className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-emerald-500 transition-colors z-10" size={20} />
              <input
                name="name"
                type="text"
                required
                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-transparent focus:bg-white focus:border-emerald-500 outline-none transition-all font-medium text-gray-800"
                placeholder="Raven Dale Siglos"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="space-y-2 group">
            <label className="text-xs font-bold text-gray-500 uppercase ml-1">Email Address</label>
            <div className="relative overflow-hidden rounded-2xl focus-within:ring-4 focus-within:ring-emerald-500/20">
              <Mail className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-emerald-500 transition-colors z-10" size={20} />
              <input
                name="email"
                type="email"
                required
                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-transparent focus:bg-white focus:border-emerald-500 outline-none transition-all font-medium text-gray-800"
                placeholder="name@ustp.edu.ph"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="space-y-2 group">
            <label className="text-xs font-bold text-gray-500 uppercase ml-1">Password</label>
            <div className="relative overflow-hidden rounded-2xl focus-within:ring-4 focus-within:ring-emerald-500/20">
              <Lock className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-emerald-500 transition-colors z-10" size={20} />
              <input
                name="password"
                type="password"
                required
                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-transparent focus:bg-white focus:border-emerald-500 outline-none transition-all font-medium text-gray-800"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 p-4 rounded-2xl border border-red-100">
              <p className="text-red-500 text-sm font-bold text-center">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="group w-full bg-gradient-to-r from-emerald-500 to-green-600 text-white font-black py-4 rounded-2xl shadow-xl transition-all transform active:scale-95 flex items-center justify-center gap-3 mt-4"
          >
            {loading ? <Loader2 className="animate-spin" size={22} /> : (
              <>Register Account <ArrowRight size={20} /></>
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-500 font-medium text-sm">
            Already have an account?{' '}
            <button 
              type="button"
              onClick={() => navigate('/login')} // Updated to use navigate
              className="text-emerald-600 font-bold hover:underline"
            >
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;