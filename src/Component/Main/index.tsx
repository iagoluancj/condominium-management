
import { useContext } from "react";

import { SupaContext } from "@/Context/context";
import { GlobalStyles, MainContainer, MainContainerDiv } from "./styles";
import Inquilinos from "../Sections/Inquilinos";
import Visitantes from "../Sections/Visitantes";
import Moradores from "../Sections/Moradores";
import Encomendas from "../Sections/Encomendas";
import { HomePage } from "../Sections/HomePage";
import { ThemeProvider } from "styled-components";
import Apartamentos from "../Sections/Apartamentos";
import FooterCM from "../Footer";
import Supervisor from "../Sections/Supervisor";


export default function MainInquilinos() {
    const { ChangePage } = useContext(SupaContext);
    const { ChangeTheme } = useContext(SupaContext);
    const lightTheme = {
        main: "#000",
        mainBackground: "#fff",
        // cardShadow: "0px 0px 10px .1px rgba(0, 0, 0, 0.1)",
        background: "#fafcff",
        form: "#fff",
        tableSecond: '#fff',
        table: "#c8ddfd",
        border: "#CCC",
        secondary: "#222",
        colorShadow: "rgb(0, 0, 0, .2)",
        Footer: '#ff0000'

    };

    const darkTheme = {
        main: "#FFF",
        background: "#333",
        form: "#fff",
        // cardShadow: "0px 0px 10px .1px rgba(0, 0, 0, 0.0)",
        mainBackground: "#171717",
        tableSecond: '#29313b',
        table: "#444",
        border: "#444",
        secondary: "#F7F7F7",
        colorShadow: "rgb(255, 255, 255, .9)",
        Footer: '#ff00ff'
    };


    return (
        <ThemeProvider theme={ChangeTheme ? lightTheme : darkTheme}>
            <GlobalStyles>
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
                                case 'Apartamentos':
                                    return <Apartamentos />;
                                case 'Encomendas':
                                    return <Encomendas />;
                                case 'Supervisor':
                                    return <Supervisor />;
                                default:
                                    return null; // ou qualquer outro componente de fallback
                            }
                        })()}
                    </MainContainerDiv>
                    <FooterCM></FooterCM>
                </MainContainer>
            </GlobalStyles>
        </ThemeProvider>

    )
}
