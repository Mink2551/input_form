'use client';

import { JSX, useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
// import { useSession } from 'next-auth/react';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

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

function Overview() {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [users, setUsers] = useState<User[]>([]);

  // const { data: session } = useSession()

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
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate percentage of users in each status
  const calculatePercentage = (status: string) => {
    const totalUsers = users.length;
    const statusCount = users.filter((user) => user.status === status).length;
    return totalUsers === 0 ? 0 : (statusCount / totalUsers) * 100;
  };

  const UserDisplay = ({ status, header }: { status: string; header: string }): JSX.Element => {
    return (
      <div className="my-3 bg-SC_Cream2 rounded-2xl shadow-2xl h-[175px] min-w-[260px]">
        <div className="border-2 flex flex-col m-2 h-[90%] rounded-xl border-SC_Red1">
          <h2 className="text-xl uppercase text-SC_Red4 mx-auto w-fit font-bold m-2">{header}</h2>
          <div className="text-center text-SC_Red2 text-7xl font-semibold">
            {users.filter((user) => user.status === status).length}
          </div>
        </div>
      </div>
    );
  };

  const SVGChart = ({ percentage }: { percentage: number }) => {
    const radius = 50;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference * (1 - percentage / 100);
    const integerPercentage = Math.floor(percentage); // Remove decimal part

    return (
      <svg width="120" height="120" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r={radius} fill="none" stroke="#CAE6B2" strokeWidth="10" />
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke="#10b981"
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
        <text x="50%" y="50%" textAnchor="middle" dy=".3em" fontSize="24" fill="#374151">
          {integerPercentage}%
        </text>
      </svg>
    );
  };

  const DoughnutChart = ({ levelData, classRoomData,resp }: { levelData: number[]; classRoomData: number[]; resp:string }) => {
    const data = {
      labels: ['M1', 'M2', 'M3', 'M4', 'M5', 'M6'],
      datasets: [
        {
          label: 'Levels',
          data: levelData,
          backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe', '#ffce56', '#ff5733', '#4caf50'],
          borderColor: ['#fff'],
          borderWidth: 1,
        },
      ],
    };

    const dataClassRoom = {
      labels: ['/1', '/2', '/3', '/4'],
      datasets: [
        {
          label: 'Classrooms',
          data: classRoomData,
          backgroundColor: ['#ff7f50', '#32cd32', '#ffb6c1', '#ffa07a'],
          borderColor: ['#fff'],
          borderWidth: 1,
        },
      ],
    };

    return (
      <div className={`flex scale-80 ${resp === 'pc' ? "" : "flex-col"} `}>
        <div className={`rounded-2xl ${resp === 'pc'? "w-[300px]" : "w-[280px]"} h-[300px]`}>
          <Doughnut data={data} />
        </div>
        <div className={`rounded-2xl ${resp === 'pc'? "w-[300px]" : "w-[280px]"} h-[300px]`}>
          <Doughnut data={dataClassRoom} />
        </div>
      </div>
    );
  };

  const AverageDisplay = ({
    header,
    type,
    resp,
  }: {
    header: string;
    type: string;
    resp: string;
  }): JSX.Element => {
    const levelCounts = [0, 0, 0, 0, 0, 0]; // for m1, m2, m3, m4, m5, m6
    const classRoomCounts = [0, 0, 0, 0]; // for /1, /2, /3, /4

    users.forEach((user) => {
      const levelIndex = parseInt(user.level.slice(1)) - 1; // m1 -> 0, m2 -> 1, etc.
      levelCounts[levelIndex] += 1;

      const classRoomIndex = parseInt(user.classRoom.slice(1)) - 1; // /1 -> 0, /2 -> 1, etc.
      classRoomCounts[classRoomIndex] += 1;
    });

    return (
      <div className={`my-3 bg-SC_Cream2 rounded-2xl shadow-2xl  ${resp === 'pc' ? 'w-[560px] h-[300px]' : 'w-[300px]'}`}>
        <div className="border-2 flex flex-col m-2 h-[95%] pb-10 rounded-xl border-SC_Red1">
          <h2 className={`${header === ''? "hidden" : ""} text-xl uppercase text-SC_Red4 mx-auto w-fit font-bold m-2`}>{header}</h2>
          {type === 'circle' ? (
            <div className={`${resp === 'pc' ? "" : "flex-col"} flex w-fit h-fit my-auto mx-auto`}>
              <div>
                <SVGChart percentage={calculatePercentage('wating')} />
                <h2 className="mx-auto w-fit font-bold uppercase text-SC_Red3">Staging</h2>
              </div>
              <div>
                <SVGChart percentage={calculatePercentage('pass')} />
                <h2 className="mx-auto w-fit font-bold uppercase text-SC_Red3">PASS</h2>
              </div>
              <div>
                <SVGChart percentage={calculatePercentage('notpass')} />
                <h2 className="mx-auto w-fit font-bold uppercase text-SC_Red3">NOT qualified</h2>
              </div>
              <div>
                <SVGChart percentage={calculatePercentage('members')} />
                <h2 className="mx-auto w-fit font-bold uppercase text-SC_Red3">MEMBERS</h2>
              </div>
            </div>
          ) : (
            <div >
              <DoughnutChart resp={resp} levelData={levelCounts} classRoomData={classRoomCounts} />
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div>
      {windowSize.width >= 720 ? (
        <div className="min-h-[85vh] mt-10 flex flex-col gap-y-10 rounded-2xl">
          {/* Display */}
          <div className="grid xl:grid-cols-4 lg:grid-cols-2 gap-x-3 px-3 w-fit h-fit min-h-[20vh] mx-auto rounded-2xl">
            <UserDisplay status="wating" header="Staging Users" />
            <UserDisplay status="pass" header="Pass Users" />
            <UserDisplay status="notpass" header="Not qualified" />
            <UserDisplay status="members" header="Members" />
          </div>

          <div className="grid xl:grid-cols-2 gap-x-3 px-3 w-fit h-fit min-h-[20vh] mx-auto rounded-2xl">
            <AverageDisplay resp='pc' header="Average" type="circle" />
            <AverageDisplay resp='pc' header="" type="graph" />
          </div>

          {/* Show Frog */}
          <div className='border-2 rounded-xl shadow-xl border-white py-3 px-5'>
            <div className="overflow-x-auto">
            <h3 className='font-bold text-orange-400 text-2xl border-2 border-white w-fit px-2 py-1 rounded-xl animate-pulse my-5'>Frog</h3>
              <div className="flex w-[85vw] flex-wrap gap-3">
                <div className="flex overflow-x-auto">
                  {users.filter((user) => user.status === 'frog').map((user) => (
                  <div key={user.studentID} className="bg-SC_Cream2 rounded-2xl ml-10 p-4 min-w-[260px]">
                  <h2 className="text-xl uppercase text-SC_Red4 font-bold">{user.name} {user.surname}</h2>
                  <p className="text-SC_Red2">ID: {user.studentID}</p>
                  <p className="text-SC_Red2">Classroom: {user.level}{user.classRoom}</p>
                  <p className="text-SC_Red2">Status: {user.status}</p>
                  </div>
                  ))}
                  
                </div>
              </div>
            </div>
          </div>

        </div>
      ) : (
        <div className="min-h-[85vh] mt-10 flex flex-col gap-y-10 rounded-2xl">
          {/* Display */}
          <div className="grid xl:grid-cols-4 lg:grid-cols-2 gap-x-3 px-3 w-fit h-fit min-h-[20vh] mx-auto rounded-2xl">
            <UserDisplay status="wating" header="Staging Users" />
            <UserDisplay status="pass" header="Pass Users" />
            <UserDisplay status="notpass" header="Not qualified" />
            <UserDisplay status="members" header="Members" />
          </div>

          <div className="grid xl:grid-cols-2 gap-x-3 px-3 w-fit h-fit min-h-[20vh] mx-auto rounded-2xl">
            <AverageDisplay resp='mobie' header="Average" type="circle" />
            <AverageDisplay resp='mobie' header="" type="graph" />
          </div>

          {/* Show Frog */}
          <div className='border-2 rounded-xl shadow-xl border-white py-3 pl-4'>
            <div className="overflow-x-auto">
            <h3 className='font-bold text-orange-400 text-2xl border-2 border-white w-fit px-2 py-1 rounded-xl animate-pulse my-5'>Frog</h3>
              <div className="flex w-[85vw] flex-wrap gap-3">
                <div className="flex overflow-x-auto">
                  {users.filter((user) => user.status === 'frog').map((user) => (
                  <div key={user.studentID} className="bg-SC_Cream2 rounded-2xl ml-10 p-4 min-w-[260px]">
                  <h2 className="text-xl uppercase text-SC_Red4 font-bold">{user.name} {user.surname}</h2>
                  <p className="text-SC_Red2">ID: {user.studentID}</p>
                  <p className="text-SC_Red2">Classroom: {user.level}{user.classRoom}</p>
                  <p className="text-SC_Red2">Status: {user.status}</p>
                  </div>
                  ))}
                  
                </div>
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}

export default Overview;
