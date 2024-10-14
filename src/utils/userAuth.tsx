import ValidandoToken from '@/Component/ValidandoToken';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

function userAuth(Component: any) {
    return function AuthenticatedComponent(props: any) {
        const router = useRouter();
        const { token } = router.query;
        const [loading, setLoading] = useState(true);
        const [isValid, setIsValid] = useState(false);
        const [messageLog, setMessageLog] = useState('Validando token...')

        useEffect(() => {
            const timeoutMessage = setTimeout(() => {
                setMessageLog('Tempo limite excedido. Redirecionando para login...')
            }, 8000);
            const timeoutId = setTimeout(() => {
                console.log('Tempo limite excedido. Redirecionando para login...');
                router.push('/Login');
            }, 10000);

            const savedToken = localStorage.getItem('authToken');
            if (savedToken) {
                fetch(`https://backend-rastaurant-production.up.railway.app/validar-token?token=${savedToken}`)
                    .then(response => response.json())
                    .then(data => {
                        if (data.error) {
                            router.push(`/${savedToken}`); 
                        } else {
                            setIsValid(true); 
                        }
                    })
                    .finally(() => { 
                        setLoading(false)
                        clearTimeout(timeoutId) 
                    });
            } else if (router.isReady && token) {
                router.push('/Login');
            }
        }, [token, router.isReady, router]); 

        if (loading) {
            return  <ValidandoToken message={messageLog}/>;
        }

        return isValid ? <Component {...props} /> : null;
    };
}

export default userAuth;
