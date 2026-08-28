import React, { useState } from 'react';
import { TopBar } from './components/TopBar';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { QuickTrustStats } from './components/QuickTrustStats';
import { AboutSection } from './components/AboutSection';
import { GallerySection } from './components/GallerySection';
import { ServicesSection } from './components/ServicesSection';
import { UltrasoundSection } from './components/UltrasoundSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { HowItWorks } from './components/HowItWorks';
import { DoctorSection } from './components/DoctorSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { MobileBottomBar } from './components/MobileBottomBar';
import { AppointmentModal } from './components/AppointmentModal';
import { ServiceDetailModal } from './components/ServiceDetailModal';
import { ServiceItem } from './types';

export default function App() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState<string | undefined>(undefined);
  const [detailService, setDetailService] = useState<ServiceItem | null>(null);

  const handleOpenBooking = (serviceName?: string) => {
    setPreselectedService(serviceName);
    setBookingModalOpen(true);
  };

  const handleCloseBooking = () => {
    setBookingModalOpen(false);
    setPreselectedService(undefined);
  };

  const handleSelectServiceDetail = (service: ServiceItem) => {
    setDetailService(service);
  };

  const handleCloseServiceDetail = () => {
    setDetailService(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#172033]">
      {/* 1. Top Announcement Bar */}
      <TopBar />

      {/* 2. Sticky Navbar with Blur Effect */}
      <Navbar onOpenBookingModal={handleOpenBooking} />

      {/* Main Page Flow */}
      <main className="flex-grow">
        {/* 3. Hero Section */}
        <HeroSection onOpenBookingModal={() => handleOpenBooking()} />

        {/* 4. Quick Trust Stats */}
        <QuickTrustStats />

        {/* 5. About Section */}
        <AboutSection onOpenBookingModal={() => handleOpenBooking('General Consultation')} />

        {/* 6. Clinic Photo Gallery Section */}
        <GallerySection />

        {/* 7. Services Section */}
        <ServicesSection
          onSelectService={handleSelectServiceDetail}
          onOpenBookingModal={handleOpenBooking}
        />

        {/* 7. Ultrasound Feature Section */}
        <UltrasoundSection onOpenBookingModal={handleOpenBooking} />

        {/* 8. Why Choose Us Section */}
        <WhyChooseUs />

        {/* 9. How It Works Timeline */}
        <HowItWorks onOpenBookingModal={() => handleOpenBooking()} />

        {/* 10. Doctor / Clinic Leadership Introduction */}
        <DoctorSection onOpenBookingModal={() => handleOpenBooking('General Consultation')} />

        {/* 11. Patient Experience & Reflections */}
        <TestimonialsSection />

        {/* 12. FAQ Section */}
        <FaqSection />

        {/* 13. Contact & Direct Appointment Section */}
        <ContactSection />
      </main>

      {/* 14. Sophisticated Dark Navy Footer */}
      <Footer />

      {/* Mobile Sticky Action Bar */}
      <MobileBottomBar onOpenBookingModal={() => handleOpenBooking()} />

      {/* Interactive Modals */}
      <AppointmentModal
        isOpen={bookingModalOpen}
        onClose={handleCloseBooking}
        preselectedService={preselectedService}
      />

      <ServiceDetailModal
        service={detailService}
        onClose={handleCloseServiceDetail}
        onBookService={handleOpenBooking}
      />
    </div>
  );
}
