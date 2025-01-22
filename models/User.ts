import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  surname: string;
  studentId: number;
  introductionSelf: string;
  ratedSelf: number;
  level: string;
  classRoom: string;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  studentID: { type: Number, required: true },
  introductionSelf: { type: String, required: true },
  ratedSelf: { type: Number, required: true },
  level: { type: String, required: true },
  classRoom: { type: String, required: true },
});

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
