import React, { useState } from 'react';
import { MessageSquare, X, Send, Bot, User, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const LiveChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Hello! I am AuraBot, your 24/7 Virtual Clinical Assistant. How can I assist you with your health query today?',
      time: 'Just now'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const { setActiveTab, setIsEmergencyModalOpen } = useApp();

  const handleSend = (textToSend) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    const userMsg = { sender: 'user', text: query, time: 'Just now' };
    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');

    // Generate smart response
    setTimeout(() => {
      let botResponse = "Our patient care coordinators are ready to assist you. You can call us directly or use our online appointment booking.";
      const lower = query.toLowerCase();

      if (lower.includes('appointment') || lower.includes('book')) {
        botResponse = "You can easily schedule a consultation with any of our 48+ medical specialists online. Would you like me to take you to the Appointment Scheduler?";
      } else if (lower.includes('insurance')) {
        botResponse = "AuraCare accepts Blue Cross Blue Shield, Aetna, UnitedHealthcare, Cigna, Medicare, and major international health providers.";
      } else if (lower.includes('emergency')) {
        botResponse = "FOR ACUTE MEDICAL EMERGENCY: Please dial +1 (800) 287-2273 immediately or tap our Emergency Fast-Track button above.";
      } else if (lower.includes('telehealth') || lower.includes('video')) {
        botResponse = "We offer instant and scheduled HD video consultations with our doctors. You will receive a digital prescription right after the call!";
      }

      setMessages((prev) => [...prev, { sender: 'bot', text: botResponse, time: 'Just now' }]);
    }, 600);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9980]">
      {/* Expanded Chat Box */}
      {isOpen && (
        <div className="w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col mb-4 animate-fadeIn">
          {/* Header */}
          <div className="bg-gradient-to-r from-medical-700 to-teal-700 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-sm">AuraCare AI Receptionist</h4>
                <p className="text-[11px] text-teal-100 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Online • 24/7 Clinical Support
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Container */}
          <div className="h-72 overflow-y-auto p-4 space-y-3 bg-slate-50/60 text-xs">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-7 h-7 rounded-full bg-medical-100 text-medical-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    msg.sender === 'user'
                      ? 'bg-medical-600 text-white rounded-br-none'
                      : 'bg-white text-slate-800 border border-slate-200 shadow-2xs rounded-bl-none'
                  }`}
                >
                  <p>{msg.text}</p>
                  <span
                    className={`block text-[9px] mt-1 ${
                      msg.sender === 'user' ? 'text-medical-200 text-right' : 'text-slate-400'
                    }`}
                  >
                    {msg.time}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Option Buttons */}
          <div className="px-3 py-2 bg-white border-t border-slate-100 flex flex-wrap gap-1.5 text-[11px]">
            <button
              onClick={() => {
                setActiveTab('appointments');
                setIsOpen(false);
              }}
              className="bg-medical-50 text-medical-700 hover:bg-medical-100 font-semibold px-2.5 py-1 rounded-full border border-medical-200 transition-colors"
            >
              📅 Book Appointment
            </button>
            <button
              onClick={() => {
                setIsEmergencyModalOpen(true);
                setIsOpen(false);
              }}
              className="bg-red-50 text-red-700 hover:bg-red-100 font-semibold px-2.5 py-1 rounded-full border border-red-200 transition-colors"
            >
              🚑 Emergency Fast-Track
            </button>
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-white border-t border-slate-100 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask a medical query..."
              className="flex-1 text-xs bg-slate-100 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:border-medical-500"
            />
            <button
              type="submit"
              className="p-2 rounded-xl bg-medical-600 hover:bg-medical-700 text-white transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-medical-600 to-teal-500 text-white shadow-card-hover flex items-center justify-center hover:scale-105 transition-transform duration-200 group"
        aria-label="Open 24/7 AI Clinical Assistant"
      >
        <MessageSquare className="w-6 h-6 group-hover:rotate-12 transition-transform" />
        <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-white animate-ping" />
      </button>
    </div>
  );
};
