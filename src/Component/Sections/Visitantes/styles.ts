import styled from "styled-components";

interface VisitPerHour {
  $visitHour: boolean;
}

export const ButtonCreateVisit = styled.button`
  font-weight: 600;
  font-size: 20px;
  padding: 1rem;
  margin-top: 1rem;
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

export const ContainerForm = styled.div`
  display: flex;
  margin-bottom: 1rem;
  gap: 1rem;
`
export const ContainerFormStyles = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    gap: 1rem;
    transition: ease-in .2s;
`

export const LabelVisit = styled.label<VisitPerHour>`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  gap: .5rem;
  margin-top: 2px;
  width: 7rem;
  height: 2rem;
  padding: .3rem;
  border-radius: 5px;
  transition: ease-in .2s;

  background-color: transparent;
  border: 2px solid var(--defaultText); 


  ${({ $visitHour }) =>
    $visitHour &&
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

export const SpanVisit = styled.div<VisitPerHour>`
  margin-left: -.8rem;
  margin-top: -1.2rem;
  padding: 0rem .6rem;
  background-color: #fff;
  transition: ease-in .2s;

  font-family: outfit;
  font-weight: 400;
  ${({ $visitHour }) =>
    $visitHour &&
    `
    margin-left: 0rem;
    margin-top: 0rem;
    padding: 0rem;
    color: var(--brancoPastelFont);
    background: var(--focusText);
    transition: ease-in .2s;
    `}
`

export const InputVisit = styled.input`
  transition: ease-in .2s;
  margin: 0rem;
  padding: 0rem;
  transition: ease-in .2s;
`
