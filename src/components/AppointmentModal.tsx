import React, { useState, useEffect } from 'react';
import { X, Calendar, MessageSquare, Phone, CheckCircle2, Clock, ShieldCheck } from 'lucide-react';
import { CLINIC_CONFIG, SERVICES_LIST } from '../clinicData';
import { AppointmentFormState } from '../types';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  preselectedService,
}) => {
  const [formData, setFormData] = useState<AppointmentFormState>({
    fullName: '',
    phone: '',
    email: '',
    serviceCategory: preselectedService || SERVICES_LIST[0].title,
    preferredDate: '',
    preferredTimeSlot: 'Morning (09:30 AM – 01:00 PM)',
    isFirstVisit: true,
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (preselectedService) {
      setFormData((prev) => ({ ...prev, serviceCategory: preselectedService }));
    }
  }, [preselectedService]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.classList.add('modal-open');
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.classList.remove('modal-open');
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 500);
  };

  const handleWhatsAppSend = () => {
    const text = `Hello Nagpal Clinic & Ultrasound, I would like to book an appointment.\n*Patient Name:* ${formData.fullName || '[Name]'}\n*Phone:* ${formData.phone || '[Phone]'}\n*Service:* ${formData.serviceCategory}\n*Preferred Date:* ${formData.preferredDate || 'Earliest available'}\n*Preferred Slot:* ${formData.preferredTimeSlot}\n*Notes:* ${formData.notes || 'None'}`;
    const url = `https://wa.me/${CLINIC_CONFIG.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#0B1F3A]/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-slate-100 overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="bg-[#0B1F3A] text-white px-6 sm:px-8 py-5 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#0F8B8D]" />
              <span className="text-[10px] uppercase tracking-widest text-[#DDF5F4] font-bold">Nagpal Clinic & Ultrasound</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white mt-0.5">
              Book Your Appointment
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8">
          {submitted ? (
            <div className="py-6 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-[#0B1F3A]">
                Appointment Request Submitted
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
                Thank you, <strong>{formData.fullName}</strong>. Your request for <strong>{formData.serviceCategory}</strong> has been logged. Our reception desk will call you on <strong>{formData.phone}</strong> to confirm your slot time.
              </p>

              <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={handleWhatsAppSend}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer shadow-xs"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Confirmation</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    onClose();
                  }}
                  className="w-full sm:w-auto px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-[#0B1F3A] mb-1">
                    Patient Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-[#0F8B8D] focus:ring-1 focus:ring-[#0F8B8D] bg-[#F8FAFC]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0B1F3A] mb-1">
                    Contact Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="Phone number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-[#0F8B8D] focus:ring-1 focus:ring-[#0F8B8D] bg-[#F8FAFC]"
                  />
                </div>
              </div>

              {/* Service Selection */}
              <div>
                <label className="block text-xs font-bold text-[#0B1F3A] mb-1">
                  Selected Service / Scan *
                </label>
                <select
                  value={formData.serviceCategory}
                  onChange={(e) => setFormData({ ...formData, serviceCategory: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-[#0F8B8D] focus:ring-1 focus:ring-[#0F8B8D] bg-[#F8FAFC]"
                >
                  <optgroup label="Ultrasound & Diagnostic Scans">
                    <option value="Ultrasound & Diagnostic Imaging">General Ultrasound / Sonography</option>
                    <option value="Ultrasound: Whole Abdomen Ultrasound">Whole Abdomen Ultrasound (Fasting)</option>
                    <option value="Ultrasound: Pelvic & KUB Ultrasound">Pelvic & KUB Ultrasound (Full Bladder)</option>
                    <option value="Ultrasound: Obstetric / Antenatal Ultrasound">Obstetric / Antenatal Ultrasound</option>
                    <option value="Ultrasound: Thyroid, Neck & Small Parts">Thyroid & Small Parts Ultrasound</option>
                    <option value="Ultrasound: Color Doppler Diagnostic Study">Color Doppler Vascular Study</option>
                  </optgroup>
                  <optgroup label="Clinical Consultations">
                    <option value="General Consultation">General Clinical Consultation</option>
                    <option value="Preventive Healthcare">Preventive Health Assessment</option>
                    <option value="Women’s Health Support">Women’s Health Support</option>
                    <option value="Family Healthcare">Family Healthcare Consultation</option>
                    <option value="Follow-up & Consultation">Follow-up Review Consultation</option>
                  </optgroup>
                </select>
              </div>

              {/* Date & Time Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-[#0B1F3A] mb-1">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-[#0F8B8D] bg-[#F8FAFC]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0B1F3A] mb-1">
                    Time Window
                  </label>
                  <select
                    value={formData.preferredTimeSlot}
                    onChange={(e) => setFormData({ ...formData, preferredTimeSlot: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-[#0F8B8D] bg-[#F8FAFC]"
                  >
                    <option value="Morning (09:30 AM – 01:00 PM)">Morning (09:30 AM – 01:00 PM)</option>
                    <option value="Evening (05:30 PM – 08:30 PM)">Evening (05:30 PM – 08:30 PM)</option>
                    <option value="Earliest Available">Earliest Available</option>
                  </select>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-bold text-[#0B1F3A] mb-1">
                  Brief Medical Note / Reason for Visit (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. routine checkup, pain in right upper abdomen, routine scan"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-[#0F8B8D] bg-[#F8FAFC]"
                />
              </div>

              {/* Submit Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-2.5">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:flex-1 py-3.5 px-5 bg-[#0F8B8D] hover:bg-[#0d797b] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 shadow-sm"
                >
                  <Calendar className="w-4 h-4" />
                  <span>{isSubmitting ? 'Processing...' : 'Confirm Request'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppSend}
                  className="w-full sm:w-auto py-3.5 px-5 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp</span>
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#0F8B8D]" />
                <span>Confidential patient information. Zero spam policy.</span>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
