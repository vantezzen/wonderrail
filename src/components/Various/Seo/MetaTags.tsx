import Head from "next/head";
import React from "react";
import SplashScreens from "./SplashScreens";

const appConfig = {
  name: "neonFin",
  description:
    "neonFin is the ultimate budget book app that helps you take control of your finances in a fun and easy way.",
  brandColor: "#7E0ADD",
  backgroundColor: "#18181B",
  domain: "https://neonfin.app",
};

function MetaTags() {
  return (
    <Head>
      <meta name="description" content="Your finances" />
      <meta name="application-name" content={appConfig.name} />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-title" content={appConfig.name} />
      <meta
        name="apple-mobile-web-app-status-bar-style"
        content={appConfig.backgroundColor}
      />
      <meta name="description" content={appConfig.description} />
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="msapplication-config" content="none" />
      <meta
        name="msapplication-TileColor"
        content={appConfig.backgroundColor}
      />
      <meta name="msapplication-tap-highlight" content="no" />
      <meta name="theme-color" content={appConfig.backgroundColor} />

      <link rel="apple-touch-icon" href="/pwa-icon/512.png" />
      <link rel="apple-touch-icon" sizes="152x152" href="/pwa-icon/152.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/pwa-icon/180.png" />
      <link rel="apple-touch-icon" sizes="167x167" href="/pwa-icon/167.png" />

      <link rel="icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="32x32" href="/pwa-icon/32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/pwa-icon/16.png" />
      <link rel="manifest" href="/manifest.json" />
      <link
        rel="mask-icon"
        href="/icons/safari-pinned-tab.svg"
        color="#5bbad5"
      />
      <link rel="shortcut icon" href="/favicon.ico" />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:url" content={appConfig.domain} />
      <meta name="twitter:title" content={appConfig.name} />
      <meta name="twitter:description" content={appConfig.description} />
      <meta
        name="twitter:image"
        content={`${appConfig.domain}/pwa-icons/192.png`}
      />
      <meta name="twitter:creator" content="@vantezzen" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={appConfig.name} />
      <meta property="og:description" content={appConfig.description} />
      <meta property="og:site_name" content={appConfig.name} />
      <meta property="og:url" content={appConfig.domain} />
      <meta
        property="og:image"
        content={`${appConfig.domain}/pwa-icons/512.png`}
      />

      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
      />

      <SplashScreens />
    </Head>
  );
}

export default MetaTags;
