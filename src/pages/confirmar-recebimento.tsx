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
                    setMessage(`Recebimento confirmado com sucesso para o email: ${data.message}`);
                } else {
                    setMessage(`Erro: ${data.message || 'Falha na confirmação.'}`);
                    setSucessOrError(false)
                }

                setMessage('Encomenda marcada como recebida com sucesso.');
                setSucessOrError(true)
            } catch (error) {
                console.log(error)
                setSucessOrError(false)
                setMessage(`Erro ao conectar com o servidor ${error}.`);
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
