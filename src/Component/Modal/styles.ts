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

export const ButtonDeletedModal = styled(ButtonModal)`
  background-color: #ff6666;
`
