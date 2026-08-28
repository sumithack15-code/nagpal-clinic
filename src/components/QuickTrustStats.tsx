import React from 'react';
import { Award, Activity, HeartHandshake, Home } from 'lucide-react';
import { TRUST_STATS } from '../clinicData';

export const QuickTrustStats: React.FC = () => {
  const icons = [
    <Award className="w-5 h-5 text-[#0F8B8D]" />,
    <Activity className="w-5 h-5 text-[#0F8B8D]" />,
    <HeartHandshake className="w-5 h-5 text-[#0F8B8D]" />,
    <Home className="w-5 h-5 text-[#0F8B8D]" />,
  ];

  return (
    <section id="trust-pillars" className="relative z-10 -mt-6 sm:-mt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 sm:p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 divide-y sm:divide-y-0 lg:divide-x divide-slate-100">
          {TRUST_STATS.map((stat, idx) => (
            <div
              key={stat.id}
              className={`flex flex-col space-y-2 ${idx !== 0 ? 'pt-4 sm:pt-0 lg:pl-6' : ''}`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#DDF5F4] flex items-center justify-center shrink-0">
                  {icons[idx]}
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-[#64748B] font-bold">
                    {stat.highlight}
                  </p>
                  <h3 className="text-sm sm:text-base font-bold text-[#0B1F3A] leading-tight">
                    {stat.title}
                  </h3>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed pt-1">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
