// landing page
import DoodleBackground from "~/sections/DoodleBackground";
import { Hero } from "~/sections/Hero";
import { Features } from "~/sections/HowItWorks";
import { PathogenicityTimeline } from "~/sections/Timeline";



export default function HomePage() {
  return (
    <>
    <DoodleBackground />
    <Hero />
    <PathogenicityTimeline />
    <Features />
    </>
  );
}
