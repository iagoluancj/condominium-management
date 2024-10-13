import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 1100px;
    gap: 1rem;
    margin-top: 15vh;

    h4 {
      font-size: 32px;
      font-weight: 800;
      color: var(--focusText);
      display: flex;
      align-items: center;
      gap: 1rem;
    }

`;

const Section = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    gap: 1rem;
`;

export const SectionOptions = styled(Section)`
    box-shadow: ${(props) => props.theme.cardShadow};
    border-radius: 5px;

    padding: .5rem;
`;

const Card = styled.div`
    display: flex;
    padding: 1rem;
    gap: .3rem;
    flex: row;
    max-width: 280px;
    height: 96px;
    background-color: #FFF4D6;
    border-radius: 8px;

    align-items: center;
    justify-content: space-evenly;
    transition: .2s ease-in-out;

    &:hover {
        transform: scale(1.01);
        transition: .2s ease-in-out;
    }
`;

export const CardEncomenda = styled(Card)`
    background: #DDD8FF;
`

export const CardVisitante = styled(Card)`
    background: #D9FFE6;
`

export const CardCreate = styled(Card)`
    background: #FFD9D9;

`

export const CardSeparator = styled.div`
    display: flex;
    flex-direction: column;
    
`;

const IconWrapper = styled.div`
    width: 51px;
    background: linear-gradient(180deg, #FFBF08 50%, #FF8C00 100%);
    height: 51px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;

    color: var(--brancoPastelFont);
`;

export const IconWrapperVisitante = styled(IconWrapper)`
    background: linear-gradient(180deg, #048A42 0%, #50E680 100%);
`

export const IconWrapperEncomenda = styled(IconWrapper)`
    background: linear-gradient(180deg, #3F24F7 0%, #8E7FFE 100%);
`

export const IconWrapperCreate = styled(IconWrapper)`
    background: linear-gradient(180deg, #FFFFFF 100%, #3224F7 50%, #FFFFFF 10%);

    color: #F0AAAA;
`

const Icon = styled.span`
`;

export const IconCreate = styled.span`
`;

const Title = styled.h1`
    font-weight: 600;
    color: #192434;
`;

const Description = styled.p`
    max-width: 200px;
`;

const LeftColumn = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const RightColumn = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 38.5%;
`;

const ChartWrapper = styled.div`
    box-shadow: 0px 0px 10px .1px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    background: ${(props) => props.theme.background};
`;

export const ChartWrapperTwoCharts = styled(ChartWrapper)`
    box-shadow: 0px 0px 10px .1px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    background: ${(props) => props.theme.background};
`;

export const ChartWrapperPizza = styled(ChartWrapper)`
    box-shadow: 0px 0px 10px .1px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    background: ${(props) => props.theme.background};
`;



export const HeaderChartTitle = styled.div`
    border-bottom: 1px solid #80808050;
    padding: .4rem .0rem 0rem 0rem;
    padding-left: .7rem;

    p {
        color: ${(props) => props.theme.secondary};
        font-size: 12px;
    }
`;

const SectionTitle = styled.h2`
    font-weight: 800;
    color: var(--focusText);
`;

const Chart = styled.div`
    padding: .4rem;

    width: 660px;
    height: 100%;
`;

export const ChartAdjunt = styled.div`
    display: flex;
    gap: .5rem;

    justify-content: space-between;
`;

export const ChartApartment = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    text-align: center;
    width: 100%;
    height: 282px;
    padding: .4rem;
    color: ${(props) => props.theme.secondary};
`;

export const SeparateChart = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    text-align: center;
    width: 100%;
    height: 282px;
    padding: .4rem;
    color: ${(props) => props.theme.secondary};
`;

export const ChartMoradores = styled.div`

`;

const InfoSection = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;

    border-radius: 10px;

    background-color: #1D77FF;
    padding: .5rem;
    font-weight: 600;
    font-size: 18px;
    color: var(--brancoPastelFont);

    position: relative;
    height: 200px;
    background-color: #228BE6; 
    padding: 20px;
    overflow: hidden;
    box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.1);
`;

const InfoTitle = styled.h2`
    max-width: 280px;
`;

const InfoDescription = styled.p`
    max-width: 200px;

    font-weight: 400;
    font-size: 14px;
    color: rgb(210, 206, 206);
`;

export const Vector1 = styled.div`
    position: absolute;
    top: -45px;
    right: -15px;
    width: 100px;
    height: 100px;
    background-color: #8E7FFE;
    transform: rotate(45deg);
    border-radius: 10px;
    opacity: 0.7;
`;

export const Vector2 = styled.div`
    position: absolute;
    top: 50px;
    right: -40px;
    width: 120px;
    height: 120px;
    background-color: #3F24F7; 
    transform: rotate(45deg);
    border-radius: 6px;
    opacity: 0.5;
`;

export const Vector3 = styled.div`
    position: absolute;
    bottom: -55px;
    right: 50px;
    width: 120px;
    height: 120px;
    background-color: #8E7FFE; /* cor do vetor 1 */
    transform: rotate(40deg);
    border-radius: 10px;
    opacity: 0.7;
`;

export const Content = styled.div`
    position: relative;
    z-index: 1;
`;

export const Button = styled.button`
margin-top: 5rem;
    background-color: #fff;
    color: #228BE6;
    border: none;
    border-radius: 8px;
    padding: 6px 12px;
    font-weight: bold;
    cursor: pointer;

    font-size: 14px;
    font-weight: 800;

    height: 25px;
    z-index: 2;
    transition: .2s ease-out;
    border: 1px solid transparent;

    &:hover {
        transform: scale(1.1);
        transition: .2s ease-in;

        border: 1px solid #8E7FFE;
    }
`;

export const CondoUpdatesContainer = styled.div`
    box-shadow: var(--padraoShadow);
    border-radius: var(--padraoRadius);
    background: ${(props) => props.theme.background};
    font-weight: 600;
    width: 100%;
    font-size: 18px;
    height: 100%;

    p {
        color: var(--defaultText);
        font-size: 12px;
        font-weight: 400;
        font-size: 12px;
    }
`;

export const HeaderCondoUpdates = styled.div`
    padding: 20px;
    padding-bottom: .2rem;
    padding-top: .4rem;
    border-bottom: 1px solid #80808050;

    p {
        color: ${(props) => props.theme.secondary};
    }
`;

export const UpdatesSection = styled.div``;

export const ChartApartamentSeparator = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const ContainerSPAN = styled.div`
    p {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: .5rem  ;
    }
`;

export const ColorSpan = styled.span`
    width: 10px;
    height: 10px;
    border-radius: 15px;
    background-color: #FFD9D9;
    color: red;
`;

export const P = styled.p`
    margin-left: 2.7rem;
`;

export const ColorSpanMeta = styled(ColorSpan)`
    background-color: #3d9112c2;
`;

export const ColorSpanTotal = styled(ColorSpan)`
    background-color: #7594ba;
`;

export const SectionClassifyColor = styled.div`
    margin-top: .5rem;
    display: flex;
    gap: 1rem;
    width: 100%;
    align-items: center;
    justify-content: center;
    text-align: center;
    margin-bottom: -.2rem;
`
export const SpanClassifyColor = styled.span`
    background-color: red;
    width: 150px;
    font-weight: 400;
    font-size: 12px;
    border-radius: 100px 100px 0px 0px;
    color: var(--brancoPastelFont);
`

export const SpanClassifyColorInquilino = styled(SpanClassifyColor)`
    background-color: #dea50a;
`
export const SpanClassifyColorEncomenda = styled(SpanClassifyColor)`
    background-color: #3F24F7;
`
export const SpanClassifyColorVisita = styled(SpanClassifyColor)`
    background-color: #048A42;
`

export {
    Container,
    Section,
    Card,
    IconWrapper,
    Icon,
    Title,
    Description,
    LeftColumn,
    RightColumn,
    ChartWrapper,
    SectionTitle,
    Chart,
    InfoSection,
    InfoTitle,
    InfoDescription,
};

export const GlobalStyles = styled.div`
    @media (max-width: 1200px) {
        ${Container} {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 100%;
        }
        ${SectionOptions} {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: center;
        }
        ${Section} {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: center;
        }
        
        ${RightColumn} {
            width: 55%;
            padding: 2rem;
        }
    }

    @media (max-width: 1064px) {
        ${Content} {
        }
    }

    @media (max-width: 992px) {
        ${Content} {
        }
    }

    @media (max-width: 768px) {
        ${SeparateChart} {
            width: 50%;
            justify-content: center;
        }  
        ${ChartWrapperPizza} {
            width: 70%;
            padding: 2rem;
        } 
        ${LeftColumn} {
            width: 100%;
            margin: 0;
        }           
        ${RightColumn} {
            width: 70%;
            padding: 2rem;
        } 
        ${ChartWrapperTwoCharts} {
            margin-bottom: 16rem;
        } 
        ${ChartApartment} {
           display: flex;
           flex-direction: column;
           align-items: center;
        } 
        /* ${SeparateChart} {
           display: flex;
           flex-direction: row;
        }  */
    }

    @media (max-width: 576px) {
        ${Content} {
        }
    }

    @media (max-width: 480px) {
        ${Content} {
        }
    }
`