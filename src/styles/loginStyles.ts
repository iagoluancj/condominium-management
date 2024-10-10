import styled, { keyframes } from "styled-components";

interface ColorMessage {
  $typeMessage: boolean;
}

export const Label = styled.label`
    margin-bottom: 0.5rem;
    display: block;
    font-weight: bold;
`;

export const Input = styled.input`
    width: 100%;
    padding: 0.5rem;
    margin-bottom: 1rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
`;

export const Button = styled.button`
    background-color: #0070f3;
    color: white;
    border: none;
    padding: 0.7rem;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s;

    &:hover {
        background-color: #005bb5;
    }
`;

export const ErrorMessage = styled.div<ColorMessage>`
    color: red;
    margin-top: 0rem;

    
    ${({ $typeMessage }) =>
    $typeMessage &&
    `
        color: green;
    `}
`;

export const ImageContainer = styled.div`
    width: 100%;
    height: 100%;        
    object-fit: contain;

    img {
        width: 100%;
        height: auto;
    }
`;

export const FormContainer = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    justify-content: center;

    p {
        font-weight: 300;
        font-size: 14px;
    }

    h2 {
        font-weight: 600;
        font-size: 32px;
    }
`;

export const LogoContainer = styled.div`
    position: absolute;
    top: 1rem;
    width: 100px;
    height: auto;

    display: flex;
    align-items: center;
    gap: 1rem;
    padding: .5rem;

    text-align: center;

    p {
        font-weight: 800;
        font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    }
`;

export const HeaderForm = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: start !important;
`;

export const SendEmailContainer = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;

    gap: 1rem;
`

export const PageWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #00c6ff, #0072ff);
  position: relative;
  overflow: hidden;

  img {
    width: auto;
    height: auto;
  }
`;

export const BackgroundCircles = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  opacity: 0.3;
`;

export const SeparatorLogin = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  
  width: 100%;
  @media (max-width: 420px) {
    padding: 0rem 1rem;
  }
`

export const LoginContainer = styled.div`
  position: relative;
  background-color: var(--brancoPastelFont);
  padding: 3rem;
  border-radius: 16px;
  box-shadow: 0px 8px 30px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 400px;
  z-index: 1;
  animation: fadeIn 1s ease-in-out;
  
  @keyframes fadeIn {
    0% {
      opacity: 0;
      transform: scale(0.95);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

export const TitleContainer = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  
`;

export const Logo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: start;
  font-size: 20px;
  font-weight: 600;
  color: var(--defaultText);
  margin-bottom: 1rem;

  img {
    max-width: 200px;
  }
`;

export const Title = styled.h2`
  font-size: 1.8rem;
  color: var(--LightThemeColor);
  font-weight: bold;
`;

export const Subtitle = styled.p`
  font-size: 1rem;
  color: var(--MediumLightColor);
`;

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 1.5rem;

  input {
    border: 2px solid var(--focusText);  
    padding: .5rem .5rem;
    border-radius: 10px;
    width: 100%;
    text-align: start;
  }
`;

export const InputField = styled.input`
  padding: 1rem;
  border-radius: 8px;
  border: none;
  font-size: 1rem;
  background-color: var(--DarkThemeColor);
  color: white;
  transition: box-shadow 0.3s ease;
  
  &:focus {
    box-shadow: 0 0 8px var(--primaryColor);
    outline: none;
  }

  &::placeholder {
    color: var(--MediumLightColor);
    opacity: 0.7;
  }
`;

export const SubmitButton = styled.button`
  padding: 1rem;
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
  border-radius: 8px;
  background: linear-gradient(135deg, #00c6ff, #0072ff);
  color: white;
  border: 1px solid transparent;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, #00000000, #00000000);
    border: 1px solid var(--focusText);
    color: var(--focusText);
    transition: 0.3s ease;
  }
`;

export const ForgotPassword = styled.a`
  margin-top: 1rem;
  font-size: 0.9rem;
  color: var(--LightThemeColor);
  text-decoration: none;
  cursor: pointer;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.7;
  }
`;

export const DivLogin = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;

  @media (max-width: 1200px) {
    display: none;
  }
`;