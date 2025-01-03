"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { SignupEmail } from "./action";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (formData: FormData) => {
    if (formData.get("password") !== formData.get("cpassword")) {
      setError("Passwords do not match");
      return;
    }
    setError("");

    try {
      await SignupEmail(formData);
    } catch (err) {
      setError("Signup failed. Please try again.");
    }
  };

  return (
    <div className="container mx-auto flex flex-col h-dvh">
      <div className="flex flex-col h-dvh justify-center items-center">
        <div className="card bg-base-100 w-4/12 shadow-xl">
          <div className="card-body">
            <form action={handleSubmit}>
              {error && <div className="alert alert-error">{error}</div>}

              <div className="form-control">
                <input
                  name="fname"
                  type="text"
                  placeholder="First Name"
                  required
                  className="input input-bordered"
                />
                <input
                  name="lname"
                  type="text"
                  placeholder="Last Name"
                  required
                  className="input input-bordered mt-2"
                />
                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  required
                  className="input input-bordered mt-2"
                />
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  required
                  className="input input-bordered mt-2"
                />
                <input
                  name="cpassword"
                  type="password"
                  placeholder="Confirm Password"
                  required
                  className="input input-bordered mt-2"
                />
              </div>

              <button type="submit" className="btn btn-primary w-full mt-4">
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
