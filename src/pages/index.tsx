import Head from "next/head";

import SupaProvider from "../Context/context";


import { NextUIProvider } from '@nextui-org/react'
import { MainInquilinos, NavBar } from "@/Components";

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
            <MainInquilinos></MainInquilinos>
            {/* <Nav/> //Criado inicialmente para testes */}
          </>
        </NextUIProvider>
      </SupaProvider>
    </>
  );
}
