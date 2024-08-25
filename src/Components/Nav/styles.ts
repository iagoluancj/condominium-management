import styled from "styled-components";

export const Navigation = styled.nav`
    width: 100%;
    background-color: var(--backgroundColor);
    height: 5rem;
    color: var(--brancoPastelFont);
    display: flex;
    align-items: center;

    position: absolute;
    z-index: 5;
    margin-top: 0vh;
`

export const NavContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    margin: 0rem 2rem 0rem 2rem ;
    margin-top: 0vh;
`

export const IconsRight = styled.div`
    display: flex;
    flex-direction: row;
    gap: 2rem;
 `

export const Icons = styled.button`
    cursor: pointer;
    transition: 5s;

    :hover {
        transition: .1s;
    }
`
export const MenuDiv = styled.div`
    width: 11rem;
    height: 1200px;
    box-shadow: 15px 10px 10px rgba(0, 0, 0, 0.1);
    z-index: 6;
    background-color: var(--brancoPastelFont);
    position: absolute;

    margin-right: 10rem;
`

export const NavMenu = styled.div`
    width: 100%;
    height: 5rem;
    background-color: #00003E;
    color: var(--brancoPastelFont);
    box-shadow: 15px 10px 10px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
`

export const NavIconMenu = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding-left: 1rem;
    gap: .5rem;
`

export const MenuContainer = styled.div`

`

export const IconsContainer = styled.div`
    padding: 1rem 0rem 0rem 1rem;
    transition: ease-in .1s;

    :hover {
        color: var(--focusText);
        transition: ease-in .1s;
    }
`

export const IconsMenu = styled.button`
    cursor: pointer;
    transition: ease-in .1s;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: .5rem;
    color: var(--defaultText);
    padding-left: 1rem;

    p {
        font-weight: 500;
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

export const CloseMenu = styled.button`
    width: 100%;
    height: 3rem;
    color: var(--focusText);
    text-align: center;

    span {
        :hover {
        }
    }
`