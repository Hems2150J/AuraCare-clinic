import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { doctorsData } from '../../data/doctorsData';
import { servicesData } from '../../data/servicesData';
import confetti from 'canvas-confetti';
import {
  Calendar,
  User,
  Clock,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  CreditCard,
  ShieldCheck,
  FileText,
  Phone,
  Download,
  Share2,
  Stethoscope,
  Check
} from 'lucide-react';

export const AppointmentBookingFlow = () => {
  const { selectedDoctorForModal, addAppointment, setActiveTab } = useApp();

  const [step, setStep] = useState(1);
  const [selectedDeptId, setSelectedDeptId] = useState(
    selectedDoctorForModal ? selectedDoctorForModal.departmentId : 'cardiology'
  );
  const [selectedDoctorId, setSelectedDoctorId] = useState(
    selectedDoctorForModal ? selectedDoctorForModal.id : 'doc-1'
  );

  const [bookingDate, setBookingDate] = useState(
    new Date(Date.now() + 86400000).toISOString().split('T')[0]
  );
  const [selectedSlot, setSelectedSlot] = useState('11:30 AM');

  const [patientData, setPatientData] = useState({
    fullName: 'Alexander Hayes',
    email: 'alex.hayes@example.com',
    phone: '+1 (555) 234-5678',
    gender: 'Male',
    age: '38',
    symptoms: 'Routine annual cardiovascular checkup & blood pressure review.',
    paymentMethod: 'insurance'
  });

  const [confirmedAppt, setConfirmedAppt] = useState(null);

  // Sync if selectedDoctorForModal changes
  useEffect(() => {
    if (selectedDoctorForModal) {
      setSelectedDeptId(selectedDoctorForModal.departmentId);
      setSelectedDoctorId(selectedDoctorForModal.id);
    }
  }, [selectedDoctorForModal]);

  const activeDoctor = doctorsData.find((d) => d.id === selectedDoctorId) || doctorsData[0];
  const activeDept = servicesData.find((s) => s.id === selectedDeptId) || servicesData[0];

  const handleNext = () => {
    setStep((prev) => Math.min(prev + 1, 5));
  };

  const handlePrev = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    const newAppt = addAppointment({
      doctorName: activeDoctor.name,
      department: activeDoctor.department,
      date: bookingDate,
      timeSlot: selectedSlot,
      patientName: patientData.fullName,
      patientPhone: patientData.phone,
      patientEmail: patientData.email,
      reason: patientData.symptoms,
      fee: activeDoctor.consultationFee
    });

    setConfirmedAppt(newAppt);
    setStep(5);

    // Trigger celebratory confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {
      // ignore
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="bg-medical-50 text-medical-700 text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
          Patient Appointment Portal
        </span>
        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight">
          Schedule Clinical Consultation
        </h1>
        <p className="text-sm text-slate-600 max-w-xl mx-auto">
          Follow our 4-step booking process with instant real-time slot verification.
        </p>
      </div>

      {/* Stepper Progress Indicator */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between relative">
          {/* Progress Connecting Line */}
          <div className="absolute left-8 right-8 top-1/2 -translate-y-1/2 h-1 bg-slate-100 z-0" />
          <div
            className="absolute left-8 top-1/2 -translate-y-1/2 h-1 bg-gradient-to-r from-medical-600 to-teal-500 z-0 transition-all duration-500"
            style={{ width: `${((step - 1) / 4) * 100}%` }}
          />

          {[
            { label: 'Specialist', icon: Stethoscope },
            { label: 'Date & Slot', icon: Calendar },
            { label: 'Patient Info', icon: User },
            { label: 'Review & Pay', icon: CreditCard },
            { label: 'Confirmed', icon: CheckCircle2 }
          ].map((item, idx) => {
            const stepNum = idx + 1;
            const isDone = step > stepNum;
            const isCurrent = step === stepNum;
            const Icon = item.icon;

            return (
              <div key={idx} className="relative z-10 flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 ${
                    isDone
                      ? 'bg-emerald-500 text-white shadow-sm'
                      : isCurrent
                      ? 'bg-medical-600 text-white shadow-soft-glow scale-110'
                      : 'bg-white text-slate-400 border-2 border-slate-200'
                  }`}
                >
                  {isDone ? <Check className="w-5 h-5" /> : <Icon className="w-4 h-4" />}
                </div>
                <span
                  className={`text-[11px] font-bold mt-2 hidden sm:block ${
                    isCurrent ? 'text-medical-600' : isDone ? 'text-emerald-700' : 'text-slate-400'
                  }`}
                >
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Form Container */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-luxury">
        {/* Step 1: Department & Specialist Selection */}
        {step === 1 && (
          <div className="space-y-6 animate-fadeIn">
            <h3 className="font-heading font-extrabold text-xl text-slate-900 border-b border-slate-100 pb-3">
              Step 1: Choose Clinical Department & Specialist
            </h3>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Clinical Department:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {servicesData.map((svc) => (
                  <button
                    key={svc.id}
                    type="button"
                    onClick={() => {
                      setSelectedDeptId(svc.id);
                      const deptDocs = doctorsData.filter((d) => d.departmentId === svc.id);
                      if (deptDocs.length > 0) setSelectedDoctorId(deptDocs[0].id);
                    }}
                    className={`p-3.5 rounded-2xl border text-left text-xs font-bold transition-all ${
                      selectedDeptId === svc.id
                        ? 'border-medical-600 bg-medical-50 text-medical-900 shadow-xs'
                        : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <span>{svc.title}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Available Physicians in Department:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {doctorsData
                  .filter((d) => d.departmentId === selectedDeptId)
                  .map((doc) => (
                    <div
                      key={doc.id}
                      onClick={() => setSelectedDoctorId(doc.id)}
                      className={`p-4 rounded-2xl border cursor-pointer flex items-center gap-3.5 transition-all ${
                        selectedDoctorId === doc.id
                          ? 'border-medical-600 bg-medical-50/70 shadow-sm'
                          : 'border-slate-200 bg-slate-50 hover:bg-white'
                      }`}
                    >
                      <img
                        src={doc.photo}
                        alt={doc.name}
                        className="w-14 h-14 object-cover rounded-xl border border-slate-200"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-sm text-slate-900 line-clamp-1">
                          {doc.name}
                        </h4>
                        <p className="text-xs text-medical-600 font-semibold">
                          {doc.qualification}
                        </p>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          Fee: ${doc.consultationFee} • Rating: {doc.rating} ★
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                onClick={handleNext}
                className="py-3 px-8 rounded-xl bg-medical-600 hover:bg-medical-700 text-white font-bold text-sm shadow-soft-glow flex items-center gap-2"
              >
                <span>Proceed to Slot Selection</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Date & Slot Matrix */}
        {step === 2 && (
          <div className="space-y-6 animate-fadeIn">
            <h3 className="font-heading font-extrabold text-xl text-slate-900 border-b border-slate-100 pb-3">
              Step 2: Select Consultation Date & Time Slot
            </h3>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center gap-4">
              <img
                src={activeDoctor.photo}
                alt={activeDoctor.name}
                className="w-12 h-12 rounded-xl object-cover"
              />
              <div>
                <h4 className="font-bold text-sm text-slate-900">{activeDoctor.name}</h4>
                <p className="text-xs text-slate-500">{activeDoctor.title} ({activeDoctor.department})</p>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Select Date:
              </label>
              <input
                type="date"
                value={bookingDate}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => setBookingDate(e.target.value)}
                className="w-full sm:w-64 bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 font-semibold text-slate-800 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Available Morning & Afternoon Slots:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {activeDoctor.timeSlots.map((slot, sIdx) => {
                  const isSelected = selectedSlot === slot;
                  return (
                    <button
                      key={sIdx}
                      type="button"
                      onClick={() => setSelectedSlot(slot)}
                      className={`py-3 px-4 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                        isSelected
                          ? 'border-medical-600 bg-medical-600 text-white shadow-soft-glow'
                          : 'border-slate-200 bg-slate-50 text-slate-800 hover:border-slate-300'
                      }`}
                    >
                      <Clock className="w-3.5 h-3.5" />
                      <span>{slot}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 flex justify-between">
              <button
                onClick={handlePrev}
                className="py-3 px-6 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm flex items-center gap-1.5"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                onClick={handleNext}
                className="py-3 px-8 rounded-xl bg-medical-600 hover:bg-medical-700 text-white font-bold text-sm shadow-soft-glow flex items-center gap-2"
              >
                <span>Patient Intake Form</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Patient Intake Form */}
        {step === 3 && (
          <div className="space-y-6 animate-fadeIn">
            <h3 className="font-heading font-extrabold text-xl text-slate-900 border-b border-slate-100 pb-3">
              Step 3: Patient Intake & Medical Reason
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Full Patient Name *
                </label>
                <input
                  type="text"
                  required
                  value={patientData.fullName}
                  onChange={(e) => setPatientData({ ...patientData, fullName: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={patientData.phone}
                  onChange={(e) => setPatientData({ ...patientData, phone: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={patientData.email}
                  onChange={(e) => setPatientData({ ...patientData, email: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Age / Gender
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={patientData.age}
                    onChange={(e) => setPatientData({ ...patientData, age: e.target.value })}
                    className="w-24 bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-800"
                    placeholder="Age"
                  />
                  <select
                    value={patientData.gender}
                    onChange={(e) => setPatientData({ ...patientData, gender: e.target.value })}
                    className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-800"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Primary Symptoms / Reason for Consultation *
              </label>
              <textarea
                rows="3"
                value={patientData.symptoms}
                onChange={(e) => setPatientData({ ...patientData, symptoms: e.target.value })}
                placeholder="Describe your symptoms or reason for visit..."
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3.5 text-sm text-slate-800 focus:outline-none focus:border-medical-500"
              />
            </div>

            <div className="pt-4 flex justify-between">
              <button
                onClick={handlePrev}
                className="py-3 px-6 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm flex items-center gap-1.5"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                onClick={handleNext}
                className="py-3 px-8 rounded-xl bg-medical-600 hover:bg-medical-700 text-white font-bold text-sm shadow-soft-glow flex items-center gap-2"
              >
                <span>Review & Payment</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Summary & Payment */}
        {step === 4 && (
          <form onSubmit={handleFinalSubmit} className="space-y-6 animate-fadeIn">
            <h3 className="font-heading font-extrabold text-xl text-slate-900 border-b border-slate-100 pb-3">
              Step 4: Review Details & Confirm Booking
            </h3>

            {/* Appointment Summary Box */}
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3">
              <h4 className="font-bold text-sm text-slate-900 uppercase tracking-wider border-b border-slate-200 pb-2">
                Appointment Summary
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
                <p><strong className="text-slate-900">Physician:</strong> {activeDoctor.name} ({activeDoctor.qualification})</p>
                <p><strong className="text-slate-900">Department:</strong> {activeDoctor.department}</p>
                <p><strong className="text-slate-900">Date & Time:</strong> {bookingDate} at {selectedSlot}</p>
                <p><strong className="text-slate-900">Consultation Fee:</strong> ${activeDoctor.consultationFee}</p>
                <p><strong className="text-slate-900">Patient Name:</strong> {patientData.fullName}</p>
                <p><strong className="text-slate-900">Contact:</strong> {patientData.phone}</p>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Payment / Coverage Method:
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPatientData({ ...patientData, paymentMethod: 'insurance' })}
                  className={`p-3.5 rounded-xl border text-xs font-bold flex items-center justify-between ${
                    patientData.paymentMethod === 'insurance'
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-900'
                      : 'border-slate-200 bg-slate-50 text-slate-700'
                  }`}
                >
                  <span>Direct Insurance Claim</span>
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                </button>

                <button
                  type="button"
                  onClick={() => setPatientData({ ...patientData, paymentMethod: 'card' })}
                  className={`p-3.5 rounded-xl border text-xs font-bold flex items-center justify-between ${
                    patientData.paymentMethod === 'card'
                      ? 'border-medical-500 bg-medical-50 text-medical-900'
                      : 'border-slate-200 bg-slate-50 text-slate-700'
                  }`}
                >
                  <span>Credit / Debit Card (Stripe Mock)</span>
                  <CreditCard className="w-4 h-4 text-medical-600" />
                </button>
              </div>
            </div>

            <div className="pt-4 flex justify-between">
              <button
                type="button"
                onClick={handlePrev}
                className="py-3 px-6 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm flex items-center gap-1.5"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                type="submit"
                className="py-3.5 px-8 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-sm shadow-soft-glow flex items-center gap-2 transform hover:scale-[1.02]"
              >
                <CheckCircle2 className="w-5 h-5" />
                <span>Confirm & Generate Booking Card</span>
              </button>
            </div>
          </form>
        )}

        {/* Step 5: Confirmation Ticket Receipt */}
        {step === 5 && confirmedAppt && (
          <div className="text-center space-y-6 animate-scaleUp">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full uppercase">
                Appointment Confirmed • Ticket #{confirmedAppt.id}
              </span>
              <h2 className="font-heading font-extrabold text-3xl text-slate-900 mt-2">
                Booking Confirmed!
              </h2>
              <p className="text-sm text-slate-600 mt-1 max-w-md mx-auto">
                An instant SMS and Email confirmation with calendar invite have been sent to <span className="font-bold text-slate-800">{confirmedAppt.patientEmail}</span>.
              </p>
            </div>

            {/* Ticket Summary Card */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 text-left border border-slate-800 shadow-luxury max-w-lg mx-auto space-y-4 relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="font-heading font-extrabold text-lg text-medical-400">
                  AuraCare Medical Pass
                </span>
                <span className="text-xs font-bold bg-emerald-500/20 text-emerald-400 px-2.5 py-0.5 rounded border border-emerald-500/30">
                  Status: {confirmedAppt.status}
                </span>
              </div>

              <div className="space-y-2 text-xs text-slate-300">
                <p className="flex justify-between">
                  <span>Patient Name:</span>
                  <strong className="text-white">{confirmedAppt.patientName}</strong>
                </p>
                <p className="flex justify-between">
                  <span>Attending Doctor:</span>
                  <strong className="text-white">{confirmedAppt.doctorName} ({confirmedAppt.department})</strong>
                </p>
                <p className="flex justify-between">
                  <span>Date & Time Slot:</span>
                  <strong className="text-emerald-400 font-extrabold">{confirmedAppt.date} at {confirmedAppt.timeSlot}</strong>
                </p>
                <p className="flex justify-between">
                  <span>Clinic Location:</span>
                  <strong className="text-white">Suite 800, Metro Healthcare Plaza</strong>
                </p>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <button
                onClick={() => setActiveTab('portal')}
                className="py-3 px-6 rounded-xl bg-medical-600 hover:bg-medical-700 text-white font-bold text-sm shadow-soft-glow"
              >
                View in Patient Portal
              </button>

              <button
                onClick={() => {
                  setStep(1);
                  setConfirmedAppt(null);
                }}
                className="py-3 px-6 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm"
              >
                Book Another Visit
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
