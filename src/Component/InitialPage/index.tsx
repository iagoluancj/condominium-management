// pages/Index.tsx
import Head from "next/head";
import { useRouter } from "next/router";
import logo from '../../Assets/iconLogo.png';
import FooterCM from "@/Component/Footer";
import Image from "next/image";
import { Card, CardDescription, CardsContainer, CardsDiv, CardTitle, ContactCard, ContactInfo, ContactSection, ContactSeparator, ContactText, ContactTitle, Description, HeaderHero, HeroSection, Icon, LoginButton, Logo, SeparatorWhite, ServiceCard, ServiceDescription, ServicesGrid, ServicesTitle, ServicesWrapper, ServiceTitle, StatCard, StatLabel, StatNumber, StatsGrid, StatsWrapper, Title, TitleFunc, Vector1, Vector2 } from "./styles";
import { BiCalendar, BiCalendarHeart, BiEnvelope, BiLogoWhatsapp, BiSolidReport } from "react-icons/bi";
import { MdDashboard, MdDeliveryDining, MdLocalShipping, MdManageAccounts, MdManageHistory, MdOutlineDeliveryDining, MdWhatsapp } from "react-icons/md";
import { CgBolt } from "react-icons/cg";

// Styled components

export default function InitialPage() {
  const router = useRouter();

  const toLogin = () => {
    router.push('/Login');
  };

  return (
    <>
      <Head>
        <title>Condominium Management - Home</title>
      </Head>
      <HeroSection>
        <Logo>
          <Image src={logo} alt="Logo" />
          <LoginButton onClick={toLogin}>Acesse</LoginButton>
        </Logo>
        <HeaderHero>
          <Title>Condominium Management</Title>
          <Description>Gerencie todos os aspectos do seu condomínio de forma eficiente e moderna.</Description>
        </HeaderHero>
        <ServicesWrapper>
          <TitleFunc>Nossas Funcionalidades</TitleFunc>
          <ServicesGrid>
            <ServiceCard>
              <Icon>
                <MdManageAccounts size={24} />
              </Icon>
              <ServiceTitle>Gerenciamento de Moradores</ServiceTitle>
              <ServiceDescription>Ferramenta completa com tudo que você precisa para gerenciar os moradores.</ServiceDescription>
            </ServiceCard>
            <ServiceCard>
              <Icon>
                <MdLocalShipping size={24} />
              </Icon>
              <ServiceTitle>Controle de Encomendas</ServiceTitle>
              <ServiceDescription>Função para gerenciar o recebimento, controle e entrega de encomendas de forma organizada.</ServiceDescription>
            </ServiceCard>
            <ServiceCard>
              <Icon>
                <MdDashboard size={30} />
              </Icon>
              <ServiceTitle>Dashboard Inteligente</ServiceTitle>
              <ServiceDescription>Acesse um painel com dados em tempo real sobre a gestão do seu condomínio.</ServiceDescription>
            </ServiceCard>
          </ServicesGrid>
        </ServicesWrapper>

        <CardsContainer>
          <ServicesTitle>Nossos Diferenciais</ServicesTitle>
          <CardsDiv>
            <Card>
              <CardTitle>Gestão Simplificada</CardTitle>
              <CardDescription>Controle todas as áreas do seu condomínio em uma única plataforma de maneira intuitiva.</CardDescription>
            </Card>
            <Card>
              <CardTitle>Foco na Usabilidade</CardTitle>
              <CardDescription>Desenvolvido para ser simples e eficiente, sem a complexidade de softwares tradicionais.</CardDescription>
            </Card>
            <Card>
              <CardTitle>Suporte Personalizado</CardTitle>
              <CardDescription>Conte com um suporte dedicado para resolver rapidamente qualquer problema.</CardDescription>
            </Card>
          </CardsDiv>
        </CardsContainer>
        {/* <Vector2 /> */}
        <SeparatorWhite />
        <StatsWrapper>
          <ServicesTitle>Nossos números</ServicesTitle>
          <StatsGrid>
            <StatCard>
              <StatNumber><Icon><CgBolt /></Icon></StatNumber>
              <StatNumber>1 semana</StatNumber>
              <StatLabel>Implantação rápida do sistema</StatLabel>
            </StatCard>
            <StatCard>
              <StatNumber><Icon><BiSolidReport /></Icon></StatNumber>
              <StatNumber>+4 relatórios</StatNumber>
              <StatLabel><p>Relatórios disponíveis para extração</p> manual no banco de dados</StatLabel>
            </StatCard>
            <StatCard>
              <StatNumber><Icon><BiCalendarHeart /></Icon></StatNumber>
              <StatNumber>2024</StatNumber>
              <StatLabel>Ano de Lançamento</StatLabel>
            </StatCard>
          </StatsGrid>
        </StatsWrapper>
        <ContactSection>
          <ContactSeparator>
            <ContactTitle>Contato</ContactTitle>
            <ContactInfo>
              <ContactCard>
                <BiEnvelope size={28} />
                <ContactText>
                  <a href="mailto:iago.luancj@gmail.com" target="_blank" rel="noopener noreferrer">
                    iago.luancj@gmail.com
                  </a>
                </ContactText>
              </ContactCard>
              <ContactCard>
                <MdWhatsapp size={28} />
                <ContactText>
                  <a href="https://wa.me/5531988829940" target="_blank" rel="noopener noreferrer">
                    (31) 9 9882-9940
                  </a>
                </ContactText>
              </ContactCard>
            </ContactInfo>
          </ContactSeparator>
        </ContactSection>
      </HeroSection>
      <FooterCM />
    </>
  );
}
