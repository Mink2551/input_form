"use client"

import { useState, useEffect } from "react";
import TopCard from "./Components/Top_Card/TopCard";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [form, setForm] = useState({
    name: '',
    surname: '',
    studentID: '',
    introductionSelf: '',
    ratedSelf: '',
    level: '',
    classRoom: '',
    status: 'wating',
  });
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); // สถานะการส่งข้อมูล
  const router = useRouter()
  const { data : session } = useSession()

  useEffect(() => {
    if (session) {
      router.replace('/Sections/DashBoard/main');
    }
  }, [session, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.surname || !form.studentID || !form.introductionSelf || !form.ratedSelf || !form.level || !form.classRoom) {
      setMessage('กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }

    if (Number(form.ratedSelf) < 0 || Number(form.ratedSelf) > 10) {
      setMessage('กรุณากรอกคะแนนให้ถูกต้อง (0-10)');
      return;
    }

    setIsSubmitting(true); // ตั้งค่าสถานะการกำลังส่งข้อมูล

    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        setMessage('เกิดข้อผิดพลาดในการบันทึก');
        setIsSubmitting(false); // ตั้งสถานะการส่งข้อมูลเป็น false เมื่อเกิดข้อผิดพลาด
        return;
      }

      const text = await response.text();
      const data = text ? JSON.parse(text) : null;

      if (data) {
        setMessage('บันทึกข้อมูลเรียบร้อย');
        setForm({
          name: '',
          surname: '',
          studentID: '',
          introductionSelf: '',
          ratedSelf: '',
          level: '',
          classRoom: '',
          status: 'wating',
        });
        console.log(message);
        setTimeout(() => window.location.reload(), 100);
      } else {
        setMessage('เกิดข้อผิดพลาดในการบันทึก');
      }
    } catch (error) {
      setMessage('เกิดข้อผิดพลาดในการเชื่อมต่อ');
      console.error(error);
    } finally {
      setIsSubmitting(false); // ตั้งสถานะการส่งข้อมูลเป็น false เมื่อการส่งข้อมูลเสร็จสิ้น
    }
  };

  return (
    <main className="min-h-screen mt-10">
      <div>
        <TopCard />
        <div className='flex mt-2 flex-col w-[90vw] max-w-[500px] mx-auto my-auto'>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className='grid shadow-lg h-fit rounded-lg py-10 mt-5 bg-SC_Cream2'>
              <p className="mx-5">Name :</p>
              <input 
                className='w-[90%] border-l-4 border-SC_Red2 mx-auto mt-3 shadow-xl py-2 text-sm px-4 rounded-lg' 
                name="name" 
                type="text"
                placeholder="ชื่อจริงไม่ต้องใส่คำนำหน้า"
                onChange={handleChange}
                required
              />
            </div>

            <div className='grid shadow-lg h-fit rounded-lg py-10 bg-SC_Cream2'>
              <p className="mx-5">Surname :</p>
              <input 
                className='w-[90%] border-l-4 border-SC_Red2 mx-auto mt-3 shadow-xl py-2 text-sm px-4 rounded-lg' 
                name="surname" 
                type="text"
                placeholder="นามสกุล"
                onChange={handleChange}
                required
              />
            </div>

            <div className='grid shadow-lg h-fit rounded-lg py-10 bg-SC_Cream2'>
              <p className="mx-5">StudentID :</p>
              <input 
                className='w-[90%] border-l-4 border-SC_Red2 mx-auto mt-3 shadow-xl py-2 text-sm px-4 rounded-lg' 
                name="studentID" 
                type="text"
                maxLength={5} // กำหนดให้มีความยาว 5 หลัก
                placeholder="เลขประจำตัวนักเรียน 5 หลัก"
                onChange={handleChange}
                required
              />
            </div>

            <div className='grid shadow-lg h-fit rounded-lg py-10 bg-SC_Cream2'>
              <p className="mx-5">Introduce yourself :</p>
              <textarea 
                className='w-[90%] h-[150px] border-l-4 border-SC_Red2 mx-auto mt-3 shadow-xl py-2 text-sm px-4 rounded-lg ' 
                name="introductionSelf" 
                placeholder="แนะนำตัวเอง และบอกข้อดีของตัวเอง และเขียนปีการศึกษาตามท้าย"
                onChange={handleChange}
                required
              />
            </div>

            <div className='grid shadow-lg h-fit rounded-lg py-10 bg-SC_Cream2'>
              <p className="mx-5">Rated Self :</p>
              <input 
                className='w-[90%] border-l-4 border-SC_Red2 mx-auto mt-3 shadow-xl py-2 text-sm px-4 rounded-lg' 
                name="ratedSelf" 
                type="number"
                placeholder="ให้คะแนนตัวเองเท่าไรเต็ม 10"
                onChange={handleChange}
                required
                min="0" 
                max="10" 
                step="1"
              />
            </div>

            <div className='grid shadow-lg h-fit rounded-lg py-10 bg-SC_Cream2'>
              <p className="mx-5">Level</p>
              <div className="flex flex-col items-start ml-10 justify-center">
                {["M1", "M2", "M3", "M4", "M5", "M6"].map((value) => (
                  <label key={value} className="flex items-center space-x-2">
                    <input 
                      className='border-l-4 border-SC_Red2' 
                      type="radio" 
                      name="level"
                      value={value}
                      onChange={handleChange}
                    />
                    <span>{value}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className='grid shadow-lg h-fit rounded-lg py-10 bg-SC_Cream2'>
              <p className="mx-5">classRoom</p>
              <div className="flex flex-col items-start ml-10 justify-center ">
                {["/1", "/2", "/3", "/4"].map((value) => (
                  <label key={value} className="flex items-center space-x-2">
                    <input 
                      className='border-l-4 border-SC_Red2' 
                      type="radio" 
                      name="classRoom"
                      value={value}
                      onChange={handleChange}
                    />
                    <span>{value}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <button 
                type="submit" 
                className={`my-5 px-3 py-1 bg-SC_Red2 text-SC_White font-bold rounded-lg shadow-2xl border-r-4 border-b-4 hover:bg-opacity-80 hover:border-opacity-80 transition-all border-SC_Red3 ${isSubmitting ? 'cursor-not-allowed opacity-50' : ''}`}
                disabled={isSubmitting} // ปิดการใช้งานปุ่มเมื่อกำลังส่งข้อมูล
              >
                {isSubmitting ? 'กำลังส่งข้อมูล...' : 'Submit'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
