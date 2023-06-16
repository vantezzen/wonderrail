import React from "react";

function FooterSection({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <div>
      <h3 className="text-sm font-bold tracking-widest text-zinc-100 font-pj">
        {title}
      </h3>
      <ul className="mt-8 space-y-5">{children}</ul>
    </div>
  );
}

export default FooterSection;
