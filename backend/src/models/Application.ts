import mongoose, { Document, Schema } from "mongoose";

export enum ApplicationStatus {
  APPLIED = "Applied",
  PHONE = "Phone Screen",
  INTERVIEW = "Interview",
  OFFER = "Offer",
  REJECTED = "Rejected"
}

export interface IApplication extends Document {
  userId: mongoose.Types.ObjectId;
  company: string;
  role: string;
  requiredSkills?: string[];
  niceToHaveSkills?: string[];
  seniority?: string;
  location?: string;
  jdLink?: string;
  notes?: string;
  dateApplied: Date;
  status: ApplicationStatus;
  salaryRange?: string;
}

const ApplicationSchema = new Schema<IApplication>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },

  company: { type: String, required: true },
  role: { type: String, required: true },

  requiredSkills: [{ type: String }],
  niceToHaveSkills: [{ type: String }],
  seniority: { type: String },
  location: { type: String },

  jdLink: { type: String },
  notes: { type: String },

  dateApplied: { type: Date, default: Date.now },

  status: {
    type: String,
    enum: Object.values(ApplicationStatus),
    default: ApplicationStatus.APPLIED
  },

  salaryRange: { type: String }

}, { timestamps: true });

export default mongoose.model<IApplication>("Application", ApplicationSchema);