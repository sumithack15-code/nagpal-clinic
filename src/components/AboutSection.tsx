import React from 'react';
import { CheckCircle2, ShieldCheck, Heart, UserCheck, Sparkles, Building2 } from 'lucide-react';
import { ABOUT_FEATURES, CLINIC_IMAGES } from '../clinicData';

interface AboutSectionProps {
  onOpenBookingModal: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenBookingModal }) => {
  return (
    <section id="about" className="py-16 sm:py-20 lg:py-24 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#DDF5F4] text-[#0F8B8D] text-[11px] font-bold uppercase tracking-wider mb-3">
            <Building2 className="w-3.5 h-3.5" />
            <span>OUR CLINIC</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-[#0B1F3A] tracking-tight leading-tight">
            A Professional Space <br className="hidden sm:inline" />
            <span className="text-[#0F8B8D]">Designed Around Patient Comfort</span>
          </h2>
          <p className="mt-4 text-base text-slate-600 leading-relaxed font-normal">
            Nagpal Clinic & Ultrasound provides clinical consultations, preventive health check-ups, and specialized diagnostic ultrasound in a calm, welcoming environment in Pocket G, Sarita Vihar. We focus on attentive care, unhurried patient examinations, and clear diagnostic explanations.
          </p>
        </div>

        {/* Premium Editorial Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Real Clinic Interior Photos (Image 3 Reception & Image 4 Waiting) */}
          <div className="lg:col-span-6 space-y-5">
            {/* Primary Interior Image: Reception Desk */}
            <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200/80 bg-white p-2.5">
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-slate-100">
                <img
                  src={CLINIC_IMAGES[2].src}
                  alt={CLINIC_IMAGES[2].alt}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transform hover:scale-102 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/75 via-transparent to-transparent" />
                
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="text-[10px] uppercase tracking-widest text-[#DDF5F4] font-bold">Reception & Registration</p>
                  <p className="text-sm font-bold text-white mt-0.5">Warm, Welcoming & Orderly Front Desk</p>
                </div>
              </div>
            </div>

            {/* Secondary Waiting Area Preview */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
              <div className="sm:col-span-6 rounded-2xl overflow-hidden border border-slate-200/80 bg-white p-2 shadow-md">
                <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-slate-100">
                  <img
                    src={CLINIC_IMAGES[3].src}
                    alt={CLINIC_IMAGES[3].alt}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/70 to-transparent" />
                  <div className="absolute bottom-2 left-2 right-2 text-white">
                    <p className="text-[10px] font-bold text-[#DDF5F4]">Waiting Lounge</p>
                  </div>
                </div>
              </div>

              {/* Floating Reassurance Note */}
              <div className="sm:col-span-6 bg-[#0B1F3A] text-white p-4 rounded-2xl shadow-lg border border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#0F8B8D] flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">Clean & Sanitized</p>
                    <p className="text-[11px] text-slate-300">Quiet, dignified setting</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Feature Points & Detailed Values */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xl space-y-6">
              <h3 className="text-lg sm:text-xl font-bold text-[#0B1F3A] border-b border-slate-100 pb-3">
                Core Clinical Values
              </h3>

              <div className="space-y-4">
                {ABOUT_FEATURES.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3.5 group">
                    <div className="mt-0.5 w-6 h-6 rounded-full bg-[#DDF5F4] text-[#0F8B8D] flex items-center justify-center shrink-0 group-hover:bg-[#0F8B8D] group-hover:text-white transition-colors">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-[#0B1F3A] leading-tight">
                        {feature.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <p className="text-xs text-slate-500">
                  Have questions about scan preparation or booking? Our reception desk is always ready to guide you.
                </p>
                <button
                  type="button"
                  onClick={onOpenBookingModal}
                  className="shrink-0 px-5 py-2.5 bg-[#0F8B8D] hover:bg-[#0D7A7C] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer shadow-md"
                >
                  Schedule Consultation
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
