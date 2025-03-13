import React from "react";
import { NavLink } from "react-router";

export default function HeroSection() {
  return (
    <div className=" h-[70vh] max-w-screen relative bg-[url(/bg.jpeg)] bg-slate-300 2xl:bg-cover flex flex-col justify-center items-center px-6">
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <div className="relative z-10 text-center">
        <h1 className="text-3xl md:text-5xl font-bold drop-shadow-lg text-white">
          Attendance Management System
        </h1>
        <p className="mt-4 text-lg md:text-2xl text-white opacity-90">
          Scan. Track. Manage. All in one place.
        </p>
        <button className="mt-10 mx-5 px-4 py-3 bg-white font-semibold rounded-lg shadow-md hover:bg-orange-500 hover:shadow-custom hover:scale-110 transition cursor-pointer">
          <NavLink to="/teacher/signup">Teacher Signup</NavLink>
        </button>
        <button className="mt-10 mx-5 px-4 py-3 bg-white font-semibold rounded-lg shadow-md hover:bg-orange-500 hover:shadow-custom hover:scale-110 transition cursor-pointer">
          <NavLink to="/student/signup">Student Signup</NavLink>
        </button>
      </div>
    </div>
  );
}
