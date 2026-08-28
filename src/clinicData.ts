import { ClinicInfo, ServiceItem, UltrasoundScanType, DoctorProfile, TestimonialItem, FaqItem, ClinicImageItem } from './types';

// Authentic Original Uploaded Clinic Photographs
import imgClinicHeroEntrance from './assets/images/clinic_photo_1_hero_entrance.jpg';
import imgClinicStreetExterior from './assets/images/clinic_photo_2_maroon_sign.jpg';
import imgClinicReceptionInterior from './assets/images/clinic_photo_3_reception.jpg';
import imgClinicWaitingArea from './assets/images/clinic_photo_4_waiting_bench.jpg';
import imgClinicFacadeBuilding from './assets/images/clinic_photo_5_front_side.jpg';

export const CLINIC_IMAGES: ClinicImageItem[] = [
  {
    id: 'img-1',
    src: imgClinicHeroEntrance,
    alt: "Nagpal Clinic & Ultrasound exterior entrance",
    title: "Clinic Front Entrance & Signboard",
    category: "Exterior",
    description: "Main ground floor entrance with official medical board, consulting hours, and direct clinic access in Pocket G, Sarita Vihar."
  },
  {
    id: 'img-2',
    src: imgClinicStreetExterior,
    alt: "Nagpal Clinic & Ultrasound exterior view",
    title: "Street View & Location Identifier",
    category: "Exterior",
    description: "Prominent building signage visible from the main approach road to help patients easily locate the facility."
  },
  {
    id: 'img-3',
    src: imgClinicReceptionInterior,
    alt: "Nagpal Clinic reception area",
    title: "Reception & Registration Desk",
    category: "Reception",
    description: "Serene welcoming reception counter with wooden accents, illuminated clinic identity, and registration desk."
  },
  {
    id: 'img-4',
    src: imgClinicWaitingArea,
    alt: "Nagpal Clinic waiting area",
    title: "Comfortable Patient Waiting Lounge",
    category: "Waiting Area",
    description: "Spotlessly clean, well-lit, and comfortable seating area ensuring a peaceful wait before doctor consultations and ultrasound scans."
  },
  {
    id: 'img-5',
    src: imgClinicFacadeBuilding,
    alt: "Nagpal Clinic & Ultrasound building entrance",
    title: "Building Facade & Entry Way",
    category: "Exterior",
    description: "Full architectural view of the clinic premises featuring granite tile facade, balcony terrace greenery, and convenient access."
  }
];

export const CLINIC_CONFIG: ClinicInfo = {
  name: "Nagpal Clinic & Ultrasound",
  shortName: "Nagpal Clinic",
  tagline: "Trusted Care • Accurate Diagnosis • Better Health",
  announcementText: "Trusted Healthcare • Advanced Ultrasound • Compassionate Care",
  subheadline: "Nagpal Clinic & Ultrasound provides compassionate clinical care and reliable diagnostic ultrasound services in a comfortable and professional environment.",
  phone: "01129941880",
  phoneDisplay: "011-29941880",
  mobilePhone: "9911121054",
  mobileDisplay: "+91 99111 21054",
  alternatePhone: "9911121054",
  whatsappNumber: "9911121054",
  whatsappDisplay: "+91 99111 21054",
  whatsappDefaultMessage: "Hello Nagpal Clinic & Ultrasound, I would like to enquire about / book an appointment.",
  email: "info@nagpalclinic.com",
  address: {
    street: "Pocket G",
    locality: "Sarita Vihar",
    city: "New Delhi",
    state: "Delhi",
    pincode: "110076",
    landmark: "G-6, Pocket G, Sarita Vihar",
    fullFormatted: "Pocket G, Sarita Vihar, New Delhi, Delhi 110076",
  },
  googleMapsEmbedUrl: "https://maps.google.com/maps?q=Nagpal+Clinic+%26+Ultrasound,+Pocket+G,+Sarita+Vihar,+New+Delhi,+Delhi+110076&t=&z=16&ie=UTF8&iwloc=&output=embed",
  googleMapsDirectionsUrl: "https://www.google.com/maps/place/Nagpal+Clinic+%26+Ultrasound/@28.5310153,77.2916774,17z/data=!3m1!4b1!4m6!3m5!1s0x390ce6a915555555:0xd506f8a32d577029!8m2!3d28.5310153!4d77.2942523!16s%2Fg%2F1tdbct29?authuser=0&entry=ttu&g_ep=EgoyMDI2MDgyNS4wIKXMDSoASAFQAw%3D%3D",
  openingHours: [
    { days: "Monday – Saturday", hours: "09:00 AM – 01:30 PM & 05:00 PM – 08:30 PM", note: "Morning & Evening OPD" },
    { days: "Sunday", hours: "Closed", note: "Weekly Off (Closed on Sundays)" },
  ],
  ultrasoundTimings: "Monday to Saturday: 09:30 AM – 01:00 PM & 05:30 PM – 08:00 PM (Closed on Sundays)",
  emergencyNote: "For urgent inquiries during clinic hours, please call our direct helpline.",
};

export const TRUST_BADGES = [
  { id: 'exp', text: 'Experienced Care', icon: 'Award' },
  { id: 'us', text: 'Advanced Ultrasound', icon: 'Activity' },
  { id: 'pat', text: 'Patient-Centred Approach', icon: 'HeartHandshake' },
];

export const TRUST_STATS = [
  {
    id: '1',
    title: 'Professional Care',
    description: 'Thorough clinical evaluation focused on personalized diagnosis and patient wellbeing.',
    highlight: 'Dedicated Clinical Focus'
  },
  {
    id: '2',
    title: 'Modern Diagnostic Support',
    description: 'High-clarity ultrasound imaging support adhering to safe medical scanning protocols.',
    highlight: 'Clear Imaging Protocols'
  },
  {
    id: '3',
    title: 'Patient-Focused Service',
    description: 'Unhurried consultations, gentle bedside care, and clear explanations at every step.',
    highlight: 'Compassionate Environment'
  },
  {
    id: '4',
    title: 'Comfortable Environment',
    description: 'Hygienic, private, and relaxed clinical setting designed for your peace of mind.',
    highlight: 'Clean & Welcoming Space'
  },
];

export const ABOUT_FEATURES = [
  {
    title: "Patient-First Approach",
    description: "Every individual is treated with attentiveness, empathy, and respect without rushed appointments.",
  },
  {
    title: "Professional Clinical Care",
    description: "Systematic medical assessment backed by careful review of patient medical history and symptoms.",
  },
  {
    title: "Reliable Diagnostic Support",
    description: "High-resolution ultrasound imaging to assist in timely, accurate clinical decision-making.",
  },
  {
    title: "Comfortable Environment",
    description: "A calming, clean, sanitized space where patients of all age groups feel secure and respected.",
  },
  {
    title: "Clear Communication",
    description: "Transparent explanations of findings, diagnostic reports, and advised next steps in simple terms.",
  },
];

export const SERVICES_LIST: ServiceItem[] = [
  {
    id: 'ultrasound',
    title: 'Ultrasound & Diagnostic Imaging',
    category: 'Ultrasound',
    badge: 'Core Diagnostic Service',
    shortDesc: 'Comprehensive sonography scans including abdominal, pelvic, obstetric, thyroid, and small parts ultrasound.',
    fullDesc: 'Our diagnostic ultrasound service provides detailed anatomical imaging in a calm, dignified atmosphere. Using non-invasive soundwave technology with zero radiation, we ensure gentle examination and rapid report generation.',
    icon: 'Radio',
    keyPoints: [
      'Non-invasive, zero-radiation diagnostic scanning',
      'Abdominal, pelvic, obstetric, and small-parts examinations',
      'Timely report preparation with high-resolution image prints',
      'Comfortable scan suite with full patient privacy',
    ],
    preparationGuide: [
      'Abdominal Ultrasound: Overnight or 6-8 hours fasting (water allowed as advised).',
      'Pelvic / Early Pregnancy: Full urinary bladder required (drink 4-5 glasses of water 1 hour prior).',
      'Thyroid / Neck / Scrotal: No specific dietary restrictions required.',
    ],
    estimatedDuration: '15 – 30 mins',
  },
  {
    id: 'general-consultation',
    title: 'General Consultation',
    category: 'Consultation',
    badge: 'Primary Care',
    shortDesc: 'Primary healthcare assessment for acute illnesses, chronic conditions, and general health evaluations.',
    fullDesc: 'Comprehensive clinical consultations catering to day-to-day medical needs, acute fevers, respiratory issues, metabolic concerns, and systematic physical assessments.',
    icon: 'Stethoscope',
    keyPoints: [
      'Detailed clinical history evaluation & examination',
      'Diagnosis & tailored medical management plan',
      'Coordination with diagnostic findings',
      'Clear dietary and lifestyle recommendations',
    ],
    preparationGuide: [
      'Please bring any previous medical prescriptions and recent lab reports.',
      'Make a quick list of current medications and dosage.',
    ],
    estimatedDuration: '15 – 25 mins',
  },
  {
    id: 'preventive-health',
    title: 'Preventive Healthcare',
    category: 'Preventive',
    badge: 'Wellness & Prevention',
    shortDesc: 'Periodic wellness screenings, blood pressure monitoring, and lifestyle health risk assessments.',
    fullDesc: 'Proactive medical evaluations aimed at early detection of asymptomatic conditions, metabolic health monitoring, and long-term vitality management.',
    icon: 'ShieldCheck',
    keyPoints: [
      'Baseline health assessment & vital screening',
      'Early detection guidance for lifestyle disorders',
      'Customized health monitoring milestones',
      'Preventive counselling for healthy living',
    ],
    preparationGuide: [
      'Morning slots recommended for fasting blood work if coordinated with checkup.',
    ],
    estimatedDuration: '20 – 30 mins',
  },
  {
    id: 'womens-health',
    title: 'Women’s Health Support',
    category: 'Women',
    badge: 'Specialized Care',
    shortDesc: 'Dedicated clinical care and diagnostic ultrasound support for women at various life stages.',
    fullDesc: 'Gentle, private, and respectful care addressing routine gynecological queries, antenatal wellness scans, pelvic sonography, and general health monitoring for women.',
    icon: 'HeartPulse',
    keyPoints: [
      'Respectful and confidential clinical environment',
      'Routine pelvic and antenatal scan evaluations',
      'General nutritional & wellness counselling',
      'Dedicated private ultrasound room',
    ],
    preparationGuide: [
      'For pelvic scans, ensure full bladder preparation unless advised otherwise.',
      'Carry prior maternity or ultrasound records if applicable.',
    ],
    estimatedDuration: '20 – 30 mins',
  },
  {
    id: 'family-healthcare',
    title: 'Family Healthcare',
    category: 'Family',
    badge: 'All Age Groups',
    shortDesc: 'Holistic clinical attention for adolescents, adults, and elderly family members under one roof.',
    fullDesc: 'Continuity of medical care for the entire household, addressing seasonal illnesses, ongoing medication reviews, and geriatric health support in a welcoming community clinic setting.',
    icon: 'Users',
    keyPoints: [
      'Compassionate care tailored across age demographics',
      'Routine health tracking for senior family members',
      'Seamless record keeping and follow-up guidance',
      'Patient-friendly guidance for family caregivers',
    ],
    preparationGuide: [
      'Bring all existing family health summaries or prescription cards.',
    ],
    estimatedDuration: '20 – 35 mins',
  },
  {
    id: 'followup-review',
    title: 'Follow-up & Consultation',
    category: 'Consultation',
    badge: 'Continuous Care',
    shortDesc: 'Review of diagnostic ultrasound findings, recovery progress checks, and prescription adjustments.',
    fullDesc: 'Structured review consultations to discuss investigation reports, evaluate symptom improvement, clarify patient questions, and refine long-term health management strategies.',
    icon: 'FileCheck',
    keyPoints: [
      'Detailed walkthrough of ultrasound & lab findings',
      'Evaluation of response to initial therapy',
      'Open discussion for patient queries and next steps',
      'Documentation of recovery progress',
    ],
    preparationGuide: [
      'Bring your issued ultrasound report and diagnostic film/sheets.',
    ],
    estimatedDuration: '15 – 20 mins',
  },
];

export const ULTRASOUND_SCANS_DETAIL: UltrasoundScanType[] = [
  {
    id: 'us-abdomen',
    title: 'Whole Abdomen Ultrasound',
    shortDesc: 'Evaluation of liver, gallbladder, pancreas, spleen, kidneys, and major abdominal vessels.',
    fullDesc: 'Non-invasive acoustic imaging providing clear views of solid abdominal organs to investigate abdominal pain, digestive discomfort, fatty liver, stones, or inflammation.',
    preparation: 'Fasting for 6 to 8 hours prior to scan. Normal plain water is permitted unless contraindicated.',
    bladderStatus: 'Fasting 6-8 Hours',
    recommendedFor: ['Abdominal pain or discomfort', 'Liver & Gallbladder evaluation', 'Kidney stone screening', 'Routine digestive check'],
  },
  {
    id: 'us-pelvis',
    title: 'Pelvic & KUB Ultrasound',
    shortDesc: 'Assessment of the urinary bladder, kidneys, ureters, uterus, and ovaries.',
    fullDesc: 'Detailed sonography of the lower urinary tract and reproductive organs with patient comfort and privacy prioritized throughout.',
    preparation: 'Drink 4-5 glasses of water 1 hour before the exam and avoid urination until the scan is completed.',
    bladderStatus: 'Full Bladder Required',
    recommendedFor: ['Urinary tract symptoms', 'Pelvic pain & menstrual tracking', 'Bladder & prostate check', 'Renal health evaluation'],
  },
  {
    id: 'us-obstetric',
    title: 'Obstetric / Antenatal Ultrasound',
    shortDesc: 'Routine pregnancy monitoring scans to assess fetal growth, position, and maternal wellbeing.',
    fullDesc: 'Careful sonographic evaluation during various stages of pregnancy strictly adhering to diagnostic healthcare standards in a serene clinical setting.',
    preparation: 'Drink 2-3 glasses of water 30-45 minutes before the appointment for early pregnancy scans.',
    bladderStatus: 'Full Bladder Required',
    recommendedFor: ['Routine fetal wellbeing check', 'Growth and developmental monitoring', 'Amniotic fluid & placental assessment'],
  },
  {
    id: 'us-smallparts',
    title: 'Thyroid, Neck & Small Parts',
    shortDesc: 'High-frequency superficial imaging of the thyroid gland, salivary glands, and soft tissues.',
    fullDesc: 'High-resolution imaging to evaluate neck swellings, thyroid nodules, lymph nodes, or superficial soft tissue concerns.',
    preparation: 'No dietary restrictions or bladder preparation required. Wear comfortable open-collar clothing.',
    bladderStatus: 'No Special Prep',
    recommendedFor: ['Thyroid gland enlargement', 'Neck swelling or palpable lump', 'Soft tissue evaluation'],
  },
  {
    id: 'us-doppler',
    title: 'Color Doppler Diagnostic Study',
    shortDesc: 'Acoustic evaluation of blood flow velocity and vascular patency in peripheral vessels.',
    fullDesc: 'Specialized Doppler ultrasound assessing circulatory flow in arterial and venous structures with zero ionizing radiation.',
    preparation: 'Generally no fasting required for peripheral limb dopplers. Specific instructions given upon booking.',
    bladderStatus: 'No Special Prep',
    recommendedFor: ['Vascular flow assessment', 'Limb swelling evaluation', 'Circulatory diagnostics'],
  },
];

export const WHY_CHOOSE_ITEMS = [
  {
    id: '1',
    title: 'Patient-Centred Care',
    description: 'We listen carefully to your concerns, respect your time, and provide compassionate, unhurried care at every visit.',
    icon: 'Heart',
  },
  {
    id: '2',
    title: 'Professional Approach',
    description: 'Systematic clinical evaluations and ethical medical practices aligned with trusted diagnostic standards.',
    icon: 'Shield',
  },
  {
    id: '3',
    title: 'Diagnostic Support',
    description: 'Modern high-resolution ultrasound imaging to support accurate clinical assessments and timely treatment decisions.',
    icon: 'Activity',
  },
  {
    id: '4',
    title: 'Comfortable Experience',
    description: 'A clean, tranquil, private clinic environment designed to keep you relaxed and reassured during examinations.',
    icon: 'Smile',
  },
  {
    id: '5',
    title: 'Clear Communication',
    description: 'We explain diagnoses, scan findings, and advised next steps in simple, transparent, and understandable language.',
    icon: 'MessageSquare',
  },
  {
    id: '6',
    title: 'Convenient Appointment Process',
    description: 'Easy booking through phone, WhatsApp, or online enquiry to minimize waiting times and maximize convenience.',
    icon: 'CalendarCheck',
  },
];

export const HOW_IT_WORKS_STEPS = [
  {
    step: '01',
    title: 'Book Your Visit',
    subtitle: 'Quick & Convenient',
    description: 'Schedule your consultation or ultrasound scan online, via WhatsApp, or over a quick phone call at your preferred time slot.',
    details: ['Flexible morning & evening slots', 'Preparation instructions shared in advance', 'Instant WhatsApp / SMS confirmation'],
  },
  {
    step: '02',
    title: 'Consultation / Ultrasound',
    subtitle: 'Comfortable & Attentive',
    description: 'Arrive at our hygienic clinic for an unhurried clinical examination or gentle diagnostic ultrasound in a private room.',
    details: ['Safe, non-invasive scan procedure', 'Unhurried doctor consultation', 'Strict hygiene and sanitized equipment'],
  },
  {
    step: '03',
    title: 'Clear Next Steps',
    subtitle: 'Transparent Discussion',
    description: 'Receive your detailed diagnostic report along with a transparent discussion of findings and clear, actionable medical advice.',
    details: ['Clear explanation of reports', 'Prescriptions and lifestyle guidance', 'Follow-up recommendations when needed'],
  },
];

export const DOCTOR_PROFILE_CONFIG: DoctorProfile = {
  name: "Dr. Vipin Nagpal & Dr. Kanika Nagpal",
  role: "Senior Consultant Surgeon & Consultant Radiologist",
  designation: "M.B.B.S., M.S. | M.B.B.S., M.D.",
  qualifications: [
    "Dr. Vipin Nagpal: M.B.B.S., M.S. (Gen. & Laparoscopic Surgeon)",
    "Dr. Kanika Nagpal: M.B.B.S., M.D. (Radiologist & Sonologist)",
    "Comprehensive General Surgery, Laparoscopy & Advanced Diagnostic Ultrasound",
  ],
  experienceYearsNote: "Trusted Clinical & Diagnostic Practice in Sarita Vihar, New Delhi",
  specializations: [
    "General & Laparoscopic Surgery Consultation",
    "Diagnostic Ultrasound & Color Doppler",
    "Preventive Health Check-Up & ECG",
    "Pathology & Laboratory Diagnostic Coordination",
  ],
  about: "At Nagpal Clinic & Ultrasound, our clinical practice is grounded in medical ethics, clinical experience, and patient-centred diagnosis. Located conveniently in Pocket G, Sarita Vihar, our doctors provide dedicated clinical care, precise ultrasound examinations, and personalized treatment guidance in a comfortable clinical setting.",
  consultationDays: "Monday to Saturday (Morning & Evening OPD — Closed on Sundays)",
  consultationHours: "09:00 AM – 01:30 PM & 05:00 PM – 08:30 PM",
  regNumberNote: "Verified Medical Council Registration • Delhi Medical Council",
  image: imgClinicHeroEntrance,
};

export const DOCTORS_LIST: DoctorProfile[] = [
  {
    name: "Dr. Vipin Nagpal",
    role: "General & Laparoscopic Surgeon",
    designation: "M.B.B.S., M.S.",
    qualifications: [
      "M.B.B.S.",
      "M.S. (General & Laparoscopic Surgery)",
      "Specialized in Surgical Consultations & General Health Check-Ups"
    ],
    experienceYearsNote: "Experienced General & Laparoscopic Surgeon",
    specializations: [
      "General Surgery Consultations",
      "Laparoscopic Evaluations",
      "Preventive Health Assessments",
      "Minor Clinical Procedures"
    ],
    about: "Dr. Vipin Nagpal provides comprehensive clinical evaluations, surgical consultations, and attentive patient-first healthcare at Nagpal Clinic.",
    consultationDays: "Monday – Saturday (Closed Sundays)",
    consultationHours: "09:00 AM – 01:30 PM & 05:00 PM – 08:30 PM",
    regNumberNote: "Registered Medical Practitioner",
    image: imgClinicHeroEntrance,
  },
  {
    name: "Dr. Kanika Nagpal",
    role: "Radiologist & Sonologist",
    designation: "M.B.B.S., M.D.",
    qualifications: [
      "M.B.B.S.",
      "M.D. (Radiodiagnosis)",
      "Specialized in Diagnostic Sonography & Color Doppler"
    ],
    experienceYearsNote: "Senior Radiologist & Sonologist",
    specializations: [
      "Abdominal & Pelvic Ultrasound",
      "Obstetric & Antenatal Scanning",
      "Thyroid & Small Parts Sonography",
      "Vascular Color Doppler Studies"
    ],
    about: "Dr. Kanika Nagpal oversees the diagnostic ultrasound and sonography department, delivering detailed imaging reports with precision, gentle care, and clarity.",
    consultationDays: "Monday – Saturday (Closed Sundays)",
    consultationHours: "09:30 AM – 01:00 PM & 05:30 PM – 08:00 PM",
    regNumberNote: "Registered Radiologist & Sonologist",
    image: imgClinicReceptionInterior,
  }
];

export const TESTIMONIALS_CONFIG: TestimonialItem[] = [
  {
    id: 't1',
    name: "[Patient Feedback Sample A]",
    locationOrContext: "Local Resident",
    service: "Ultrasound & Clinical Consultation",
    feedback: "The clinic atmosphere is very calm and clean. The doctor took time to explain the ultrasound report clearly and answered all my questions without rushing.",
    dateText: "Recent Patient Visit",
    rating: 5,
  },
  {
    id: 't2',
    name: "[Patient Feedback Sample B]",
    locationOrContext: "Family Consultation",
    service: "General Consultation",
    feedback: "Very professional and courteous service. Booking an appointment was effortless, and the staff ensured minimal waiting time. Highly recommended for family healthcare.",
    dateText: "Recent Patient Visit",
    rating: 5,
  },
  {
    id: 't3',
    name: "[Patient Feedback Sample C]",
    locationOrContext: "Diagnostic Patient",
    service: "Abdominal Ultrasound",
    feedback: "Felt very comfortable during the ultrasound examination. The scanning process was gentle and the report was handed over promptly with clear instructions.",
    dateText: "Recent Patient Visit",
    rating: 5,
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'General',
    question: "What services are available at Nagpal Clinic & Ultrasound?",
    answer: "Nagpal Clinic & Ultrasound provides general clinical consultations, comprehensive diagnostic ultrasound (abdominal, pelvic, obstetric, thyroid, and small parts), preventive health screenings, women’s health support, and continuous medical follow-ups."
  },
  {
    id: 'faq-2',
    category: 'Appointments',
    question: "How can I book an appointment?",
    answer: "You can easily book an appointment by clicking the 'Book Appointment' button on this website, sending a message directly on WhatsApp, or calling our clinic phone numbers during working hours. Walk-in patients are also attended based on slot availability."
  },
  {
    id: 'faq-3',
    category: 'Ultrasound',
    question: "Do I need an appointment for an ultrasound scan?",
    answer: "While walk-ins are accepted whenever possible, we strongly recommend scheduling an appointment in advance. This ensures adequate time for scan preparation (such as fasting or bladder filling) and minimizes your waiting time."
  },
  {
    id: 'faq-4',
    category: 'Ultrasound',
    question: "What preparation is needed before an ultrasound scan?",
    answer: "Preparation depends on the scan type: For Abdominal Ultrasound, fasting of 6-8 hours is required. For Pelvic and early pregnancy scans, a full urinary bladder is needed (drink 4-5 glasses of water 1 hour prior and avoid urination). Neck, thyroid, and routine consultations require no special prep."
  },
  {
    id: 'faq-5',
    category: 'Reports',
    question: "How quickly are ultrasound reports provided?",
    answer: "Most routine ultrasound reports along with printed high-resolution diagnostic images are prepared and handed over shortly after the scan is completed, accompanied by a brief explanation from the clinician."
  },
  {
    id: 'faq-6',
    category: 'General',
    question: "What should I bring for my visit?",
    answer: "Please bring any previous medical records, past ultrasound reports, recent blood tests, current medication lists, and a valid photo ID. If referred by another physician, please bring the referral slip."
  },
  {
    id: 'faq-7',
    category: 'Appointments',
    question: "How can I contact the clinic for urgent queries or directions?",
    answer: "You can call us directly at our phone helpline, message our WhatsApp support desk, or use the 'Get Directions' link in the contact section to navigate via Google Maps."
  },
];
