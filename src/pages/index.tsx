import Head from "next/head";

import { Inter } from "next/font/google";
import SupaProvider from "../Context/context";

import NavBar from "@/components/Nav/NavBar";
import Main from "@/components/Main";
import { NextUIProvider } from '@nextui-org/react'

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
