export type FormType = 'contact' | 'enquiry' | 'exhibitor' | 'visitor' | 'sponsor';

export interface SubmissionPayload {
  formType: FormType;
  platform?: string;
  registerAs: string;
  company: string;
  name: string; // Contact Person
  designation?: string;
  email: string; // Email Id
  phone: string; // Mobile No.
  website?: string;
  address?: string;
  country: string;
  boothSizeRequirement?: string;
  areaOfInterest?: string;
  infoGetFrom?: string; // Info. Get From
  message?: string;
  event?: string;
  source?: string;
}

export interface SubmissionRecord extends Omit<SubmissionPayload, 'website'> {
  website?: string;
  overallStatus: 'new' | 'reviewing' | 'closed';
  status1?: string;
  status2?: string;
  status3?: string;
  status4?: string;
  status5?: string;
  status6?: string;
  status7?: string;
  status8?: string;
  status9?: string;
  createdAt: Date;
  updatedAt: Date;
  integrations?: {
    googleSheets: 'pending' | 'success' | 'failed';
    email: 'pending' | 'success' | 'failed';
  };
}