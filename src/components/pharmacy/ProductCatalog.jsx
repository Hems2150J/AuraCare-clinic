import React, { useState } from 'react';
import { productsData } from '../../data/productsData';
import { ProductCard } from './ProductCard';
import { OrderTrackingModal } from './OrderTrackingModal';
import { Search, ShoppingBag, Truck, ShieldCheck, FileText } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ProductCatalog = () => {
  const { orders } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeTrackingOrder, setActiveTrackingOrder] = useState(null);

  const categories = ['All', 'Devices', 'Prescription', 'Supplements', 'Skincare'];

  const filteredProducts = productsData.filter((prod) => {
    const matchesSearch = prod.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prod.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || prod.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="bg-teal-50 text-teal-700 text-xs font-extrabold px-3.5 py-1 rounded-full uppercase tracking-wider">
          AuraCare Pharmacy & Medical Store
        </span>
        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight">
          Clinical Health Devices & Pharmacy Catalog
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          Order genuine medical monitors, Rx medications, supplements, and dermatologist skincare with direct home delivery.
        </p>
      </div>

      {/* Active Orders Tracker Pill */}
      {orders.length > 0 && (
        <div className="bg-slate-900 text-white rounded-3xl p-5 border border-slate-800 shadow-luxury flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center">
              <Truck className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white">
                Active Order #{orders[0].id}
              </h4>
              <p className="text-xs text-slate-400">
                Status: <span className="text-emerald-400 font-bold">{orders[0].status}</span> • Expected: Today by 6:00 PM
              </p>
            </div>
          </div>
          <button
            onClick={() => setActiveTrackingOrder(orders[0])}
            className="bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-colors"
          >
            Track Live Delivery Progress
          </button>
        </div>
      )}

      {/* Filter & Search Controls */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Search */}
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search medications, BP monitors, supplements..."
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-11 pr-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-teal-500"
            />
          </div>

          {/* Categories */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-teal-700 text-white shadow-soft-glow'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Product Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Order Tracking Modal */}
      {activeTrackingOrder && (
        <OrderTrackingModal
          isOpen={!!activeTrackingOrder}
          onClose={() => setActiveTrackingOrder(null)}
          order={activeTrackingOrder}
        />
      )}
    </div>
  );
};
