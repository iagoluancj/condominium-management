import styled from "styled-components";

export const ButtonModal = styled.button`
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

  &:hover {
    background-color: transparent;
    border: 1px solid var(--focusText);
    color: var(--defaultText);

  }

  &:active {
    background-color: #004080;
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
  text-align: center;
  border: 1px solid transparent;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

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

export const ButtonDeletedModal = styled(ButtonModal)`
  background-color: #ff6666;
`
export const ButtonDeleted = styled(Button)`
  background-color: #ff6666;

  &:hover {
    border: 1px solid #ff6666;
  } 
`
