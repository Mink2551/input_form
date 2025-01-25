"use client";

import { FaArrowLeft } from "react-icons/fa";
import React, { useState, useEffect, JSX } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

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

const GoBack = (): JSX.Element => {
  return (
    <div className="absolute mt-5 ml-5 text-3xl text-gray-500 animate-pulse">
      <Link href="../../DashBoard/main">
        <FaArrowLeft />
      </Link>
    </div>
  );
};

const QuickChange = ({ userID }: { userID: string }): JSX.Element => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleChanging = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/edits/${searchQuery}`);
    }
  };

  return (
    <div className="mb-5 flex right-[10%] mt-5 absolute text-center">
      <form onSubmit={handleChanging}>
        <input
          type="text"
          placeholder={`Quick Change ${userID}`}
          className="p-2 border max-w-[300px] w-[50vw] border-none shadow-2xl rounded"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          maxLength={5}
        />
        <button className="bg-SC_Red2 text-white p-2 rounded-r-lg" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

function EditsUserPage({ params }: { params: Promise<{ studentID: string }> }) {
  const [studentID, setStudentID] = useState<string | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    params.then((resolvedParams) => {
      setStudentID(resolvedParams.studentID);
    });
  }, [params]);

  useEffect(() => {
    if (studentID) {
      getUsers();
    }
  }, [studentID]);

  const getUsers = async () => {
    try {
      const res = await fetch(`/api/users/${studentID}`, {
        cache: "no-store",
        method: "GET",
      });

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await res.json();
      setUsers(data.user ? [data.user] : []);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  if (!studentID) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-dashboard min-h-[100vh]">
      <QuickChange userID={studentID} />
      <GoBack />
      {/* Display */}
      <div className="bg-white w-[95vw] min-h-[90vh] rounded-xl shadow-2xl bg-opacity-55 mx-auto flex top-20 relative">
        {users.length > 0 ? (
          <div className="p-5 w-[100%]">
            <div className="justify-between flex">
                <h2 className="text-xl font-medium text-gray-500"><span className="text-SC_Red4 font-bold">Username</span> {users[0].name} {users[0].surname}</h2>
                <p className="text-SC_Red4 font-medium text-xl"><span className="font-bold">Status:</span> <span className={`${users[0].status === 'wating'? "text-lime-600" : users[0].status === 'pass'? "text-yellow-600" : users[0].status === 'notpass'? "text-SC_Red2 " : "text-pink-500"}`}>{users[0].status === 'wating'? "Staging" : users[0].status === 'pass'? "Pass" : users[0].status === 'notpass'? "Not Pass" : "Members"}</span></p>
            </div>
            <hr className="w-[40%] min-w-[300px] my-3 border-SC_Red3"/>
          </div>
        ) : (
          <p className="text-4xl font-bold text-SC_Red4 mt-3 mx-auto">No user found</p>
        )}
      </div>
    </div>
  );
}

export default EditsUserPage;
