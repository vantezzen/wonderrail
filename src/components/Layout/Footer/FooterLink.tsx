import React, { forwardRef } from "react";

function FooterLink(
  {
    children,
    ...props
  }: {
    children: React.ReactNode;
    href?: string;
  } & React.DetailedHTMLProps<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  >,
  ref: any
) {
  return (
    <li>
      <a
        className="inline-flex text-sm font-normal cursor-pointer transition-all duration-300 transform font-pj hover:text-zinc-800 hover:translate-x-1"
        ref={ref}
        {...props}
      >
        {children}
      </a>
    </li>
  );
}

export default forwardRef(FooterLink);
