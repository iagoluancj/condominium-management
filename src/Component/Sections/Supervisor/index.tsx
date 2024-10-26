import { useEffect, useState } from "react";
import { SupervisorContainer } from "./styles";

export default function Supervisor() {
    const [isSupervisor, setIsSupervisor] = useState(false);

    useEffect(() => {
        const userSession = localStorage.getItem('userSession');

        if (userSession) {
            const user = JSON.parse(userSession);
            setIsSupervisor(user.is_supervisor === true);
        } else {
            console.log('userSession não encontrado');
        }
    }, []);

    if (isSupervisor === null) return <SupervisorContainer>Carregando...</SupervisorContainer>; 

    if (!isSupervisor) {
        return (
            <SupervisorContainer>
                Você não deveria estar aqui, seu usuário não é de supervisão. Saia e entre novamente, por gentileza.
            </SupervisorContainer>
        );
    }

    return (
        <SupervisorContainer>
            Supervisor
        </SupervisorContainer>
    );
}
