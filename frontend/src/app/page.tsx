// landing page
// import { CallToAction } from "~/sections/CallToAction";
import DoodleBackground from "~/sections/DoodleBackground";
import { Hero } from "~/sections/Hero";
import { Features } from "~/sections/HowItWorks";
import { PathogenicityTimeline } from "~/sections/Timeline";
import { Header } from "~/sections/Header";
import { Footer } from "../sections/Footer";
import { Analytics } from "@vercel/analytics/next"

export default function HomePage() {
  return (
    <>
      <Analytics />
      <Header />
      <DoodleBackground />
      <Hero />
      <PathogenicityTimeline />
      <Features />
      {/* <CallToAction /> */}
      <Footer />
    </>
  );
}
