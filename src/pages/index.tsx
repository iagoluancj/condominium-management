import Head from "next/head";
import logo from '../Assets/iconLogo.png'
import InitialPage from "@/Component/InitialPage";

export default function Home() {

  return (
    <>
      <Head>
        <link rel="icon" href={logo.src} type="image/x-icon" />

        <title>Condominium Management</title>
      </Head>
      <>
        <InitialPage />
      </>
    </>
  );
}
