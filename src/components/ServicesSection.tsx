import React from 'react';
import {
  Radio,
  Stethoscope,
  ShieldCheck,
  HeartPulse,
  Users,
  FileCheck,
  ArrowRight,
  Clock,
  ChevronRight
} from 'lucide-react';
import { SERVICES_LIST } from '../clinicData';
import { ServiceItem } from '../types';

interface ServicesSectionProps {
  onSelectService: (service: ServiceItem) => void;
  onOpenBookingModal: (serviceId?: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectService,
  onOpenBookingModal,
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Radio':
        return <Radio className="w-6 h-6 text-[#0F8B8D]" />;
      case 'Stethoscope':
        return <Stethoscope className="w-6 h-6 text-[#0F8B8D]" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-[#0F8B8D]" />;
      case 'HeartPulse':
        return <HeartPulse className="w-6 h-6 text-[#0F8B8D]" />;
      case 'Users':
        return <Users className="w-6 h-6 text-[#0F8B8D]" />;
      case 'FileCheck':
        return <FileCheck className="w-6 h-6 text-[#0F8B8D]" />;
      default:
        return <Stethoscope className="w-6 h-6 text-[#0F8B8D]" />;
    }
  };

  return (
    <section id="services" className="py-16 sm:py-20 lg:py-24 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#DDF5F4] text-[#0F8B8D] text-[11px] font-bold uppercase tracking-wider mb-3">
            Clinical & Diagnostic Care
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1F3A] tracking-tight">
            Our Healthcare Services
          </h2>
          <p className="mt-3.5 text-base text-slate-600 leading-relaxed font-normal">
            We provide a balanced blend of everyday clinical consultations and specialized diagnostic ultrasound procedures designed around precision, comfort, and patient education.
          </p>
        </div>

        {/* 6 Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {SERVICES_LIST.map((service) => (
            <div
              key={service.id}
              className="group bg-[#F8FAFC] hover:bg-white rounded-3xl p-6 sm:p-7 border border-slate-100 hover:border-[#0F8B8D]/30 shadow-xs hover:shadow-xl transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                {/* Card Top: Icon & Badge */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-white group-hover:bg-[#DDF5F4] border border-slate-100 flex items-center justify-center transition-colors shadow-xs">
                    {getIcon(service.icon)}
                  </div>
                  {service.badge && (
                    <span className="px-3 py-1 rounded-full bg-white border border-slate-200 text-[10px] uppercase font-bold tracking-wider text-slate-700">
                      {service.badge}
                    </span>
                  )}
                </div>

                {/* Title & Short Description */}
                <h3 className="text-lg font-bold text-[#0B1F3A] group-hover:text-[#0F8B8D] transition-colors leading-snug">
                  {service.title}
                </h3>
                <p className="mt-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {service.shortDesc}
                </p>

                {/* Key Benefits List */}
                <ul className="mt-4 space-y-1.5 pt-3 border-t border-slate-200/70 text-xs text-slate-600">
                  {service.keyPoints.slice(0, 3).map((pt, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0F8B8D] shrink-0" />
                      <span className="line-clamp-1">{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom Card Actions */}
              <div className="mt-6 pt-4 border-t border-slate-200/70 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => onSelectService(service)}
                  className="text-xs font-bold text-[#0F8B8D] hover:text-[#0B1F3A] flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <span>Prep & Details</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={() => onOpenBookingModal(service.title)}
                  className="px-4 py-2 bg-white group-hover:bg-[#0F8B8D] text-slate-700 group-hover:text-white text-xs font-bold rounded-xl border border-slate-200 group-hover:border-[#0F8B8D] transition-all cursor-pointer shadow-xs"
                >
                  Book Slot
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Reassuring Services Footer Note */}
        <div className="mt-12 p-6 rounded-3xl bg-[#DDF5F4]/60 border border-[#0F8B8D]/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-[#0F8B8D] shrink-0 hidden sm:block" />
            <p className="text-xs sm:text-sm text-slate-700">
              <strong className="text-[#0B1F3A] font-bold">Need specific scan guidance?</strong> We provide dedicated ultrasound preparation instructions before your visit to ensure clear diagnostic results.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onOpenBookingModal('Ultrasound & Diagnostic Imaging')}
            className="shrink-0 px-5 py-2.5 bg-[#0F8B8D] hover:bg-[#0d797b] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
          >
            Book Diagnostic Scan
          </button>
        </div>

      </div>
    </section>
  );
};
