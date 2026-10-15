import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { clinicData } from '../../data/clinicData';
import { Modal } from '../common/Modal';
import { ShieldAlert, Phone, Ambulance, AlertTriangle, CheckCircle2, Clock } from 'lucide-react';

export const EmergencyFastTrackModal = () => {
  const { isEmergencyModalOpen, setIsEmergencyModalOpen, showToast } = useApp();
  const [selectedUrgency, setSelectedUrgency] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const emergencyReasons = [
    { id: 'chest-pain', label: 'Severe Chest Pain / Heart Distress' },
    { id: 'stroke', label: 'Sudden Numbness / Stroke Symptoms' },
    { id: 'respiratory', label: 'Acute Breathing Difficulty' },
    { id: 'trauma', label: 'Severe Trauma / Fracture' },
    { id: 'infant-fever', label: 'High Fever in Newborn/Infant' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedUrgency || !patientPhone) {
      showToast("Please provide your phone number and emergency condition", 'warning');
      return;
    }
    setIsSubmitted(true);
    showToast("EMERGENCY ALERT DISPATCHED TO TRAUMA TRIAGE UNIT", 'emergency');
  };

  const handleClose = () => {
    setIsEmergencyModalOpen(false);
    setIsSubmitted(false);
    setSelectedUrgency('');
    setPatientPhone('');
  };

  return (
    <Modal
      isOpen={isEmergencyModalOpen}
      onClose={handleClose}
      title=""
      maxWidth="max-w-lg"
    >
      <div className="-mt-6 -mx-6 bg-gradient-to-r from-red-600 to-emergency-600 text-white p-6 relative">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center animate-bounce">
            <ShieldAlert className="w-7 h-7 text-white" />
          </div>
          <div>
            <span className="bg-white/20 text-white text-[10px] font-extrabold px-2 py-0.5 rounded uppercase tracking-wider">
              Priority 1 • Immediate Action
            </span>
            <h3 className="font-heading font-extrabold text-2xl text-white tracking-tight mt-0.5">
              24/7 Trauma & Emergency Triage
            </h3>
          </div>
        </div>
      </div>

      {!isSubmitted ? (
        <div className="pt-6 space-y-6">
          {/* Direct Call Highlight */}
          <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-4 flex items-center justify-between">
            <div>
              <span className="text-xs text-red-700 font-bold uppercase tracking-wider block">
                Direct Ambulance & Trauma Hotline:
              </span>
              <a
                href={`tel:${clinicData.phones.emergency}`}
                className="text-red-600 hover:text-red-700 font-extrabold text-2xl tracking-tight block"
              >
                {clinicData.phones.emergency}
              </a>
            </div>
            <a
              href={`tel:${clinicData.phones.emergency}`}
              className="w-12 h-12 rounded-xl bg-red-600 hover:bg-red-700 text-white flex items-center justify-center shadow-lg shadow-red-600/30 shrink-0"
            >
              <Phone className="w-6 h-6 animate-pulse" />
            </a>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Select Acute Emergency Condition:
              </label>
              <div className="space-y-2">
                {emergencyReasons.map((reason) => (
                  <button
                    key={reason.id}
                    type="button"
                    onClick={() => setSelectedUrgency(reason.label)}
                    className={`w-full text-left p-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-between ${
                      selectedUrgency === reason.label
                        ? 'border-red-500 bg-red-50 text-red-900 shadow-sm'
                        : 'border-slate-200 hover:border-red-300 text-slate-700 bg-slate-50'
                    }`}
                  >
                    <span>{reason.label}</span>
                    {selectedUrgency === reason.label && (
                      <AlertTriangle className="w-4 h-4 text-red-600" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Your Contact Phone Number (For Callback):
              </label>
              <input
                type="tel"
                required
                value={patientPhone}
                onChange={(e) => setPatientPhone(e.target.value)}
                placeholder="+1 (555) 000-0000"
                className="w-full text-sm bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 font-semibold text-slate-900 focus:outline-none focus:border-red-500 focus:bg-white"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-sm uppercase tracking-wider shadow-lg shadow-red-600/30 flex items-center justify-center gap-2 transform hover:scale-[1.01] transition-all"
            >
              <Ambulance className="w-5 h-5 animate-pulse" />
              Dispatch Fast-Track Notification
            </button>
          </form>

          <p className="text-[11px] text-slate-500 text-center flex items-center justify-center gap-1">
            <Clock className="w-3.5 h-3.5 text-red-500" />
            Average response time for acute triage dispatch is under 90 seconds.
          </p>
        </div>
      ) : (
        <div className="pt-8 pb-4 text-center space-y-4 animate-scaleUp">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <div>
            <h4 className="font-heading font-extrabold text-2xl text-slate-900">
              Triage Priority Dispatched!
            </h4>
            <p className="text-sm text-slate-600 max-w-sm mx-auto mt-2">
              Our 24/7 Trauma Charge Nurse has received your emergency alert for <span className="font-bold text-red-600">{selectedUrgency}</span>.
            </p>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left text-xs space-y-2 text-slate-700">
            <p className="flex justify-between">
              <span>Callback Number:</span>
              <span className="font-bold">{patientPhone}</span>
            </p>
            <p className="flex justify-between">
              <span>Status:</span>
              <span className="font-extrabold text-red-600">On Standby / Incoming Alert</span>
            </p>
            <p className="flex justify-between">
              <span>Trauma Bay Assigned:</span>
              <span className="font-bold text-slate-900">Bay 4 (Level 1 ICU Triage)</span>
            </p>
          </div>

          <button
            onClick={handleClose}
            className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-sm transition-colors"
          >
            Close Window
          </button>
        </div>
      )}
    </Modal>
  );
};
