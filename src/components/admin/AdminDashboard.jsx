import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  Users,
  DollarSign,
  Video,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Stethoscope,
  TrendingUp,
  Search
} from 'lucide-react';

export const AdminDashboard = () => {
  const { appointments, orders } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  const stats = [
    { title: "Today's Appointments", value: appointments.length + 8, icon: Users, color: 'text-medical-600', bg: 'bg-medical-50' },
    { title: "Active Telehealth Queue", value: "3 Patients", icon: Video, color: 'text-teal-600', bg: 'bg-teal-50' },
    { title: "Today's Revenue", value: "$3,420.00", icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { title: "Pharmacy Orders Pending", value: orders.length + 4, icon: TrendingUp, color: 'text-amber-600', bg: 'bg-amber-50' }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 border border-slate-800 shadow-luxury flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-teal-500/20 text-teal-400 flex items-center justify-center">
            <LayoutDashboard className="w-7 h-7" />
          </div>
          <div>
            <span className="bg-teal-500/20 text-teal-300 text-[10px] font-extrabold px-2.5 py-0.5 rounded uppercase tracking-wider">
              AuraCare Clinical Management Portal
            </span>
            <h1 className="font-heading font-extrabold text-2xl text-white mt-1">
              Physician & Operations Dashboard
            </h1>
            <p className="text-xs text-slate-400">
              Logged in as Dr. Evelyn Reed (Chief of Cardiology) • Shift Status: Active
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs bg-slate-800 border border-slate-700 px-4 py-2 rounded-2xl">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-bold text-slate-200">System Status: All 48 Workstations Online</span>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div key={idx} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase">{s.title}</span>
                <div className={`w-9 h-9 rounded-xl ${s.bg} ${s.color} flex items-center justify-center`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <h3 className="font-heading font-extrabold text-3xl text-slate-900">{s.value}</h3>
            </div>
          );
        })}
      </div>

      {/* Today's Appointments Table */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h3 className="font-heading font-extrabold text-lg text-slate-900">
            Today's Master Consultation Schedule
          </h3>

          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Filter patient schedule..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3 py-2 text-xs text-slate-800"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider bg-slate-50/60">
                <th className="p-3">Appointment ID</th>
                <th className="p-3">Patient Name</th>
                <th className="p-3">Attending Physician</th>
                <th className="p-3">Department</th>
                <th className="p-3">Slot Time</th>
                <th className="p-3">Status</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {appointments.map((appt) => (
                <tr key={appt.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-3 font-mono font-bold text-slate-900">{appt.id}</td>
                  <td className="p-3 font-bold text-slate-800">{appt.patientName}</td>
                  <td className="p-3 text-slate-600">{appt.doctorName}</td>
                  <td className="p-3 font-semibold text-medical-600">{appt.department}</td>
                  <td className="p-3 font-bold text-teal-700">{appt.timeSlot}</td>
                  <td className="p-3">
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
                      {appt.status}
                    </span>
                  </td>
                  <td className="p-3 flex items-center gap-2">
                    <button className="text-xs bg-medical-50 text-medical-700 hover:bg-medical-100 font-bold px-2.5 py-1 rounded-lg">
                      View Intake
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
