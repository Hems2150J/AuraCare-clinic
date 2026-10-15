import React, { useEffect, useRef, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { clinicData } from '../../data/clinicData';
import {
  Calendar,
  Video,
  ShieldCheck,
  Star,
  Award,
  ChevronRight,
  Stethoscope,
  PhoneCall,
  Activity,
  HeartPulse
} from 'lucide-react';
import { QuickBookingBar } from './QuickBookingBar';
import gsap from 'gsap';

export const HeroSection = () => {
  const { setActiveTab, setIsEmergencyModalOpen } = useApp();
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);

  const heroImages = [
    {
      url: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1920&q=80",
      caption: "Luxury Reception & Private Consultation Suites"
    },
    {
      url: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1920&q=80",
      caption: "State-of-the-Art Robotic Surgical & Diagnostic Wing"
    },
    {
      url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1920&q=80",
      caption: "Multidisciplinary Clinical Specialist Team"
    }
  ];

  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        y: 40,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.2
      });
      gsap.from(subtitleRef.current, {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.5
      });
      gsap.from(ctaRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        delay: 0.8
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-[90vh] flex flex-col justify-between overflow-hidden bg-slate-900">
      {/* Background Image Carousel with Ken Burns Zoom */}
      {heroImages.map((img, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === currentBgIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <img
            src={img.url}
            alt={img.caption}
            className="w-full h-full object-cover animate-ken-burns filter brightness-75 scale-105"
          />
          {/* Calm Medical Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/75 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40" />
        </div>
      ))}

      {/* Floating Ambient Badge */}
      <div className="absolute top-8 right-8 hidden xl:flex items-center gap-2.5 bg-slate-900/80 backdrop-blur-md border border-slate-700/60 px-4 py-2 rounded-2xl text-xs text-white z-20 shadow-luxury">
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
        <span className="font-semibold text-slate-200">
          {heroImages[currentBgIndex].caption}
        </span>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 flex-1 flex flex-col justify-center">
        <div className="max-w-3xl space-y-6">
          {/* Trust Badge Pill */}
          <div className="inline-flex items-center gap-2.5 bg-medical-950/80 border border-medical-500/40 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold text-medical-300 shadow-lg">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>JCI Gold Seal Accredited Center of Excellence</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-300">24+ Years of Reassuring Care</span>
          </div>

          {/* Staggered Heading */}
          <h1
            ref={titleRef}
            className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.15]"
          >
            World-Class Care,{' '}
            <span className="bg-gradient-to-r from-medical-300 via-teal-200 to-emerald-300 bg-clip-text text-transparent font-serif italic font-normal">
              Reassuring Precision.
            </span>
          </h1>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal max-w-2xl"
          >
            AuraCare brings together 48+ international clinical specialists, 3D diagnostic suites, non-invasive therapies, and 24/7 HD video telehealth — all within a calm, luxury healing environment.
          </p>

          {/* Hero CTAs */}
          <div
            ref={ctaRef}
            className="pt-2 flex flex-wrap items-center gap-4"
          >
            <button
              onClick={() => setActiveTab('appointments')}
              className="bg-gradient-to-r from-medical-500 via-medical-600 to-teal-600 hover:from-medical-600 hover:to-teal-700 text-white font-bold text-base px-7 py-4 rounded-2xl shadow-soft-glow hover:shadow-card-hover transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-3 glow-medical"
            >
              <Calendar className="w-5 h-5 text-medical-100" />
              <span>Book an Appointment</span>
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setActiveTab('telehealth')}
              className="bg-slate-900/80 hover:bg-slate-800/90 text-white font-semibold text-base px-6 py-4 rounded-2xl border border-slate-700 backdrop-blur-md transition-all flex items-center gap-2.5 group"
            >
              <div className="w-8 h-8 rounded-lg bg-teal-500/20 flex items-center justify-center text-teal-400 group-hover:scale-110 transition-transform">
                <Video className="w-4 h-4" />
              </div>
              <span>Video Consultation</span>
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
            </button>
          </div>

          {/* Quick Metrics Bar */}
          <div className="pt-6 grid grid-cols-3 gap-6 max-w-lg border-t border-slate-800/80 text-white">
            <div>
              <span className="font-extrabold text-2xl text-medical-400">18.5k+</span>
              <p className="text-xs text-slate-400">Patients Treated</p>
            </div>
            <div>
              <span className="font-extrabold text-2xl text-teal-400">48+</span>
              <p className="text-xs text-slate-400">Specialist Doctors</p>
            </div>
            <div>
              <span className="font-extrabold text-2xl text-emerald-400">99.4%</span>
              <p className="text-xs text-slate-400">Patient Satisfaction</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Interactive Appointment Widget Container */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mb-12">
        <QuickBookingBar />
      </div>
    </section>
  );
};
