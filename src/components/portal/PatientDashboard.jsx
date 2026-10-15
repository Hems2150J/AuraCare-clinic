import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Calendar,
  Clock,
  User,
  FileText,
  ShoppingBag,
  CheckCircle2,
  AlertCircle,
  Download,
  Video,
  Plus
} from 'lucide-react';

export const PatientDashboard = () => {
  const { appointments, orders, setActiveTab, setPrescriptionDownloadDoctor, doctorsData } = useApp();
  const [activeTabSub, setActiveTabSub] = useState('appointments');

  return (
    <div className="space-y-8">
      {/* Patient Welcome Banner */}
      <div className="bg-gradient-to-r from-medical-900 via-teal-900 to-slate-900 text-white rounded-3xl p-8 shadow-luxury border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
            alt="Alexander Hayes"
            className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-400 shadow-md"
          />
          <div>
            <span className="bg-emerald-400/20 text-emerald-300 text-[10px] font-extrabold px-2.5 py-0.5 rounded uppercase tracking-wider">
              Verified Patient Portal • ID #P-99201
            </span>
            <h1 className="font-heading font-extrabold text-2xl text-white mt-1">
              Welcome, Alexander Hayes
            </h1>
            <p className="text-xs text-slate-300">
              Primary Care Physician: Dr. Evelyn Reed • Insurance: Blue Cross Shield (Active)
            </p>
          </div>
        </div>

        <button
          onClick={() => setActiveTab('appointments')}
          className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold text-xs px-5 py-3 rounded-2xl shadow-soft-glow flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Schedule New Appointment</span>
        </button>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
        <button
          onClick={() => setActiveTabSub('appointments')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTabSub === 'appointments'
              ? 'bg-medical-600 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>My Scheduled Visits ({appointments.length})</span>
        </button>

        <button
          onClick={() => setActiveTabSub('orders')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTabSub === 'orders'
              ? 'bg-teal-700 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Pharmacy Orders ({orders.length})</span>
        </button>
      </div>

      {/* Sub-Tab 1: Appointments List */}
      {activeTabSub === 'appointments' && (
        <div className="space-y-4">
          <h3 className="font-heading font-extrabold text-lg text-slate-900">
            Upcoming & Past Consultations
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {appointments.map((appt) => (
              <div
                key={appt.id}
                className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <span className="font-mono text-xs font-bold text-slate-400">
                      ID: {appt.id}
                    </span>
                    <span className="bg-emerald-100 text-emerald-800 text-xs font-extrabold px-2.5 py-0.5 rounded-full">
                      {appt.status}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-extrabold text-base text-slate-900">
                      {appt.doctorName}
                    </h4>
                    <p className="text-xs font-semibold text-medical-600">
                      {appt.department} Department
                    </p>
                    <p className="text-xs text-slate-500 flex items-center gap-1.5 pt-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{appt.date} at {appt.timeSlot}</span>
                    </p>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-1">
                    <span className="font-bold text-slate-900 block">Reason for Visit:</span>
                    <p className="italic">{appt.reason}</p>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900">Fee: ${appt.fee}</span>
                  <button
                    onClick={() => setActiveTab('telehealth')}
                    className="text-teal-700 hover:text-teal-900 font-bold flex items-center gap-1"
                  >
                    <Video className="w-3.5 h-3.5" />
                    <span>Join Video Room</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sub-Tab 2: Orders List */}
      {activeTabSub === 'orders' && (
        <div className="space-y-4">
          <h3 className="font-heading font-extrabold text-lg text-slate-900">
            Pharmacy Orders & Prescriptions
          </h3>

          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4"
              >
                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-slate-900 text-sm">Order #{order.id}</span>
                    <span className="bg-teal-100 text-teal-800 font-bold px-2 py-0.5 rounded">
                      {order.status}
                    </span>
                  </div>
                  <p className="text-slate-500">Placed on {order.date} • Address: {order.address}</p>
                  <p className="font-semibold text-slate-800">
                    Items: {order.items.map((i) => i.name).join(', ')}
                  </p>
                </div>

                <div className="text-right">
                  <span className="font-extrabold text-base text-medical-700 block">
                    ${order.total.toFixed(2)}
                  </span>
                  <span className="text-xs text-emerald-600 font-bold">Paid via Credit Card</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
