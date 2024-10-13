import SupaProvider from "@/Context/context";
import logo from '../../Assets/iconLogo.png'
import { MainInquilinos, NavBar } from "@/Component";
import FooterCM from "@/Component/Footer";
import Head from "next/head";
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import userAuth from "@/utils/userAuth";
import { StylesPage } from "@/styles/pageStyles";

const Paginas: React.FC = () => {
    const router = useRouter();

    useEffect(() => {

    }, [router]);

    return <>
        <Head>
            <link rel="icon" href={logo.src} type="image/x-icon" />

            <title>Funções - Condominium Management</title>
        </Head>
        <SupaProvider>
            <StylesPage>
                <NavBar></NavBar>
                <MainInquilinos></MainInquilinos>
                <FooterCM></FooterCM>
            </StylesPage>
        </SupaProvider>
    </>
};

// export default Paginas;
export default userAuth(Paginas);


