import { CgInstagram, CgYoutube } from "react-icons/cg";
import { FooterButton, FooterColumn, FooterContact, FooterCopyright, FooterInputGroup, FooterLogo, FooterSection, FooterWrapper, IconSocial, P } from "./styles";
import logo from './images/condominiumManagement.png'
import Image from "next/image";
import InputComponent from "../Primitivy/Input";
import { ChangeEvent, useState } from "react";
import { FiX } from "react-icons/fi";

export default function FooterCM() {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        telefone: '',
        assunto: ''
    });

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    return (
        <FooterWrapper>
            <FooterSection>
                <FooterLogo>
                    <Image src={logo.src} alt="Logo empresa" width={150} height={150} />
                    {/* <h1>Nome empresa</h1> */}
                </FooterLogo>
                <FooterCopyright>
                    <span>© 2024 Condominium Management.</span>
                    <span>Todos os direitos reservados.</span>
                    <a href="https://iagoluancj.github.io/Portifolio-React/" target="_blank"><span>Developed by <strong>Iago Jesus</strong></span></a>
                </FooterCopyright>
            </FooterSection>
        </FooterWrapper >
    )
}