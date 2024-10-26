import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { AnimationDiv, BackgroundCircles, DivLogin, ErrorMessage, ForgotPassword, Form, FormContainer, HeaderForm, ImageContainer, InputField, Label, Logo, LogoContainer, PageWrapper, SendEmailContainer, SeparatorLogin, SubmitButton, Subtitle, Title, TitleContainer } from '../../styles/loginStyles';
import { Button } from '@/Component/Sections/Inquilinos/styles';
import logo from '../../Component/Footer/images/condominiumManagement.png'
import FavIcon from '../../Assets/iconLogo.png'
import imageLogin from '../../Assets/predio.jpg'
import Image from 'next/image';
import { supabase } from '@/services/supabase';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { BiArrowFromLeft } from 'react-icons/bi';
import { IoIosArrowForward } from 'react-icons/io';
import styled, { keyframes } from 'styled-components';

interface LoginContainerProps {
    shouldAnimate: boolean;
}


const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.95);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

const LoginContainer = styled.div<LoginContainerProps>`
  animation: ${({ shouldAnimate }) => shouldAnimate && fadeIn} 1s ease;
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

  ul {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 1.2rem;

    li {
      display: flex;
      flex-direction: row;
    }
  }
`;

const LoginPage: React.FC = () => {
    const [message, setMessage] = useState<string>('');
    const [typeMessage, setTypeMessage] = useState(false)
    const [isDisabled, setIsDisabled] = useState(true)
    const [errorRequestToken, setErrorRequestToken] = useState(true)
    const [animate, setAnimate] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({ email: '' });
    const [formData, setFormData] = useState({
        email: '',
    });
    const router = useRouter();

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            return 'Email é obrigatório.';
        } else if (!emailRegex.test(email)) {
            return 'Email inválido.';
        } else {
            return '';
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        setAnimate(true);
        setIsDisabled(true);
        const emailError = validateEmail(formData.email);

        async function fetchFuncionarios() {
            const { data, error } = await supabase
                .from('funcionarios')
                .select('*');

            if (error) {
                console.error('Erro ao buscar funcionários:', error);
                return [];
            }

            return data;
        }

        const funcionarios = await fetchFuncionarios();

        const user = funcionarios.find(
            (funcionario) => funcionario.email === formData.email
        );

        if (!user) {
            setMessage('Email não encontrado na lista de funcionários.');
            setTypeMessage(false);
            setLoading(false);
            setTimeout(() => {
                setMessage('');
                setIsDisabled(false)
            }, 5000);
            return;
        }

        if (emailError) {
            setErrors({ email: emailError });
            setLoading(false);
            setMessage('Email inválido.')
            return;
        }

        try {
            setMessage('Email enviado com sucesso.')
            setTypeMessage(true)
            const response = await fetch('https://backend-rastaurant-production.up.railway.app/enviar-token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: formData.email }),
            });
            if (!response.ok) {
                setMessage('Falha ao enviar o token. Tente novamente em alguns instantes.');
                setTypeMessage(false)
            }
        } catch (error) {
            setMessage('Erro interno. Tente novamente ou contacte o suporte.');
            console.log('Erro ao se conectar com o servidor.')
            setTypeMessage(false)
        } finally {
            setLoading(false);
            setTimeout(() => {
                setMessage('');
                setIsDisabled(false)
            }, 5000);
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setErrors({ ...errors, email: '' });
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const backToLogin = () => {
        setTypeMessage(false)
        setTimeout(() => {
            setMessage('');
            setIsDisabled(false)
        }, 5000);
    }

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            fetch(`https://backend-rastaurant-production.up.railway.app/validar-token?token=${token}`)
                .then(response => response.json())
                .then(data => {
                    if (data.error) {
                        console.log('Token inválido ou expirado');
                        // Redirecionar para /Login ou exibir uma mensagem se o token for inválido
                    } else {
                        console.log('Token válido');
                        // Redireciona diretamente para a página protegida
                        router.push('/Paginas');
                    }
                })
                .catch((error) => {
                    console.error('Erro ao validar o token:', error);
                    // Em caso de erro, pode exibir uma mensagem de erro ou manter na página de login
                });
        } else {
            console.log('Token não encontrado. Exibindo página de login.');
        }

        setAnimate(true);
        const timer = setTimeout(() => setAnimate(false), 1000);
        return () => clearTimeout(timer);

    }, [router, errorRequestToken]);

    const handleErrorRequestToken = () => {
        setErrorRequestToken(!errorRequestToken);
    };

    return (
        <>
            <Head>
                <link rel="icon" href={FavIcon.src} type="image/x-icon" />

                <title>Login - Condominium Management</title>
            </Head>
            {typeMessage ?
                <PageWrapper>
                    <Form>
                        <SeparatorLogin>
                            <LoginContainer shouldAnimate={animate}>
                                <TitleContainer>
                                    <Logo>
                                        <Image alt='Logo' src={logo} />
                                    </Logo>
                                    <Title>Email enviado</Title>
                                    <Subtitle>Verifique sua caixa de email</Subtitle>
                                </TitleContainer>
                                <SendEmailContainer>
                                    {message && <ErrorMessage $typeMessage={typeMessage}>{message}</ErrorMessage>}
                                    <Button disabled={isDisabled} onClick={backToLogin}>Enviar email novamente</Button>
                                </SendEmailContainer>
                            </LoginContainer>
                        </SeparatorLogin>
                    </Form>
                </PageWrapper>
                :
                <PageWrapper>
                    <SeparatorLogin>
                        <BackgroundCircles />
                        <LoginContainer shouldAnimate={animate}>
                            <>
                                {
                                    errorRequestToken ?
                                        <>
                                            <TitleContainer>
                                                <Logo>
                                                    <Image alt='Logo' src={logo} />
                                                </Logo>
                                                <Title>Bem-vindo(a)</Title>
                                                <Subtitle>Acesse seu painel</Subtitle>
                                            </TitleContainer>

                                            <Form onSubmit={handleSubmit}>
                                                <input
                                                    placeholder="E-mail"
                                                    type="text"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    required
                                                />
                                                {message && <ErrorMessage $typeMessage={typeMessage}>{message}</ErrorMessage>}
                                                <SubmitButton type="submit" disabled={loading}>
                                                    {loading ? "Enviando token..." : "Enviar token"}
                                                </SubmitButton>
                                            </Form>

                                            <ForgotPassword onClick={handleErrorRequestToken}>Falha ao solicitar token?</ForgotPassword>
                                        </>
                                        :
                                        <>
                                            <TitleContainer>
                                                <Logo>
                                                    <Image alt='Logo' src={logo} />
                                                </Logo>
                                                <Title>Não consegue logar?</Title>
                                                <Subtitle>Siga as dicas abaixo:</Subtitle>
                                            </TitleContainer>
                                            <ul>
                                                <li>
                                                    <IoIosArrowForward size={30} />
                                                    <span>Verifique se o e-mail não foi enviado para a pasta de spam ou lixo eletrônico.</span></li>
                                                <li><IoIosArrowForward size={30} /> Verifique se o seu provedor de e-mail não está bloqueando mensagens do nosso domínio.</li>
                                                <li><IoIosArrowForward size={30} /> Caso o problema persista, entre em contato com seu administrador/sindico.</li>
                                            </ul>
                                            <SubmitButton onClick={handleErrorRequestToken}>Voltar para o login.</SubmitButton>
                                        </>
                                }
                            </>
                        </LoginContainer>
                    </SeparatorLogin>
                    <DivLogin>
                        <Image src={imageLogin} alt="Máquina hospitalar"></Image>
                    </DivLogin>
                </PageWrapper>
            }
        </>
    );
};

export default LoginPage;
