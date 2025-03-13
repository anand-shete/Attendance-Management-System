import { Footer, Navbar } from "../components/common";
import {
  HeroSection,
  GetStartedSection,
  DemoSection,
} from "../components/sections";

export default function Home() {
  return (
    <div className="h-screen max-w-screen">
      <Navbar />
      <HeroSection />
      <DemoSection />
      <GetStartedSection />
      <Footer />
    </div>
  );
}
