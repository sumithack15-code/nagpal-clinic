import React from 'react';
import { Star, MessageSquareQuote, CheckCircle } from 'lucide-react';
import { TESTIMONIALS_CONFIG } from '../clinicData';

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="patient-experience" className="py-16 sm:py-20 lg:py-24 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#DDF5F4] text-[#0F8B8D] text-[11px] font-bold uppercase tracking-wider mb-3">
            Patient Feedback
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1F3A] tracking-tight">
            Patient Experience & Reflections
          </h2>
          <p className="mt-3.5 text-base text-slate-600 leading-relaxed font-normal">
            Reflecting genuine patient feedback on our bedside manner, clinical environment, and diagnostic workflow clarity.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {TESTIMONIALS_CONFIG.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-xl flex flex-col justify-between"
            >
              <div>
                {/* Top Rating & Quote Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <MessageSquareQuote className="w-6 h-6 text-[#0F8B8D]/30" />
                </div>

                {/* Service Tag */}
                <span className="inline-block px-3 py-1 rounded-full bg-[#DDF5F4] text-[10px] font-bold text-[#0F8B8D] uppercase tracking-wider mb-3">
                  {item.service}
                </span>

                {/* Feedback */}
                <p className="text-xs sm:text-sm text-slate-600 italic leading-relaxed">
                  "{item.feedback}"
                </p>
              </div>

              {/* Patient Identifier */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-[#0B1F3A]">
                    {item.name}
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    {item.locationOrContext}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-[#0F8B8D] font-medium">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>{item.dateText}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Honest Patient Disclaimer */}
        <div className="mt-8 text-center text-xs text-slate-400 max-w-xl mx-auto">
          * Feedback entries reflect individual patient experiences. Clinical outcomes and recovery timelines vary based on individual health conditions and diagnostic findings.
        </div>

      </div>
    </section>
  );
};
