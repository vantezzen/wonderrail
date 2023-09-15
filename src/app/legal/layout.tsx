import Header from "@/components/Landing/Header";
import Footer from "@/components/Layout/Footer/Footer";
import React from "react";

function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-7xl mx-auto p-12">
      <Header />
      <div className="mt-8">{children}</div>
      <Footer />
    </div>
  );
}

export default LegalLayout;
