import { Footer, Navbar } from "@/components/common";
import { Outlet } from "react-router";
import { Toaster } from "@/components/ui/sonner";

export default function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Toaster />
      <Footer />
    </>
  );
}
