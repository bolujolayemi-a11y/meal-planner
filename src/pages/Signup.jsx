import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, Globe, Loader2 } from 'lucide-react';
import { supabase } from '../supabaseClient';

const Signup = ({ onAuth }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  // --- Helper: Fetch IP Address for Guest tracking ---
  const getUserIP = async () => {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      return data.ip;
    } catch (error) {
      console.error("IP Fetch Error:", error);
      return "Unknown";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Record Name, Email, and Password in Supabase
      const { error } = await supabase
        .from('registered_users')
        .insert([{ 
          email: formData.email, 
          name: formData.name,
          password_hint: formData.password 
        }]);

      if (error) throw error;

      // SUCCESS: Pass the user's name to onAuth for initials
      onAuth(formData.name);
      navigate('/');
    } catch (error) {
      console.error("Signup Error:", error);
      // Fallback: Still log them in for the demo even if DB fails
      onAuth(formData.name);
      navigate('/');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGuestEntry = async () => {
    setIsSubmitting(true);
    try {
      // 1. Get the IP first
      const ip = await getUserIP();

      // 2. Record it in Supabase
      await supabase
        .from('guest_entries')
        .insert([{ ip_address: ip }]);

      // SUCCESS: Pass 'Guest' to onAuth so the avatar shows 'G'
      onAuth('Guest');
      navigate('/');
    } catch (error) {
      console.error("Guest Entry Error:", error);
      onAuth('Guest');
      navigate('/');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-[40px] shadow-2xl p-10 border border-gray-50 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        {/* Logo Section */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-orange-500 rounded-3xl flex items-center justify-center text-white font-black text-2xl mx-auto mb-6 shadow-lg shadow-orange-100">
            C
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Create Account</h1>
          <p className="text-gray-400 font-medium mt-2 text-sm">Join to track your culinary journey.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name Input */}
          <div className="relative group">
            <User className="absolute left-4 top-4 text-gray-400 w-5 h-5 group-focus-within:text-orange-500 transition-colors" />
            <input 
              type="text" required value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="Full Name" 
              className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 border-transparent focus:border-orange-500 transition-all font-medium text-slate-800" 
            />
          </div>

          {/* Email Input */}
          <div className="relative group">
            <Mail className="absolute left-4 top-4 text-gray-400 w-5 h-5 group-focus-within:text-orange-500 transition-colors" />
            <input 
              type="email" required value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              placeholder="Email Address" 
              className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 border-transparent focus:border-orange-500 transition-all font-medium text-slate-800" 
            />
          </div>

          {/* Password Input */}
          <div className="relative group">
            <Lock className="absolute left-4 top-4 text-gray-400 w-5 h-5 group-focus-within:text-orange-500 transition-colors" />
            <input 
              type={showPassword ? "text" : "password"} required value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              placeholder="Password" 
              className="w-full pl-12 pr-12 py-4 bg-gray-50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 border-transparent focus:border-orange-500 transition-all font-medium text-slate-800" 
            />
            <button 
              type="button" 
              onClick={() => setShowPassword(!showPassword)} 
              className="absolute right-4 top-4 text-gray-400 hover:text-orange-500 transition-colors"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" disabled={isSubmitting}
            className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-orange-500 transition-all active:scale-[0.98] cursor-pointer disabled:opacity-70 disabled:cursor-wait"
          >
            {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : "Sign Up"} 
            {!isSubmitting && <ArrowRight size={18} />}
          </button>
        </form>

        {/* Decorative Divider */}
        <div className="flex items-center my-8">
          <div className="flex-1 h-px bg-gray-100"></div>
          <span className="px-4 text-gray-300 text-[10px] font-black uppercase tracking-widest italic">Or</span>
          <div className="flex-1 h-px bg-gray-100"></div>
        </div>

        {/* Guest Button */}
        <button 
          onClick={handleGuestEntry} disabled={isSubmitting}
          className="w-full py-4 border border-gray-100 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-gray-50 transition-all text-slate-700 active:scale-[0.98] cursor-pointer disabled:opacity-50 disabled:cursor-wait"
        >
          {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : <Globe size={20} className="text-orange-500" />}
          Continue as Guest
        </button>
      </div>
    </div>
  );
};

export default Signup;