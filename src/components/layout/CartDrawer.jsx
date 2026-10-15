import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ShieldAlert,
  ArrowRight,
  CheckCircle2,
  FileText
} from 'lucide-react';
import { CheckoutModal } from '../pharmacy/CheckoutModal';

export const CartDrawer = () => {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateCartQuantity } = useApp();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  if (!isCartOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const requiresRx = cart.some((item) => item.requiresPrescription);
  const shipping = subtotal > 50 || cart.length === 0 ? 0 : 5.99;
  const total = subtotal + shipping;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[9990] transition-opacity animate-fadeIn"
      />

      {/* Drawer */}
      <div className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white shadow-2xl z-[9995] flex flex-col transition-transform duration-300 transform translate-x-0">
        {/* Drawer Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-medical-100 text-medical-700 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-slate-900 text-lg">
                Your Medical Order
              </h3>
              <p className="text-xs text-slate-500">
                {cart.length} {cart.length === 1 ? 'item' : 'items'} in cart
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Prescription Notice Banner */}
        {requiresRx && (
          <div className="bg-amber-50 border-b border-amber-200/60 p-3.5 flex items-start gap-2.5 text-xs text-amber-800">
            <FileText className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Prescription Required (Rx):</span>
              <p className="text-amber-700 mt-0.5">
                Your order contains Rx items. You will be prompted to upload or select your digital prescription during checkout.
              </p>
            </div>
          </div>
        )}

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-slate-400 py-12">
              <ShoppingBag className="w-16 h-16 stroke-[1.2] text-slate-300 mb-3" />
              <p className="font-bold text-slate-600">Your cart is currently empty</p>
              <p className="text-xs max-w-xs mt-1">
                Browse our pharmacy store for medications, blood pressure monitors, and wellness supplements.
              </p>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3.5 p-3.5 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-sm transition-all"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg border border-slate-200 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-1">
                    <h4 className="text-xs font-bold text-slate-800 line-clamp-2">
                      {item.name}
                    </h4>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-slate-400 hover:text-emergency-500 transition-colors p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {item.requiresPrescription && (
                    <span className="inline-block mt-1 bg-red-100 text-red-700 text-[10px] font-bold px-1.5 py-0.5 rounded">
                      Rx Required
                    </span>
                  )}

                  <div className="flex items-center justify-between mt-2">
                    <span className="font-extrabold text-sm text-medical-700">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-lg px-2 py-0.5 shadow-2xs">
                      <button
                        onClick={() => updateCartQuantity(item.id, -1)}
                        className="text-slate-500 hover:text-slate-800"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold px-1.5 min-w-[1.25rem] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.id, 1)}
                        className="text-slate-500 hover:text-slate-800"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Summary & Checkout Button */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-slate-200 bg-slate-50 space-y-3">
            <div className="space-y-1.5 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-slate-800">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Pharmacy Express Shipping</span>
                <span className="font-semibold text-slate-800">
                  {shipping === 0 ? <span className="text-emerald-600 font-bold">FREE</span> : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-200 text-sm font-bold text-slate-900">
                <span>Total Amount</span>
                <span className="text-medical-700 text-base font-extrabold">${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={() => setIsCheckoutOpen(true)}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-medical-600 to-teal-600 hover:from-medical-700 hover:to-teal-700 text-white font-bold text-sm shadow-soft-glow flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Checkout Modal */}
      {isCheckoutOpen && (
        <CheckoutModal
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
        />
      )}
    </>
  );
};
