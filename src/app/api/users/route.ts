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
    return NextResponse.json(
      { message: 'เกิดข้อผิดพลาดในการบันทึก', error },
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
    return NextResponse.json(
      { message: 'เกิดข้อผิดพลาดในการดึงข้อมูล', error },
      { status: 400 }
    );
  }
}