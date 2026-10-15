import React, { useState } from 'react';
import { Calendar, UserCheck, Stethoscope, FileCheck, CheckCircle2, ChevronRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const StepByStepStory = () => {
  const { setActiveTab } = useApp();
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      num: '01',
      title: 'Seamless Online Booking & Digital Intake',
      desc: 'Select your preferred specialist and time slot online in under 60 seconds. Fill out digital health history forms prior to arrival for zero waiting room friction.',
      icon: Calendar,
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1000&q=80',
      highlights: ['Instant Instant Confirmation', 'Automated SMS/Calendar Sync', 'Pre-Check-in Digital Intake']
    },
    {
      num: '02',
      title: 'Warm Welcoming & Vitals Check',
      desc: 'Arrive at our calm, private reception suite. Our patient concierge team guides you through a gentle vitals check and preliminary nursing triage.',
      icon: UserCheck,
      image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1000&q=80',
      highlights: ['Concierge Waiting Lounge', 'Zero Line Triage', 'Complimentary Hydration Bar']
    },
    {
      num: '03',
      title: 'In-Depth Specialist Consultation',
      desc: 'Meet with your board-certified specialist in a quiet, private consultation room. Enjoy transparent explanations of diagnostic findings and care options.',
      icon: Stethoscope,
      image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=1000&q=80',
      highlights: ['3D Imaging & Diagnostics', 'Dedicated 30-Min Time Slots', 'Second Opinion Review']
    },
    {
      num: '04',
      title: 'Digital Care Plan & Prescription Sync',
      desc: 'Receive your complete digital care plan, prescription order sent directly to our pharmacy or your home, and scheduled follow-up telehealth check-ins.',
      icon: FileCheck,
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=1000&q=80',
      highlights: ['Instant PDF Medical Summary', 'Doorstep Pharmacy Delivery', '24/7 Portal Records']
    }
  ];

  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="bg-medical-50 text-medical-700 text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
            Patient Journey
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight">
            Your Visit, <span className="text-medical-600">Step by Step</span>
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            We have redesigned the hospital experience from the ground up to ensure every step feels calm, clear, and dignified.
          </p>
        </div>

        {/* Interactive Storyteller Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Steps Navigator Column */}
          <div className="lg:col-span-5 space-y-4">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isActive = activeStep === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`p-6 rounded-3xl border transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-slate-900 text-white border-slate-800 shadow-luxury scale-[1.02]'
                      : 'bg-slate-50 text-slate-800 border-slate-100 hover:bg-white hover:border-slate-200'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 font-extrabold text-sm ${
                        isActive
                          ? 'bg-medical-500 text-white shadow-md'
                          : 'bg-white text-medical-700 border border-slate-200'
                      }`}
                    >
                      {step.num}
                    </div>

                    <div className="space-y-2 flex-1">
                      <h3 className={`font-heading font-bold text-lg ${isActive ? 'text-white' : 'text-slate-900'}`}>
                        {step.title}
                      </h3>
                      <p className={`text-xs leading-relaxed ${isActive ? 'text-slate-300' : 'text-slate-500'}`}>
                        {step.desc}
                      </p>

                      {isActive && (
                        <div className="pt-3 flex flex-wrap gap-2 animate-fadeIn">
                          {step.highlights.map((h, hIdx) => (
                            <span
                              key={hIdx}
                              className="bg-slate-800 text-emerald-400 text-[11px] font-semibold px-2.5 py-1 rounded-lg border border-slate-700 flex items-center gap-1"
                            >
                              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                              {h}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Dynamic Image Display Column */}
          <div className="lg:col-span-7">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 aspect-[4/3] bg-slate-900">
              <img
                src={steps[activeStep].image}
                alt={steps[activeStep].title}
                className="w-full h-full object-cover transition-all duration-700 scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />

              <div className="absolute bottom-8 left-8 right-8 text-white space-y-2">
                <span className="bg-teal-500/80 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Step {steps[activeStep].num} Spotlight
                </span>
                <h3 className="font-heading font-extrabold text-2xl text-white">
                  {steps[activeStep].title}
                </h3>
                <button
                  onClick={() => setActiveTab('appointments')}
                  className="pt-2 text-medical-300 hover:text-white text-xs font-bold flex items-center gap-1 transition-colors"
                >
                  <span>Experience seamless clinical care</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
