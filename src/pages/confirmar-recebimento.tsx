import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import ValidandoToken from '@/Component/ValidandoToken';
import ResultadoValidacao from '@/Component/Finally';

const ConfirmarRecebimento = () => {
    const router = useRouter();
    const { tokenDelivery } = router.query;
    const [loading, setLoading] = useState(true); 
    const [sucessOrError, setSucessOrError] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const confirmarRecebimento = async () => {
            if (!tokenDelivery) return;

            try {
                // Fazendo a requisição diretamente para o endpoint do backend
                const response = await fetch(`https://backend-rastaurant-production.up.railway.app/confirmar-recebimento?tokenDelivery=${tokenDelivery}`);
                const data = await response.json();

                if (response.ok) {
                    // setTimeout(() => {
                    //     router.push('/Paginas');
                    // }, 5000);

                    setSucessOrError(true)
                    setMessage(`Encomenda marcada como recebida com sucesso.`);
                } else {
                    console.log(`Erro: ${data.message || 'Falha na confirmação.'}`)
                    setMessage(`Falha ao confirmar recebimento, tente novamente ou contacte o suporte.`);
                    setSucessOrError(false)
                }

                setMessage('Encomenda marcada como recebida com sucesso.');
                setSucessOrError(true)
            } catch (error) {
                setSucessOrError(false)
                console.log(`Erro ao conectar com o servidor ${error}.`)
                setMessage(`Erro ao conectar com o servidor, tente novamente ou contacte o suporte.`);
            } finally {
                setLoading(false);
            }
        };

        confirmarRecebimento();
    }, [tokenDelivery]);

    if (loading) {
        return <ValidandoToken message={message} />
    }

    return (<ResultadoValidacao message={message} isSuccess={sucessOrError} />);

};

export default ConfirmarRecebimento;
