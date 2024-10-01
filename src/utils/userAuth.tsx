import ValidandoToken from '@/Component/ValidandoToken';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

function userAuth(Component: any) {
    return function AuthenticatedComponent(props: any) {
        const router = useRouter();
        const { token } = router.query;
        const [loading, setLoading] = useState(true);
        const [isValid, setIsValid] = useState(false);

        useEffect(() => {
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
                    .finally(() => setLoading(false));
            } else if (router.isReady && token) {
                router.push('/login');
            }
        }, [token, router.isReady]); 

        if (loading) {
            return  <ValidandoToken message={'Validando token...'}/>;
        }

        return isValid ? <Component {...props} /> : null;
    };
}

export default userAuth;
