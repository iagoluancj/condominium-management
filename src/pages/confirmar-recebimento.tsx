import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import ValidandoToken from '@/Component/ValidandoToken';

const ConfirmarRecebimento = () => {
    const router = useRouter();
    const { tokenDelivery } = router.query;
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const confirmarRecebimento = async () => {
            if (!tokenDelivery) return;

            try {
                // Fazendo a requisição diretamente para o endpoint do backend
                const response = await fetch(`https://backend-rastaurant-production.up.railway.app/confirmar-recebimento?tokenDelivery=${tokenDelivery}`);
                const data = await response.json();

                if (response.ok) {
                    setMessage(`Recebimento confirmado com sucesso para o email: ${data.email}`);
                } else {
                    setMessage(`Erro: ${data.message || 'Falha na confirmação.'}`);
                }

                setMessage('Encomenda marcada como recebida com sucesso.');
            } catch (error) {
                console.log(error)
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

    return (<ValidandoToken message={message} />);

};

export default ConfirmarRecebimento;
