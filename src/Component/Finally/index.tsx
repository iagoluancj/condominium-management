import FooterCM from "../Footer";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { SpanSeparate, ValidandoContainer, ValidandoSection } from "./styles";
import sucessMessage from '../../Assets/sucss.jpg'
import errorM from '../../Assets/error.png'
import Image from "next/image";

interface ResultadoValidacaoProps {
    message: string;
    isSuccess: boolean;
}

export default function ResultadoValidacao({ message, isSuccess }: ResultadoValidacaoProps) {
    return (
        <>
            <ValidandoSection>
                <ValidandoContainer>
                    {isSuccess ? (
                        <div>
                            <SpanSeparate>
                                <span>Recebimento de encomenda registrado com sucesso.
                                    <FaCheckCircle size={30} color="green" />
                                </span>
                            </SpanSeparate>
                            <Image src={sucessMessage} alt="Imagem de erro" />
                        </div>
                    ) : (
                        <div>
                            <SpanSeparate>
                                <span>Erro ao confirmar recebimento da encomenda
                                    <FaTimesCircle size={30} color="red" />
                                </span>
                            </SpanSeparate>
                            <Image src={errorM} alt="Imagem de erro" />
                        </div>
                    )}
                    <p>{message}</p>
                </ValidandoContainer>
            </ValidandoSection>
            <FooterCM />
        </>
    );
}
