import mongoose, { Document, Schema } from 'mongoose';
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

UserSchema.pre('save', async function () {
  const user = this as IUser;

  if (!user.isModified('password')) return;

  user.password = await bcrypt.hash(user.password, 12);
});

UserSchema.methods.comparePassword = function (candidate: string) {
  return bcrypt.compare(candidate, this.password);
};

UserSchema.index({ email: 1 });

export default mongoose.model<IUser>('User', UserSchema);