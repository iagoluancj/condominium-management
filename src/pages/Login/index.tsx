import { ChangeEvent, useState } from 'react';
import { ErrorMessage, Form, Label, LoginContainer } from './styles';
import { Button } from '@/Component/Sections/Inquilinos/styles';
import InputComponent from '@/Component/Primitivy/Input';
import { useRouter } from 'next/router';

const LoginPage: React.FC = () => {
    const [message, setMessage] = useState<string>('');
    const [formData, setFormData] = useState({
        email: '',
    });

    const router = useRouter();

    const toHomePage = () => {
        router.push('/');
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            setMessage('Email enviado com sucesso')
            const response = await fetch('https://backend-rastaurant-production.up.railway.app/enviar-token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: formData.email }),
            });
            if (!response.ok) {
                setMessage('Falha ao enviar o token. Tente novamente em alguns instantes.');
            }
        } catch (error) {
            setMessage('Erro ao conectar com o servidor.');
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    return (
        <LoginContainer>
            <Form onSubmit={handleSubmit}>
                <InputComponent
                    label="Email"
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <div>
                    <Button type="submit">Enviar Magic Link</Button>
                    <Button onClick={toHomePage}>Voltar para página inicial</Button>
                </div>
                {message && <ErrorMessage>{message}</ErrorMessage>}
            </Form>
        </LoginContainer>
    );
};

export default LoginPage;
