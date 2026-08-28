import React from 'react';
import {
  GraduationCap,
  Clock,
  Award,
  CheckCircle,
  ShieldCheck,
  Stethoscope,
  Calendar,
  Activity,
  UserCheck
} from 'lucide-react';
import { DOCTORS_LIST, CLINIC_CONFIG } from '../clinicData';

interface DoctorSectionProps {
  onOpenBookingModal: (serviceName?: string) => void;
}

export const DoctorSection: React.FC<DoctorSectionProps> = ({ onOpenBookingModal }) => {
  return (
    <section id="doctor" className="py-16 sm:py-20 lg:py-24 bg-white border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#DDF5F4] text-[#0F8B8D] text-[11px] font-bold uppercase tracking-wider mb-3">
            <UserCheck className="w-3.5 h-3.5" />
            <span>Doctors & Clinical Leadership</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1F3A] tracking-tight">
            Meet Our Senior Medical Consultants
          </h2>
          <p className="mt-3.5 text-base text-slate-600 leading-relaxed font-normal">
            Experienced clinicians providing attentive patient consultations, surgical evaluations, and specialized diagnostic ultrasound at Nagpal Clinic & Ultrasound.
          </p>
        </div>

        {/* 2-Column Doctor Profiles Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {DOCTORS_LIST.map((doc, idx) => (
            <div
              key={idx}
              className="bg-[#F8FAFC] rounded-3xl border border-slate-200/80 shadow-lg p-6 sm:p-8 flex flex-col justify-between"
            >
              <div className="space-y-5">
                {/* Doctor Name & Header */}
                <div className="flex items-start justify-between border-b border-slate-200/60 pb-4">
                  <div>
                    <span className="px-3 py-1 rounded-full bg-[#0F8B8D]/10 text-[#0F8B8D] text-xs font-bold uppercase tracking-wider">
                      {doc.role}
                    </span>
                    <h3 className="text-2xl font-extrabold text-[#0B1F3A] mt-2">
                      {doc.name}
                    </h3>
                    <p className="text-sm font-semibold text-[#0F8B8D]">
                      {doc.designation}
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center border border-slate-200 shadow-xs shrink-0">
                    {idx === 0 ? (
                      <Stethoscope className="w-6 h-6 text-[#0F8B8D]" />
                    ) : (
                      <Activity className="w-6 h-6 text-[#0F8B8D]" />
                    )}
                  </div>
                </div>

                {/* About Doctor */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {doc.about}
                </p>

                {/* Qualifications & Specializations */}
                <div className="space-y-3.5 pt-1">
                  <div className="bg-white p-4 rounded-2xl border border-slate-200/80">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#0B1F3A] mb-2">
                      <GraduationCap className="w-4 h-4 text-[#0F8B8D]" />
                      <span>Qualifications & Expertise</span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-slate-600">
                      {doc.qualifications.map((q, qIdx) => (
                        <li key={qIdx} className="flex items-start gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#0F8B8D] mt-1.5 shrink-0" />
                          <span>{q}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-white p-4 rounded-2xl border border-slate-200/80">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#0B1F3A] mb-2">
                      <ShieldCheck className="w-4 h-4 text-[#0F8B8D]" />
                      <span>Key Clinical Focus</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {doc.specializations.map((spec, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2.5 py-1 bg-slate-50 text-slate-700 text-[11px] font-medium rounded-lg border border-slate-200"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

              </div>

              {/* Consultation Timings and CTA */}
              <div className="mt-6 pt-4 border-t border-slate-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#0B1F3A]">
                    <Clock className="w-3.5 h-3.5 text-[#0F8B8D]" />
                    <span>Consultation Hours</span>
                  </div>
                  <p className="text-xs text-slate-600">
                    {doc.consultationDays} • {doc.consultationHours}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => onOpenBookingModal(doc.role)}
                  className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-[#0B1F3A] hover:bg-[#132d52] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book Slot</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
