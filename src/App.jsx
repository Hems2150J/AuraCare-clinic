import React, { useEffect } from 'react';
import Lenis from 'lenis';
import { AppProvider, useApp } from './context/AppContext';
import { CustomCursor } from './components/layout/CustomCursor';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { CartDrawer } from './components/layout/CartDrawer';
import { LiveChatWidget } from './components/layout/LiveChatWidget';
import { EmergencyFastTrackModal } from './components/appointment/EmergencyFastTrackModal';

// Home components
import { HeroSection } from './components/home/HeroSection';
import { TrustCounters } from './components/home/TrustCounters';
import { WhyChooseUs } from './components/home/WhyChooseUs';
import { FeaturedDoctors } from './components/home/FeaturedDoctors';
import { StepByStepStory } from './components/home/StepByStepStory';
import { ServicesGrid } from './components/home/ServicesGrid';
import { TestimonialsCarousel } from './components/home/TestimonialsCarousel';
import { HealthTipsNewsletter } from './components/home/HealthTipsNewsletter';

// Pages
import { MissionTimeline } from './components/about/MissionTimeline';
import { GalleryLightbox } from './components/about/GalleryLightbox';
import { DoctorDirectory } from './components/doctors/DoctorDirectory';
import { AppointmentBookingFlow } from './components/appointment/AppointmentBookingFlow';
import { TelehealthOverview } from './components/telehealth/TelehealthOverview';
import { VideoCallRoom } from './components/telehealth/VideoCallRoom';
import { ProductCatalog } from './components/pharmacy/ProductCatalog';
import { ReviewsList } from './components/reviews/ReviewsList';
import { InteractiveMap } from './components/contact/InteractiveMap';
import { ContactForm } from './components/contact/ContactForm';
import { FAQAccordion } from './components/contact/FAQAccordion';
import { PatientDashboard } from './components/portal/PatientDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AlertCircle, CheckCircle2, Info } from 'lucide-react';

const MainContent = () => {
  const { activeTab, activeTelehealthSession, toast } = useApp();

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // If active telehealth video call session is running, render VideoCallRoom full screen
  if (activeTelehealthSession) {
    return <VideoCallRoom />;
  }

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-medical-100 selection:text-medical-800">
      <CustomCursor />
      <Navbar />

      {/* Global Toast Alert */}
      {toast && (
        <div className="fixed top-24 right-6 z-[9999] bg-slate-900 text-white rounded-2xl p-4 shadow-2xl border border-slate-700 flex items-center gap-3 animate-fadeIn max-w-sm">
          {toast.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          ) : toast.type === 'emergency' ? (
            <AlertCircle className="w-5 h-5 text-red-500 animate-pulse shrink-0" />
          ) : (
            <Info className="w-5 h-5 text-medical-400 shrink-0" />
          )}
          <span className="text-xs font-bold">{toast.message}</span>
        </div>
      )}

      {/* Dynamic View Switcher */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <div className="space-y-0">
            <HeroSection />
            <TrustCounters />
            <WhyChooseUs />
            <FeaturedDoctors />
            <StepByStepStory />
            <ServicesGrid />
            <TestimonialsCarousel />
            <HealthTipsNewsletter />
          </div>
        )}

        {activeTab === 'about' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
            <MissionTimeline />
            <GalleryLightbox />
          </div>
        )}

        {activeTab === 'doctors' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <DoctorDirectory />
          </div>
        )}

        {activeTab === 'services' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
            <ServicesGrid />
            <FAQAccordion />
          </div>
        )}

        {activeTab === 'appointments' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <AppointmentBookingFlow />
          </div>
        )}

        {activeTab === 'telehealth' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <TelehealthOverview />
          </div>
        )}

        {activeTab === 'pharmacy' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <ProductCatalog />
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <ReviewsList />
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7">
                <InteractiveMap />
              </div>
              <div className="lg:col-span-5">
                <ContactForm />
              </div>
            </div>
            <FAQAccordion />
          </div>
        )}

        {activeTab === 'portal' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <PatientDashboard />
          </div>
        )}

        {activeTab === 'admin' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <AdminDashboard />
          </div>
        )}
      </main>

      <Footer />
      <CartDrawer />
      <LiveChatWidget />
      <EmergencyFastTrackModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
