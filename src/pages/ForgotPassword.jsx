import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, Loader2, CheckCircle } from 'lucide-react';
import { api } from '../apiClient';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [recoveredPass, setRecoveredPass] = useState('');

  const handleRecover = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      const result = await api.forgotPassword(email);
      if (!result.success) throw new Error(result.error);

      setRecoveredPass(result.data.password_hint);
      setMessage("Account found! Your password has been recovered.");
    } catch (err) {
      setMessage(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-[40px] shadow-2xl p-10 border border-gray-50">
        <Link to="/signup" className="inline-flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 hover:text-orange-500 mb-8 transition-colors">
          <ArrowLeft size={14} /> Back to Login
        </Link>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Password Recovery</h1>
          <p className="text-gray-400 font-medium mt-2 text-sm">Enter your email to find your account.</p>
        </div>

        {!recoveredPass ? (
          <form onSubmit={handleRecover} className="space-y-6">
            <div className="relative group">
              <Mail className="absolute left-4 top-4 text-gray-400 w-5 h-5 group-focus-within:text-orange-500 transition-colors" />
              <input 
                type="email" required value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Registered Email Address" 
                className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-orange-500/20 font-medium" 
              />
            </div>

            {message && <p className="text-red-500 text-[10px] font-black uppercase text-center">{message}</p>}

            <button type="submit" disabled={isSubmitting} className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-orange-500 transition-all">
              {isSubmitting ? <Loader2 className="animate-spin" /> : "Recover Password"}
            </button>
          </form>
        ) : (
          <div className="text-center animate-in zoom-in-95 duration-500">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white mx-auto mb-6 shadow-lg shadow-green-100">
              <CheckCircle size={32} />
            </div>
            <p className="text-slate-500 text-sm font-medium mb-2">{message}</p>
            <div className="bg-slate-50 p-6 rounded-3xl border border-dashed border-slate-200">
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Your Password</p>
              <p className="text-2xl font-black text-slate-800 tracking-tighter">{recoveredPass}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;