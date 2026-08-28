import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  MessageSquare,
  Mail,
  Clock,
  Navigation,
  Calendar,
  CheckCircle2,
  AlertCircle,
  ExternalLink
} from 'lucide-react';
import { CLINIC_CONFIG, SERVICES_LIST, CLINIC_IMAGES } from '../clinicData';
import { AppointmentFormState } from '../types';

export const ContactSection: React.FC = () => {
  const [viewMode, setViewMode] = useState<'map' | 'photo'>('map');
  const [formData, setFormData] = useState<AppointmentFormState>({
    fullName: '',
    phone: '',
    email: '',
    serviceCategory: SERVICES_LIST[0].title,
    preferredDate: '',
    preferredTimeSlot: 'Morning (09:30 AM – 01:00 PM)',
    isFirstVisit: true,
    notes: '',
  });

  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone) return;
    
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setBookingSuccess(true);
    }, 600);
  };

  const handleWhatsAppDirect = () => {
    const text = `Hello Nagpal Clinic & Ultrasound, I would like to schedule an appointment.\n*Name:* ${formData.fullName || '[Name]'}\n*Phone:* ${formData.phone || '[Phone]'}\n*Service:* ${formData.serviceCategory}\n*Preferred Date:* ${formData.preferredDate || 'Earliest available'}\n*Slot:* ${formData.preferredTimeSlot}\n*Notes:* ${formData.notes || 'None'}`;
    const url = `https://wa.me/${CLINIC_CONFIG.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <section id="contact" className="py-16 sm:py-20 lg:py-24 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#DDF5F4] text-[#0F8B8D] text-[11px] font-bold uppercase tracking-wider mb-3">
            Appointments & Location
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1F3A] tracking-tight">
            Schedule a Visit & Connect With Us
          </h2>
          <p className="mt-3.5 text-base text-slate-600 leading-relaxed font-normal">
            Book an appointment online, connect instantly via WhatsApp, or visit our clinic during operating hours.
          </p>
        </div>

        {/* Main Grid: Contact Cards & Interactive Booking Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Column: Contact Cards, Timings, & Map Preview */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Address & Direction Card */}
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xl space-y-4">
              <div className="flex items-start gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-[#DDF5F4] flex items-center justify-center shrink-0 shadow-xs">
                  <MapPin className="w-5 h-5 text-[#0F8B8D]" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#0B1F3A]">
                    Clinic Address
                  </h3>
                  <p className="text-xs sm:text-sm font-semibold text-slate-800 mt-1 leading-relaxed">
                    {CLINIC_CONFIG.address.fullFormatted}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Pocket G, Sarita Vihar, New Delhi
                  </p>
                </div>
              </div>

              {/* Map & Street Photo Toggle Switch */}
              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] uppercase tracking-wider text-slate-500 font-bold">Location Preview</span>
                <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
                  <button
                    type="button"
                    onClick={() => setViewMode('map')}
                    className={`px-3 py-1 text-[11px] font-bold rounded-lg transition-all cursor-pointer ${
                      viewMode === 'map'
                        ? 'bg-white text-[#0B1F3A] shadow-xs'
                        : 'text-slate-500 hover:text-[#0B1F3A]'
                    }`}
                  >
                    Google Map
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('photo')}
                    className={`px-3 py-1 text-[11px] font-bold rounded-lg transition-all cursor-pointer ${
                      viewMode === 'photo'
                        ? 'bg-white text-[#0B1F3A] shadow-xs'
                        : 'text-slate-500 hover:text-[#0B1F3A]'
                    }`}
                  >
                    Street View Photo
                  </button>
                </div>
              </div>

              {/* Map or Street Photo View Frame */}
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 h-48 bg-slate-100">
                {viewMode === 'map' ? (
                  <iframe
                    title="Nagpal Clinic & Ultrasound Location Map"
                    src={CLINIC_CONFIG.googleMapsEmbedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full"
                  />
                ) : (
                  <div className="relative w-full h-full">
                    <img
                      src={CLINIC_IMAGES[1].src}
                      alt={CLINIC_IMAGES[1].alt}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-2.5 left-3 right-3 text-white text-xs">
                      <p className="font-bold text-white leading-tight">Clinic Street Signboard</p>
                      <p className="text-[10px] text-[#DDF5F4]">G-6, Pocket G, Sarita Vihar</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Get Directions Button */}
              <a
                href={CLINIC_CONFIG.googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                id="get-directions-btn"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 bg-[#0F8B8D] hover:bg-[#0d797b] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                <Navigation className="w-4 h-4 text-white" />
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5 text-white/80" />
              </a>
            </div>

            {/* Direct Channels Card */}
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xl space-y-4">
              <h3 className="text-base font-bold text-[#0B1F3A]">
                Direct Contact Channels
              </h3>

              <div className="space-y-3">
                {/* Phone Call 1: Landline */}
                <a
                  href={`tel:${CLINIC_CONFIG.phone.replace(/\s+/g, '')}`}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center border border-slate-200 shadow-xs">
                      <Phone className="w-4 h-4 text-[#0F8B8D]" />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Clinic Landline</p>
                      <p className="text-sm font-bold text-[#0B1F3A] group-hover:text-[#0F8B8D] transition-colors">
                        {CLINIC_CONFIG.phoneDisplay}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#0F8B8D]">Call</span>
                </a>

                {/* Phone Call 2: Mobile Helpline */}
                <a
                  href={`tel:${(CLINIC_CONFIG.mobilePhone || '9911121054').replace(/\s+/g, '')}`}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center border border-slate-200 shadow-xs">
                      <Phone className="w-4 h-4 text-[#0F8B8D]" />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Mobile Helpline</p>
                      <p className="text-sm font-bold text-[#0B1F3A] group-hover:text-[#0F8B8D] transition-colors">
                        {CLINIC_CONFIG.mobileDisplay || '+91 99111 21054'}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#0F8B8D]">Call</span>
                </a>

                {/* WhatsApp Chat */}
                <a
                  href={`https://wa.me/${CLINIC_CONFIG.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(CLINIC_CONFIG.whatsappDefaultMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="whatsapp-us-card-btn"
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#25D366] text-white flex items-center justify-center shadow-xs">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[10px] text-[#128C7E] font-bold uppercase tracking-wider">Instant WhatsApp Desk</p>
                      <p className="text-sm font-bold text-[#0B1F3A]">
                        {CLINIC_CONFIG.whatsappDisplay}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#128C7E]">Chat Now</span>
                </a>

                {/* Email */}
                <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center border border-slate-200 shrink-0 shadow-xs">
                    <Mail className="w-4 h-4 text-[#0F8B8D]" />
                  </div>
                  <div className="truncate">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Email Desk</p>
                    <p className="text-xs sm:text-sm font-semibold text-[#0B1F3A] truncate">
                      {CLINIC_CONFIG.email}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Clinic Operating Hours */}
            <div className="bg-[#0B1F3A] text-white rounded-3xl p-6 shadow-xl space-y-3.5">
              <div className="flex items-center gap-2 text-sm font-bold text-white">
                <Clock className="w-4 h-4 text-[#0F8B8D]" />
                <span>Operating Timings</span>
              </div>

              <div className="space-y-2.5 text-xs">
                {CLINIC_CONFIG.openingHours.map((sched, i) => {
                  const isClosed = sched.hours.toLowerCase().includes('closed');
                  return (
                    <div key={i} className="flex justify-between items-start border-b border-slate-800 pb-2.5">
                      <div>
                        <span className="font-semibold text-slate-200">{sched.days}</span>
                        {sched.note && (
                          <p className={`text-[10px] ${isClosed ? 'text-rose-300' : 'text-slate-400'}`}>
                            {sched.note}
                          </p>
                        )}
                      </div>
                      {isClosed ? (
                        <span className="px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-bold text-[11px] uppercase tracking-wider border border-rose-500/30">
                          Closed
                        </span>
                      ) : (
                        <span className="text-slate-300 font-medium text-right">{sched.hours}</span>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="pt-2 text-[11px] text-[#DDF5F4] bg-white/5 p-3 rounded-xl border border-white/10">
                <strong className="font-semibold">Ultrasound Timings:</strong> {CLINIC_CONFIG.ultrasoundTimings}
              </div>
            </div>

          </div>

          {/* Right Column: Appointment Booking Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-xl">
              
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
                <div>
                  <h3 className="text-xl font-bold text-[#0B1F3A]">
                    Book an Appointment
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Fill the details below for clinical consultation or diagnostic ultrasound
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#DDF5F4] text-[#0F8B8D] text-[10px] font-bold uppercase tracking-wider">
                  Quick Desk
                </span>
              </div>

              {bookingSuccess ? (
                <div className="py-10 text-center space-y-4 animate-in fade-in duration-300">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <h4 className="text-xl font-bold text-[#0B1F3A]">
                    Appointment Request Received!
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-[#0B1F3A]">{formData.fullName}</strong>. Our front desk team at Nagpal Clinic & Ultrasound will review your requested slot for <strong>{formData.serviceCategory}</strong> and connect with you shortly on <strong>{formData.phone}</strong> to confirm.
                  </p>
                  
                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={handleWhatsAppDirect}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-xs transition-colors cursor-pointer"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>WhatsApp for Instant Priority</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setBookingSuccess(false)}
                      className="w-full sm:w-auto px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
                    >
                      Book Another Slot
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                  
                  {/* Name & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#0B1F3A] mb-1.5">
                        Patient Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. John Doe"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-[#0F8B8D] focus:ring-2 focus:ring-[#0F8B8D]/20 transition-all bg-[#F8FAFC]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#0B1F3A] mb-1.5">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. +91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-[#0F8B8D] focus:ring-2 focus:ring-[#0F8B8D]/20 transition-all bg-[#F8FAFC]"
                      />
                    </div>
                  </div>

                  {/* Service Selection & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#0B1F3A] mb-1.5">
                        Required Service *
                      </label>
                      <select
                        value={formData.serviceCategory}
                        onChange={(e) => setFormData({ ...formData, serviceCategory: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-[#0F8B8D] focus:ring-2 focus:ring-[#0F8B8D]/20 transition-all bg-[#F8FAFC]"
                      >
                        {SERVICES_LIST.map((srv) => (
                          <option key={srv.id} value={srv.title}>
                            {srv.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#0B1F3A] mb-1.5">
                        Email Address (Optional)
                      </label>
                      <input
                        type="email"
                        placeholder="e.g. name@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-[#0F8B8D] focus:ring-2 focus:ring-[#0F8B8D]/20 transition-all bg-[#F8FAFC]"
                      />
                    </div>
                  </div>

                  {/* Preferred Date & Time Slot */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#0B1F3A] mb-1.5">
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        value={formData.preferredDate}
                        onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-[#0F8B8D] focus:ring-2 focus:ring-[#0F8B8D]/20 transition-all bg-[#F8FAFC]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#0B1F3A] mb-1.5">
                        Preferred Time Window
                      </label>
                      <select
                        value={formData.preferredTimeSlot}
                        onChange={(e) => setFormData({ ...formData, preferredTimeSlot: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-[#0F8B8D] focus:ring-2 focus:ring-[#0F8B8D]/20 transition-all bg-[#F8FAFC]"
                      >
                        <option value="Morning (09:30 AM – 01:00 PM)">Morning Slot (09:30 AM – 01:00 PM)</option>
                        <option value="Evening (05:30 PM – 08:30 PM)">Evening Slot (05:30 PM – 08:30 PM)</option>
                        <option value="Flexible / Earliest Available">Flexible / Earliest Available</option>
                      </select>
                    </div>
                  </div>

                  {/* Notes / Symptoms */}
                  <div>
                    <label className="block text-xs font-bold text-[#0B1F3A] mb-1.5">
                      Symptoms / Notes / Referring Doctor (Optional)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Briefly describe your symptoms or specific ultrasound scan requested..."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-[#0F8B8D] focus:ring-2 focus:ring-[#0F8B8D]/20 transition-all bg-[#F8FAFC]"
                    />
                  </div>

                  {/* Buttons: Submit & WhatsApp Direct */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:flex-1 py-3.5 px-6 bg-[#0F8B8D] hover:bg-[#0d797b] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-sm hover:shadow transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>{isSubmitting ? 'Confirming...' : 'Request Appointment'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleWhatsAppDirect}
                      id="whatsapp-direct-submit-btn"
                      className="w-full sm:w-auto py-3.5 px-5 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
                      title="Send directly to WhatsApp"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>WhatsApp Us</span>
                    </button>
                  </div>

                  <p className="text-[11px] text-slate-400 text-center pt-1">
                    * Your appointment request is subject to clinic availability. Our reception will call you back to confirm the exact time slot.
                  </p>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
