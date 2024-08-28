
import { useContext } from "react";

import { SupaContext } from "@/Context/context";
import HomePage from "../Home";
import Inquilinos from "../Inquilinos";
import { MainContainer, MainContainerDiv } from "./styles";

export default function MainInquilinos() {
    const { ChangePage } = useContext(SupaContext);

    return (
        <MainContainer>
            <MainContainerDiv>
                {ChangePage
                    ?
                    <HomePage />
                    :
                    <Inquilinos />
                }
            </MainContainerDiv>
        </MainContainer>
    )
}
