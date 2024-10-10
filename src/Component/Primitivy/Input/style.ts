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
    margin-left: .1rem;
    border-radius: 10px;
    transition: ease-in 0.2s;
    font-family: outfit;
    font-weight: 400;
    color: var(--defaultText);
    transition: ease-in .2s;

    ${({ $focusField }) =>
    $focusField &&
    `  
    margin-top: -0.8rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    `}

    background-color: ${(props) => props.theme.background};
`;

export const InputInput = styled.input`
    transition: ease-in 0.1s;
    padding: 0.5rem 0rem;
    border-radius: 10px;
    padding-left: 0.5rem;
    text-align: start !important;

    background-color: ${({ disabled }) => (disabled ? "#f5f5f5" : "#fff")}; 
    border: ${({ disabled }) => (disabled ? "2px solid var(--defaultText)" : "2px solid var(--focusText)")};  
    cursor: ${({ disabled }) => (disabled ? "not-allowed" : "text")}; 

    background-color: ${(props) => props.theme.background};
    color: ${(props) => props.theme.secondary};

    &:focus {
      border: 2px solid var(--focusText) !important;
    }
    transition: ease-in .2s;
`;

export const DivInput = styled.div`
  width: 100%;
  transition: ease-in .2s;
  color: ${(props) => props.theme.background};
  background-color: ${(props) => props.theme.background};  
`;

export const InputLabel = styled.label<FocusedField>`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  transition: ease-in .2s;

  &:focus-within ${InputTextLabel} {
    background-color: ${(props) => props.theme.background};
    margin-top: -0.8rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    color: var(--focusText);
  }
`;
























export const TextArea = styled.textarea`
    transition: ease-in 0.1s;
    padding: 0.5rem 0rem;
    border-radius: 10px;
    width: 100%;
    padding-left: 0.5rem;

    background-color: ${({ disabled }) => (disabled ? "#f5f5f5" : "#fff")}; 
    border: ${({ disabled }) => (disabled ? "2px solid var(--defaultText)" : "2px solid var(--focusText)")};  
    cursor: ${({ disabled }) => (disabled ? "not-allowed" : "text")}; 

    &:focus {
      border: 2px solid var(--focusText) !important;
    }
    
    transition: ease-in .2s;

    height: 200px;
    resize: vertical;  
    background-color: ${(props) => props.theme.background};
    color: ${(props) => props.theme.secondary};
`;
