import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { X, Copy, Share2, Check, Smartphone, Link as LinkIcon } from 'lucide-react';

const ShareModal = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  
  // This root URL is the entry point to your Signup/Landing page
  const signupUrl = "https://my-pantry-guide.vercel.app/";

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(signupUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Pantry Guide',
          text: 'Join me on Pantry Guide! Scan the code or click the link to sign up and start cooking.',
          url: signupUrl,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      handleCopy();
    }
  };

  return (
    <div className="fixed inset-0 z-200 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-sm rounded-[40px] p-8 shadow-2xl relative animate-in zoom-in-95 duration-300">
        
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute right-6 top-6 p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors"
        >
          <X size={20} />
        </button>

        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 mx-auto mb-4">
            <Smartphone size={24} />
          </div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight">Invite to Join</h2>
          <p className="text-sm text-slate-400 font-medium">Scan code to open</p>
        </div>

        {/* --- QR CODE: Leads to Signup --- */}
        <div className="flex flex-col items-center mb-8">
          <div className="p-5 bg-white border-4 border-slate-50 rounded-[40px] shadow-inner mb-4">
            <QRCodeSVG 
              value={signupUrl} 
              size={160} 
              fgColor="#f97316" // Your brand orange
              level="H"
              includeMargin={false}
            />
          </div>
          <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-300">Scan with phone camera</p>
        </div>

        {/* --- SHARE ACTIONS --- */}
        <div className="space-y-3">
          <button 
            onClick={handleNativeShare} 
            className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 shadow-xl hover:bg-orange-500 transition-all active:scale-95"
          >
            <Share2 size={16} />
            Share Signup Link
          </button>
          
          <button 
            onClick={handleCopy} 
            className="w-full py-4 bg-slate-50 text-slate-600 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 border border-slate-100 hover:bg-slate-100 transition-all active:scale-95"
          >
            {copied ? (
              <>
                <Check size={16} className="text-green-500" />
                <span className="text-green-600">Link Copied!</span>
              </>
            ) : (
              <>
                <LinkIcon size={16} />
                <span>Copy Link</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;