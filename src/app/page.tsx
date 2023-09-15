import FinalCta from "@/components/Landing/FinalCta";
import Free from "@/components/Landing/Free";
import Header from "@/components/Landing/Header";
import Hero from "@/components/Landing/Hero";
import Hussle from "@/components/Landing/Hussle";
import Limits from "@/components/Landing/Limits";
import Footer from "@/components/Layout/Footer/Footer";

export default function Home() {
  return (
    <div className="bg-white text-black min-h-screen w-screen">
      <Header />
      <Hero />
      <Hussle />
      <Limits />
      <Free />
      <FinalCta />
      <Footer />
    </div>
  );
}
