
import { useContext } from "react";
import HomePage from "../Home";
import Inquilinos from "../Inquilinos";
import { MainContainer, MainContainerDiv } from "./styles";
import { SupaContext } from "@/Context/context";

export default function Main() {
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
