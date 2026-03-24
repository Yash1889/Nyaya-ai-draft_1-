export interface HelplineInfo {
  name: string;
  number: string;
  description: string;
  availability: string;
}

export interface SafetyTip {
  title: string;
  description: string;
}

export const helplines: HelplineInfo[] = [
  {
    name: 'National Commission for Women (NCW)',
    number: '011-2341-9191',
    description: 'File complaints related to women\'s issues and get support.',
    availability: 'Monday-Friday, 9 AM - 5:30 PM',
  },
  {
    name: 'All India Women\'s Helpline',
    number: '011-2346-4373',
    description: 'Advice and support for women facing various challenges.',
    availability: '24/7',
  },
  {
    name: 'Police Emergency',
    number: '100',
    description: 'For immediate safety and emergency situations.',
    availability: '24/7',
  },
  {
    name: 'Women in Distress',
    number: '+91-22-2202-1092',
    description: 'Counseling and support for women in crisis (Mumbai-based).',
    availability: 'Daily 10 AM - 6 PM',
  },
  {
    name: 'AASRA Helpline',
    number: '+91-22-2772-0557',
    description: 'Mental health and counseling support.',
    availability: '24/7',
  },
];

export const womenRights = [
  {
    title: 'Protection from Domestic Violence Act, 2005',
    description:
      'Provides protection for women against domestic violence. You can obtain a protection order from court to prevent abuse and seek maintenance.',
  },
  {
    title: 'IPC Section 498A - Cruelty by Husband/Relatives',
    description:
      'Illegal for husband or relatives to subject a woman to cruelty. Cruelty includes physical harm, threats, or behavior causing harm to health and safety.',
  },
  {
    title: 'Dowry Prohibition Act, 1961',
    description:
      'Dowry is illegal in India. You cannot be forced to give or receive dowry. Report violations to police.',
  },
  {
    title: 'Immoral Traffic Prevention Act (ITPA)',
    description:
      'Protects women and girls from exploitation and trafficking. Exploitation is a serious crime.',
  },
  {
    title: 'Sexual Harassment at Workplace Act (POSH)',
    description:
      'Every workplace must have a grievance committee. You can file complaints against sexual harassment.',
  },
  {
    title: 'Maternity Benefit Act, 1961',
    description:
      'Guarantees paid leave before and after childbirth, payment during leave, and job security.',
  },
  {
    title: 'Medical Termination of Pregnancy Act, 1972',
    description:
      'Women have the right to choose to terminate pregnancy under specific circumstances. Your privacy is protected.',
  },
  {
    title: 'Indecent Representation of Women (Prevention) Act, 1986',
    description:
      'Protects against vulgar or demeaning depiction of women in media and advertising.',
  },
];

export const complaintSteps = [
  {
    step: 1,
    title: 'Document the Incident',
    description:
      'Keep a record of dates, times, and details of incidents. Take photographs if there are injuries. Save all threatening messages or evidence.',
  },
  {
    step: 2,
    title: 'Reach Out for Support',
    description:
      'Talk to a trusted family member, friend, or counselor. Contact a women\'s helpline or NGO for guidance and emotional support.',
  },
  {
    step: 3,
    title: 'Seek Medical Help',
    description:
      'If physically injured, visit a hospital immediately. Get a medical certificate documenting injuries. Medical records are important evidence.',
  },
  {
    step: 4,
    title: 'File a Police Complaint (FIR)',
    description:
      'Visit your nearest police station and file a First Information Report (FIR). You can also file online on your state police website. Provide all evidence and documentation.',
  },
  {
    step: 5,
    title: 'Legal Actions',
    description:
      'File a case under IPC Section 498A (Cruelty) or 323 (Voluntarily causing hurt). Apply for a Protection Order under the Domestic Violence Act. Seek maintenance and custody if needed.',
  },
  {
    step: 6,
    title: 'Seek Shelter if Needed',
    description:
      'If unsafe, contact a women\'s shelter or NGO. Temporary housing and food are provided. They can also help with legal proceedings.',
  },
];

export const safetyTips: SafetyTip[] = [
  {
    title: 'Keep Emergency Contacts Handy',
    description: 'Save police (100), women\'s helpline, and trusted contacts in your phone with easy access.',
  },
  {
    title: 'Inform Someone of Your Location',
    description:
      'Share your location with a trusted friend or family when you\'re out. Regular check-ins provide safety assurance.',
  },
  {
    title: 'Trust Your Instincts',
    description:
      'If you feel uncomfortable or unsafe in any situation, remove yourself from that environment immediately.',
  },
  {
    title: 'Travel Safely',
    description:
      'Use registered taxis/cabs, avoid traveling alone late at night, and inform someone about your travel route and expected arrival time.',
  },
  {
    title: 'Online Safety',
    description:
      'Be cautious with personal information online. Don\'t accept requests from strangers. Report suspicious accounts and behavior.',
  },
  {
    title: 'Know Your Rights',
    description:
      'Educate yourself about your legal rights. No one can legally harm you. You have recourse through law enforcement and courts.',
  },
  {
    title: 'Create a Safety Plan',
    description:
      'Identify safe places to go. Keep important documents in a secure location. Have an emergency fund if possible.',
  },
  {
    title: 'Seek Help Early',
    description:
      'Don\'t wait for situations to escalate. Reach out to authorities, NGOs, or counselors early. Early intervention helps prevent escalation.',
  },
];

export const resources = [
  {
    name: 'Sakshi',
    description: 'Works on women\'s rights and gender justice',
    website: 'www.sakshi.org.in',
  },
  {
    name: 'Women\'s India Trust',
    description: 'Supports women\'s empowerment and safety',
    website: 'www.witindia.org',
  },
  {
    name: 'All India Women\'s Conference',
    description: 'Advocacy for women\'s rights and welfare',
    website: 'www.aiwc.org',
  },
  {
    name: 'SNEHA',
    description: 'Works against gender-based violence and trafficking',
    website: 'www.snehamumbai.org',
  },
];
