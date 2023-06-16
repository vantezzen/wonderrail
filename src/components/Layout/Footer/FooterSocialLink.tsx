import React from "react";

function FooterSocialLink({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  return (
    <li>
      <a
        href={href}
        target="_blank"
        className="inline-flex items-center justify-center w-10 h-10 text-zinc-900 transition-all duration-200 rounded-full hover:bg-zinc-100 focus:outline-none focus:bg-zinc-200 focus:ring-2 focus:ring-offset-2 focus:ring-zinc-200"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    </li>
  );
}

export default FooterSocialLink;
