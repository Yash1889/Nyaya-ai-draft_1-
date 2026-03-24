export interface DocumentTemplate {
  id: string;
  name: string;
  description: string;
  fields: DocumentField[];
}

export interface DocumentField {
  id: string;
  label: string;
  placeholder: string;
  type: 'text' | 'textarea' | 'date' | 'email' | 'tel';
  required: boolean;
}

export interface DocumentData {
  [key: string]: string;
}

export const documentTemplates: DocumentTemplate[] = [
  {
    id: 'complaint-letter',
    name: 'Complaint Letter',
    description:
      'Formal letter to lodge a complaint regarding service, product, or conduct',
    fields: [
      {
        id: 'complainant-name',
        label: 'Your Full Name',
        placeholder: 'John Doe',
        type: 'text',
        required: true,
      },
      {
        id: 'complainant-address',
        label: 'Your Address',
        placeholder: 'Street address, City, Postal Code',
        type: 'textarea',
        required: true,
      },
      {
        id: 'date',
        label: 'Date of Complaint',
        placeholder: 'DD/MM/YYYY',
        type: 'date',
        required: true,
      },
      {
        id: 'recipient-name',
        label: 'Recipient Name (Organization/Person)',
        placeholder: 'Organization or individual name',
        type: 'text',
        required: true,
      },
      {
        id: 'complaint-details',
        label: 'Details of Complaint',
        placeholder: 'Describe the issue in detail...',
        type: 'textarea',
        required: true,
      },
      {
        id: 'requested-action',
        label: 'Requested Action/Resolution',
        placeholder: 'What resolution do you seek?',
        type: 'textarea',
        required: true,
      },
    ],
  },
  {
    id: 'affidavit',
    name: 'Affidavit',
    description: 'Sworn statement for legal proceedings',
    fields: [
      {
        id: 'affiant-name',
        label: 'Full Name of Affiant (Your Name)',
        placeholder: 'John Doe',
        type: 'text',
        required: true,
      },
      {
        id: 'affiant-address',
        label: 'Address',
        placeholder: 'Full residential address',
        type: 'textarea',
        required: true,
      },
      {
        id: 'affiant-age',
        label: 'Age',
        placeholder: '30',
        type: 'text',
        required: true,
      },
      {
        id: 'affiant-occupation',
        label: 'Occupation',
        placeholder: 'Your profession',
        type: 'text',
        required: true,
      },
      {
        id: 'statement',
        label: 'Statement (In First Person)',
        placeholder: 'I solemnly affirm that...',
        type: 'textarea',
        required: true,
      },
      {
        id: 'date',
        label: 'Date',
        placeholder: 'DD/MM/YYYY',
        type: 'date',
        required: true,
      },
    ],
  },
  {
    id: 'agreement',
    name: 'Simple Agreement',
    description: 'Basic agreement between two parties',
    fields: [
      {
        id: 'party1-name',
        label: 'First Party Name',
        placeholder: 'Name of first party',
        type: 'text',
        required: true,
      },
      {
        id: 'party1-address',
        label: 'First Party Address',
        placeholder: 'Address',
        type: 'textarea',
        required: true,
      },
      {
        id: 'party2-name',
        label: 'Second Party Name',
        placeholder: 'Name of second party',
        type: 'text',
        required: true,
      },
      {
        id: 'party2-address',
        label: 'Second Party Address',
        placeholder: 'Address',
        type: 'textarea',
        required: true,
      },
      {
        id: 'agreement-terms',
        label: 'Terms of Agreement',
        placeholder: 'Describe the terms and conditions...',
        type: 'textarea',
        required: true,
      },
      {
        id: 'date',
        label: 'Date',
        placeholder: 'DD/MM/YYYY',
        type: 'date',
        required: true,
      },
    ],
  },
  {
    id: 'legal-notice',
    name: 'Legal Notice',
    description: 'Formal legal notice regarding a dispute or claim',
    fields: [
      {
        id: 'sender-name',
        label: 'Your Full Name',
        placeholder: 'John Doe',
        type: 'text',
        required: true,
      },
      {
        id: 'sender-address',
        label: 'Your Address',
        placeholder: 'Full address',
        type: 'textarea',
        required: true,
      },
      {
        id: 'recipient-name',
        label: 'Recipient Name',
        placeholder: 'Name of person/organization',
        type: 'text',
        required: true,
      },
      {
        id: 'recipient-address',
        label: 'Recipient Address',
        placeholder: 'Address',
        type: 'textarea',
        required: true,
      },
      {
        id: 'subject',
        label: 'Subject of Notice',
        placeholder: 'Brief subject',
        type: 'text',
        required: true,
      },
      {
        id: 'notice-details',
        label: 'Details and Claims',
        placeholder: 'Explain the issue and your claim...',
        type: 'textarea',
        required: true,
      },
      {
        id: 'demanded-action',
        label: 'Action Demanded',
        placeholder: 'What action do you demand?',
        type: 'textarea',
        required: true,
      },
      {
        id: 'deadline',
        label: 'Deadline for Compliance',
        placeholder: '30 days from date of notice',
        type: 'text',
        required: true,
      },
      {
        id: 'date',
        label: 'Date',
        placeholder: 'DD/MM/YYYY',
        type: 'date',
        required: true,
      },
    ],
  },
];

export function getTemplateById(id: string): DocumentTemplate | undefined {
  return documentTemplates.find((t) => t.id === id);
}

export function generateDocument(
  template: DocumentTemplate,
  data: DocumentData
): string {
  let content = '';

  if (template.id === 'complaint-letter') {
    content = `
TO WHOMSOEVER IT MAY CONCERN

Date: ${data['date']}

From:
${data['complainant-name']}
${data['complainant-address']}

To:
${data['recipient-name']}

Subject: Formal Complaint Letter

Dear Sir/Madam,

I am writing this letter to lodge a formal complaint regarding the following matter:

${data['complaint-details']}

As a result of the above matter, I have suffered loss and inconvenience. I hereby request the following resolution:

${data['requested-action']}

I request your prompt attention to this matter and resolution within 30 days from the date of this letter. Should you fail to respond or resolve the matter satisfactorily, I shall be constrained to pursue legal remedies available under law.

I look forward to your immediate response.

Yours faithfully,

${data['complainant-name']}
    `;
  } else if (template.id === 'affidavit') {
    content = `
AFFIDAVIT

I, ${data['affiant-name']}, aged ${data['affiant-age']} years, presently residing at ${data['affiant-address']}, and working as a ${data['affiant-occupation']}, do hereby solemnly affirm and declare as follows:

1. ${data['statement']}

2. The facts stated above are true and correct to the best of my knowledge and belief.

3. I am making this affidavit in support of my legal proceedings and in full consciousness of the penalties prescribed by law for making false statements in an affidavit.

SOLEMNLY AFFIRMED
On this ${data['date']}

${data['affiant-name']}

Deponent

VERIFICATION:
I hereby verify that the contents of the above affidavit are true to my knowledge and belief, and I make this affidavit at ${data['affiant-address']} on this ${data['date']}.

${data['affiant-name']}
    `;
  } else if (template.id === 'agreement') {
    content = `
AGREEMENT

This Agreement made on ${data['date']}, BETWEEN

${data['party1-name']} at ${data['party1-address']} (hereinafter called "PARTY 1"), AND

${data['party2-name']} at ${data['party2-address']} (hereinafter called "PARTY 2"),

NOW THIS DEED WITNESSETH AS FOLLOWS:

WHEREAS, the Parties hereto are desirous of entering into an agreement on the terms and conditions as detailed hereinafter:

TERMS AND CONDITIONS:

${data['agreement-terms']}

IN WITNESS WHEREOF, the Parties have executed this Agreement on the date first mentioned above.

PARTY 1:
${data['party1-name']}
Signature: _______________

PARTY 2:
${data['party2-name']}
Signature: _______________

WITNESSES:
1. Name: _______________
   Signature: _______________

2. Name: _______________
   Signature: _______________
    `;
  } else if (template.id === 'legal-notice') {
    content = `
LEGAL NOTICE

Date: ${data['date']}

TO:
${data['recipient-name']}
${data['recipient-address']}

RE: ${data['subject']}

TAKE NOTICE that:

${data['notice-details']}

BY VIRTUE OF THIS LEGAL NOTICE, you are hereby called upon to:

${data['demanded-action']}

within a period of ${data['deadline']} from the date of this notice.

In case of your failure to comply with the above, I shall pursue all legal remedies available to me under law, without any further notice, and shall claim damages for loss and harassment caused to me.

Your immediate compliance is required.

Yours,

${data['sender-name']}
${data['sender-address']}

Date: ${data['date']}
    `;
  }

  return content.trim();
}
