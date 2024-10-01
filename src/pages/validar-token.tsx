import ValidandoToken from '@/Component/ValidandoToken';
import { supabase } from '@/services/supabase';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

function ValidarToken() {
    const router = useRouter();
    const { token } = router.query;
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');

    useEffect(() => {
        function extractTokenFromUrl(url: string): string | null {
            const regex = /token=([^&\/]+)/;
            const match = url.match(regex);
            return match ? decodeURIComponent(match[1]) : null;
        }

        function extractEmailFromUrl(url: string): string | null {
            const regex = /email=([^&]+)/;
            const match = url.match(regex);
            return match ? match[1] : null;
        }

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

        if (token) {
            const url = `https://backend-rastaurant-production.up.railway.app/validar-token?token=${token}`;
            const extractedToken = extractTokenFromUrl(url);
            const extractedEmail = extractEmailFromUrl(url);

            if (extractedToken && extractedEmail) {
                fetch(`https://backend-rastaurant-production.up.railway.app/validar-token?token=${extractedToken}`)
                    .then((response) => response.json())
                    .then(async (data) => {
                        if (data.error) {
                            setMessage('Token inválido ou expirado.');
                            router.push('/Login');
                        } else {
                            setMessage('Token válido. Bem-vindo!');
                            localStorage.setItem('authToken', extractedToken); 

                            const funcionarios = await fetchFuncionarios();

                            const user = funcionarios.find(
                                (funcionario) => funcionario.email === extractedEmail
                            );

                            if (user) {
                                router.push(`/Paginas`); 
                            } else {
                                router.push('/ErroNoCadastroDeCargoFuncionario');
                            }
                        }
                    })
                    .finally(() => setLoading(false));
            } else {
                setMessage('Token ou e-mail ausentes ou inválidos.');
                setLoading(false);
            }
        }
    }, [token]);

    if (loading) {
        return <ValidandoToken message={message}/>
    }

    return (<ValidandoToken message={message}/>);
}

export default ValidarToken;