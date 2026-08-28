export interface ClinicOpeningHours {
  days: string;
  hours: string;
  note?: string;
}

export interface ClinicInfo {
  name: string;
  shortName: string;
  tagline: string;
  announcementText: string;
  subheadline: string;
  phone: string;
  phoneDisplay: string;
  mobilePhone?: string;
  mobileDisplay?: string;
  alternatePhone?: string;
  whatsappNumber: string;
  whatsappDisplay: string;
  whatsappDefaultMessage: string;
  email: string;
  address: {
    street: string;
    locality: string;
    city: string;
    state: string;
    pincode: string;
    landmark: string;
    fullFormatted: string;
  };
  googleMapsEmbedUrl: string;
  googleMapsDirectionsUrl: string;
  openingHours: ClinicOpeningHours[];
  ultrasoundTimings: string;
  emergencyNote: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  category: 'Ultrasound' | 'Consultation' | 'Preventive' | 'Women' | 'Family';
  badge?: string;
  shortDesc: string;
  fullDesc: string;
  icon: string;
  keyPoints: string[];
  preparationGuide?: string[];
  estimatedDuration: string;
}

export interface UltrasoundScanType {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  preparation: string;
  bladderStatus: 'Full Bladder Required' | 'Empty Bladder' | 'No Special Prep' | 'Fasting 6-8 Hours';
  recommendedFor: string[];
}

export interface DoctorProfile {
  name: string;
  role: string;
  designation: string;
  qualifications: string[];
  experienceYearsNote: string;
  specializations: string[];
  about: string;
  consultationDays: string;
  consultationHours: string;
  regNumberNote: string;
  image: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  locationOrContext: string;
  service: string;
  feedback: string;
  dateText: string;
  rating: number;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'General' | 'Ultrasound' | 'Appointments' | 'Reports';
}

export interface ClinicImageItem {
  id: string;
  src: string;
  alt: string;
  title: string;
  category: 'Exterior' | 'Interior' | 'Reception' | 'Waiting Area' | 'Facility';
  description: string;
}

export interface AppointmentFormState {
  fullName: string;
  phone: string;
  email: string;
  serviceCategory: string;
  preferredDate: string;
  preferredTimeSlot: string;
  isFirstVisit: boolean;
  notes: string;
}
