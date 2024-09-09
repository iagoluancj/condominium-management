import Head from "next/head";

import SupaProvider from "../Context/context";

import { MainInquilinos, NavBar } from "@/Component";
import logo from '../Assets/iconLogo.png'
import FooterCM from "@/Component/Footer";

export default function Home() {

  return (
    <>
      <Head>
        <link rel="icon" href={logo.src} type="image/x-icon" />

        <title>Condominium Management</title>
      </Head>
      <SupaProvider>
        <>
          <NavBar></NavBar>
          <MainInquilinos></MainInquilinos>
          <FooterCM></FooterCM>
        </>
      </SupaProvider>
    </>
  );
}
