import styled from "styled-components";

export const ValidandoSection = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    margin: 2rem 0rem;
`;

export const ValidandoContainer = styled.div`
    text-align: center;
    /* background-color: #f9f9f9; */
    padding: 2rem;
    border-radius: 8px;

    span {
        margin-bottom: 1rem;
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
`