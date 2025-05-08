import { Footer, Navbar } from "@/components/common";
import { Outlet } from "react-router";
import { Toaster } from "@/components/ui/sonner";

export default function Layout() {
  return (
    <div className="h-screen max-w-screen">
      <Navbar />
      <Outlet />
      <Toaster />
      <Footer />
    </div>
  );
}
