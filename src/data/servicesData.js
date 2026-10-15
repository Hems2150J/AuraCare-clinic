export const servicesData = [
  {
    id: "cardiology",
    title: "Cardiology & Heart Care",
    iconName: "HeartPulse",
    shortDesc: "Comprehensive cardiac imaging, non-invasive diagnostics, coronary artery treatment, and cardiac rehabilitation.",
    longDesc: "AuraCare's Cardiology Department brings together world-renowned heart specialists, 3D echocardiography technology, cardiac MRI suites, and preventative wellness programs.",
    procedures: ["3D Color Doppler Echocardiogram", "24-Hour Holter ECG Monitoring", "Coronary Calcium Scoring", "Cardiac Rehabilitation Program"],
    equipment: ["GE Vivid E95 4D Echocardiograph", "Siemens SOMATOM Cardiac CT", "Marquette 12-Lead ECG Suite"],
    headDoctorId: "doc-1",
    faqs: [
      { q: "How should I prepare for a stress test?", a: "Wear comfortable athletic clothing and shoes. Avoid caffeine and heavy meals 4 hours prior." },
      { q: "Are emergency cardiac consultations available?", a: "Yes, our 24/7 Level-1 Cardiac Triage Unit is always active for chest pain or acute discomfort." }
    ]
  },
  {
    id: "neurology",
    title: "Neurology & Brain Health",
    iconName: "Brain",
    shortDesc: "Advanced stroke management, neuro-imaging, chronic headache relief, and memory disorders assessment.",
    longDesc: "Our Neurological Institute utilizes ultra-high field 3T MRI scanners and digital video EEG monitoring for ultra-precise brain and spinal cord evaluation.",
    procedures: ["High-Resolution 3T Brain MRI", "Digital Video EEG Diagnostics", "Nerve Conduction Velocity (NCV) Test", "Botox Therapy for Chronic Migraines"],
    equipment: ["3T Siemens Magnetom MRI", "Natus Neuroworks Video EEG", "Cadwell EMG System"],
    headDoctorId: "doc-2",
    faqs: [
      { q: "What symptoms warrant a neurological evaluation?", a: "Persistent severe headaches, sudden numbness, memory gaps, tremors, or unsteadiness." }
    ]
  },
  {
    id: "pediatrics",
    title: "Pediatrics & Child Wellness",
    iconName: "Baby",
    shortDesc: "Compassionate healthcare for newborns, toddlers, children, and teenagers with dedicated play areas.",
    longDesc: "Designed with a warm, child-friendly atmosphere, our pediatric clinic provides preventive check-ups, developmental monitoring, and allergy immunotherapies.",
    procedures: ["Childhood Vaccination Schedule", "Growth & Developmental Assessment", "Pediatric Allergy Screening", "Neonatal Health Checkups"],
    equipment: ["Welch Allyn Spot Vision Screener", "Child-Friendly Calibrated Audiometers"],
    headDoctorId: "doc-3",
    faqs: [
      { q: "Can I schedule same-day sick visits for my child?", a: "Yes, we reserve morning and afternoon same-day slots specifically for urgent pediatric illness." }
    ]
  },
  {
    id: "orthopedics",
    title: "Orthopedics & Joint Surgery",
    iconName: "Activity",
    shortDesc: "Minimally invasive arthroscopic surgery, joint replacement, sports injury rehab, and spine health.",
    longDesc: "From computer-guided joint replacements to elite sports trauma management, our orthopedic team restores mobility with minimal recovery time.",
    procedures: ["Computer-Guided Knee Replacement", "Arthroscopic Rotator Cuff Repair", "Spinal Disc Decompression", "Platelet-Rich Plasma (PRP) Injections"],
    equipment: ["Mako Robotic Surgical Arm", "GE OEC Elite C-Arm Fluoroscopy"],
    headDoctorId: "doc-4",
    faqs: [
      { q: "How long is recovery after arthroscopic surgery?", a: "Most patients resume light daily activities within 5 to 7 days, supported by our in-house physical therapy team." }
    ]
  },
  {
    id: "dermatology",
    title: "Dermatology & Skin Science",
    iconName: "Sparkles",
    shortDesc: "Comprehensive dermatological care, skin cancer screening, psoriasis biologics, and laser skin care.",
    longDesc: "Our skin science laboratory treats complex medical dermatological conditions alongside aesthetic skin restoration with clinical precision.",
    procedures: ["Digital Dermoscopy Skin Screening", "Mohs Micrographic Cancer Surgery", "Excimer Laser Psoriasis Therapy", "Targeted Acne & Scar Revision"],
    equipment: ["FotoFinder Digital Dermoscope", "Lumenis Stellar M22 Laser System"],
    headDoctorId: "doc-5",
    faqs: [
      { q: "How often should I have a full-body skin check?", a: "We recommend an annual mole mapping & skin check for all adults, or every 6 months if high risk." }
    ]
  },
  {
    id: "oncology",
    title: "Oncology & Precision Therapy",
    iconName: "ShieldAlert",
    shortDesc: "Targeted immunotherapies, precision genomic tumor mapping, and supportive oncology care suites.",
    longDesc: "Providing hopeful, science-backed cancer therapies in comforting private suites with multidisciplinary tumor board oversight.",
    procedures: ["Targeted Immunotherapy Infusions", "Comprehensive Tumor Biomarker Profiling", "Outpatient Infusion Suite Care", "Palliative Supportive Medicine"],
    equipment: ["Illumina NextSeq Genomic Sequencer", "Baxter Infusion Management Suite"],
    headDoctorId: "doc-6",
    faqs: [
      { q: "What is precision genomic tumor profiling?", a: "It analyzes the genetic mutations of tumor tissue to select medications that specifically target cancer cells while sparing healthy tissue." }
    ]
  }
];
