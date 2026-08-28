import React from 'react';
import { Calendar, Phone, CheckCircle2, Shield, HeartPulse, Clock, Sparkles, MapPin, Building } from 'lucide-react';
import { CLINIC_CONFIG, TRUST_BADGES, CLINIC_IMAGES } from '../clinicData';

interface HeroSectionProps {
  onOpenBookingModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenBookingModal }) => {
  return (
    <section id="hero" className="relative overflow-hidden bg-[#F8FAFC] pt-10 pb-16 lg:pt-16 lg:pb-24">
      {/* Ambient background glow matching Professional Polish */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-[#DDF5F4] rounded-full opacity-40 blur-[120px] -z-10 pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[450px] h-[450px] bg-[#0F8B8D]/10 rounded-full blur-[100px] -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* Left Column: Headline, Trust Badges, CTAs */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-7 text-center lg:text-left">
            
            {/* Top Clinic Name & Acceptance Pill */}
            <div className="inline-flex items-center gap-2 bg-[#DDF5F4] text-[#0F8B8D] px-3.5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#0F8B8D] animate-pulse" />
              <span>Nagpal Clinic & Ultrasound • Sarita Vihar</span>
            </div>

            {/* Main Headline */}
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-[54px] xl:text-[60px] leading-[1.08] font-extrabold text-[#0B1F3A] mb-4 tracking-tight">
                Trusted Care.<br />
                <span className="text-[#0F8B8D]">Accurate</span> Diagnosis.<br />
                <span className="text-slate-800">Better Health.</span>
              </h1>
              <p className="text-[#64748B] text-base sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
                Nagpal Clinic & Ultrasound provides compassionate clinical care and reliable diagnostic ultrasound services in a comfortable and professional environment.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-1">
              <button
                type="button"
                id="hero-book-cta-btn"
                onClick={onOpenBookingModal}
                className="w-full sm:w-auto bg-[#0F8B8D] hover:bg-[#0D7A7C] text-white px-8 py-4 rounded-xl text-sm font-bold shadow-xl shadow-[#0F8B8D]/30 transition-all cursor-pointer active:scale-98"
              >
                Book Appointment
              </button>

              <a
                href={`tel:${CLINIC_CONFIG.phone.replace(/\s+/g, '')}`}
                id="hero-call-cta-btn"
                className="w-full sm:w-auto border-2 border-slate-200 text-[#0B1F3A] px-8 py-4 rounded-xl text-sm font-bold hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#0F8B8D]" />
                <span>Call: {CLINIC_CONFIG.phoneDisplay}</span>
              </a>
            </div>

            {/* Quick Contact & Timings Summary */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-6 text-xs text-slate-500 font-medium">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#0F8B8D]" />
                <span>Pocket G, Sarita Vihar, New Delhi</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#0F8B8D]" />
                <span>Mon – Sat: 9 AM - 1:30 PM & 5 PM - 8:30 PM (Sun Closed)</span>
              </div>
            </div>

            {/* Trust Checkmarks Row */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-2 border-t border-slate-200/60">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-[#25D366]/20 flex items-center justify-center">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#25D366]" />
                </div>
                <span className="text-xs font-semibold text-[#64748B]">Experienced Care</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-[#25D366]/20 flex items-center justify-center">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#25D366]" />
                </div>
                <span className="text-xs font-semibold text-[#64748B]">Advanced Ultrasound</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-[#25D366]/20 flex items-center justify-center">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#25D366]" />
                </div>
                <span className="text-xs font-semibold text-[#64748B]">Patient-Centred</span>
              </div>
            </div>

          </div>

          {/* Right Column: Large Real Clinic Exterior Photo in Premium Framed Container */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end items-center">
            <div className="w-full max-w-[480px] bg-white rounded-3xl p-2.5 sm:p-3 shadow-2xl border border-slate-200/80 relative z-10">
              
              {/* Image Container with natural aspect ratio, object-top to keep signage clear */}
              <div className="relative aspect-[4/3] sm:aspect-[16/11] rounded-2xl overflow-hidden bg-slate-100 shadow-inner">
                <img
                  src={CLINIC_IMAGES[0].src}
                  alt={CLINIC_IMAGES[0].alt}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top transform hover:scale-102 transition-transform duration-700"
                  loading="eager"
                />
              </div>

              {/* Clinic Information & Feature Strip below image so signage and entrance are never obstructed */}
              <div className="mt-3 p-3 bg-[#F8FAFC] rounded-2xl border border-slate-100 space-y-2">
                <div className="flex gap-3 items-center">
                  <div className="w-9 h-9 rounded-xl bg-[#DDF5F4] flex items-center justify-center shrink-0">
                    <Sparkles className="w-4.5 h-4.5 text-[#0F8B8D]" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-[#0F8B8D] font-bold">Your Trusted Local Clinic</p>
                    <p className="text-xs sm:text-sm font-bold text-[#0B1F3A] leading-tight">
                      Clinical Care • Ultrasound • Diagnostic Support
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-600">
                  <div className="flex items-center gap-1.5 font-semibold text-[#0B1F3A]">
                    <Building className="w-3.5 h-3.5 text-[#0F8B8D]" />
                    <span>Pocket G, Sarita Vihar</span>
                  </div>
                  <span className="text-[11px] font-bold text-[#0F8B8D] bg-white px-2.5 py-0.5 rounded-md border border-slate-200 shadow-2xs">
                    Ground Floor Entry
                  </span>
                </div>
              </div>

            </div>

            {/* Ambient Background Circle */}
            <div className="absolute bottom-[-20px] right-[-20px] w-64 h-64 bg-[#0B1F3A] rounded-full -z-10 opacity-5" />
          </div>

        </div>
      </div>
    </section>
  );
};
