import { NextResponse } from 'next/server';
import connectDB from '../../../../../utils/db';
import User from '../../../../../models/User';

export async function GET(req, { params }) {
    const { studentID } = params;

    if (!studentID) {
        console.log("Error: studentID is missing");
        return NextResponse.json({ error: "studentID is missing" }, { status: 400 });
    }

    console.log(req);

    await connectDB();
    const user = await User.findOne({ studentID });
    return NextResponse.json({ user });
}