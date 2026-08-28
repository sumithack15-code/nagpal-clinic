import React from 'react';
import {
  Heart,
  Shield,
  Activity,
  Smile,
  MessageSquare,
  CalendarCheck
} from 'lucide-react';
import { WHY_CHOOSE_ITEMS } from '../clinicData';

export const WhyChooseUs: React.FC = () => {
  const getBenefitIcon = (iconName: string) => {
    switch (iconName) {
      case 'Heart':
        return <Heart className="w-5 h-5 text-[#0F8B8D]" />;
      case 'Shield':
        return <Shield className="w-5 h-5 text-[#0F8B8D]" />;
      case 'Activity':
        return <Activity className="w-5 h-5 text-[#0F8B8D]" />;
      case 'Smile':
        return <Smile className="w-5 h-5 text-[#0F8B8D]" />;
      case 'MessageSquare':
        return <MessageSquare className="w-5 h-5 text-[#0F8B8D]" />;
      case 'CalendarCheck':
        return <CalendarCheck className="w-5 h-5 text-[#0F8B8D]" />;
      default:
        return <Shield className="w-5 h-5 text-[#0F8B8D]" />;
    }
  };

  return (
    <section id="why-choose" className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#DDF5F4] text-[#0F8B8D] text-[11px] font-bold uppercase tracking-wider mb-3">
            The Nagpal Clinic Standard
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1F3A] tracking-tight">
            Why Patients Choose Nagpal Clinic & Ultrasound
          </h2>
          <p className="mt-3.5 text-base text-slate-600 leading-relaxed font-normal">
            We hold ourselves to high ethical standards in medical consultations and diagnostic ultrasound, prioritizing your wellbeing, privacy, and clarity at every point of care.
          </p>
        </div>

        {/* 6 Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {WHY_CHOOSE_ITEMS.map((item, idx) => (
            <div
              key={item.id}
              className="group relative bg-[#F8FAFC] hover:bg-white rounded-3xl p-6 sm:p-7 border border-slate-100 hover:border-[#0F8B8D]/30 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-white group-hover:bg-[#DDF5F4] border border-slate-100 flex items-center justify-center transition-colors shadow-xs">
                    {getBenefitIcon(item.icon)}
                  </div>
                  <span className="text-xs font-bold text-slate-300 group-hover:text-[#0F8B8D] transition-colors">
                    0{idx + 1}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-[#0B1F3A] group-hover:text-[#0F8B8D] transition-colors leading-snug">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-slate-200/60 flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-wider text-[#0F8B8D] opacity-80 group-hover:opacity-100 transition-opacity">
                <span>Verified Quality Standard</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
