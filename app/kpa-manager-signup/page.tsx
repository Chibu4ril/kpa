"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { signup } from "./action";

export default function SignupPage() {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      fname: "",
      lname: "",
      email: "",
      password: "",
      cpassword: "",
    },
    validationSchema: Yup.object({
      fname: Yup.string()
        .min(3, "First name must be at least 3 characters")
        .max(50, "First name cannot exceed 50 characters")
        .matches(
          /^[a-zA-Z'-]+$/,
          "First name can only contain letters, hyphens, and apostrophes"
        )
        .required("First name is required"),

      lname: Yup.string()
        .min(3, "Last name must be at least 3 characters")
        .max(50, "Last name cannot exceed 50 characters")
        .matches(
          /^[a-zA-Z'-]+$/,
          "Last name can only contain letters, hyphens, and apostrophes"
        )
        .required("Last name is required"),

      email: Yup.string()
        .email("Invalid email address")
        .matches(
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          "Invalid email format"
        )
        .required("Email is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[0-9]/, "Password must contain at least one number")
        .matches(
          /[@$!%*?&#]/,
          "Password must contain at least one special character (@, $, !, %, *, ?, &, #)"
        )
        .required("Password is required"),
      cpassword: Yup.string()
        .oneOf([Yup.ref("password"), ""], "Passwords must match")
        .required("Confirm password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        formData.append("fname", values.fname);
        formData.append("lname", values.lname);
        formData.append("email", values.email);
        formData.append("password", values.password);

        console.log("Signup successful:");

        // Inspect the formData contents
        for (const [key, value] of formData.entries()) {
          // console.log(`${key}: ${value}`);
          signup(formData);
        }

        router.push("/login"); // Redirect to login on success
      } catch (error) {
        console.error("Signup failed:", error);
      }
    },
  });

  return (
    <div className="container mx-auto flex flex-col h-dvh">
      <div className="flex flex-col h-dvh justify-center items-center">
        <div className="mb-5">
          <p className="font-extrabold text-center text-4xl ">Welcome!</p>
          <p className=" text-center text-lg">Let’s get started!</p>
        </div>
        <div className="card bg-base-100 w-4/12 shadow-gray-400 shadow-2xl">
          <div className="card-body items-center text-center w-full">
            <form className="w-full" onSubmit={formik.handleSubmit}>
              <div className="grid gap-x-4 gap-y-4 grid-cols-2">
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text">First Name</span>
                  </div>
                  <label className="input input-bordered flex items-center gap-2 w-full">
                    <input
                      type="text"
                      id="fname"
                      name="fname"
                      value={formik.values.fname}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      required
                      placeholder="John"
                      className="grow w-full"
                    />
                  </label>
                  {formik.touched.fname && formik.errors.fname ? (
                    <div className="label  text-red-500">
                      <span className="label-text-alt text-red-500">
                        {formik.errors.fname}
                      </span>
                    </div>
                  ) : null}
                </label>

                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text">Last Name</span>
                  </div>
                  <label className="input input-bordered flex items-center gap-2">
                    <input
                      type="text"
                      id="lname"
                      name="lname"
                      value={formik.values.lname}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      required
                      placeholder="Doe"
                      className="grow"
                    />
                  </label>
                  {formik.touched.lname && formik.errors.lname ? (
                    <div className="label  text-red-500">
                      <span className="label-text-alt text-red-500">
                        {formik.errors.lname}
                      </span>
                    </div>
                  ) : null}
                </label>
              </div>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Email Address</span>
                </div>
                <label className="input input-bordered flex items-center gap-2">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                    placeholder="admin@emailaddress.com"
                    className="grow"
                  />
                </label>
                {formik.touched.email && formik.errors.email ? (
                  <div className="label  text-red-500">
                    <span className="label-text-alt text-red-500">
                      {formik.errors.email}
                    </span>
                  </div>
                ) : null}
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
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                  />
                </label>
                {formik.touched.password && formik.errors.password ? (
                  <div className="label  text-red-500">
                    <span className="label-text-alt text-red-500">
                      {formik.errors.password}
                    </span>
                  </div>
                ) : null}
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
                    name="cpassword"
                    value={formik.values.cpassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                  />
                </label>
                {formik.touched.cpassword && formik.errors.cpassword ? (
                  <div className="label text-red-500">
                    <span className="label-text-alt text-red-500">
                      {formik.errors.cpassword}
                    </span>
                  </div>
                ) : null}
              </label>

              <div className="card-actions w-full mt-5">
                <button
                  type="submit"
                  className="btn btn-primary w-full"
                  disabled={formik.isSubmitting}
                >
                  Sign Up
                </button>
                <a href="/login" className="btn btn-outline w-full">
                  Login
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
