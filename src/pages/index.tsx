import Head from "next/head";

import { Inter } from "next/font/google";
import SupaProvider from "../Context/context";


import { NextUIProvider } from '@nextui-org/react'
import NavBar from "@/components/Nav/NavBar";
import Main from "@/components/Main/index";

export default function Home() {

  return (
    <>
      <Head>
        <title>Condominium Management</title>
      </Head>
      <SupaProvider>
        <NextUIProvider>
          <>
          <NavBar></NavBar>
          <Main></Main>
            {/* <Nav/> //Criado inicialmente para testes */}
          </>
        </NextUIProvider>
      </SupaProvider>
    </>
  );
}
