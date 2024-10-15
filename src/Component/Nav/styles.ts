import styled, { keyframes } from "styled-components";

interface SelectedOption {
    $isActive: boolean;
}

interface ChangeTheme {
    $changeTheme: boolean;
}

export const Navigation = styled.nav`
    width: 100%;
    background: linear-gradient(135deg, #00c6ff, #0072ff);
    height: 5rem;
    color: var(--brancoPastelFont);
    display: flex;
    align-items: center;
    border-radius: 0 0 50px 50px;

    position: fixed;
    z-index: 15;
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

export const IconDarkOrLight = styled(Icons)`
        transition: .2 ease-in-out;
`

export const MenuDiv = styled.div<ChangeTheme>`
    width: 13rem;
    box-shadow: 15px 10px 10px rgba(0, 0, 0, 0.1);
    z-index: 16;
    position: absolute;
    border-radius: 0rem 0rem 15px 0rem;
    display: flex;
    flex-direction: column;
    margin-right: 10rem;
    position: fixed;
    transition: ease-in .1s;

    background-color: ${(props) => props.$changeTheme ? '#fff' : '#333'};
`

export const NavMenu = styled.div`
    width: 100%;
    height: 5rem;
    background-color: var(--focusText);
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
    margin: 0rem .3rem;
    gap: .5rem;
    border-radius: 25px 0px;
    width: 100%;
    background: linear-gradient(135deg, #00c6ff, #0072ff);

    transition: ease-in .1s;
    :hover {
        cursor: pointer;
    }
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
    gap: .4rem;
    justify-content: start;
`

export const IconsMenu = styled.button<SelectedOption>`
    cursor: pointer;
    width: 100%;
    transition: ease-in .1s;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: .5rem;
    color: var(--defaultText);
    padding: .5rem 0rem;
    padding-left: 2rem;
    margin-left: -1rem;        
    border-radius: 5px;
    box-shadow: ${(props) => props.$isActive
        ? '0px 4px 6px rgba(0, 0, 0, 0.3)'
        : ''};

    background-color: ${(props) => props.$isActive ? 'var(--focusText)' : 'transparent'};
    color: ${(props) => props.$isActive ? 'var(--brancoPastelFont)' : 'var(--defaultText)'};

    span {
        font-weight: 500;
    }

    div {
        display: flex;
        align-items: center;
        gap: .5rem;
    }

    &:hover {
        box-shadow: 0px 4px 6px rgba(0, 0, 0, .2);
        background-color: var(--focusText);
        color: var(--brancoPastelFont);

        span {
            color: var(--brancoPastelFont);
        }
    }    
`

export const CloseMenu = styled.button`
    height: 3rem;
    margin-top: 1rem;
    text-align: center;
    padding: 1rem 0rem; 
    padding-left: 5rem;
    margin-left: -5rem;

    :hover {
        background-color: var(--focusText);
        color: var(--brancoPastelFont);
    }  
`