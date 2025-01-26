import { NextResponse, NextRequest } from "next/server";
import connectDB from "../../../../../utils/db";
import Member from "../../../../../models/Member";
import bcryptjs from "bcryptjs";

export async function POST(req: NextRequest) {
    await connectDB();
    
    try {
        const { StudentID, email, password, lineID, phoneNo, facebook, instagram, discord, discordID, birthDate, name, surname, level, classRoom, status } = await req.json();
        const hashedPassword = await bcryptjs.hash(password, 12);

        await Member.create({
            studentID: StudentID,
            email,
            password: hashedPassword,
            lineID,
            phoneNo,
            facebook,
            instagram,
            discord,
            discordID,
            birthDate,
            name,
            surname,
            level,
            classRoom,
            status,
        })

        return NextResponse.json({ msg: "Success" }, { status: 201 });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ msg: "Error" }, { status: 500 });
    }
  }