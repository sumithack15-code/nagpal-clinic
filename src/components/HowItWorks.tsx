import React from 'react';
import { Calendar, Stethoscope, FileText, CheckCircle2 } from 'lucide-react';
import { HOW_IT_WORKS_STEPS } from '../clinicData';

interface HowItWorksProps {
  onOpenBookingModal: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onOpenBookingModal }) => {
  const stepIcons = [
    <Calendar className="w-6 h-6 text-[#0F8B8D]" />,
    <Stethoscope className="w-6 h-6 text-[#0F8B8D]" />,
    <FileText className="w-6 h-6 text-[#0F8B8D]" />,
  ];

  return (
    <section id="how-it-works" className="py-16 sm:py-20 lg:py-24 bg-[#F8FAFC] border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#DDF5F4] text-[#0F8B8D] text-[11px] font-bold uppercase tracking-wider mb-3">
            Patient Experience Journey
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1F3A] tracking-tight">
            How Your Visit Works
          </h2>
          <p className="mt-3.5 text-base text-slate-600 leading-relaxed font-normal">
            From seamless scheduling to transparent report explanations, we make your clinic and diagnostic experience stress-free and efficient.
          </p>
        </div>

        {/* 3 Step Process Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 relative">
          
          {HOW_IT_WORKS_STEPS.map((step, idx) => (
            <div
              key={step.step}
              className="relative bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-xl flex flex-col justify-between"
            >
              {/* Step Counter Tag */}
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-[#DDF5F4] flex items-center justify-center shadow-xs">
                    {stepIcons[idx]}
                  </div>
                  <span className="text-2xl font-black text-slate-300 font-mono">
                    {step.step}
                  </span>
                </div>

                <span className="text-[10px] font-bold text-[#0F8B8D] uppercase tracking-widest">
                  {step.subtitle}
                </span>
                <h3 className="text-lg font-bold text-[#0B1F3A] mt-1 mb-2.5">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  {step.description}
                </p>
              </div>

              {/* Bullet Highlights */}
              <div className="pt-4 border-t border-slate-100 space-y-2">
                {step.details.map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#0F8B8D] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

            </div>
          ))}

        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-12 text-center">
          <button
            type="button"
            onClick={onOpenBookingModal}
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#0B1F3A] hover:bg-[#132d52] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer shadow-lg shadow-[#0B1F3A]/20"
          >
            <Calendar className="w-4 h-4 text-[#0F8B8D]" />
            <span>Schedule Your Appointment</span>
          </button>
        </div>

      </div>
    </section>
  );
};
