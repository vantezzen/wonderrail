import Head from "next/head";
import React from "react";

function PageTitle({
  title,
  afterBrand = false,
}: {
  title: string;
  afterBrand?: boolean;
}) {
  const text = afterBrand ? `neonFin | ${title}` : `${title} | neonFin`;

  return (
    <Head>
      <title>{text}</title>
    </Head>
  );
}

export default PageTitle;
