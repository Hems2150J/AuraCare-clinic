import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Mail, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

export const HealthTipsNewsletter = () => {
  const { showToast } = useApp();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast("Please enter a valid email address", 'warning');
      return;
    }
    setSubscribed(true);
    showToast("Subscribed to AuraCare Weekly Health & Clinical Digest!", 'success');
  };

  return (
    <section className="py-16 bg-gradient-to-r from-medical-900 via-teal-900 to-slate-900 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 sm:p-12 border border-white/10 shadow-luxury grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-3">
            <div className="inline-flex items-center gap-2 bg-emerald-400/20 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              Clinical Knowledge & Wellness Digest
            </div>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight">
              Receive Evidence-Based Health Insights
            </h2>
            <p className="text-sm text-slate-300 max-w-xl leading-relaxed">
              Subscribe to our monthly newsletter curated by AuraCare physicians. Get seasonal preventative health advice, nutrition guidelines, and clinical breakthroughs.
            </p>
          </div>

          <div className="lg:col-span-5">
            {!subscribed ? (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    className="w-full bg-slate-900/90 border border-slate-700 rounded-2xl pl-12 pr-4 py-3.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-medical-400 focus:ring-2 focus:ring-medical-400/30 transition-all"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold text-sm shadow-lg flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5"
                >
                  <span>Subscribe to Health Digest</span>
                  <CheckCircle2 className="w-4 h-4" />
                </button>
                <p className="text-[11px] text-slate-400 text-center flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  No spam. Unsubscribe anytime. HIPAA compliant privacy.
                </p>
              </form>
            ) : (
              <div className="bg-emerald-500/20 border border-emerald-500/40 rounded-2xl p-6 text-center space-y-2 animate-fadeIn">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h4 className="font-extrabold text-lg text-white">You're Subscribed!</h4>
                <p className="text-xs text-slate-300">
                  We've sent a welcome edition of our Clinical Health Digest to <span className="font-bold text-white">{email}</span>.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
