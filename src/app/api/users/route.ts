import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../../../../utils/db';
import User from '../../../../models/User';

export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const body = await req.json();
    const newUser = new User(body);
    await newUser.save();

    return NextResponse.json({ message: 'บันทึกข้อมูลเรียบร้อย' }, { status: 201 });
  } catch (error) {
    console.error('Error saving user:', error);
    if (error instanceof Error) {
      return NextResponse.json(
        { message: 'เกิดข้อผิดพลาดในการบันทึก', error: error.message },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { message: 'เกิดข้อผิดพลาดในการบันทึก', error: 'Unknown error' },
      { status: 400 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    console.log(req);
    return NextResponse.json({ message: 'GET request received' });
  } catch (error) {
    console.error('Error fetching data:', error);
    if (error instanceof Error) {
      return NextResponse.json(
        { message: 'เกิดข้อผิดพลาดในการดึงข้อมูล', error: error.message },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { message: 'เกิดข้อผิดพลาดในการดึงข้อมูล', error: 'Unknown error' },
      { status: 400 }
    );
  }
}