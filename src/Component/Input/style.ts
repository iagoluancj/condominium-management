import styled from "styled-components";

interface FocusedField {
  $focusField: boolean;
}

export const InputTextLabel = styled.div<FocusedField>`
    position: absolute;
    margin-top: 0.6rem;
    padding: 0rem;
    background: transparent;
    padding-left: 0.5rem;
    border-radius: 10px;
    transition: ease-in 0.2s;
    font-family: outfit;
    font-weight: 400;
    color: var(--defaultText);
    z-index: 5;

    ${({ $focusField }) =>
    $focusField &&
    `  
    background-color: #fff;
    margin-top: -0.8rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    color: var(--focusText);
    `}
`;

export const InputInput = styled.input`
    transition: ease-in 0.1s;
    padding: 0.5rem 0rem;
    border: 2px solid var(--focusText);
    border-radius: 10px;
    width: 100%;
    padding-left: 0.5rem;

    &:focus {
      border: 2px solid var(--focusText) !important;
    }
`;

export const DivInput = styled.div`
  width: 100%;
`;

export const InputLabel = styled.label<FocusedField>`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;

  &:focus-within ${InputTextLabel} {
    background-color: #fff;
    margin-top: -0.8rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    color: var(--focusText);
  }
`;
