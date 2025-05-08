import React from "react";
import { NavLink } from "react-router";

export default function HeroSection() {
  return (
    <div className=" h-[90vh] max-w-screen relative bg-[url(/bg.svg)] bg-center bg-cover bg-slate-300 flex flex-col justify-center items-center px-6 shadow-bg pt-20 shadow-orange-500">
      <div className="absolute inset-0 bg-black opacity-30"></div>
      <div className="relative z-10 text-center ">
        <h1 className="text-3xl md:text-5xl font-bold drop-shadow-lg text-white">
          Welcome to RollCall
        </h1>
        <p className="mt-5 text-lg md:text-2xl text-white opacity-90">
          Track attendance effortlessly, stay organized every day.
        </p>
        <div className="mt-10">
          <button className="mx-5 px-4 py-3 bg-white font-semibold rounded-lg shadow-md hover:bg-orange-500 hover:shadow-custom hover:scale-110 transition cursor-pointer">
            <NavLink to="/teacher/signup">Teacher Signup</NavLink>
          </button>
          <button className="mx-5 px-4 py-3 bg-white font-semibold rounded-lg shadow-md hover:bg-orange-500 hover:shadow-custom hover:scale-110 transition cursor-pointer">
            <NavLink to="/student/signup">Student Signup</NavLink>
          </button>
        </div>
      </div>
    </div>
  );
}
