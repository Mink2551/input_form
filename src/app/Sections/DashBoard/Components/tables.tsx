import React, { useState, useEffect } from 'react';
import Link from 'next/link';
// import { useSession } from 'next-auth/react';

interface User {
  name: string;
  surname: string;
  studentID: number;
  introductionSelf: string;
  ratedSelf: number;
  level: string;
  classRoom: string;
  status: string;
}

function Tables() {
  // const { data: session } = useSession(); // Get the session data
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const getUsers = async () => {
    try {
      const res = await fetch('/api/users', {
        cache: 'no-store',
        method: 'GET',
      });

      if (!res.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await res.json();
      setUsers(data.users);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    const handleResize = () =>
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // ฟังก์ชันค้นหา
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.surname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.studentID.toString().includes(searchQuery)
  );

  // แยกผู้ใช้ตามสถานะ
  const groupedUsers = {
    waiting: filteredUsers.filter((user) => user.status === 'wating'),
    pass: filteredUsers.filter((user) => user.status === 'pass'),
    notpass: filteredUsers.filter((user) => user.status === 'notpass'),
    members: filteredUsers.filter((user) => user.status === 'members'),
  };

  return (
    <div className="mt-10 ">
      {/* เพิ่มกล่องค้นหา */}
      <div className="top-[5%] flex right-[10%] absolute text-center">
        <input
          type="text"
          placeholder="Search by name, surname, or student ID"
          className="p-2 border max-w-[300px] w-[40vw] border-none shadow-2xl rounded"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {windowSize.width >= 900 ? (
        <div className="flex flex-col  gap-5">
          {Object.entries(groupedUsers).map(([status, usersList]) => (
            <div key={status} className="flex-1  my-3 min-w-[300px]">
              <h2 className="text-7xl font-bold mb-7 text-SC_Red3 capitalize text-center ">{status}</h2>
              <table cellPadding="8" cellSpacing="0" className="bg-SC_White w-full text-left border-collapse">
                <thead>
                  <tr>
                    <th className="border border-gray-500">Name</th>
                    <th className="border border-gray-500">Surname</th>
                    <th className="border border-gray-500">Student ID</th>
                    <th className="border border-gray-500">Level</th>
                    <th className="border border-gray-500">ClassRoom</th>
                    <th className="border border-gray-500">Rated</th>
                    <th className="border border-gray-500">status</th>
                    <th className="border border-gray-500">Edits</th>
                  </tr>
                </thead>
                <tbody>
                  {usersList.map((user) => (
                    <tr key={user.studentID}>
                      <td className="border border-gray-500">{user.name}</td>
                      <td className="border border-gray-500">{user.surname}</td>
                      <td className="border border-gray-500">{user.studentID}</td>
                      <td className='border border-gray-500'>{user.level}</td>
                      <td className='border border-gray-500'>{user.classRoom}</td>
                      <td className="border border-gray-500">{user.ratedSelf}</td>
                      <td className={`font-medium animate-pulse ${user.status === 'wating'? "text-green-600" : user.status === "pass" ? "text-yellow-600" : user.status === 'notpass' ? "text-SC_Red2" : "text-pink-600"} border border-gray-500`}>{user.status === 'wating'? "Staging" : user.status === 'pass'? "Pass" : user.status === 'notpass'? "Not Pass" : "Members"}</td>
                      <td className="border border-gray-500">
                          <Link href={`/Sections/DashBoard/edits/${user.studentID}`}><button className='w-fit bg-SC_Red2 ml-2 text-SC_Cream2 font-bold px-2 rounded-md'>More</button></Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      ) : (
        <div>
          {Object.entries(groupedUsers).map(([status, usersList]) => (
            <div key={status} className="mb-10">
              <h2 className="text-lg font-bold mb-3 capitalize">{status}</h2>
              {usersList.map((user) => (
                <div key={user.studentID} className="my-5 border border-gray-500 p-3 bg-SC_White">
                  <p><strong>Name:</strong> {user.name}</p>
                  <p><strong>Surname:</strong> {user.surname}</p>
                  <p><strong>Student ID:</strong> {user.studentID}</p>
                  <p><strong>Rated:</strong> {user.ratedSelf}</p>
                  <p><strong>Level:</strong> {user.level}</p>
                  <p><strong>Classroom:</strong> {user.classRoom}</p>
                  <p><strong>Status:</strong> {user.status}</p>
                  <p><strong>Edits:</strong> 
                    <Link href={`/Sections/DashBoard/edits/${user.studentID}`}><button className='w-fit bg-SC_Red2 ml-2 text-SC_Cream2 font-bold px-2 rounded-md'>More</button></Link>
                  </p>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Tables;
