import { NextResponse } from 'next/server';
import connectDB from '../../../../../utils/db';
import User from '../../../../../models/User';

// GET method
export async function GET(req, { params }) {
    const { studentID } = params;

    if (!studentID) {
        console.log("Error: studentID is missing");
        return NextResponse.json({ error: "studentID is missing" }, { status: 400 });
    }

    console.log(req);

    await connectDB();
    const user = await User.findOne({ studentID }).lean();
    if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json({ user });
}

// PUT method (for updating user data)
export async function PUT(req, { params }) {
    const { studentID } = params;
    const { name, surname, introductionSelf, ratedSelf, level, classRoom, status } = await req.json();

    if (!studentID) {
        return NextResponse.json({ error: "studentID is missing" }, { status: 400 });
    }

    await connectDB();
    const user = await User.findOne({ studentID });

    if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    try {
        const updatedUser = await User.updateOne(
            { studentID },
            {
                $set: {
                    name,
                    surname,
                    introductionSelf,
                    ratedSelf,
                    level,
                    classRoom,
                    status,
                },
            }
        );

        if (updatedUser.modifiedCount === 0) {
            return NextResponse.json({ message: "No changes made" }, { status: 400 });
        }

        return NextResponse.json({ message: "User updated successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error updating user:", error);
        return NextResponse.json({ message: "Failed to update user" }, { status: 500 });
    }
}

// DELETE method (for deleting a user)
export async function DELETE(req, { params }) {
    const { studentID } = params;

    if (!studentID) {
        return NextResponse.json({ error: "studentID is missing" }, { status: 400 });
    }

    await connectDB();
    const user = await User.findOne({ studentID });

    if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    try {
        await User.deleteOne({ studentID });
        return NextResponse.json({ message: "User deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting user:", error);
        return NextResponse.json({ message: "Failed to delete user" }, { status: 500 });
    }
}
