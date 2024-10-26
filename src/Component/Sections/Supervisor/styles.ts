import styled from "styled-components";
import { SeparationPessoal } from "../Inquilinos/styles";

export const SupervisorContainer = styled.button`
    display: flex;
    gap: 2rem;
    margin-top: 20vh;

    @media (max-width: 1200px) {  
        flex-direction: column;
    }
`
export const SeparationPessoalSupervisor = styled(SeparationPessoal)`
    flex-direction: column;
`

