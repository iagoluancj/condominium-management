import { ChangeEvent, useContext, useState } from 'react';
import { BackgroundCircles, DivLogin, ErrorMessage, ForgotPassword, Form, FormContainer, HeaderForm, ImageContainer, InputField, Label, LoginContainer, Logo, LogoContainer, PageWrapper, SendEmailContainer, SeparatorLogin, SubmitButton, Subtitle, Title, TitleContainer } from '../../styles/loginStyles';
import { Button } from '@/Component/Sections/Inquilinos/styles';
import logo from '../../Component/Footer/images/condominiumManagement.png'
import FavIcon from '../../Assets/iconLogo.png'
import imageLogin from '../../Assets/predio.jpg'
import Image from 'next/image';
import { supabase } from '@/services/supabase';
import Head from 'next/head';


const LoginPage: React.FC = () => {
    const [message, setMessage] = useState<string>('');
    const [typeMessage, setTypeMessage] = useState(false)
    const [isDisabled, setIsDisabled] = useState(true)
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({ email: '' });
    const [formData, setFormData] = useState({
        email: '',
    });

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

    return (
        <>
            <Head>
                <link rel="icon" href={FavIcon.src} type="image/x-icon" />

                <title>Login - Condominium Management</title>
            </Head>
            {typeMessage ?
                <PageWrapper>
                    <Form>
                        <LoginContainer>
                            <TitleContainer>
                                <Logo>
                                    <Image alt='Logo' src={logo}/>
                                </Logo>
                                <Title>Email enviado</Title>
                                <Subtitle>Verifique sua caixa de email</Subtitle>
                            </TitleContainer>
                            <SendEmailContainer>
                                {message && <ErrorMessage $typeMessage={typeMessage}>{message}</ErrorMessage>}
                                <Button disabled={isDisabled} onClick={backToLogin}>Enviar email novamente</Button>
                            </SendEmailContainer>
                        </LoginContainer>
                    </Form>
                </PageWrapper>
                :
                <PageWrapper>
                    <SeparatorLogin>
                        <BackgroundCircles />
                        <LoginContainer>
                            <TitleContainer>
                                <Logo>
                                    <Image alt='Logo' src={logo}/>
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

                            <ForgotPassword>Esqueceu sua senha?</ForgotPassword>
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
