import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useApp } from '../../context/AppContext';
import { ShoppingBag, CreditCard, ShieldCheck, CheckCircle2, FileText, Upload } from 'lucide-react';

export const CheckoutModal = ({ isOpen, onClose }) => {
  const { cart, addOrder, setIsCartOpen } = useApp();

  const [address, setAddress] = useState('124 Park Avenue, Apt 4B, New York, NY 10016');
  const [rxFileName, setRxFileName] = useState('');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [expiry, setExpiry] = useState('08/28');
  const [cvc, setCvc] = useState('888');
  const [isSuccess, setIsSuccess] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const requiresRx = cart.some((item) => item.requiresPrescription);
  const total = subtotal + (subtotal > 50 ? 0 : 5.99);

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    if (requiresRx && !rxFileName) {
      setRxFileName('Verified_Digital_Prescription_AuraCare.pdf');
    }

    addOrder({
      items: cart,
      total,
      address,
      status: 'Placed'
    });

    setIsSuccess(true);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Pharmacy Express Checkout"
      subtitle="Encrypted 256-Bit Payment Gateway"
      maxWidth="max-w-xl"
    >
      {!isSuccess ? (
        <form onSubmit={handleCheckoutSubmit} className="space-y-5">
          {/* Address */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Delivery Address:
            </label>
            <input
              type="text"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-800"
            />
          </div>

          {/* Rx Upload Simulation if required */}
          {requiresRx && (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 space-y-2">
              <label className="block text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-amber-700" />
                Upload Digital Prescription File (Rx):
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="file"
                  id="rx-upload"
                  className="hidden"
                  onChange={(e) => setRxFileName(e.target.files[0]?.name || 'Prescription_Uploaded.pdf')}
                />
                <label
                  htmlFor="rx-upload"
                  className="py-2 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs cursor-pointer flex items-center gap-1.5"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Choose PDF / Image</span>
                </label>
                <span className="text-xs text-amber-800 font-semibold truncate max-w-[200px]">
                  {rxFileName || 'No prescription selected yet (Auto-verifies)'}
                </span>
              </div>
            </div>
          )}

          {/* Stripe Card Mock */}
          <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <CreditCard className="w-4 h-4 text-medical-600" />
              Stripe Secured Card Information:
            </label>

            <div>
              <input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                placeholder="Card Number"
                className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-800"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                placeholder="MM/YY"
                className="bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-800"
              />
              <input
                type="text"
                value={cvc}
                onChange={(e) => setCvc(e.target.value)}
                placeholder="CVC"
                className="bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-800"
              />
            </div>
          </div>

          {/* Total Pay Button */}
          <button
            type="submit"
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-medical-600 to-teal-600 hover:from-medical-700 hover:to-teal-700 text-white font-extrabold text-sm shadow-soft-glow flex items-center justify-center gap-2 transform hover:scale-[1.01]"
          >
            <ShieldCheck className="w-5 h-5" />
            <span>Pay & Place Order (${total.toFixed(2)})</span>
          </button>
        </form>
      ) : (
        <div className="text-center space-y-4 py-6 animate-scaleUp">
          <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto" />
          <h3 className="font-heading font-extrabold text-2xl text-slate-900">
            Order Placed Successfully!
          </h3>
          <p className="text-sm text-slate-600 max-w-sm mx-auto">
            Your pharmacy items are being packed by our licensed clinical pharmacists for express doorstep delivery.
          </p>
          <button
            onClick={() => {
              setIsCartOpen(false);
              onClose();
            }}
            className="py-3 px-8 rounded-xl bg-slate-900 text-white font-bold text-sm"
          >
            Return to Store
          </button>
        </div>
      )}
    </Modal>
  );
};
