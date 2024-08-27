import styled from "styled-components";

interface OptionActionProps {
  isSelected: boolean;
}

interface OptionsCar {
  isDisabled: boolean;
}

interface selectedCarr {
  selectedCar: boolean;
}

interface PropsDeleted {
  isDeleted: boolean;
}

interface PropsSelectedCurrent {
  isSelectedCurrent: boolean;
}


export const InquilinoSection = styled.section<PropsSelectedCurrent>`
    display: flex;
    gap: 2rem;
    margin-top: 15vh;

    ${({ isSelectedCurrent }) =>
    isSelectedCurrent &&
    `  
       margin-left: 25vh;
    `}
`

export const ActionsInquilino = styled.div`
  display: flex;
  flex-direction: column;
`

export const ActionsInquilinoRegister = styled.div`
display: flex;
flex-direction: column;
margin-bottom: 2rem;
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


    ${({ isSelected }) =>
    isSelected &&
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
    width: 100%;
    gap: .5rem;
`

export const TitleHeader = styled.div`
    font-weight: 700;
    font-size: 32px;
`

export const BrevelyDescription = styled.div`
    color: var(--defaultText);
`

export const IconInquilino = styled.div`
    cursor: pointer;
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
  justify-content: center;
`
export const FormContainer = styled.div`

`

export const Label = styled.label`

`

export const DivLabel = styled.div`

`

export const InputForm = styled.input`
      margin: 0rem;
      padding: 0rem;
`
export const InputFormCarro = styled(InputForm)`
        transition: ease-in .2s;


`

export const LabelTemCarro = styled(Label) <selectedCarr>`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  gap: .5rem;
  margin-top: 10px;
  width: 5rem;
  margin-left: 1.2rem;

  padding: .3rem;
  border-radius: 5px;

  background-color: transparent;
  border: 2px solid var(--defaultText); 
  transition: ease-in .2s;


  ${({ selectedCar }) =>
    selectedCar &&
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

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 10px;
`;

export const Thead = styled.thead`
  background-color: #f4f4f4;
`;

export const Th = styled.th`
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
  font-weight: bold;
`;

export const Td = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
`;

export const Tr = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }

  &:hover {
    background-color: #f1f1f1;
  }
`;

export const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 8px 16px;
  margin: 4px;
  cursor: pointer;
  border-radius: 4px;
  font-size: 14px;
  width: 100%;
  text-align: center;
  border: 1px solid transparent;

  &:hover {
    background-color: transparent;
    border: 1px solid var(--focusText);
    color: var(--defaultText);

  }

  &:active {
    background-color: #004080;
  }
`;

export const ButtonDeleted = styled(Button)`
  background-color: #ff6666;
`

export const ButtonSave = styled(Button)`
  background-color: #66cc66;
`

export const Input = styled.input`
  padding: 4px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
`;

// ---------------- TESTE
export const InputWrapper = styled.div`
  position: relative;
  display: inline-block;
  margin: 20px;
  
`;

// Estilo para o input
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

// Texto na linha da borda
export const InputText = styled.div`
  position: absolute;
  width: 30%;
  top: 0;
  left: 0;
  right: 0;
  text-align: center;
  color: #007bff; 
  pointer-events: none; 
  z-index: 5;
  transform: translateY(-50%);
  padding: 0; 
  background-color: white; 
`;

export const InputCPF = styled(InputText)`
  width: 25%;
  
`
export const StyledInputCPF = styled(StyledInput)`
  width: 100%;
`
export const InputWrapperCPF = styled(InputWrapper)`
margin-left: 8.1rem;
`

export const SpanTemCarro = styled.div<selectedCarr>`
  margin-left: -.8rem;
  margin-top: -1.2rem;
  padding: 0rem .6rem;
  background-color: #fff;
  transition: ease-in .2s;


  font-family: outfit;
  font-weight: 600;
  ${({ selectedCar }) =>
    selectedCar &&
    `
    margin-left: 0rem;
    margin-top: 0rem;
    padding: 0rem;
    color: var(--brancoPastelFont);
    background: var(--focusText);
    transition: ease-in .2s;

    `}
`

// ---------------------------------carro---------------------------------

export const InputQuantidadeCarros = styled(InputText) <OptionsCar>`
  width: 40%;
  ${({ isDisabled }) =>
    isDisabled &&
    `  
        color: var(--defaultText);

    `}
`;

export const StyledInputQuantidadeCarros = styled(StyledInput) <OptionsCar>`
  width: 70%;
  ${({ isDisabled }) =>
    isDisabled &&
    `   
        color: var(--defaultText);
        border: 2px solid var(--defaultText); 
    `}
`;

export const InputWrapperQuantidadeCarros = styled(InputWrapper)`

`;
// -------------------------------------------
export const InputModeloCarro = styled(InputText) <OptionsCar>`
  width: 35%;
  ${({ isDisabled }) =>
    isDisabled &&
    `  
        color: var(--defaultText);

    `}
`;

export const StyledInputModeloCarro = styled(StyledInput) <OptionsCar>`
  width: 100%;
  ${({ isDisabled }) =>
    isDisabled &&
    `   
        color: var(--defaultText);
        border: 2px solid var(--defaultText); 
    `}
`;

export const InputWrapperModeloCarro = styled(InputWrapper)`
margin-left: -4rem;
`;

export const InputPlacaCarro = styled(InputText) <OptionsCar>`
  width: 25%;
  ${({ isDisabled }) =>
    isDisabled &&
    `  
        color: var(--defaultText);

    `}
`;

export const StyledInputPlacaCarro = styled(StyledInput) <OptionsCar>`
  width: 75%;
  ${({ isDisabled }) =>
    isDisabled &&
    `   
        color: var(--defaultText);
        border: 2px solid var(--defaultText); 
    `}
`;

export const InputWrapperPlacaCarro = styled(InputWrapper)`
  margin-left: .6rem;
`;
// ------------------------------------------------------------------

// ---------------------------------residencia---------------------------------

export const InputApartamento = styled(InputText)`
  width: 55%;
`;

export const StyledInputApartamento = styled(StyledInput)`
  width: 75%;
`;

export const InputWrapperApartamento = styled(InputWrapper)`
`;

export const InputStatus = styled(InputText)`
  width: 55%;
`;

export const StyledInputStatus = styled(StyledInput)`
  width: 75%;
`;

export const InputWrapperStatus = styled(InputWrapper)`
`;

export const InputBloco = styled(InputText)`
  width: 30%;
`;

export const StyledInputBloco = styled(StyledInput)`
  width: 75%;
`;

export const InputWrapperBloco = styled(InputWrapper)`
`;

export const InputComunicadoImportante = styled(InputText)`
  width: 40%;
`;

export const StyledInputComunicadoImportante = styled(StyledInput)`
  height: 100px;
`;

export const InputWrapperComunicadoImportante = styled(InputWrapper)`
  width: 57.5%;
`;

export const StyledSelectStatus = styled.select`
  width: 100%;
  padding: 0.5rem;
  margin-top: .3rem;
  font-size: 1rem;
  border: 2px solid #007bff;
  border-radius: 4px;
`;

export const CreateInqui = styled.button`
  width: 88%;
  font-weight: 600;
  font-size: 20px;
  padding: 1rem;
  transition: ease-in .2s;
  background-color: var(--focusText);
  color: var(--brancoPastelFont);
  border-radius: 10px;
  text-align: center;


  :hover {
    cursor: pointer;
    transition: ease-in .2s;
  }

`
export const SeparationResidenc = styled.div`
  display: flex;
  align-items: center;
`