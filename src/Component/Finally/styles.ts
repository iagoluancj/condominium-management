import styled from "styled-components";

export const FinallyComponent = styled.div`
    margin: -7rem 0rem;
`;

export const ValidandoSection = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
`;

export const ValidandoContainer = styled.div`
    text-align: center;
    /* background-color: #f9f9f9; */
    padding: 2rem;
    border-radius: 8px;

    span {
        font-size: 1.5rem;

        display: flex;
        align-items: center;
        gap: 1rem;
    }

    p {
        margin-top: 1rem;
        font-size: 1.1rem;
    }

    div {
        display: flex;
        flex-direction: column;
        align-items: center;

        img {
            width: 500px;
        }
    }
`;

export const SpanSeparate = styled.div`
    display: flex;
    flex-direction: row !important;
    align-items: center;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
`

export const NavFinally = styled.div`
    width: 100%;
    height: 200px;
    background: linear-gradient(135deg, #00c6ff, #0072ff);
`