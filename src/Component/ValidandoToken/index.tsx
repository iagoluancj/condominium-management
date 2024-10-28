import { NavFinally } from "../Finally/styles";
import FooterCM from "../Footer";
import { NavValidando, ValidandoContainer, ValidandoContainerDiv, ValidandoSection } from "./styles";

interface ValidandoTokenProps {
    message: string;
}

export default function ValidandoToken({ message }: ValidandoTokenProps) {
    return (
        <ValidandoContainerDiv>
            <NavValidando></NavValidando>
            <ValidandoSection>
                <ValidandoContainer>
                    <h3>Validando Token</h3>
                    <span>
                        <div className="loader --7"></div>
                    </span>
                    <p>{message}</p>
                </ValidandoContainer>
            </ValidandoSection>
            <FooterCM/>
        </ValidandoContainerDiv>
    );
}