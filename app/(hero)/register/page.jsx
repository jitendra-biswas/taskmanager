"use client";
import Link from "next/link";
import React, { useState } from "react";
import { FaGithub } from "react-icons/fa";
import {registerUser} from "../../actions/userAction"
import { toast } from "react-toastify";
import { SiGnuprivacyguard } from "react-icons/si";

const page = () => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [UserName, setUserName] = useState("");
  async function handleSubmit(e){
    e.preventDefault()
    try {
        await registerUser(UserName,Email,Password)
        setUserName("")
        setEmail("")
        setPassword("")
        toast.success("User register successfully");
    } catch (error) {
        console.log(error)
    }


  }
  return (
    <>
      <div className="w-full h-screen bg-gray-200 absolute flex items-center justify-center">
        <div className="w-[30vw] h-fit border border-zinc-300 bg-gray-200 p-10 flex flex-col items-center gap-3 rounded-md">
          <form onSubmit={handleSubmit} className=" w-full flex flex-col items-center gap-3 ">
            <h1 className="text-3xl font-semibold">Create Account</h1>
            <SiGnuprivacyguard className="text-5xl" />
            <p>Continue with email & password</p>
            <input
              value={UserName}
              name="username"
              onChange={(e) => setUserName(e.target.value)}
              type="text"
              placeholder="Usename"
              className="w-full border border-zinc-300 rounded-md h-12 px-3 outline-0"
            />
            <input
              value={Email}
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
              className="w-full border border-zinc-300 rounded-md h-12 px-3 outline-0"
            />
            <input
              value={Password}
              name="passowrd"
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              className="w-full border border-zinc-300 rounded-md h-12 px-3 outline-0"
            />
            <input
              type="submit"
              value="Sign Up"
              className="w-full bg-zinc-900 text-white cursor-pointer hover:bg-zinc-800 border border-zinc-300 rounded-md h-12 px-3 outline-0"
            />
            <Link href="/signin" className="hover:underline">
              Already have and account? Sign in
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default page;
