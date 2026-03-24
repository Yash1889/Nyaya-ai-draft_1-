export interface LegalScenario {
  keywords: string[];
  title: string;
  problem: string;
  suggestedSteps: string[];
  legalActions: string[];
  relevantLaws: string[];
}

export const legalScenarios: LegalScenario[] = [
  {
    keywords: ['landlord', 'deposit', 'return', 'money', 'rent'],
    title: 'Landlord Not Returning Security Deposit',
    problem:
      'Your landlord is refusing to return your security deposit after you moved out. This is a common dispute in rental agreements.',
    suggestedSteps: [
      'Send a formal written demand letter to your landlord with a specific deadline (usually 30-45 days)',
      'Document all communication and keep copies of lease agreement',
      'Contact your local Rent Control Authority for guidance',
      'Consider filing a complaint with consumer protection authorities',
    ],
    legalActions: [
      'File a case in the District Court for recovery of deposit',
      'File a consumer complaint for unfair trade practice',
      'Report to local housing authority',
    ],
    relevantLaws: [
      'Indian Contract Act, 1872 - Section 74 (Compensation for Breach)',
      'Consumer Protection Act, 2019 - Unfair Trade Practices',
      'Local Rent Control Acts (varies by state)',
    ],
  },
  {
    keywords: ['cyber', 'fraud', 'online', 'scam', 'hacking', 'attack'],
    title: 'Cyber Fraud and Online Scams',
    problem:
      'You have been a victim of cyber fraud, phishing, or online scam. This is increasingly common and legally punishable.',
    suggestedSteps: [
      'Immediately report to your bank/financial institution if funds were lost',
      'Gather all evidence: screenshots, emails, transaction details',
      'File an FIR (First Information Report) at your nearest cybercrime police station',
      'Contact CERT-IN (Cyber Emergency Response Team) for technical assistance',
    ],
    legalActions: [
      'File a criminal complaint under IPC Section 420 (Cheating) and 406 (Criminal Breach of Trust)',
      'Report to Cybercrime Helpline: 1930 (Government of India)',
      'File complaint with RBI if banking fraud is involved',
    ],
    relevantLaws: [
      'Indian Penal Code - Section 420 (Cheating), Section 406 (Criminal Breach of Trust)',
      'Information Technology Act, 2000 - Section 66 (Hacking) and 66B (Dishonestly obtaining computer resources)',
      'Reserve Bank of India Guidelines for Banking Fraud',
    ],
  },
  {
    keywords: ['job', 'termination', 'dismissed', 'wrongful', 'termination'],
    title: 'Wrongful Job Termination',
    problem:
      'Your employer has terminated your employment without proper notice or compensation. You believe the termination was unjust.',
    suggestedSteps: [
      'Request a detailed written explanation for termination from HR',
      'Calculate your due compensation: salary, gratuity, leave encashment',
      'Gather all employment documents: offer letter, appraisal reports, contracts',
      'Send a legal notice to your employer for wrongful termination and compensation claim',
    ],
    legalActions: [
      'File a claim in the Labour Court for wrongful termination',
      'File a complaint with Industrial Tribunal',
      'Approach National Consumer Disputes Redressal Commission if applicable',
    ],
    relevantLaws: [
      'Industrial Disputes Act, 1947 - Section 25 (Conditions precedent to retrenchment)',
      'Payment of Gratuity Act, 1972',
      'Employees Provident Fund Act, 1952',
    ],
  },
  {
    keywords: ['domestic', 'violence', 'abuse', 'harassment', 'safety'],
    title: 'Domestic Violence and Abuse',
    problem:
      'You or a family member is experiencing domestic violence, abuse, or harassment. Your safety is the priority.',
    suggestedSteps: [
      'Ensure immediate safety: move to a safe location or contact local police',
      'Document injuries: take photos, get medical records from hospital',
      'Collect evidence: save messages, emails, audio/video recordings',
      'Contact local women\'s helpline or NGO for support and counseling',
    ],
    legalActions: [
      'File a police complaint (FIR) for physical assault or harassment',
      'Apply for a Protection Order under Domestic Violence Act',
      'File a case in the Family Court for maintenance and custody',
    ],
    relevantLaws: [
      'Protection of Women from Domestic Violence Act, 2005',
      'Indian Penal Code - Section 498A (Cruelty by husband/relatives)',
      'Dowry Prohibition Act, 1961',
    ],
  },
  {
    keywords: ['consumer', 'complaint', 'defective', 'product', 'service'],
    title: 'Consumer Rights and Defective Products',
    problem:
      'You purchased a defective product or received poor service that caused you financial loss or harm.',
    suggestedSteps: [
      'Keep the defective product and all purchase receipts safe',
      'Document the defect with photos and written description',
      'Send a complaint letter to the manufacturer/seller with proof of purchase',
      'Allow reasonable time for response and resolution attempt',
    ],
    legalActions: [
      'File a complaint with State Consumer Disputes Redressal Commission',
      'File a civil suit for damages in Consumer Court',
      'Approach National Consumer Disputes Redressal Commission for high-value claims',
    ],
    relevantLaws: [
      'Consumer Protection Act, 2019',
      'Sale of Goods Act, 1930 - Warranty provisions',
      'Standards of Weights and Measures Act, 1976',
    ],
  },
  {
    keywords: ['property', 'land', 'dispute', 'boundary', 'ownership'],
    title: 'Property and Land Disputes',
    problem:
      'You are in a property dispute regarding ownership, boundary, or rights over immovable property.',
    suggestedSteps: [
      'Verify ownership documents: title deed, survey report, sale deed',
      'Get the property surveyed by a licensed surveyor',
      'Send a legal notice to the other party stating your claim',
      'Attempt amicable resolution through mediation',
    ],
    legalActions: [
      'File a civil suit in District Court for possession/recovery of property',
      'File for specific performance of contract if applicable',
      'Apply for temporary injunction to prevent unauthorized use',
    ],
    relevantLaws: [
      'Transfer of Property Act, 1882',
      'Land Acquisition Act, 2013',
      'Limitation Act, 1963 - Prescribed periods for filing claims',
    ],
  },
];

export function getScenarioResponse(userQuery: string): LegalScenario | null {
  const queryLower = userQuery.toLowerCase();

  for (const scenario of legalScenarios) {
    for (const keyword of scenario.keywords) {
      if (queryLower.includes(keyword)) {
        return scenario;
      }
    }
  }

  return null;
}

export function getDefaultResponse(): string {
  return `I'm here to help with legal information. I can assist with:
• Landlord-tenant disputes (security deposits, evictions)
• Cyber fraud and online scams
• Job termination and employment issues
• Domestic violence and safety concerns
• Consumer rights and defective products
• Property and land disputes

Please describe your legal issue in detail, and I'll provide guidance on suggested steps and relevant laws.`;
}
