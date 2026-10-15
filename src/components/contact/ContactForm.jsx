import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Send, CheckCircle2, ShieldCheck, Mail, Phone, User, MessageSquare } from 'lucide-react';

export const ContactForm = () => {
  const { showToast } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: 'General Enquiries',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      showToast("Please complete all required fields", 'warning');
      return;
    }
    setSubmitted(true);
    showToast("Message sent! Our patient concierge will contact you shortly.", 'success');
  };

  return (
    <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-luxury space-y-6">
      <div className="space-y-2">
        <span className="bg-medical-50 text-medical-700 text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
          Patient Assistance Desk
        </span>
        <h3 className="font-heading font-extrabold text-2xl text-slate-900">
          Send Us a Direct Message
        </h3>
        <p className="text-xs text-slate-500">
          Have a non-urgent clinical question or feedback? Our patient care coordinator responds within 2 hours.
        </p>
      </div>

      {!submitted ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Jonathan Vance"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-800 focus:bg-white focus:border-medical-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Email Address *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="e.g., jonathan@example.com"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-800 focus:bg-white focus:border-medical-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+1 (555) 000-0000"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-800 focus:bg-white focus:border-medical-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Target Department
              </label>
              <select
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-800 focus:bg-white focus:border-medical-500"
              >
                <option value="General Enquiries">General Enquiries</option>
                <option value="Cardiology">Cardiology Desk</option>
                <option value="Neurology">Neurology Desk</option>
                <option value="Pediatrics">Pediatric Desk</option>
                <option value="Pharmacy">Pharmacy & Orders</option>
                <option value="Billing & Insurance">Billing & Insurance</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Your Message *
            </label>
            <textarea
              rows="4"
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="How can our clinical coordinator assist you today?"
              className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3.5 text-sm text-slate-800 focus:bg-white focus:border-medical-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-medical-600 hover:bg-medical-700 text-white font-bold text-sm shadow-soft-glow flex items-center justify-center gap-2 transform hover:scale-[1.01] transition-all"
          >
            <Send className="w-4 h-4" />
            <span>Transmit Inquiry to Care Team</span>
          </button>
        </form>
      ) : (
        <div className="text-center space-y-4 py-8 animate-scaleUp">
          <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto" />
          <h4 className="font-heading font-extrabold text-2xl text-slate-900">
            Inquiry Transmitted!
          </h4>
          <p className="text-xs text-slate-600 max-w-sm mx-auto">
            Thank you, <span className="font-bold text-slate-800">{formData.name}</span>. Our care coordinator for <span className="font-bold text-medical-600">{formData.department}</span> will reach out to <span className="font-bold">{formData.email}</span>.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="py-2.5 px-6 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
          >
            Send Another Message
          </button>
        </div>
      )}
    </div>
  );
};
