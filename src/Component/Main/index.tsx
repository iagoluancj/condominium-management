
import { useContext } from "react";

import { SupaContext } from "@/Context/context";
import { MainContainer, MainContainerDiv } from "./styles";
import Inquilinos from "../Sections/Inquilinos";
import Visitantes from "../Sections/Visitantes";
import Moradores from "../Sections/Moradores";
import Encomendas from "../Sections/Encomendas";
import { HomePage } from "../Sections/HomePage";
import { ThemeProvider } from "styled-components";


export default function MainInquilinos() {
    const { ChangePage } = useContext(SupaContext);
    const { ChangeTheme } = useContext(SupaContext);
    const lightTheme = {
        main: "#000",
        mainBackground: "#fff",
        cardShadow: "0px 0px 10px .1px rgba(0, 0, 0, 0.1)",
        background: "#fafcff",
        form: "#fff",
        border: "#CCC",
        secondary: "#222",
    };

    const darkTheme = {
        main: "#FFF",
        background: "#333",
        form: "#fff",
        cardShadow: "0px 0px 10px .1px rgba(0, 0, 0, 0.0)",
        mainBackground: "#171717",
        border: "#444",
        secondary: "#F7F7F7",
    };


    return (
        <ThemeProvider theme={ChangeTheme ? lightTheme : darkTheme}>
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
        </ThemeProvider>

    )
}
