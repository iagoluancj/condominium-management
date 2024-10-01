// pages/Index.tsx
import Head from "next/head";
import { useRouter } from "next/router";
import logo from '../Assets/iconLogo.png';
import FooterCM from "@/Component/Footer";
import { Button } from "../Sections/Inquilinos/styles";

export default function InitialPage() {
    const router = useRouter();

    const toLogin = () => {
        router.push('/Login');
    };

    return (
        <>
            <div>
                <main style={{ padding: "2rem", textAlign: "center" }}>
                    <h1>Bem-vindo ao Condominium Management</h1>
                    <p>Aqui você pode gerenciar todos os aspectos do seu condomínio.</p>
                    <Button onClick={toLogin} style={{ padding: "10px 20px", fontSize: "16px" }}>
                        Fazer login
                    </Button>
                </main>
                <FooterCM />
            </div>
        </>
    );
}
