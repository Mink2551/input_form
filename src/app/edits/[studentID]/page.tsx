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
  const [user, setUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    params.then((resolvedParams) => {
      setStudentID(resolvedParams.studentID);
    });
  }, [params]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/users/${studentID}`, {
          cache: "no-store",
          method: "GET",
        });
  
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
  
        const data = await res.json();
        setUser(data.user || null);
        setFormData(data.user || null); // Initialize formData with fetched user data
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
  
    if (studentID) {
      getUser();
    }
  }, [studentID]); // No need to add getUser as a dependency here  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (formData) {
      setFormData((prev) => (prev ? { ...prev, [name]: value } : null));
    }
  };

  const deleteUser = async () => {
    const isConfirmed = window.confirm("Are you sure you want to delete this user?");
    if (!isConfirmed) {
        return; // ถ้าผู้ใช้กดยกเลิก ให้หยุดการทำงาน
    }

    try {
        const res = await fetch(`/api/users/${studentID}`, {
            method: "DELETE",
        });

        if (!res.ok) {
            throw new Error("Failed to delete user");
        }

        alert("User deleted successfully!");
        router.push("/DashBoard/main");
    } catch (error) {
        console.error("Error deleting user:", error);
        alert("Failed to delete user.");
    }
};


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData) {
      try {
        const res = await fetch(`/api/users/${studentID}`, {
          method: "PUT", // Use PUT to update the user data
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (res.ok) {
            window.location.reload()
        } else {
          alert("Failed to update user");
        }
      } catch (error) {
        console.error("Error updating user:", error);
        alert("An error occurred while updating the user.");
      }
    }
  };

  if (!studentID || !formData) {
    return <div className="w-fit mx-auto my-auto h-screen items-center flex text-7xl font-bold">Loading...</div>;
  }

  return (
    <div className="bg-dashboard lg:h-[120vh] h-[130vh] flex flex-col">
      {/* Search Bar */}
      <QuickChange userID={studentID} />
      {/* Arrow Back */}
      <GoBack />
      {/* Display */}
      <div className="bg-white w-[95vw] lg:h-[105vh] h-[120vh] rounded-xl shadow-2xl bg-opacity-55 mx-auto flex top-20 relative">
        {/* White Card */}
        {user ? (
          <div className="p-5 w-[100%] h-full">
            {/* Header Name and Status */}
            <div className="justify-between flex">
              <h2 className="text-xl font-medium text-gray-500">
                <span className="text-SC_Red4 font-bold">FullName : </span>
                {user.name} {user.surname}
              </h2>
              <p className="text-SC_Red4 font-medium text-xl">
                <span className="font-bold">Status:</span>{" "}
                <span
                  className={`animate-pulse ${
                    user.status === "wating"
                      ? "text-lime-600"
                      : user.status === "pass"
                      ? "text-yellow-600"
                      : user.status === "notpass"
                      ? "text-SC_Red2"
                      : user.status === "frog"
                      ? "text-orange-500 font-bold"
                      : "text-pink-500"
                  }`}
                >
                  {user.status === "wating"
                    ? "Staging"
                    : user.status === "pass"
                    ? "Pass"
                    : user.status === "notpass"
                    ? "Not Pass"
                    : user.status === "frog"
                    ? "Frog"
                    : "Members"}
                </span>
              </p>
            </div>
            {/* hr Border */}
            <hr className="w-[40%] min-w-[300px] my-3 border-SC_Red3" />
            {/* Student ID */}
            <div className="text-SC_Red4 text-xl font-bold">
              StudentID :{" "}
              <span className="text-gray-500 font-medium">{user.studentID}</span>
            </div>
            {/* User Introduction */}
            <div className="bg-SC_Cream2 my-5 min-w-[85vw] font-bold text-SC_Red4 min-h-[200px] rounded-xl shadow-xl p-5 w-[50vw] overflow-y-scroll custom-scrollbar max-h-[315px]">
              Introduce :
              <div className="text-gray-500 ml-7 font-medium">
                {user.introductionSelf}
              </div>
            </div>
            
             {/* RatedSelf Class Zone */}
             <div className="md:flex grid gap-y-5 justify-between w-[90%] mx-auto">
              <div className="text-SC_Red4 text-xl font-bold">
                RatedSelf :{" "}
                <span className="text-gray-500 font-medium">{user.ratedSelf}/10</span>
              </div>
              <div className="text-SC_Red4 text-xl font-bold">
                Class :{" "}
                <span className="text-gray-500 font-medium">{user.level}{user.classRoom}</span>
              </div>
            </div>
            
            {/* hr Border */}
            <hr className="w-[40%] min-w-[300px] my-3 border-SC_Red3" />

            {/* Edit Section */}
            <h2 className="text-2xl font-bold text-SC_Red2 my-2">Edit Information</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid lg:grid-cols-2 gap-5">
                {/* Name */}
                <div>
                  <label className="block text-SC_Red4 font-medium">Name:</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded shadow-md"
                  />
                </div>

                {/* Surname */}
                <div>
                  <label className="block text-SC_Red4 font-medium">Surname:</label>
                  <input
                    type="text"
                    name="surname"
                    value={formData.surname}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded shadow-md"
                  />
                </div>
              </div>

              {/* Status */}
              <div>
                <label className="block text-SC_Red4 font-medium">Status:</label>
                <div className="flex space-x-4">
                  {["pass", "notpass"].map((value) => (
                    <label key={value} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="status"
                        value={value}
                        checked={formData.status === value}
                        onChange={handleInputChange}
                        className="border-l-4 border-SC_Red2"
                      />
                      <span>{value === "pass" ? "Pass" : "Not Pass"}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Level */}
              <div>
                <label className="block text-SC_Red4 font-medium">Level:</label>
                <div className="flex space-x-4">
                  {["M1", "M2", "M3", "M4", "M5", "M6"].map((value) => (
                    <label key={value} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="level"
                        value={value}
                        checked={formData.level === value}
                        onChange={handleInputChange}
                        className="border-l-4 border-SC_Red2"
                      />
                      <span>{value}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Class */}
              <div>
                <label className="block text-SC_Red4 font-medium">Class:</label>
                <div className="flex space-x-4">
                  {["/1", "/2", "/3", "/4"].map((value) => (
                    <label key={value} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="classRoom"
                        value={value}
                        checked={formData.classRoom === value}
                        onChange={handleInputChange}
                        className="border-l-4 border-SC_Red2"
                      />
                      <span>{value}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="bg-green-400 text-white font-bold p-2 rounded-xl shadow-xl"
              >
                Confirm Editing
              </button>
            </form>
            <button
                className="bg-red-400 mt-5 text-white font-bold p-2 rounded-xl shadow-xl"
                onClick={deleteUser}
              >
                Delete User
              </button>
          </div>
        ) : (
          <p className="text-4xl font-bold text-SC_Red4 mt-3 mx-auto">No user found</p>
        )}
      </div>
    </div>
  );
}

export default EditsUserPage;
