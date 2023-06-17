import React, { forwardRef } from "react";

function FooterLink(
  {
    children,
    ...props
  }: {
    children: React.ReactNode;
    href?: string;
  } & React.HTMLAttributes<HTMLAnchorElement>,
  ref: any
) {
  return (
    <li>
      <a
        className="inline-flex text-sm font-normal cursor-pointer text-zinc-200 transition-all duration-300 transform font-pj hover:text-zinc-300 hover:translate-x-1"
        ref={ref}
        {...props}
      >
        {children}
      </a>
    </li>
  );
}

export default forwardRef(FooterLink);