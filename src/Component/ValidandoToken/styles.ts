import styled from "styled-components";

export const ValidandoSection = styled.div`
    padding: 5rem 0rem;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;

    @-webkit-keyframes squareToCircle {
        0% {
            border-radius: 0 0 0 0;
            background: #dea50a;
            transform: rotate(0deg);
        }
        25% {
            border-radius: 50% 0 0 0;
            background: #3F24F7;
            transform: rotate(45deg);
        }
        50% {
            border-radius: 50% 50% 0 0;
            background: #048A42;
            transform: rotate(90deg);
        }
        75% {
            border-radius: 50% 50% 50% 0;
            background: #3F24F7;
            transform: rotate(135deg);
        }
        100% {
            border-radius: 50% 50% 50% 50%;
            background: #8E7FFE;
            transform: rotate(180deg);
        }
    }

    span {
        display: block;
        margin: 5rem 0rem;
        width: 200px;
        height: 200px;
        background-color: coral;
        position: relative;
        -webkit-animation: squareToCircle 2s 1s infinite alternate;
    }

    .loader {
        --color: white;
        --size-square: 3vmin;

        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .loader::before,
    .loader::after {
        content: '';
        box-sizing: border-box;
        position: absolute;
    }

    .loader.--7::before,
    .loader.--7::after {
        width: var(--size-square);
        height: var(--size-square);
        background-color: var(--color);
    }

    .loader.--7::before {
        top: calc(50% - var(--size-square));
        left: calc(50% - var(--size-square));
        animation: loader-6 2.4s cubic-bezier(0, 0, 0.24, 1.21) infinite;
    }

    .loader.--7::after {
        top: 50%;
        left: 50%;
        animation: loader-7 2.4s cubic-bezier(0, 0, 0.24, 1.21) infinite;
    }

    @keyframes loader-6 {
        0%, 100% {
            transform: none;
        }
        25% {
            transform: translateX(100%);
        }
        50% {
            transform: translateX(100%) translateY(100%);
        }
        75% {
            transform: translateY(100%);
        }
    }

    @keyframes loader-7 {
        0%, 100% {
            transform: none;
        }
        25% {
            transform: translateX(-100%);
        }
        50% {
            transform: translateX(-100%) translateY(-100%);
        }
        75% {
            transform: translateY(-100%);
        }
    }
`;

export const ValidandoContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

