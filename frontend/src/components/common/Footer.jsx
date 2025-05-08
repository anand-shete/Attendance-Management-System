import { NavLink } from "react-router";

export default function Footer() {
  return (
    <footer className="w-full bg-black text-white py-6 text-center">
      <p>© 2025 RollCall. All rights reserved.</p>
      <div className="flex justify-center gap-4 mt-2">
        <NavLink
          to="https://github.com/anand-shete/Attendance-Management-System"
          target="_blank"
          className="hover:underline hover:text-slate-300"
        >
          GitHub
        </NavLink>
        <NavLink
          to="/"
          className="hover:underline hover:text-slate-300"
        >
          Privacy Policy
        </NavLink>
        <NavLink
          to="/"
          className="hover:underline hover:text-slate-300"
        >
          Terms of Service
        </NavLink>
      </div>
    </footer>
  );
}
