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

    transition: ease-in .1s;
`

export const NavContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    margin: 0rem 2rem 0rem 2rem ;
    margin-top: 0vh;

    transition: ease-in .1s;
`

export const IconsRight = styled.div`
    display: flex;
    flex-direction: row;
    gap: 2rem;

    transition: ease-in .1s;
 `

export const Icons = styled.button`
    cursor: pointer;
    transition: ease-in .2s;

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

    display: flex;
    flex-direction: column;
    margin-right: 10rem;

    transition: ease-in .1s;

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

    transition: ease-in .1s;



`

export const NavIconMenu = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding-left: 1rem;
    gap: .5rem;

    transition: ease-in .1s;

`

export const MenuContainer = styled.div`
    :hover {
        color: var(--focusText);
        transition: ease-in .1s;

    }
    transition: ease-in .1s;


`

export const IconsContainer = styled.div`
    margin-top: 1rem;
    transition: ease-in .1s;
    display: flex;
    flex-direction: column;
    transition: ease-in .1s;
    justify-content: start;

    :hover {
        background-color: var(--focusText);
        color: var(--brancoPastelFont);
        border-radius: 3px;
    }  

`

export const IconsMenu = styled.button`
    cursor: pointer;
    width: 70%;
    transition: ease-in .1s;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: .5rem;
    color: var(--defaultText);
    padding: .5rem 0rem;
    padding-left: 1rem;

    span {
        font-weight: 500;
    }

    div {
        display: flex;
        align-items: center;
        gap: .5rem;
    }
    
    
`

export const CloseMenu = styled.button`
    height: 3rem;
    margin-top: 1rem;
    color: var(--focusText);
    text-align: center;
    padding: 1rem 0rem; 

    :hover {
        background-color: var(--focusText);
        color: var(--brancoPastelFont);
    }  
`