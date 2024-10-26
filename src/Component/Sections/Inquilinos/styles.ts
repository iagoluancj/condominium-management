import styled from "styled-components";

interface OptionActionProps {
  $isSelected: boolean;
}

interface OptionsCar {
  $isDisabled: boolean;
}

interface Edited {
  $isEdited: boolean;
}

interface selectCar {
  $selectedCar: boolean;
}

interface PropsSelectedCurrent {
  $isSelectedCurrent: boolean;
}


export const InquilinoSection = styled.section<PropsSelectedCurrent>`
    display: flex;
    gap: 2rem;
    margin-top: 20vh;
    margin-left: 10vh;

    color: ${(props) => props.theme.secondary};
`

export const ImageDiv = styled.img`
`

export const ActionsInquilino = styled.div`
  display: flex;
  flex-direction: column;
`

export const ActionsInquilinoRegister = styled.div`
display: flex;
flex-direction: column;
margin-bottom: 2rem;
padding: 2rem;
border-radius: 15px;
background-color: ${(props) => props.theme.background};
color: var(--defaultText);
`

export const OptionsActionInquilos = styled.div`
    display: flex;
    flex-direction: column;
    gap: .5rem;
`

export const OptionAction = styled.div<OptionActionProps>`
    font-weight: 600;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    transition: ease-in .2s;


    ${({ $isSelected }) =>
    $isSelected &&
    `
        background-color: var(--focusText);
        color: var(--brancoPastelFont);
        padding: 1rem;
        border-radius: 10px;
    `}

    :hover {
        cursor: pointer;
        transition: ease-in .2s;
    }
    
`
export const Icon = styled.div`

`
export const HeaderInquilinos = styled.div`
    display: flex;
    flex-direction: column;
    gap: .5rem;
    margin-bottom: 1rem;
`

export const TitleHeader = styled.div`
    font-weight: 700;
    font-size: 32px;
    color: ${(props) => props.theme.secondary};
`

export const BrevelyDescription = styled.div`
     width: 100%;
    color: var(--defaultText);
`

export const IconInquilino = styled.div`
    transition: ease-in .1s;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: .5rem;
    color: var(--focusText);
    margin-left: -1rem;
    padding: 1rem 0rem 2rem 0rem;

    p {
        font-weight: 500;
    }

    h2 {
      font-size: 24px;
    }

    :hover {
        color: var(--focusText);
        transition: ease-in .1s;
    }

    div {
        display: flex;
        align-items: center;
        gap: .5rem;
        margin-left: -1rem;
        margin-top: 2rem;
    }
`

// Form
export const Form = styled.form`
  display: flex;
  flex-direction: column;
`
export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  `

export const Label = styled.label`
`

export const DivLabel = styled.div`
`
export const InputFormCarro = styled.input`
  transition: ease-in .2s;
  margin: 0rem;
  padding: 0rem;
  transition: ease-in .2s;
`

export const SpanTemCarro = styled.div<selectCar>`
  margin-left: -.8rem;
  margin-top: -1.2rem;
  padding: 0rem .6rem;
  background-color: #fff;
  transition: ease-in .2s;
  background-color: ${(props) => props.theme.background};

  font-family: outfit;
  font-weight: 400;
  ${({ $selectedCar }) =>
    $selectedCar &&
    `
    margin-left: 0rem;
    margin-top: 0rem;
    padding: 0rem;
    color: var(--brancoPastelFont);
    background: var(--focusText);
    transition: ease-in .2s;
    `}

`

export const LabelTemCarro = styled(Label) <selectCar>`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  gap: .5rem;
  margin-top: 2px;
  width: 9rem;
  height: 2rem;
  padding: .3rem;
  margin: 1rem 0rem .8rem 0rem;
  border-radius: 5px;
  transition: ease-in .2s;
  margin-bottom: 1.3rem;

  border: 2px solid var(--defaultText); 

  margin-top: 2rem;

  ${({ $selectedCar }) =>
    $selectedCar &&
    `
      background: var(--focusText);
      color: #000;
      border: 2px solid transparent; 
      transition: ease-in .2s;
      padding: 0rem;
    `}

    :hover {
        cursor: pointer;
        transition: ease-in .2s;
    }
`


// CSS Table

export const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 8px 16px;
  margin: 4px;
  cursor: pointer;
  border-radius: 4px;
  font-size: 14px;
  text-align: center;
  border: 1px solid transparent;
  /* box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); */

  &:hover {
    background-color: transparent;
    border: 1px solid var(--focusText);
    color: var(--defaultText);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  }

  &:disabled {
    color: var(--defaultText);
    background-color: #00000050;
    border: 1px solid transparent;
    box-shadow: 0px 0px 0px 0px rgb(0, 0, 0, 0);
  }
`;

export const ButtonBack = styled(Button)`
    background-color: transparent;
    border: 1px solid var(--focusText);
    color: var(--defaultText);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);

  &:hover {
    color: 1px solid var(--focusText);
  } 
`

export const ButtonDeleted = styled(Button)`
  background-color: #ff6666;

  &:hover {
    border: 1px solid #ff6666;
  } 
`

export const ButtonSave = styled(Button)`
  background-color: #66cc66;

  &:hover {
    border: 1px solid #66cc66;
  } 
`

export const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  height: 100%;
`;

export const InputWrapper = styled.div`
  position: relative;
  display: inline-block;
  margin: 20px;  
`;

export const StyledInput = styled.input`
  border: 2px solid #007bff; 
  border-radius: 5px; 
  padding: 10px;
  font-size: 16px; 
  width: 150%; 
  box-sizing: border-box;
  position: relative;
  z-index: 1; 
  background-color: white; 
`;

export const InputStatus = styled.div`
  position: absolute;
  width: 25%;
  top: 0;
  left: 0;
  right: 0;
  text-align: center;
  border-radius: 15px;
  color: #007bff; 
  pointer-events: none; 
  z-index: 5;
  transform: translateY(-50%);
  padding: 0; 
    background-color: ${(props) => props.theme.background};
`;

export const InputWrapperStatus = styled(InputWrapper)`
`;

export const StyledSelectStatus = styled.select`
  padding: 0.5rem;
  width: 300px;
  height: 45px;
  margin-top: .0rem;
  font-size: 1rem;
  border: 2px solid #007bff;
  border-radius: 10px;
  background-color: ${(props) => props.theme.background};
  
`;

export const CreateInqui = styled.button`
  font-weight: 600;
  font-size: 20px;
  padding: 1rem;
  margin-top: 1rem;
  transition: ease-in .2s;
  color: var(--brancoPastelFont);
  border-radius: 10px;
  text-align: center;

  background: linear-gradient(135deg, #00c6ff, #0072ff);
  border: 1px solid #00000000;
  transition: ease-in .2s;
  
  &:hover {
    cursor: pointer;
    background: linear-gradient(135deg, #00c6ff00, #0072ff00);
    color: var(--focusText);
    transition: ease-in .2s;
    border: 1px solid var(--focusText);
  }


`
export const SeparationResidenc = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
`

export const SeparationCarro = styled(SeparationResidenc)`
  margin-bottom: 2rem;
`

export const SeparationPessoal = styled(SeparationResidenc)`
    gap: 20px;
`
export const H3 = styled.h3`
  margin-bottom: -.7rem;
`

export const H3Pessoal = styled.h3`
  margin-bottom: .8rem;
`

export const SpanContext = styled.div`
  overflow-x: auto; 
  white-space: nowrap; 
  
  tr {
    color: ${(props) => props.theme.secondary};
    background-color: ${(props) => props.theme.table};
    
   input {
    color: ${(props) => props.theme.secondary};
    background-color: ${(props) => props.theme.table};
   }
  
   textarea, select {
    background-color: ${(props) => props.theme.table};
   }   
   
   &:nth-child(even) { 
      background-color: ${(props) => props.theme.table};
      color: ${(props) => props.theme.teste};
    }

    &:nth-child(even) {
      td {
      background-color: ${(props) => props.theme.table};
      color: ${(props) => props.theme.secondary};
    }
    }
    &:nth-last-child(even) {
      background-color: ${(props) => props.theme.tableSecond};
      color: ${(props) => props.theme.secondary};

      td {
      background-color: ${(props) => props.theme.tableSecond};
      color: ${(props) => props.theme.secondary};
    }
    }
  }
`

export const GlobalStyles = styled.div`

    @media (max-width: 1200px) {
        ${InquilinoSection} {
          flex-direction: column;
          padding-right: 2rem;
          width: 1000px;
        }
        ${ActionsInquilino} {
          width: 100%;
        }
        ${OptionsActionInquilos} {
          width: 100%;
        }
        ${ActionsInquilinoRegister} {
          width: 100%;
          div {
            width: 100%;
          }
        }
        ${StyledSelectStatus} {
          width: 95%;
        }
        ${InputStatus} {
          width: 25% !important;
        }
    }

    @media (max-width: 950px) {
        ${InquilinoSection} {
          width: 900px;
        }
      }

    @media (max-width: 854px) {
        ${InquilinoSection} {
          padding-right: 2rem;
          width: 800px;
        }
        ${SeparationPessoal} {
            flex-direction: column;
        }
        ${SeparationCarro} {
            flex-direction: column;
        }
        ${DivLabel} {
            width: 100%;
        }
        ${StyledSelectStatus} {
          width: 90%;
        }
    }
    @media (max-width: 720px) {
      ${InquilinoSection} {
          padding-right: 2rem;
        }
      ${SeparationResidenc} {
          margin-top: 1rem;
          flex-direction: column;
        }
      ${DivLabel} {
          width: 100%;
          padding: 0;
          margin: 0;
        }
        ${StyledSelectStatus} {
          width: 100%;
        }
        ${InputWrapperStatus} {
          padding: 0;
          margin: 0;
          margin-bottom: 1rem;
        }
      }

      @media (max-width: 577px) {
        ${InquilinoSection} {
          padding: 0rem;
          padding-right: 2rem;
          width: 900px;
        }
      }

      @media (max-width: 426px) {
        ${InquilinoSection} {
          padding-right: 2rem;
        }

        ${IconInquilino} {
         margin: 0;
         padding: 0;
         padding-bottom: 1rem;
        }

      }
  `
