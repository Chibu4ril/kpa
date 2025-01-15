"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signup } from "./action";

export default function SignupPage() {
  return (
    <div className="container mx-auto flex flex-col h-dvh">
      <div className="flex flex-col h-dvh justify-center items-center">
        <div className="mb-5">
          <p className="font-extrabold text-center text-4xl ">Welcome!</p>
          <p className=" text-center text-lg">Let’s get started!</p>
        </div>
        <div className="card bg-base-100 w-3/12 shadow-gray-400 shadow-2xl">
          <div className="card-body items-center text-center w-full">
            <form className="w-full">
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Email Address</span>
                </div>
                <label className="input input-bordered flex items-center gap-2">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="admin@emailaddress.com"
                    className="grow"
                  />
                </label>
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
                    name="password"
                    required
                  />
                </label>
              </label>
              {/* <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Confirm Password</span>
                </div>
                <label className="input input-bordered flex items-center gap-2">
                  <input
                    type="password"
                    placeholder="***********"
                    className="grow"
                    id="cpassword"
                    name="cpassword"
                    required
                  />
                </label>
              </label> */}

              <div className="card-actions w-full mt-5">
                <button formAction={signup} className="btn btn-primary w-full">
                  Sign Up
                </button>

                <div className="text-center mt-5 w-full">
                  <p className="text-gray-600">
                    Don't have an account?
                    <a href="/login" className="text-gray-600 ">
                      {" Login"}
                    </a>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
