import { NavLink, useLocation } from "react-router";
import { useState } from "react";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import { Github } from "lucide-react";

export default function Navbar() {
  const teacher = useSelector((state) => state.teacher);
  const student = useSelector((state) => state.student);
  const [isOpen, setIsOpen] = useState(false);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const { pathname } = useLocation();
  return (
    <nav className="fixed z-50 w-full h-22 flex flex-row justify-around items-center bg-slate-800 text-white border-b-1 bg-opacity-95">
      {/* Navbar */}
      <NavLink to="/">
        <img
          src="/logos/logo.png"
          alt="RollCall_logo"
          className="h-40  rounded-lg bg-slate-800"
        />
      </NavLink>

      {/* Home button for mobile devices */}
      <ul className="flex flex-row justify-center items-center space-x-5 lg:space-x-16">
        <li className="px-2 py-2 rounded-md md:hidden hover:bg-orange-500 hover:text-black hover:shadow-custom hover:shadow-orange-300 hover:scale-120 transition cursor-pointer">
          {pathname.length === 1 && <NavLink to="/">Home</NavLink>}
          {pathname.startsWith("/teacher") && (
            <NavLink to="/teacher/dashboard">Dashboard</NavLink>
          )}
          {pathname.startsWith("/student") && (
            <NavLink to="/student/dashboard">Dashboard</NavLink>
          )}
        </li>

        {/* Home button For width >= 768px */}
        <li className="px-3 py-2 rounded-md hidden md:block hover:bg-orange-500 hover:text-black hover:shadow-custom hover:shadow-orange-300 hover:scale-120 transition cursor-pointer">
          <NavLink to="/">Home</NavLink>
        </li>
        {pathname.startsWith("/teacher") && (
          <li className="px-3 py-2 rounded-md hidden md:block hover:bg-orange-500 hover:text-black hover:shadow-custom hover:shadow-orange-300 hover:scale-120 transition cursor-pointer">
            <NavLink to="/teacher/dashboard">Dashboard</NavLink>
          </li>
        )}
        {pathname.startsWith("/student") && (
          <li className="px-3 py-2 rounded-md hidden md:block hover:bg-orange-500 hover:text-black hover:shadow-custom hover:shadow-orange-300 hover:scale-120 transition cursor-pointer">
            <NavLink to="/student/dashboard">Dashboard</NavLink>
          </li>
        )}
        <li className="px-3 py-2 rounded-md hidden md:block hover:bg-orange-500 hover:text-black hover:shadow-custom hover:shadow-orange-300 hover:scale-120 transition cursor-pointer">
          <NavLink
            to="https://github.com/anand-shete/Attendance-Management-System?tab=readme-ov-file#attendance-management-system"
            target="_blank"
          >
            Read the Guide
          </NavLink>
        </li>

        {/* Getting Started */}
        {pathname.length == 1 && (
          <li className="px-3 py-2 rounded-md hidden md:block hover:bg-orange-500 hover:text-black hover:shadow-custom hover:shadow-orange-300 hover:scale-120 transition cursor-pointer">
            <NavLink
              to="#gettingStarted"
              onClick={() =>
                document
                  .getElementById("gettingStarted")
                  .scrollIntoView({ behavior: "smooth" })
              }
            >
              Get Started
            </NavLink>
          </li>
        )}

        {/* Teacher Profile dropdown */}
        {teacher._id && pathname.startsWith("/teacher") && (
          <div className="hover:shadow-custom hover:shadow-orange-300 rounded-md group">
            <Button
              className="w-32 relative rounded-md hidden md:block text-white group-hover:text-black group-hover:bg-orange-500 cursor-pointer"
              onClick={() => setIsDropDownOpen(!isDropDownOpen)}
            >
              {teacher.fullname}
              <svg
                className="absolute top-[12px] left-[94px] cursor-pointer group-hover:text-black"
                onClick={() => setIsDropDownOpen(!isDropDownOpen)}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </Button>
            {isDropDownOpen && (
              <div className="absolute mt-2 rounded-md shadow-lg bg-orange-50 text-gray-700">
                <NavLink
                  to="/teacher/dashboard"
                  className="block px-4 py-2 rounded-sm hover:bg-orange-200 transition-colors"
                  onClick={() => setIsDropDownOpen(false)}
                >
                  Dashboard
                </NavLink>
                <NavLink
                  to="/teacher/logout"
                  className="block px-4 py-2 rounded-sm hover:bg-orange-200 transition-colors"
                  onClick={() => setIsDropDownOpen(false)}
                >
                  Logout
                </NavLink>
              </div>
            )}
          </div>
        )}

        {/* Student Profile dropdown */}
        {student._id && pathname.startsWith("/student") && (
          <div className="hover:shadow-custom hover:shadow-orange-300 rounded-md group">
            <Button
              className="w-full relative rounded-md hidden md:block text-white group-hover:text-black group-hover:bg-orange-500 cursor-pointer"
              onClick={() => setIsDropDownOpen(!isDropDownOpen)}
            >
              {student.fullname}
              <svg
                className="absolute top-[12px] left-[94px] cursor-pointer group-hover:text-black"
                onClick={() => setIsDropDownOpen(!isDropDownOpen)}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </Button>
            {isDropDownOpen && (
              <div className="absolute mt-2 rounded-md shadow-lg bg-orange-50 text-gray-700">
                <NavLink
                  to="/student/dashboard"
                  className="block px-4 py-2 rounded-sm hover:bg-orange-200 transition-colors"
                  onClick={() => setIsDropDownOpen(false)}
                >
                  Dashboard
                </NavLink>
                <NavLink
                  to="/student/scan"
                  className="block px-4 py-2 rounded-sm hover:bg-orange-200 transition-colors"
                  onClick={() => setIsDropDownOpen(false)}
                >
                  Scan QR Code
                </NavLink>
                <NavLink
                  to="/student/logout"
                  className="block px-4 py-2 rounded-sm hover:bg-orange-200 transition-colors"
                  onClick={() => setIsDropDownOpen(false)}
                >
                  Logout
                </NavLink>
              </div>
            )}
          </div>
        )}
      </ul>

      {/* Hamburger Menu */}
      <NavLink className="md:hidden">
        <Button
          variant="default"
          size="icon"
          className="h-12 w-12 -z-50"
          onClick={() => setIsOpen(!isOpen)}
        >
          <img src="/logos/HamBurger.png" alt="hamburger-logo" />
        </Button>
      </NavLink>

      {/* Dropdown Menu */}
      <div
        className={`fixed left-0 right-0 top-0 z-40 bg-white shadow-lg transition-all duration-300 ${
          isOpen ? "translate-y-0" : "-translate-y-100"
        }`}
      >
        {pathname.length === 1 && (
          <div className="flex flex-col space-y-4 p-4">
            <NavLink to="/" onClick={() => setIsOpen(!isOpen)}>
              <Button className="w-full">Home</Button>
            </NavLink>
            <NavLink to="/teacher/signup" onClick={() => setIsOpen(!isOpen)}>
              <Button className="w-full">Register as Teacher</Button>
            </NavLink>
            <NavLink to="/student/signup" onClick={() => setIsOpen(!isOpen)}>
              <Button className="w-full">Register as Student</Button>
            </NavLink>
          </div>
        )}
        {pathname.startsWith("/teacher") && (
          <div className="flex flex-col space-y-4 p-4">
            <NavLink to="/teacher/dashboard" onClick={() => setIsOpen(!isOpen)}>
              <Button className="w-full">Dashboard</Button>
            </NavLink>
            <NavLink to="/teacher/signup" onClick={() => setIsOpen(!isOpen)}>
              <Button className="w-full">Teacher Sign Up</Button>
            </NavLink>
            <NavLink to="/teacher/logout" onClick={() => setIsOpen(!isOpen)}>
              <Button className="w-full">Logout</Button>
            </NavLink>
          </div>
        )}
        {pathname.startsWith("/student") && (
          <div className="flex flex-col space-y-4 p-4">
            <NavLink to="/student/dashboard" onClick={() => setIsOpen(!isOpen)}>
              <Button className="w-full">Dashboard</Button>
            </NavLink>
            <NavLink to="/student/signup" onClick={() => setIsOpen(!isOpen)}>
              <Button className="w-full">Student Sign Up</Button>
            </NavLink>
            <NavLink to="/student/logout" onClick={() => setIsOpen(!isOpen)}>
              <Button className="w-full">Logout</Button>
            </NavLink>
          </div>
        )}
      </div>

      {/* Source Code */}
      <NavLink
        to="https://github.com/anand-shete/Attendance-Management-System"
        target="_blank"
        className="px-2 hidden md:flex flex-row items-center rounded-xl border-1 border-white bg-black hover:scale-120 transition hover:shadow-custom hover:shadow-white"
      >
        <Github className="h-10 w-10" />
        <span>Code</span>
      </NavLink>
    </nav>
  );
}
