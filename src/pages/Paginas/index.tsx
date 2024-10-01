import SupaProvider from "@/Context/context";
import logo from '../../Assets/iconLogo.png'
import { MainInquilinos, NavBar } from "@/Component";
import FooterCM from "@/Component/Footer";
import Head from "next/head";
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import userAuth from "@/utils/userAuth";

const Paginas: React.FC = () => {
    const router = useRouter();

    useEffect(() => {

    }, [router]);

    return <>
        <Head>
            <link rel="icon" href={logo.src} type="image/x-icon" />

            <title>Condominium Management</title>
        </Head>
        <SupaProvider>
            <NavBar></NavBar>
            <MainInquilinos></MainInquilinos>
            <FooterCM></FooterCM>
        </SupaProvider>
    </>
};

export default userAuth(Paginas);

