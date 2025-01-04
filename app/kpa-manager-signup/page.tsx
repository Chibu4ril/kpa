"use client";

import Link from "next/link";
import React, { useState } from "react";
import { supabase } from "../../supabaseClient";
import { useRouter } from "next/navigation";
import { SignupEmail } from "./action";

export default function SignupPage() {
  const router = useRouter();

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [error, setError] = useState("");

  //   const handleLogin = async (e: React.FormEvent) => {
  //     e.preventDefault();
  //     setError(""); // Clear previous error messages

  //     try {
  //       const { data, error } = await supabase.auth.signInWithPassword({
  //         email,
  //         password,
  //       });

  //       if (error) {
  //         setError(error.message); // Show error if authentication fails
  //       } else {
  //         // Redirect to the dashboard after successful login
  //         router.push("/dashboard");
  //       }
  //     } catch (err) {
  //       setError("An error occurred during login.");
  //       console.error(err);
  //     }
  //   };

  return (
    <div className="container mx-auto flex flex-col h-dvh">
      <div className="flex flex-col h-dvh justify-center items-center">
        <div className="mb-5">
          <p className="font-extrabold text-center text-4xl ">Welcome!</p>
          <p className=" text-center text-lg">Let’s get started!</p>
        </div>
        <div className="card bg-base-100 w-4/12 shadow-gray-400 shadow-2xl">
          <div className="card-body items-center text-center w-full">
            <form className="w-full">
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">First Name</span>
                </div>
                <label className="input input-bordered flex items-center gap-2 w-full">
                  <input
                    type="text"
                    id="fname"
                    value={fname}
                    onChange={(e) => setFname(e.target.value)}
                    required
                    placeholder="John"
                    className="grow w-full"
                  />
                </label>
                <div className="label hidden">
                  <span className="label-text-alt">Bottom Left label</span>
                </div>
              </label>

              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Last Name</span>
                </div>
                <label className="input input-bordered flex items-center gap-2">
                  <input
                    type="text"
                    id="lname"
                    value={lname}
                    onChange={(e) => setLname(e.target.value)}
                    required
                    placeholder="Doe"
                    className="grow"
                  />
                </label>
                <div className="label hidden">
                  <span className="label-text-alt">Bottom Left label</span>
                </div>
              </label>

              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Email Address</span>
                </div>
                <label className="input input-bordered flex items-center gap-2">
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

              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Password</span>
                </div>
                <label className="input input-bordered flex items-center gap-2">
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
              </label>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Confirm Password</span>
                </div>
                <label className="input input-bordered flex items-center gap-2">
                  <input
                    type="password"
                    placeholder="***********"
                    className="grow"
                    id="cpassword"
                    value={cpassword}
                    onChange={(e) => setCpassword(e.target.value)}
                    required
                  />
                </label>
              </label>

              <div className="card-actions w-full mt-5">
                <button
                  formAction={SignupEmail}
                  className="btn btn-primary w-full"
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
