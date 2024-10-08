import { ChangeEvent, useState } from 'react';
import { BackgroundCircles, DivLogin, ErrorMessage, ForgotPassword, Form, FormContainer, HeaderForm, ImageContainer, InputField, Label, LoginContainer, Logo, LogoContainer, PageWrapper, SendEmailContainer, SeparatorLogin, SubmitButton, Subtitle, Title, TitleContainer } from '../../styles/loginStyles';
import { Button } from '@/Component/Sections/Inquilinos/styles';
import InputComponent from '@/Component/Primitivy/Input';
import { useRouter } from 'next/router';
import imageLogin from '../../Assets/predio.jpg'
import Image from 'next/image';


const LoginPage: React.FC = () => {
    const [message, setMessage] = useState<string>('');
    const [typeMessage, setTypeMessage] = useState(false)
    const [isDisabled, setIsDisabled] = useState(true)
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
    });

    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        setIsDisabled(true);
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
            {typeMessage ?
                <PageWrapper>
                    <Form>
                        <LoginContainer>
                            <SendEmailContainer>
                                <span>
                                    <p>Email enviado</p>
                                    <p>Verifique sua caixa de email</p>
                                </span>
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
                                <Logo>Condominium Management</Logo>
                                <Title>Bem-vindo(a)</Title>
                                <Subtitle>Acesse seu painel</Subtitle>
                            </TitleContainer>

                            <Form onSubmit={handleSubmit}>
                                <InputComponent
                                    label="E-mail"
                                    type="text"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                                {message && <ErrorMessage $typeMessage={typeMessage}>{message}</ErrorMessage>}
                                <SubmitButton type="submit" disabled={false}>
                                    {loading ? "Enviando..." : "Enviar"}
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
