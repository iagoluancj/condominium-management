import { CgInstagram, CgYoutube } from "react-icons/cg";
import { FooterButton, FooterColumn, FooterContact, FooterCopyright, FooterInputGroup, FooterLogo, FooterSection, FooterSocial, FooterWrapper, IconSocial, P } from "./styles";
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
                    <Image src={logo.src} alt="Logo empresa" width={200} height={0} />
                    {/* <h1>Nome empresa</h1> */}
                </FooterLogo>
                <FooterCopyright>
                    <p>© 2024 Condominium Management.</p>
                    <p>Todos os direitos reservados.</p>
                </FooterCopyright>
                <FooterSocial>
                    <IconSocial><CgInstagram size={30} /></IconSocial>
                    <IconSocial><FiX size={30} /></IconSocial>
                    <IconSocial><CgYoutube size={30} /></IconSocial>
                </FooterSocial>
            </FooterSection>
            <FooterColumn>
                <h3>Company</h3>
                <p>About us</p>
                <p>Blog</p>
                <p>Contact us</p>
                <p>Pricing</p>
                <p>...</p>
            </FooterColumn>
            <FooterColumn>
                <h3>Support</h3>
                <P>Help center</P>
                <P>Terms of service</P>
                <P>Legal</P>
                <P>Privacy policy</P>
                <P>Status</P>
            </FooterColumn>
            <FooterContact>
                <h3>Contate-nos</h3>
                <FooterInputGroup>
                    <InputComponent
                        label="Nome"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />

                    <InputComponent
                        label="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <InputComponent
                        label="Telefone"
                        name="telefone"
                        value={formData.telefone}
                        onChange={handleChange}
                        required
                    />

                    <InputComponent
                        label="Assunto"
                        name="assunto"
                        type="textarea"
                        value={formData.assunto}
                        onChange={handleChange}
                        required
                        height={43}
                    />
                </FooterInputGroup>
                <FooterButton>Enviar</FooterButton>
            </FooterContact>
        </FooterWrapper>
    )
}