"use client";

import Link from "next/link";
import React, { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      email: Email,
      password: Password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid email or password");
      setLoading(false);
      return;
    }

    router.push("/");
    router.refresh();
  }

  return (
    <div className="w-full h-screen bg-gray-200 absolute flex items-center justify-center">
      <div className="w-[30vw] h-fit border border-zinc-300 bg-gray-200 p-10 flex flex-col items-center gap-3 rounded-md">

        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col items-center gap-3"
        >
          <h1 className="text-3xl font-semibold">
            Login
          </h1>

          <div onClick={() => signIn("github", { callbackUrl: "/" })} className="w-full border border-zinc-300 hover:bg-gray-300 cursor-pointer rounded-md h-12 px-3 flex items-center justify-center text-[18px] mt-10 gap-3 active:scale-98">
            <FaGithub />
            <p>Continue with GitHub</p>
          </div>

          <p>Or continue with email</p>

          <input
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            required
            className="w-full border border-zinc-300 rounded-md h-12 px-3 outline-0"
          />

          <input
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            required
            className="w-full border border-zinc-300 rounded-md h-12 px-3 outline-0"
          />

          {error && (
            <p className="text-red-500">
              {error}
            </p>
          )}

          <input
            type="submit"
            value={loading ? "Logging in..." : "Login"}
            disabled={loading}
            className="w-full bg-zinc-900 text-white cursor-pointer hover:bg-zinc-800 border border-zinc-300 rounded-md h-12 px-3 outline-0"
          />

          <Link href="/register" className="hover:underline">
            Don't have an account? Sign up
          </Link>
        </form>

      </div>
    </div>
  );
};

export default Page;