export interface Lawyer {
  id: string;
  name: string;
  specialization: string;
  experience: number;
  location: string;
  phone: string;
  email: string;
  rating: number;
  reviewCount: number;
  languages: string[];
  fee: string;
}

export const lawyers: Lawyer[] = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    specialization: 'Criminal Law',
    experience: 15,
    location: 'Mumbai',
    phone: '+91-22-1234-5678',
    email: 'rajesh@legalfirm.com',
    rating: 4.8,
    reviewCount: 47,
    languages: ['English', 'Hindi', 'Marathi'],
    fee: '₹2000-3000 per hour',
  },
  {
    id: '2',
    name: 'Priya Sharma',
    specialization: 'Family Law',
    experience: 12,
    location: 'Delhi',
    phone: '+91-11-9876-5432',
    email: 'priya@familylaw.com',
    rating: 4.9,
    reviewCount: 63,
    languages: ['English', 'Hindi', 'Punjabi'],
    fee: '₹1500-2500 per hour',
  },
  {
    id: '3',
    name: 'Amit Patel',
    specialization: 'Corporate & Commercial Law',
    experience: 18,
    location: 'Bangalore',
    phone: '+91-80-4567-8901',
    email: 'amit@corporatelaw.com',
    rating: 4.7,
    reviewCount: 41,
    languages: ['English', 'Hindi', 'Gujarati'],
    fee: '₹3000-5000 per hour',
  },
  {
    id: '4',
    name: 'Sneha Desai',
    specialization: 'Consumer Rights & Labor Law',
    experience: 10,
    location: 'Pune',
    phone: '+91-20-2345-6789',
    email: 'sneha@consumerlaw.com',
    rating: 4.6,
    reviewCount: 35,
    languages: ['English', 'Hindi', 'Marathi'],
    fee: '₹1200-2000 per hour',
  },
  {
    id: '5',
    name: 'Vikram Singh',
    specialization: 'Property & Real Estate Law',
    experience: 14,
    location: 'Jaipur',
    phone: '+91-141-5678-9012',
    email: 'vikram@propertylaw.com',
    rating: 4.5,
    reviewCount: 28,
    languages: ['English', 'Hindi'],
    fee: '₹1500-2500 per hour',
  },
  {
    id: '6',
    name: 'Divya Nair',
    specialization: 'Cyber Law & IT',
    experience: 8,
    location: 'Hyderabad',
    phone: '+91-40-8901-2345',
    email: 'divya@cyberlaw.com',
    rating: 4.7,
    reviewCount: 32,
    languages: ['English', 'Hindi', 'Telugu'],
    fee: '₹1800-3000 per hour',
  },
  {
    id: '7',
    name: 'Arun Verma',
    specialization: 'Tax & Financial Law',
    experience: 16,
    location: 'Kolkata',
    phone: '+91-33-3456-7890',
    email: 'arun@taxlaw.com',
    rating: 4.8,
    reviewCount: 52,
    languages: ['English', 'Hindi', 'Bengali'],
    fee: '₹2500-4000 per hour',
  },
  {
    id: '8',
    name: 'Meera Iyer',
    specialization: 'Immigration & Visa Law',
    experience: 11,
    location: 'Chennai',
    phone: '+91-44-7890-1234',
    email: 'meera@immigrationlaw.com',
    rating: 4.6,
    reviewCount: 39,
    languages: ['English', 'Hindi', 'Tamil'],
    fee: '₹2000-3500 per hour',
  },
];

export function searchLawyers(
  location?: string,
  specialization?: string,
  minExperience?: number
): Lawyer[] {
  return lawyers.filter((lawyer) => {
    if (location && !lawyer.location.toLowerCase().includes(location.toLowerCase())) {
      return false;
    }
    if (
      specialization &&
      !lawyer.specialization.toLowerCase().includes(specialization.toLowerCase())
    ) {
      return false;
    }
    if (minExperience && lawyer.experience < minExperience) {
      return false;
    }
    return true;
  });
}

export const specializations = [
  'Criminal Law',
  'Family Law',
  'Corporate & Commercial Law',
  'Consumer Rights & Labor Law',
  'Property & Real Estate Law',
  'Cyber Law & IT',
  'Tax & Financial Law',
  'Immigration & Visa Law',
];

export const locations = [
  'Mumbai',
  'Delhi',
  'Bangalore',
  'Pune',
  'Jaipur',
  'Hyderabad',
  'Kolkata',
  'Chennai',
];
