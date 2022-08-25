import Head from "next/head";

export default function Meta({ title, keywords, description }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/src/assets/WatchpointLogo.jpg" />

        <meta name="keywords" content="{keywords}" />
        <meta name="description" content="{description}" />

        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
    </>
  );
}
