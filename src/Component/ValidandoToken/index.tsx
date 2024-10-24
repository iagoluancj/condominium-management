import FooterCM from "../Footer";
import { ValidandoContainer, ValidandoSection } from "./styles";

interface ValidandoTokenProps {
    message: string;
}

export default function ValidandoToken({ message }: ValidandoTokenProps) {
    return (
        <>
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
        </>
    );
}