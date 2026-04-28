import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, Globe, Loader2, Search, ChevronRight } from 'lucide-react';
import { supabase } from '../supabaseClient';

const Signup = ({ onAuth }) => {
  const navigate = useNavigate();
  const [mode, setMode] = useState('signin'); 
  const [step, setStep] = useState('form'); 
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [tempUser, setTempUser] = useState(null);
  const [langSearch, setLangSearch] = useState('');

  // Includes your requested languages: French, Korean, etc.
  const allLanguages = [
    { code: 'en', name: 'English', flag: '🇺🇸' }, { code: 'ko', name: 'Korean', flag: '🇰🇷' },
    { code: 'fr', name: 'French', flag: '🇫🇷' }, { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
    { code: 'es', name: 'Spanish', flag: '🇪🇸' }, { code: 'de', name: 'German', flag: '🇩🇪' },
    { code: 'yo', name: 'Yoruba', flag: '🇳🇬' }, { code: 'ig', name: 'Igbo', flag: '🇳🇬' },
    { code: 'hi', name: 'Hindi', flag: '🇮🇳' }, { code: 'ar', name: 'Arabic', flag: '🇸🇦' }
  ].filter(l => l.name.toLowerCase().includes(langSearch.toLowerCase()));

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      if (mode === 'signup') {
        const { error: dbError } = await supabase.from('registered_users').insert([{ 
          email: formData.email, name: formData.name, password_hint: formData.password 
        }]);
        if (dbError) throw dbError;
        setTempUser({ name: formData.name, email: formData.email });
        setStep('lang');
      } else {
        const { data, error: dbError } = await supabase
          .from('registered_users')
          .select('name')
          .eq('email', formData.email)
          .eq('password_hint', formData.password)
          .single();

        if (dbError || !data) throw new Error("Invalid credentials");
        
        const savedLang = localStorage.getItem(`lang_pref_${formData.email}`);
        if (savedLang) {
          // KEY FIX: Set storage first, then pass lang to onAuth
          localStorage.setItem('user_lang', savedLang);
          localStorage.setItem('isLoggedIn', 'true');
          onAuth(data.name, savedLang); 
          navigate('/');
        } else {
          setTempUser({ name: data.name, email: formData.email });
          setStep('lang');
        }
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGuestEntry = async () => {
    setIsSubmitting(true);
    try {
      const ipRes = await fetch('https://api.ipify.org?format=json');
      const ipData = await ipRes.json();
      await supabase.from('guest_entries').insert([{ ip_address: ipData.ip }]);
      
      setTempUser({ name: 'Guest', email: 'guest_session' });
      setStep('lang'); 
    } catch (err) {
      setTempUser({ name: 'Guest', email: 'guest_session' });
      setStep('lang');
    } finally {
      setIsSubmitting(false);
    }
  };

  const finishAuth = (langCode) => {
    // 1. Write to storage
    localStorage.setItem('user_lang', langCode);
    localStorage.setItem('isLoggedIn', 'true');
    
    if (tempUser?.email !== 'guest_session') {
      localStorage.setItem(`lang_pref_${tempUser.email}`, langCode);
    }

    // 2. Alert App.jsx immediately with the specific language
    onAuth(tempUser.name, langCode);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] flex items-center justify-center p-6 font-sans">
      <div className="max-w-md w-full bg-white rounded-[40px] shadow-2xl p-10 border border-gray-50">
        
        {step === 'form' ? (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-orange-500 rounded-3xl flex items-center justify-center text-white font-black text-2xl mx-auto mb-4 shadow-lg shadow-orange-100">C</div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                {mode === 'signup' ? 'Join Us' : 'Welcome Back'}
              </h1>
            </div>

            <form onSubmit={handleAuthSubmit} className="space-y-4">
              {mode === 'signup' && (
                <div className="relative group">
                  <User className="absolute left-4 top-4 text-gray-400 w-5 h-5 group-focus-within:text-orange-500 transition-colors" />
                  <input type="text" required placeholder="Full Name" className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-orange-500/20 font-medium" 
                    onChange={(e) => setFormData({...formData, name: e.target.value})} />
                </div>
              )}

              <div className="relative group">
                <Mail className="absolute left-4 top-4 text-gray-400 w-5 h-5 group-focus-within:text-orange-500 transition-colors" />
                <input type="email" required placeholder="Email Address" className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-orange-500/20 font-medium" 
                  onChange={(e) => setFormData({...formData, email: e.target.value})} />
              </div>

              <div className="relative group">
                <Lock className="absolute left-4 top-4 text-gray-400 w-5 h-5 group-focus-within:text-orange-500 transition-colors" />
                <input type={showPassword ? "text" : "password"} required placeholder="Password" className="w-full pl-12 pr-12 py-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-orange-500/20 font-medium" 
                  onChange={(e) => setFormData({...formData, password: e.target.value})} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-4 text-gray-400">
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {mode === 'signin' && (
                <div className="text-right">
                  <Link to="/forgot-password" size={20} className="text-[10px] font-black uppercase text-orange-500 hover:underline">Forgot Password?</Link>
                </div>
              )}

              {error && <p className="text-red-500 text-[10px] font-black uppercase text-center bg-red-50 py-2 rounded-lg">{error}</p>}

              <button type="submit" disabled={isSubmitting} className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-orange-500 transition-all active:scale-95">
                {isSubmitting ? <Loader2 className="animate-spin" /> : mode === 'signup' ? 'Create Account' : 'Sign In'}
                {!isSubmitting && <ArrowRight size={18} />}
              </button>
            </form>

            <div className="flex items-center my-6">
              <div className="flex-1 h-px bg-gray-100"></div>
              <span className="px-4 text-gray-300 text-[10px] font-black uppercase tracking-widest italic">Or</span>
              <div className="flex-1 h-px bg-gray-100"></div>
            </div>

            <button onClick={handleGuestEntry} disabled={isSubmitting} className="w-full py-4 border border-gray-100 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-gray-50 transition-all text-slate-700 active:scale-95">
              {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : <Globe size={20} className="text-orange-500" />}
              Continue as Guest
            </button>

            <button onClick={() => setMode(mode === 'signup' ? 'signin' : 'signup')} className="w-full mt-6 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-orange-500 transition-colors">
              {mode === 'signup' ? 'Already have an account? Login' : "New here? Create an account"}
            </button>
          </div>
        ) : (
          <div className="animate-in zoom-in-95 duration-500 flex flex-col h-125">
            <h2 className="text-2xl font-black text-slate-900 mb-6">Select Language</h2>
            <div className="relative mb-4">
              <Search className="absolute left-4 top-3.5 text-slate-300 w-4 h-4" />
              <input autoFocus placeholder="Search languages..." className="w-full pl-11 pr-4 py-3.5 bg-slate-50 rounded-2xl text-sm outline-none border border-slate-100" onChange={(e) => setLangSearch(e.target.value)} />
            </div>
            <div className="flex-1 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
              {allLanguages.map((l) => (
                <button key={l.code} onClick={() => finishAuth(l.code)} className="w-full p-4 flex items-center justify-between bg-white border border-slate-100 rounded-2xl hover:border-orange-500 hover:bg-orange-50 transition-all group">
                  <div className="flex items-center gap-4"><span>{l.flag}</span><span className="font-bold text-slate-700">{l.name}</span></div>
                  <ChevronRight size={16} className="text-slate-200 group-hover:text-orange-500 transition-colors" />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Signup;