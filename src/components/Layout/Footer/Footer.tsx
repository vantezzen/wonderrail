"use client";
import dynamic from "next/dynamic";
import Link from "next/link";
import React from "react";

const FooterSection = dynamic(() => import("./FooterSection"));
const FooterLink = dynamic(() => import("./FooterLink"));
const FooterSocialLink = dynamic(() => import("./FooterSocialLink"));

function Footer() {
  return (
    <footer className="py-12 sm:pt-16 lg:pt-20">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 mt-16 sm:grid-cols-3 gap-y-16 lg:grid-cols-6 gap-x-16">
          <FooterSection title="WonderRail">
            <Link href="/" legacyBehavior>
              <FooterLink>Homepage</FooterLink>
            </Link>
            <Link href="/auth" legacyBehavior>
              <FooterLink>Sign in</FooterLink>
            </Link>
            <Link href="/app" legacyBehavior>
              <FooterLink>Dashboard</FooterLink>
            </Link>
            <FooterLink
              href="https://github.com/vantezzen/wonderrail"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </FooterLink>
          </FooterSection>
          <FooterSection title="Legal">
            <Link href="/legal/terms" legacyBehavior>
              <FooterLink>Terms of Service</FooterLink>
            </Link>
            <Link href="/legal/privacy" legacyBehavior>
              <FooterLink>Privacy policy</FooterLink>
            </Link>
            <Link href="/legal/impressum" legacyBehavior>
              <FooterLink>Impressum</FooterLink>
            </Link>
          </FooterSection>
        </div>
        <hr className="mt-16 border-zinc-200" />
        <div className="mt-8 sm:flex sm:items-center sm:justify-between">
          <p className="mt-8 text-sm font-normal text-zinc-600 font-pj sm:order-1 sm:mt-0">
            © Copyright {new Date().getFullYear()}{" "}
            <a href="https://vantezzen.io">vantezzen</a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
