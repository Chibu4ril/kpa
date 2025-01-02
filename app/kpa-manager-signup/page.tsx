"use client";

import Link from "next/link";
import React, { useState } from "react";
import { supabase } from "../../supabaseClient";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Clear previous error messages

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message); // Show error if authentication fails
      } else {
        // Redirect to the dashboard after successful login
        router.push("/dashboard");
      }
    } catch (err) {
      setError("An error occurred during login.");
      console.error(err);
    }
  };

  return (
    <div className="container mx-auto flex flex-col h-dvh">
      <div className="flex flex-col h-dvh justify-center items-center">
        <div className="mb-5">
          <p className="font-extrabold text-center text-4xl ">Welcome!</p>
          <p className=" text-center text-lg">Let’s get started!</p>
        </div>
        <div className="card bg-base-100 w-3/12 shadow-gray-400 shadow-2xl">
          <div className="card-body items-center text-center">
            <form onSubmit={handleLogin}>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Username/Email Address</span>
                </div>
                <label className="input input-bordered flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-70"
                  >
                    <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                    <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                  </svg>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="admin@emailaddress.com"
                    className="grow"
                  />
                </label>
                <div className="label hidden">
                  <span className="label-text-alt">Bottom Left label</span>
                </div>
              </label>

              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Password</span>
                </div>
                <label className="input input-bordered flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-70"
                  >
                    <path
                      fillRule="evenodd"
                      d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <input
                    type="password"
                    placeholder="***********"
                    className="grow"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </label>
                <div className="label flex justify-between">
                  {error && (
                    <span className="label-text-alt hidden error">
                      {error}{" "}
                    </span>
                  )}
                  <span className="text-sm font-semibold hover:underline text-blue-700 ml-auto">
                    <Link href={""}>Forgot password?</Link>
                  </span>
                </div>
              </label>

              <div className="card-actions w-full mt-5">
                <button type="submit" className="btn btn-primary w-full">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
