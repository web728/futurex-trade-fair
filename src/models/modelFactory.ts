import mongoose, { Schema } from 'mongoose';

const submissionFields = {
  formType: { type: String, required: true, index: true },
  platform: { type: String, default: '' },
  registerAs: { type: String, required: true },
  company: { type: String, required: true, index: true },
  name: { type: String, required: true }, // Contact Person
  designation: { type: String, default: '' },
  email: { type: String, required: true, index: true }, // Email Id
  phone: { type: String, default: '' }, // Mobile No.
  website: { type: String, default: '' },
  address: { type: String, default: '' },
  country: { type: String, default: '' },
  boothSizeRequirement: { type: String, default: '' },
  areaOfInterest: { type: String, default: '' },
  infoGetFrom: { type: String, default: '' }, // Info. Get From
  message: { type: String, default: '' },
  event: { type: String, default: '' },
  source: { type: String, default: '' },
  
  // Custom status columns matching your spreadsheet headers (STATUS 1 - 9)
  status1: { type: String, default: '' },
  status2: { type: String, default: '' },
  status3: { type: String, default: '' },
  status4: { type: String, default: '' },
  status5: { type: String, default: '' },
  status6: { type: String, default: '' },
  status7: { type: String, default: '' },
  status8: { type: String, default: '' },
  status9: { type: String, default: '' },

  overallStatus: { type: String, enum: ['new', 'reviewing', 'closed'], default: 'new', index: true },
  integrations: {
    googleSheets: { type: String, enum: ['pending', 'success', 'failed'], default: 'pending' },
    email: { type: String, enum: ['pending', 'success', 'failed'], default: 'pending' }
  }
};

export const createSubmissionModel = (modelName: string) => {
  const schema = new Schema(submissionFields, { timestamps: true, versionKey: false });
  return mongoose.models[modelName] || mongoose.model(modelName, schema);
};