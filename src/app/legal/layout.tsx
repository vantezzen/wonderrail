import Navbar from "@/components/Landing/Navbar";
import Footer from "@/components/Layout/Footer/Footer";
import React from "react";

function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-7xl mx-auto p-12">
      <Navbar />
      <div className="mt-8">{children}</div>
      <Footer />
    </div>
  );
}

export default LegalLayout;
