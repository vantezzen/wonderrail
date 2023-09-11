import React from "react";
import logoImage from "@/assets/logo_light.png";
import Image from "next/image";

function LoadingScreen({ text }: { text?: string }) {
  return (
    <div className="fixed inset-0 bg-zinc-100 z-50 flex justify-center items-center gap-3 flex-col">
      <Image
        src={logoImage}
        alt="logo"
        width={150}
        height={150}
        className="mb-6"
      />

      {text && (
        <span className="text-zinc-600 text-sm font-medium">{text}</span>
      )}
    </div>
  );
}

export default LoadingScreen;
