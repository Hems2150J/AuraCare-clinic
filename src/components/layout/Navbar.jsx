import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { clinicData } from '../../data/clinicData';
import {
  Phone,
  Clock,
  MapPin,
  ShoppingBag,
  User,
  ShieldAlert,
  Menu,
  X,
  Stethoscope,
  Video,
  Calendar,
  LayoutDashboard
} from 'lucide-react';

export const Navbar = () => {
  const {
    activeTab,
    setActiveTab,
    cart,
    setIsCartOpen,
    setIsEmergencyModalOpen
  } = useApp();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'doctors', label: 'Specialists' },
    { id: 'services', label: 'Services' },
    { id: 'appointments', label: 'Appointments' },
    { id: 'telehealth', label: 'Telehealth', icon: Video, highlight: true },
    { id: 'pharmacy', label: 'Pharmacy' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 transition-all duration-300">
      {/* Top Utility Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-medical-300 font-medium">
              <Phone className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              Emergency 24/7:
              <a
                href={`tel:${clinicData.phones.emergency}`}
                className="text-white hover:text-emerald-400 font-semibold tracking-wide transition-colors"
              >
                {clinicData.phones.emergency}
              </a>
            </span>
            <span className="hidden md:flex items-center gap-1.5 text-slate-400">
              <Clock className="w-3.5 h-3.5 text-medical-400" />
              {clinicData.hours.regular}
            </span>
            <span className="hidden lg:flex items-center gap-1.5 text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-teal-400" />
              Metro Healthcare District, NY
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => handleNavClick('portal')}
              className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-md transition-colors ${
                activeTab === 'portal'
                  ? 'bg-medical-600 text-white'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              My Appointments
            </button>
            <span className="text-slate-700">|</span>
            <button
              onClick={() => handleNavClick('admin')}
              className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-md transition-colors ${
                activeTab === 'admin'
                  ? 'bg-teal-700 text-white'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              Doctor Portal
            </button>
          </div>
        </div>
      </div>

      {/* Main Glass Navigation Bar */}
      <nav
        className={`transition-all duration-300 ${
          isScrolled
            ? 'glass-nav shadow-soft-glow py-3'
            : 'bg-white/90 backdrop-blur-md py-4 border-b border-slate-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Clinic Brand Logo */}
          <div
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="relative w-11 h-11 rounded-xl bg-gradient-to-tr from-medical-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-medical-500/20 group-hover:scale-105 transition-transform duration-300">
              <Stethoscope className="w-6 h-6 transform -rotate-12" />
              <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-white animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-heading font-extrabold text-xl text-slate-900 tracking-tight">
                  Aura<span className="text-medical-600">Care</span>
                </span>
                <span className="bg-teal-50 text-teal-700 text-[10px] font-bold px-1.5 py-0.5 rounded border border-teal-200 uppercase tracking-widest">
                  Specialists
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-medium tracking-wider uppercase">
                International Medical Center
              </p>
            </div>
          </div>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id;
              const Icon = link.icon;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`relative px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center gap-1.5 ${
                    isActive
                      ? 'text-medical-600 bg-medical-50/80 shadow-sm'
                      : 'text-slate-600 hover:text-medical-600 hover:bg-slate-50'
                  }`}
                >
                  {Icon && (
                    <Icon className={`w-4 h-4 ${link.highlight ? 'text-teal-600 animate-pulse' : ''}`} />
                  )}
                  {link.label}
                  {link.highlight && (
                    <span className="w-2 h-2 rounded-full bg-teal-500" />
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-medical-600 rounded-full" />
                  )}
                </button>
              );
            })}
          </div>

          {/* CTA Actions */}
          <div className="flex items-center gap-3">
            {/* Cart Icon Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="View Shopping Cart"
              className="relative p-2.5 rounded-xl text-slate-700 hover:text-medical-600 hover:bg-medical-50 transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-teal-600 text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm animate-bounce">
                  {cartItemsCount}
                </span>
              )}
            </button>

            {/* Book Appointment CTA */}
            <button
              onClick={() => handleNavClick('appointments')}
              className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-medical-600 to-teal-600 hover:from-medical-700 hover:to-teal-700 text-white font-semibold text-sm px-4 py-2.5 rounded-xl shadow-soft-glow hover:shadow-card-hover transform hover:-translate-y-0.5 transition-all duration-200"
            >
              <Calendar className="w-4 h-4" />
              Book Visit
            </button>

            {/* Emergency Fast-Track Red Button */}
            <button
              onClick={() => setIsEmergencyModalOpen(true)}
              className="flex items-center gap-1.5 bg-emergency-500 hover:bg-emergency-600 text-white font-bold text-xs px-3 py-2.5 rounded-xl shadow-md animate-pulse-subtle transition-transform hover:scale-105"
            >
              <ShieldAlert className="w-4 h-4" />
              <span className="hidden md:inline">24/7 Triage</span>
              <span className="md:hidden">Emergency</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-slate-100 px-4 pt-3 pb-6 space-y-2 shadow-xl">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`w-full text-left px-4 py-3 rounded-xl font-semibold text-sm flex items-center justify-between transition-colors ${
                    isActive
                      ? 'bg-medical-50 text-medical-700 font-bold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{link.label}</span>
                  {link.highlight && (
                    <span className="bg-teal-100 text-teal-700 text-xs px-2 py-0.5 rounded-full font-bold">
                      Live Call
                    </span>
                  )}
                </button>
              );
            })}
            <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
              <button
                onClick={() => handleNavClick('portal')}
                className="w-full py-2.5 text-center bg-slate-100 text-slate-800 font-semibold rounded-xl text-sm"
              >
                My Patient Portal
              </button>
              <button
                onClick={() => handleNavClick('admin')}
                className="w-full py-2.5 text-center bg-slate-900 text-slate-200 font-semibold rounded-xl text-sm"
              >
                Doctor Admin Dashboard
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
