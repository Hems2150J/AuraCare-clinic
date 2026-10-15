import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ShieldCheck } from 'lucide-react';

export const FAQAccordion = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: "What should I bring to my first appointment?",
      a: "Please bring a valid photo ID, your health insurance card, a list of current prescription medications, and any recent diagnostic lab reports or MRI/CT discs."
    },
    {
      q: "How does direct health insurance billing work?",
      a: "We process claims directly with over 30+ insurance networks including Blue Cross, Aetna, Cigna, UnitedHealthcare, and Medicare. Our billing desk verifies coverage prior to your visit."
    },
    {
      q: "Are video telehealth consultations secure and private?",
      a: "Yes. All video consultations run over encrypted WebRTC connections complying with strict HIPAA and international medical data privacy standards."
    },
    {
      q: "What is the procedure for acute medical emergencies?",
      a: "For immediate life-threatening conditions (severe chest pain, stroke symptoms, major trauma), please dial +1 (800) 287-2273 or press our red Emergency Fast-Track button for instant triage dispatch."
    },
    {
      q: "Can I order prescription medications online through your pharmacy?",
      a: "Yes. You can upload a photo or PDF of your digital prescription during checkout, or order medications prescribed directly during your AuraCare video consultation."
    }
  ];

  return (
    <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
      <div className="space-y-2">
        <span className="bg-teal-50 text-teal-700 text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
          Patient Knowledge Base
        </span>
        <h3 className="font-heading font-extrabold text-2xl text-slate-900">
          Frequently Asked Questions
        </h3>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="border border-slate-200 rounded-2xl overflow-hidden transition-all"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                className="w-full text-left p-4.5 bg-slate-50 hover:bg-slate-100 flex items-center justify-between gap-4 font-bold text-sm text-slate-900 transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-medical-600 transform transition-transform duration-300 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="p-4.5 bg-white text-xs text-slate-600 leading-relaxed border-t border-slate-200 animate-fadeIn">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
