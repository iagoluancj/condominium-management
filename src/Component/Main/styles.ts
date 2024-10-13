import styled from "styled-components";

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  background: ${(props) => props.theme.mainBackground};

  padding-bottom: 4rem;
`;

export const MainContainerDiv = styled.div` 
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`
export const GlobalStyles = styled.div`
    @media (max-width: 1200px) {
        /* ${MainContainerDiv} {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 100%;
        } */
    }

    @media (max-width: 1064px) {
    }

    @media (max-width: 992px) {

    }

    @media (max-width: 800px) {

    }

    @media (max-width: 768px) {
      ${MainContainer} {
        width: 800px !important;
      }
    }

    @media (max-width: 576px) {
      ${MainContainer} {
        width: 800px !important;
      }
    }

    @media (max-width: 480px) {
  
    }
`