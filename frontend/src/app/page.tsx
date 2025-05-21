// landing page
// import { CallToAction } from "~/sections/CallToAction";
import DoodleBackground from "~/sections/DoodleBackground";
import { Hero } from "~/sections/Hero";
import { Features } from "~/sections/HowItWorks";
import { PathogenicityTimeline } from "~/sections/Timeline";
import { Header } from "~/sections/Header";



export default function HomePage() {
  return (
    <>
    <Header />
    <DoodleBackground />
    <Hero />
    <PathogenicityTimeline />
    <Features />
    {/* <CallToAction /> */}
    </>
  );
}
