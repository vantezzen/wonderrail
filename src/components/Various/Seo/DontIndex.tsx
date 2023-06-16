import Head from "next/head";
import React from "react";

function DontIndex() {
  return (
    <Head>
      <meta name="robots" content="noindex nofollow" />
    </Head>
  );
}

export default DontIndex;
