import mongoose, {Schema} from "mongoose";

export interface IMember extends Document {
    studentId: number;
    email: string;
    password: string;
    lineID: string;
    phoneNo: string;
    facebook: string;
    instagram: string;
    discord: string;
    discordID: string;
    birthDate: string;
    name: string;
    surname: string;
    level: string;
    classRoom: string;
    status: string;
  }

const memberSchema: Schema = new Schema({
    studentID: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    lineID: { type: String, required: true },
    phoneNo: { type: String, required: true },
    facebook: { type: String, required: true },
    instagram: { type: String, required: true },
    discord: { type: String, required: true },
    discordID: { type: String, required: true },
    birthDate: { type: String, required: true },
    name: { type: String, required: true },
    surname: { type: String, required: true },
    level: { type: String, required: true },
    classRoom: { type: String, required: true },
    status: { type: String, required: true },
}, { timestamps: true });

export default mongoose.models.Member || mongoose.model<IMember>("Member", memberSchema);