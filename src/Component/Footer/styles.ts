import styled from "styled-components";

export const FooterWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-bottom: -4rem;
    gap: 2rem;
    padding: .7rem 10rem;
    background: linear-gradient(135deg, #00c6ff, #0072ff);

    font-size: 14px;
    font-weight: 400;
`;

export const FooterSection = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 100%;
    gap: .7rem;
`;

export const IconSocial = styled.div`
    padding: .5rem;
    background-color: #00000019;
    border-radius: 50%;
`;


export const FooterLogo = styled.div`
`;

export const FooterCopyright = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    strong {
        color: #FA5252;
        font-weight: 700;
    }
`;

export const FooterColumn = styled.div`
    display: flex;
    flex-direction: column;
    gap: .3rem;
    h3 {
        font-size: 20px;
        font-weight: 700;
    }

`;

export const P = styled.p`
    &:hover {
        cursor: pointer;
        text-decoration: underline;
    }
`

export const FooterContact = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;

    h3 {
        font-size: 20px;
        font-weight: 700;
    }
`;

export const FooterInputGroup = styled.div`
    display: grid;
    gap: 1rem;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
`;

export const FooterButton = styled.button`
    background-color: var(--brancoPastelFont);
    color: var(--focusText);
    border: 1px solid var(--focusText);
    text-align: center;
    padding: .1rem;
    border-radius: 10px;
    transition: .1s ease-in;

   &:hover {
    background-color: var(--focusText);
    color: var(--brancoPastelFont);
    border: 1px solid transparent;
    transform: scale(1.05);
    transition: .1s ease-in;
   }
`;
