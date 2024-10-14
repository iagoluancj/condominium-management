import FooterCM from "../Footer";
import { ValidandoSection } from "./styles";

interface ValidandoTokenProps {
    message: string;
}

export default function ValidandoToken({ message }: ValidandoTokenProps) {
    return (
        <>
            <ValidandoSection>
                <div>
                    <h3>Validando Token</h3>
                    <span>
                        <div className="loader --7"></div>
                    </span>
                    <p>{message}</p>
                </div>
            </ValidandoSection>
            <FooterCM/>
        </>
    );
}