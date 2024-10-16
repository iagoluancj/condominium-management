import styled, { keyframes } from "styled-components";
import { Button } from "../Sections/Inquilinos/styles";

const slideDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-50px); 
  }
  to {
    opacity: 1;
    transform: translateY(0); 
  }
`;

const fadeInUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
  `

const fadeIn = keyframes`
0% {
  opacity: 0;
}
100% {
  opacity: 1;
}
`;


export const HeroSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #00c6ff, #0072ff);
  padding-bottom: 5rem;
  text-align: center;
  color: white;
  font-family: ubuntu;
  z-index: 2;
  animation: ${slideDown} 2s ease forwards; 

  img {
    width: auto;
    height: auto;
  }
`;

export const Title = styled.h1`
  font-size: 4rem;
  margin-bottom: 1rem;
  animation: ${fadeIn} .5s ease-in-out;

  @media (max-width: 768px) {
    font-size: 55px;
  }
`;


export const Icon = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  padding: 5px;
  background: linear-gradient(135deg, #00c6ff, #0072ff);
  border-radius: 50%;
  animation: ${slideDown} 2s ease forwards; 

`;


export const Description = styled.p`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  max-width: 600px;
  line-height: 1.6;
  animation: ${fadeInUp} 1.8s ease-in-out;
`;

export const LoginButton = styled(Button)`
  padding: 12px 30px;
  font-size: 18px;
  background: #ff4081;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  transition:  0.3s ease;
  border: 1px solid transparent;
  animation: ${fadeInUp} 2s ease-in-out;

  &:hover {
    background: #fff;
    border: 1px solid #ff1a6b !important;
    color: #ff1a6b;
    transform: scale(1.05);
    transition: 0.3s ease;
  }
`;

export const CardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  margin-top: 3rem;
  gap: 20px;
  max-width: 1200px;
  width: 100%;
  z-index: 1;
`;

export const CardsDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  animation: ${fadeInUp} 1.8s ease-in-out;


  @media (max-width: 950px) {
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }
`;

export const Card = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.2);
  padding: 2rem;
  width: 300px;
  text-align: center;
  backdrop-filter: blur(10px);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0px 12px 32px rgba(0, 0, 0, 0.3);
  }
`;

export const CardTitle = styled.h3`
  font-size: 1.75rem;
  margin-bottom: 1rem;
  color: white;
`;

export const CardDescription = styled.p`
  font-size: 1rem;
  color: var(--brancoPastelFont);
`;

export const HeaderHero = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 4rem 0rem;

  @media (max-width: 768px) {
    padding: 4rem 1rem;
  }
`;

export const Vector1 = styled.div`
    position: absolute;
    top: -200px;
    right: -450px;
    width: 1000px;
    height: 500px;
    background-color: #8E7FFE;
    transform: rotate(45deg);
    border-radius: 10px;
    opacity: .7;
`;

export const Vector2 = styled.div`
    position: absolute;
    top: 1200px;
    right: 50px;
    width: 1000px;
    height: 100px;
    background-color: #8E7FFE;
    border-radius: 70px 0px 70px 0px;
    opacity: .7;
`;

export const Logo = styled.div`
  width: 100%;
  padding: 0rem 5rem;
  position: sticky;
  top: 10px;
  padding-bottom: 5rem;
  margin-top: 2rem;
  display: flex;
  justify-content: space-between;
  z-index: 2;

  img {
    width: 100px;
  }

  @media (max-width: 768px) {
    padding: 0rem 1rem;
  }
`;

export const SeparatorWhite = styled.div`
  width: 100%;
  margin-top: -7rem;
  height: 190px;
  background: var(--brancoPastelFont);
  background-color: #8E7FFE;
  opacity: .7;
  color: #000;

  h2 {
    margin-top: 160px;
  }
`;

export const ServicesWrapper = styled.div`
  padding: 50px;
  margin: 2rem;
  border-radius: 20px;
  background-color: #f0f0f0;
  text-align: center;
`;

export const ServicesTitle = styled.h2`
  font-size: 36px;
  color: var(--brancoPastelFont);
`;

export const ServicesGrid = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 30px;

  @media (max-width: 768px) {
    flex-wrap: wrap;

  }
`;

export const ServiceCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  animation: ${slideDown} 2s ease forwards; 
`;

export const ServiceTitle = styled.h3`
  font-size: 24px;
  color: #0070f3;
`;

export const TitleFunc = styled.h3`
  font-size: 34px;
  color: var(--defaultText);
  color: #0072ff;

`;

export const ServiceDescription = styled.p`
  font-size: 16px;
  color: #555;
`;

// Seção de Estatísticas
export const StatsWrapper = styled.div`
  padding: 50px;
  background-color: #f0f0f000;
  text-align: center;
`;

export const StatsTitle = styled.h2`
  font-size: 36px;
  color: #333;
`;

export const StatsGrid = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 30px;

  @media (max-width: 768px) {
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }
`;

export const StatCard = styled.div`
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

export const StatNumber = styled.div`
  font-size: 32px;
  color: #0070f3;
  display: flex;
  align-items: center;
  justify-content: center;

  span {
    color: #ff4081;
  }
`;

export const StatLabel = styled.div`
  font-size: 16px;
  color: #555;
`;

export const ContactSection = styled.div`
`;

export const ContactSeparator = styled.div`
  padding: 5px 0px;
  padding-right: 20px;
  background: linear-gradient(135deg, #00c6ff, #0072ff);
  text-align: center;
  margin: 24px;
  border-radius: 70px 0px 70px 0px;
  box-shadow: 0 10px 10px 8px rgba(0, 0, 0, .2);
`;

export const ContactTitle = styled.h2`
  font-size: 2rem;
  color: var(--brancoPastelFont);
  font-weight: 600;
`;

export const ContactInfo = styled.div`
  display: flex;
  justify-content: center;
  gap: 24px;

  @media (max-width: 768px) {
    gap: 12px;
    flex-wrap: wrap;
  }
`;

export const ContactCard = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 10px 20px;
  border-radius: 8px;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.02);
    transition: transform 0.2s ease-in-out;
  }

  svg {
    color: #14db7d; 
  }
`;

export const ContactText = styled.span`
  font-size: 1.125rem;
  color: var(--brancoPastelFont);
  font-weight: 500;
`;