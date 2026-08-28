import React, { useState } from 'react';
import {
  Activity,
  Calendar,
  Sparkles,
  CheckCircle,
  HelpCircle,
  Clock,
  Droplets,
  Shield,
  Layers,
  ArrowRight
} from 'lucide-react';
import { ULTRASOUND_SCANS_DETAIL, CLINIC_CONFIG } from '../clinicData';

interface UltrasoundSectionProps {
  onOpenBookingModal: (preselectedService?: string) => void;
}

export const UltrasoundSection: React.FC<UltrasoundSectionProps> = ({
  onOpenBookingModal,
}) => {
  const [selectedScanId, setSelectedScanId] = useState<string>(ULTRASOUND_SCANS_DETAIL[0].id);
  const activeScan = ULTRASOUND_SCANS_DETAIL.find((s) => s.id === selectedScanId) || ULTRASOUND_SCANS_DETAIL[0];

  const ultrasoundHighlights = [
    {
      title: 'Professional Ultrasound Care',
      desc: 'Conducted with precision and clinical diligence under rigorous diagnostic hygiene protocols.',
      icon: <Activity className="w-5 h-5 text-[#0F8B8D]" />,
    },
    {
      title: 'Comfortable Patient Experience',
      desc: 'Gentle transducer application, warm gel application, and private examination suites.',
      icon: <Shield className="w-5 h-5 text-[#0F8B8D]" />,
    },
    {
      title: 'Clear Diagnostic Workflow',
      desc: 'Timely reporting accompanied by an understandable walkthrough of the findings.',
      icon: <Layers className="w-5 h-5 text-[#0F8B8D]" />,
    },
    {
      title: 'Modern Clinical Environment',
      desc: 'Tranquil ambiance designed to reduce patient apprehension and ensure dignified care.',
      icon: <Sparkles className="w-5 h-5 text-[#0F8B8D]" />,
    },
  ];

  return (
    <section id="ultrasound" className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-[#F8FAFC] via-[#F0F8F8]/40 to-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#DDF5F4] text-[#0F8B8D] text-[11px] font-bold uppercase tracking-wider mb-3">
            Core Diagnostic Specialization
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-4xl font-extrabold text-[#0B1F3A] tracking-tight">
            Advanced Ultrasound & Diagnostic Support
          </h2>
          <p className="mt-3.5 text-base text-slate-600 leading-relaxed font-normal">
            Ultrasonography is a safe, non-invasive imaging modality using sound waves without any radiation exposure. At Nagpal Clinic & Ultrasound, we emphasize patient comfort, clear image acquisition, and transparent report discussions.
          </p>
        </div>

        {/* 4 Core Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {ultrasoundHighlights.map((hl, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-10 h-10 rounded-xl bg-[#DDF5F4] flex items-center justify-center mb-3">
                {hl.icon}
              </div>
              <h3 className="text-sm font-bold text-[#0B1F3A] mb-1.5 leading-snug">
                {hl.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {hl.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Interactive Scan Explorer & Preparation Guidance */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden">
          
          <div className="p-6 sm:p-8 bg-[#0B1F3A] text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#DDF5F4]">
                Diagnostic Investigation Guide
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
                Explore Common Ultrasound Scans & Preparation
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
                Proper preparation ensures optimal acoustic clarity and prevents unnecessary scan delays.
              </p>
            </div>
            <button
              type="button"
              id="book-ultrasound-cta-btn"
              onClick={() => onOpenBookingModal(`Ultrasound: ${activeScan.title}`)}
              className="shrink-0 inline-flex items-center gap-2 px-6 py-3 bg-[#0F8B8D] hover:bg-[#0d797b] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-sm transition-colors cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Ultrasound</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
            
            {/* Left Nav: Scan Categories */}
            <div className="lg:col-span-4 p-4 sm:p-6 bg-slate-50/70 space-y-2">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 mb-2">
                Select Scan Type
              </p>
              {ULTRASOUND_SCANS_DETAIL.map((scan) => {
                const isSelected = scan.id === selectedScanId;
                return (
                  <button
                    key={scan.id}
                    type="button"
                    onClick={() => setSelectedScanId(scan.id)}
                    className={`w-full text-left px-4 py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-[#0F8B8D] text-white shadow-sm'
                        : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200/80'
                    }`}
                  >
                    <span>{scan.title}</span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded ${
                        isSelected
                          ? 'bg-white/20 text-white'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {scan.bladderStatus.split(' ')[0]}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Right Panel: Detailed Scan Info & Preparation */}
            <div className="lg:col-span-8 p-6 sm:p-8 space-y-6">
              
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="px-3 py-1 rounded-full bg-[#DDF5F4] text-[#0F8B8D] text-xs font-bold uppercase tracking-wide">
                    {activeScan.bladderStatus}
                  </span>
                  <span className="text-xs text-slate-400">Non-Invasive Soundwave Scan</span>
                </div>
                <h4 className="text-xl sm:text-2xl font-bold text-[#0B1F3A]">
                  {activeScan.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  {activeScan.fullDesc}
                </p>
              </div>

              {/* Preparation Callout Box */}
              <div className="bg-[#F8FAFC] border-l-4 border-[#0F8B8D] rounded-r-2xl p-4 sm:p-5">
                <div className="flex items-start gap-3">
                  <Droplets className="w-5 h-5 text-[#0F8B8D] shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs sm:text-sm font-bold text-[#0B1F3A]">
                      Patient Preparation Required
                    </h5>
                    <p className="text-xs sm:text-sm text-slate-700 mt-1 font-medium leading-relaxed">
                      {activeScan.preparation}
                    </p>
                  </div>
                </div>
              </div>

              {/* Common Indications */}
              <div>
                <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2.5">
                  Common Clinical Reasons for this Scan
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeScan.recommendedFor.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-slate-700">
                      <CheckCircle className="w-4 h-4 text-[#0F8B8D] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Banner */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Clock className="w-4 h-4 text-[#0F8B8D]" />
                  <span>Average procedure time: 15–25 minutes</span>
                </div>
                <button
                  type="button"
                  onClick={() => onOpenBookingModal(`Ultrasound: ${activeScan.title}`)}
                  className="w-full sm:w-auto px-6 py-2.5 bg-[#0B1F3A] hover:bg-[#132d52] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
                >
                  Book this Scan Now
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
