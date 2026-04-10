import mongoose, { Document, Schema, HydratedDocument } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  email: string;
  password: string;
  comparePassword(candidate: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email']
  },
  password: {
    type: String,
    required: true,
    select: false
  },
}, { timestamps: true });

UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 12);
});

UserSchema.methods.comparePassword = function (candidate: string) {
  if (!this.password) {
    throw new Error("Password not loaded in document");
  }
  return bcrypt.compare(candidate, this.password);
};

UserSchema.index({ email: 1 });

export default mongoose.model<IUser>('User', UserSchema);