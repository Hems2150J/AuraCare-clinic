import React from 'react';
import { Modal } from '../common/Modal';
import { clinicData } from '../../data/clinicData';
import { useApp } from '../../context/AppContext';
import { FileText, Download, CheckCircle2, ShoppingBag, ShieldCheck, Stethoscope } from 'lucide-react';

export const PrescriptionDownloadModal = ({ isOpen, onClose, doctor }) => {
  const { setActiveTab, showToast } = useApp();

  if (!doctor) return null;

  const rxDetails = {
    rxId: `RX-${Math.floor(100000 + Math.random() * 900000)}`,
    date: new Date().toISOString().split('T')[0],
    medications: [
      { name: "Atorvastatin Calcium 20mg", dosage: "Take 1 tablet daily at bedtime", duration: "30 Days" },
      { name: "Derma-Repair Ceramide Cream", dosage: "Apply topically twice daily", duration: "1 Tube" }
    ],
    diagnosis: "Primary Cardiovascular Screening & Preventative Barrier Care"
  };

  const handleDownloadPDF = () => {
    showToast(`Digital Prescription #${rxDetails.rxId} downloaded as PDF`, 'success');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Official Digital Clinical Prescription"
      subtitle={`Authorized by ${doctor.name}`}
      maxWidth="max-w-2xl"
    >
      <div className="space-y-6">
        {/* Prescription Ticket Header */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 shadow-luxury space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Stethoscope className="w-5 h-5 text-medical-400" />
              <span className="font-heading font-extrabold text-base text-white">
                {clinicData.name}
              </span>
            </div>
            <span className="text-xs font-mono font-bold text-teal-400">
              ID: {rxDetails.rxId}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs text-slate-300">
            <p><strong className="text-white">Physician:</strong> {doctor.name} ({doctor.qualification})</p>
            <p><strong className="text-white">Department:</strong> {doctor.department}</p>
            <p><strong className="text-white">Date Issued:</strong> {rxDetails.date}</p>
            <p><strong className="text-white">Verification Status:</strong> <span className="text-emerald-400 font-bold">Encrypted & Signed</span></p>
          </div>
        </div>

        {/* Diagnosis & Prescribed Medications */}
        <div className="space-y-4 bg-slate-50 p-5 rounded-2xl border border-slate-200">
          <div className="text-xs text-slate-700">
            <span className="font-bold text-slate-900 uppercase tracking-wider block mb-1">
              Clinical Assessment:
            </span>
            <p className="italic font-medium">{rxDetails.diagnosis}</p>
          </div>

          <div className="space-y-3 pt-3 border-t border-slate-200">
            <span className="font-bold text-xs text-slate-900 uppercase tracking-wider block">
              Prescribed Medications (Rx):
            </span>
            {rxDetails.medications.map((med, mIdx) => (
              <div key={mIdx} className="bg-white p-3.5 rounded-xl border border-slate-200 text-xs space-y-1">
                <div className="flex justify-between font-bold text-slate-900">
                  <span>{med.name}</span>
                  <span className="text-teal-700">{med.duration}</span>
                </div>
                <p className="text-slate-600">{med.dosage}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Action Buttons */}
        <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick={handleDownloadPDF}
            className="py-3.5 rounded-xl bg-medical-600 hover:bg-medical-700 text-white font-bold text-xs shadow-soft-glow flex items-center justify-center gap-2 transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Download Signed PDF Rx</span>
          </button>

          <button
            onClick={() => {
              onClose();
              setActiveTab('pharmacy');
            }}
            className="py-3.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-soft-glow flex items-center justify-center gap-2 transition-all"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Order Prescribed Medications Online</span>
          </button>
        </div>
      </div>
    </Modal>
  );
};
