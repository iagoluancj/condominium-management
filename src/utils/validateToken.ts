export async function validateToken(token: string) {
    try {
        const response = await fetch(`http://localhost:3001/validar-token?token=${token}`);
        const data = await response.json();
        
        if (response.ok && !data.error) {
            return data;
        } else {
            throw new Error('Token inválido ou expirado');
        }
    } catch (error) {
        console.error('Erro ao validar o token:', error);
        return null;
    }
}