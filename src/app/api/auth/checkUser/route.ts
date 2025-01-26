import { NextResponse, NextRequest } from "next/server";
import connectDB from "../../../../../utils/db";
import Member from "../../../../../models/Member";

export async function POST(req: NextRequest) {
    await connectDB();

    try {
        const { email } = await req.json();

        // Check if email is provided
        if (!email) {
            return NextResponse.json({ msg: "Email is required" }, { status: 400 });
        }

        // Find member by email
        const member = await Member.findOne({ email });

        if (!member) {
            return NextResponse.json({ msg: "Member not found" }, { status: 404 });
        }

        // Optionally, avoid logging sensitive data
        console.log("Member found:", member); 

        return NextResponse.json({ member }, { status: 200 });

    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ msg: "Error" }, { status: 500 });
    }
}
