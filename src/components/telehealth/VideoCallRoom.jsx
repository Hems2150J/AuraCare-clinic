import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Mic,
  MicOff,
  Video as VideoIcon,
  VideoOff,
  PhoneOff,
  MessageSquare,
  FileText,
  ShieldCheck,
  Send,
  User,
  Bot,
  Monitor,
  Volume2
} from 'lucide-react';
import { PrescriptionDownloadModal } from './PrescriptionDownloadModal';

export const VideoCallRoom = () => {
  const { activeTelehealthSession, setActiveTelehealthSession, setPrescriptionDownloadDoctor } = useApp();

  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [isPrescriptionModalOpen, setIsPrescriptionModalOpen] = useState(false);

  const [chatMessages, setChatMessages] = useState([
    { sender: 'doctor', text: 'Good day! I am reviewing your preliminary vitals. How are you feeling right now?', time: '00:15' }
  ]);
  const [chatInput, setChatInput] = useState('');

  const doc = activeTelehealthSession;

  useEffect(() => {
    const timer = setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const newMsg = { sender: 'patient', text: chatInput, time: formatTime(callDuration) };
    setChatMessages((prev) => [...prev, newMsg]);
    setChatInput('');

    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        { sender: 'doctor', text: 'Understood. I am adding this note to your digital care summary and drafting your prescription.', time: formatTime(callDuration + 2) }
      ]);
    }, 1000);
  };

  const handleEndCall = () => {
    setPrescriptionDownloadDoctor(doc);
    setIsPrescriptionModalOpen(true);
  };

  if (!doc) return null;

  return (
    <div className="fixed inset-0 bg-slate-950 z-[9999] flex flex-col font-sans text-white overflow-hidden animate-fadeIn">
      {/* Top Telehealth Control Bar */}
      <div className="bg-slate-900 border-b border-slate-800 px-6 py-3 flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
          <div>
            <h3 className="font-extrabold text-sm text-white flex items-center gap-2">
              HD Telehealth Consultation • {doc.name}
              <span className="text-[10px] bg-teal-500/20 text-teal-300 font-bold px-2 py-0.5 rounded border border-teal-500/30">
                Encrypted WebRTC
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Department: {doc.department} • Call Duration: <span className="text-emerald-400 font-mono font-bold">{formatTime(callDuration)}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setPrescriptionDownloadDoctor(doc);
              setIsPrescriptionModalOpen(true);
            }}
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 py-2 rounded-xl flex items-center gap-2 transition-colors"
          >
            <FileText className="w-4 h-4" />
            <span>Generate Prescription PDF</span>
          </button>

          <button
            onClick={handleEndCall}
            className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 transition-colors"
          >
            <PhoneOff className="w-4 h-4" />
            <span>End Session</span>
          </button>
        </div>
      </div>

      {/* Main Video Call Area */}
      <div className="flex-1 relative flex overflow-hidden">
        {/* Main Video Stream Container (Doctor View) */}
        <div className="flex-1 relative bg-slate-900 flex items-center justify-center">
          {isVideoOn ? (
            <div className="relative w-full h-full">
              <img
                src={doc.photo}
                alt={doc.name}
                className="w-full h-full object-cover filter brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

              {/* Doctor Name Tag Overlay */}
              <div className="absolute bottom-6 left-6 bg-slate-900/80 backdrop-blur-md px-4 py-2 rounded-2xl border border-slate-700 flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                <div>
                  <h4 className="font-bold text-sm text-white">{doc.name}</h4>
                  <p className="text-xs text-slate-300">{doc.title}</p>
                </div>
              </div>

              {/* Audio Waveform Simulator */}
              <div className="absolute bottom-6 right-6 flex items-center gap-1 bg-slate-900/80 backdrop-blur-md px-3 py-2 rounded-xl border border-slate-700">
                <Volume2 className="w-4 h-4 text-emerald-400" />
                <div className="flex items-end gap-1 h-4">
                  <span className="w-1 bg-emerald-400 rounded-full h-3 animate-pulse" />
                  <span className="w-1 bg-emerald-400 rounded-full h-4 animate-bounce" />
                  <span className="w-1 bg-emerald-400 rounded-full h-2 animate-pulse" />
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-slate-500 space-y-3">
              <VideoOff className="w-16 h-16 stroke-[1.2] mx-auto text-slate-600" />
              <p className="text-sm font-bold">Video stream currently paused</p>
            </div>
          )}

          {/* Self-Camera Preview Inset (Patient View) */}
          <div className="absolute top-6 right-6 w-44 sm:w-56 h-32 sm:h-40 rounded-2xl overflow-hidden border-2 border-slate-700 shadow-2xl bg-slate-950 z-20">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
              alt="Self View"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-2 left-2 bg-slate-900/80 backdrop-blur-md px-2 py-0.5 rounded text-[10px] text-white font-bold">
              You (Patient View)
            </div>
          </div>
        </div>

        {/* Side Live Chat Drawer */}
        {isChatOpen && (
          <div className="w-80 sm:w-96 bg-slate-900 border-l border-slate-800 flex flex-col z-20 animate-fadeIn">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <h4 className="font-bold text-sm text-white flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-teal-400" />
                In-Call Clinical Chat
              </h4>
              <button
                onClick={() => setIsChatOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3 text-xs">
              {chatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col ${msg.sender === 'patient' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl ${
                      msg.sender === 'patient'
                        ? 'bg-medical-600 text-white rounded-br-none'
                        : 'bg-slate-800 text-slate-200 rounded-bl-none border border-slate-700'
                    }`}
                  >
                    <p>{msg.text}</p>
                  </div>
                  <span className="text-[9px] text-slate-500 mt-1">{msg.time}</span>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-800 flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Type a message to doctor..."
                className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
              />
              <button
                type="submit"
                className="p-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Bottom Floating Control Dock */}
      <div className="bg-slate-900 border-t border-slate-800 px-6 py-4 flex items-center justify-center gap-4 z-20">
        <button
          onClick={() => setIsMicOn(!isMicOn)}
          className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
            isMicOn
              ? 'bg-slate-800 hover:bg-slate-700 text-white'
              : 'bg-red-600 text-white'
          }`}
          aria-label="Toggle Microphone"
        >
          {isMicOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
        </button>

        <button
          onClick={() => setIsVideoOn(!isVideoOn)}
          className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
            isVideoOn
              ? 'bg-slate-800 hover:bg-slate-700 text-white'
              : 'bg-red-600 text-white'
          }`}
          aria-label="Toggle Camera"
        >
          {isVideoOn ? <VideoIcon className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
        </button>

        <button
          onClick={() => setIsScreenSharing(!isScreenSharing)}
          className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
            isScreenSharing ? 'bg-teal-600 text-white' : 'bg-slate-800 hover:bg-slate-700 text-white'
          }`}
          aria-label="Share Screen"
        >
          <Monitor className="w-5 h-5" />
        </button>

        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
            isChatOpen ? 'bg-medical-600 text-white' : 'bg-slate-800 hover:bg-slate-700 text-white'
          }`}
          aria-label="Open Chat"
        >
          <MessageSquare className="w-5 h-5" />
        </button>

        <button
          onClick={handleEndCall}
          className="w-14 h-12 rounded-2xl bg-red-600 hover:bg-red-700 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-105"
          aria-label="End Call"
        >
          <PhoneOff className="w-5 h-5" />
        </button>
      </div>

      {/* Prescription Download Modal */}
      {isPrescriptionModalOpen && (
        <PrescriptionDownloadModal
          isOpen={isPrescriptionModalOpen}
          onClose={() => {
            setIsPrescriptionModalOpen(false);
            setActiveTelehealthSession(null);
          }}
          doctor={doc}
        />
      )}
    </div>
  );
};
