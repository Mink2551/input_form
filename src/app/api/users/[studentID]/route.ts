import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../../../../../utils/db';
import User from '../../../../../models/User';

export async function GET(
  req: NextRequest, 
  context: { params: { studentID: string } }
) {
    console.log(req)
  try {
    const { params } = context;
    if (!params?.studentID) {
      console.error("Error: studentID is missing");
      return NextResponse.json({ error: "studentID is missing" }, { status: 400 });
    }

    const { studentID } = params;
    console.log(`Fetching user with studentID: ${studentID}`);

    // Connect to the database
    await connectDB();

    // Find user by studentID
    const user = await User.findOne({ studentID });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user }, { status: 200 });

  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
