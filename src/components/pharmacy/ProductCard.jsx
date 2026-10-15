import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShoppingBag, Star, FileText, CheckCircle2 } from 'lucide-react';
import { StarRating } from '../common/StarRating';

export const ProductCard = ({ product }) => {
  const { addToCart } = useApp();

  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-card-hover transform hover:-translate-y-1.5 transition-all duration-300 overflow-hidden flex flex-col justify-between group">
      <div>
        {/* Product Image */}
        <div className="relative h-52 overflow-hidden bg-slate-50 p-4">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
          />

          {/* Rx Badge */}
          {product.requiresPrescription && (
            <span className="absolute top-3 left-3 bg-red-100 text-red-700 text-[10px] font-extrabold px-2.5 py-1 rounded-full border border-red-200 flex items-center gap-1 shadow-2xs">
              <FileText className="w-3 h-3 text-red-600" />
              Rx Required
            </span>
          )}

          {/* Category Pill */}
          <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-md text-slate-700 text-[11px] font-extrabold px-2.5 py-0.5 rounded-full shadow-2xs">
            {product.category}
          </span>
        </div>

        {/* Content */}
        <div className="p-5 space-y-2">
          <StarRating rating={product.rating} />
          <h3 className="font-heading font-extrabold text-base text-slate-900 group-hover:text-medical-600 transition-colors line-clamp-2">
            {product.name}
          </h3>
          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>
      </div>

      {/* Footer Price & Add Button */}
      <div className="p-5 pt-0 flex items-center justify-between">
        <div>
          <span className="text-xs text-slate-400 block font-medium">Price</span>
          <span className="font-extrabold text-lg text-medical-700">
            ${product.price.toFixed(2)}
          </span>
        </div>

        <button
          onClick={() => addToCart(product)}
          className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-medical-600 to-teal-600 hover:from-medical-700 hover:to-teal-700 text-white font-bold text-xs shadow-soft-glow flex items-center gap-1.5 transform hover:scale-105 transition-all"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
};
