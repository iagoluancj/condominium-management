import { InquilinoSection } from "../Inquilinos/styles";
import { ApartamentosSection } from "./styles";

export default function Apartamentos() {
    return (
        <>
            <InquilinoSection $isSelectedCurrent>
                <ApartamentosSection>
                    <h3>Tela de Apartamentos</h3>
                    <span>
                        <div className="loader --7"></div>
                    </span>
                    <p>Em desenvolvimento...</p>
                </ApartamentosSection>
            </InquilinoSection>
        </>
    );
}
