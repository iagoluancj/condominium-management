
import { useContext } from "react";

import { SupaContext } from "@/Context/context";
import { MainContainer, MainContainerDiv } from "./styles";
import Inquilinos from "../Sections/Inquilinos";
import Visitantes from "../Sections/Visitantes";
import Moradores from "../Sections/Moradores";
import Encomendas from "../Sections/Encomendas";
import HomePage from "../Sections/HomePage";


export default function MainInquilinos() {
    const { ChangePage } = useContext(SupaContext);

    return (
        <MainContainer>
            <MainContainerDiv>
                {(() => {
                    switch (ChangePage) {
                        case 'HomePage':
                            return <HomePage />;
                        case 'Inquilinos':
                            return <Inquilinos />;
                        case 'Visitantes':
                            return <Visitantes />;
                        case 'Moradores':
                            return <Moradores />;
                        case 'Encomendas':
                            return <Encomendas />;
                        default:
                            return null; // ou qualquer outro componente de fallback
                    }
                })()}
            </MainContainerDiv>
        </MainContainer>
    )
}
