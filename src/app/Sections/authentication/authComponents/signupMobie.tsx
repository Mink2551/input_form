"use client";

import React, { useState, useEffect } from "react";

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

function SignupMobile() {
  const [StudentID, setStudentID] = useState("");
  const [name, setName] = useState(""); 
  const [surname, setSurname] = useState(""); 
  const [level, setLevel] = useState(""); 
  const [classRoom, setClassRoom] = useState(""); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [lineID, setLineID] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [discord, setDiscord] = useState("");
  const [discordID, setDiscordID] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [inputSections, setInputSections] = useState(1);

  const [users, setUsers] = useState<User[]>([]);

  const getUsers = async () => {
    try {
      const res = await fetch("/api/users", {
        cache: "no-store",
        method: "GET",
      });

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await res.json();
      setUsers(data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const clearForm1 = () => {
    setStudentID("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const clearForm2 = () => {
    setLineID("");
    setPhoneNo("");
    setFacebook("");
    setInstagram("");
  };

  const clearForm3 = () => {
    setDiscord("");
    setDiscordID("");
    setBirthDate("");
  };

  const handleSubmitForm1 = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const resCheckUser = await fetch("/api/auth/checkUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    });

    if (!resCheckUser.ok) {
      throw new Error("Network response was not ok");
    }

    const { member } = await resCheckUser.json();

    if (member) {
      setError("Email already exists");
      return;
    }

    if (!StudentID || !email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const matchedUser = users.find(
      (user) => user.studentID === Number(StudentID) && user.status === "pass"
    );

    if (!matchedUser) {
      setError("Student ID not valid or does not have 'pass' status");
      return;
    }

    // กำหนดค่าที่ดึงมาจากผู้ใช้ใน `users`
    setStatus('members');
    setName(matchedUser.name);
    setSurname(matchedUser.surname);
    setLevel(matchedUser.level);
    setClassRoom(matchedUser.classRoom);

    console.log("Form 1 Success");
    setInputSections(2);
  };

  const handleSubmitForm2 = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (!lineID || !phoneNo || !facebook || !instagram) {
      setError("Please fill in all fields");
    } else {
      console.log("Form 2 Success");
      setInputSections(3);
    }
  };

  const handleSubmitForm3 = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (!discord || !discordID || !birthDate) {
      setError("Please fill in all fields");
    } else {
      console.log("Form 3 Success");
      clearForm1();
      clearForm2();
      clearForm3();
    }

    try {
      console.log(`Sending data to /api/auth/register`);
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          StudentID,
          email,
          password,
          lineID,
          phoneNo,
          facebook,
          instagram,
          discord,
          discordID,
          birthDate,
          name,  // ส่งชื่อ
          surname,  // ส่งนามสกุล
          level,  // ส่งระดับ
          classRoom,  // ส่งห้องเรียน
          status
        }),
      });

      const data = await res.json();
      console.log("Register Response:", data);

      console.log(`Updating status of StudentID: ${StudentID}`);
      const updateStatusRes = await fetch(`/api/users/${StudentID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: "members", // เปลี่ยนสถานะเป็น 'member'
        }),
      });

      if (res.ok) {
        setError("");
        setSuccess("Register Success");
      }

      const updateStatusData = await updateStatusRes.json();
      console.log("Update Status Response:", updateStatusData);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      {inputSections === 1 ? (
        <form onSubmit={handleSubmitForm1} className="flex flex-col gap-5 w-[90%] mx-auto my-7">
          <input
            value={StudentID}
            onChange={(e) => setStudentID(e.target.value)}
            type="text"
            className="bg-red-600 border-gray-100 font-medium border-b-2 w-[100%] pr-4 flex mx-auto text-gray-300"
            placeholder="Enter Your StudentID"
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="bg-red-600 border-gray-100 font-medium border-b-2 w-[100%] pr-4 flex mx-auto text-gray-300"
            placeholder="Enter Your Email"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="bg-red-600 border-gray-100 font-medium border-b-2 w-[100%] pr-4 flex mx-auto text-gray-300"
            placeholder="Enter Your Password"
          />
          <input
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            className="bg-red-600 border-gray-100 font-medium border-b-2 w-[100%] pr-4 flex mx-auto text-gray-300"
            placeholder="Confirm Your Password"
          />
          <button
            type="submit"
            className="w-fit px-4 py-1.5 text-red-600 shadow-xl hover:bg-SC_Red3 duration-200 font-bold bg-white rounded-xl"
          >
            Submit
          </button>
        </form>
      ) : inputSections === 2 ? (
        <form onSubmit={handleSubmitForm2} className="flex flex-col gap-5 w-[90%] mx-auto my-7">
          <input
            value={phoneNo}
            onChange={(e) => setPhoneNo(e.target.value)}
            type="text"
            className="bg-red-600 border-gray-100 font-medium border-b-2 w-[100%] pr-4 flex mx-auto text-gray-300"
            placeholder="Enter Your Phone Number"
          />
          <input
            value={lineID}
            onChange={(e) => setLineID(e.target.value)}
            type="text"
            className="bg-red-600 border-gray-100 font-medium border-b-2 w-[100%] pr-4 flex mx-auto text-gray-300"
            placeholder="Enter Your LineID"
          />
          <input
            value={facebook}
            onChange={(e) => setFacebook(e.target.value)}
            type="text"
            className="bg-red-600 border-gray-100 font-medium border-b-2 w-[100%] pr-4 flex mx-auto text-gray-300"
            placeholder="Enter Your Facebook User or -"
          />
          <input
            value={instagram}
            onChange={(e) => setInstagram(e.target.value)}
            type="text"
            className="bg-red-600 border-gray-100 font-medium border-b-2 w-[100%] pr-4 flex mx-auto text-gray-300"
            placeholder="Enter Your Instagram User or -"
          />
          <button
            type="submit"
            className="w-fit px-4 py-1.5 text-red-600 shadow-xl hover:bg-SC_Red3 duration-200 font-bold bg-white rounded-xl"
          >
            Submit
          </button>
        </form>
      ) : (
        <form onSubmit={handleSubmitForm3} className="flex flex-col gap-5 w-[90%] mx-auto my-7">
          <input
            value={discord}
            onChange={(e) => setDiscord(e.target.value)}
            type="text"
            className="bg-red-600 border-gray-100 font-medium border-b-2 w-[100%] pr-4 flex mx-auto text-gray-300"
            placeholder="Enter Your Discord Username"
          />
          <input
            value={discordID}
            onChange={(e) => setDiscordID(e.target.value)}
            type="text"
            className="bg-red-600 border-gray-100 font-medium border-b-2 w-[100%] pr-4 flex mx-auto text-gray-300"
            placeholder="Discord User ID Example '#1317'"
          />
          <label className="text-gray-100 font-medium">
            Enter Your BirthDate
            <input
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              type="date"
              className="bg-red-600 mt-2 text-gray-400 border-gray-100 font-medium border-b-2 w-[100%] pr-4 flex mx-auto"
            />
          </label>
          <button
            type="submit"
            className="w-fit px-4 py-1.5 text-red-600 shadow-xl hover:bg-SC_Red3 duration-200 font-bold bg-white rounded-xl"
          >
            Submit
          </button>
        </form>
      )}

      {error && (
        <p className="text-red-500 bg-white rounded-b-xl font-medium text-center">{error}</p>
      )}
      {success && (
        <p className="text-green-500 bg-white rounded-b-xl font-medium text-center">{success}</p>
      )}
    </div>
  );
}

export default SignupMobile;
