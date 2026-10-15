import React from 'react';
import { Modal } from '../common/Modal';
import { CheckCircle2, Truck, Package, Clock, ShieldCheck } from 'lucide-react';

export const OrderTrackingModal = ({ isOpen, onClose, order }) => {
  if (!order) return null;

  const trackingSteps = [
    { label: 'Order Confirmed', time: '10:30 AM', done: true },
    { label: 'Rx Verified & Packed', time: '11:15 AM', done: true },
    { label: 'Out for Express Delivery', time: '01:45 PM', done: true, active: true },
    { label: 'Delivered to Doorstep', time: 'Expected 04:30 PM', done: false }
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Live Delivery Status • #${order.id}`}
      subtitle={`Shipping Address: ${order.address}`}
      maxWidth="max-w-xl"
    >
      <div className="space-y-6">
        {/* Status Stepper */}
        <div className="space-y-6 relative border-l-2 border-slate-200 ml-4 pl-6 py-2">
          {trackingSteps.map((s, idx) => (
            <div key={idx} className="relative flex items-center justify-between">
              <div
                className={`absolute -left-[31px] w-5 h-5 rounded-full flex items-center justify-center border-2 transition-all ${
                  s.done
                    ? 'bg-emerald-500 border-emerald-500 text-white shadow-sm'
                    : 'bg-white border-slate-300'
                }`}
              >
                {s.done && <CheckCircle2 className="w-3.5 h-3.5" />}
              </div>

              <div>
                <h4 className={`text-sm font-extrabold ${s.active ? 'text-medical-600' : 'text-slate-800'}`}>
                  {s.label}
                  {s.active && (
                    <span className="ml-2 text-[10px] bg-teal-100 text-teal-800 font-bold px-2 py-0.5 rounded animate-pulse">
                      In Transit
                    </span>
                  )}
                </h4>
                <p className="text-xs text-slate-500">{s.time}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Order Items Summary */}
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
            Items in Order:
          </span>
          {order.items.map((item, idx) => (
            <div key={idx} className="flex justify-between text-xs text-slate-800 font-semibold">
              <span>{item.quantity}x {item.name}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="pt-2 border-t border-slate-200 flex justify-between font-bold text-sm text-slate-900">
            <span>Total Paid</span>
            <span className="text-medical-700">${order.total.toFixed(2)}</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 rounded-xl bg-slate-900 text-white font-bold text-sm"
        >
          Close Tracker
        </button>
      </div>
    </Modal>
  );
};
