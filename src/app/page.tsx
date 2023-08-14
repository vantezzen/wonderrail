import FinalCta from "@/components/Landing/FinalCta";
import Hero from "@/components/Landing/Hero";
import Highlights from "@/components/Landing/Highlights";
import Navbar from "@/components/Landing/Navbar";
import Video from "@/components/Landing/Video";
import Footer from "@/components/Layout/Footer/Footer";

export default function Home() {
  return (
    <div
      className="bg-zinc-900 text-brand-50 h-full p-8 md:p-12 max-w-7xl mx-auto overflow-x-hidden"
      style={{
        background:
          "radial-gradient(ellipse 50% 50% at 50% 0%,rgba(103, 65, 217,0.1), rgba(103, 65, 217,0))",
      }}
    >
      <Navbar />
      <Hero />
      <Video />
      <Highlights />
      <FinalCta />
      <Footer />
    </div>
  );
}
