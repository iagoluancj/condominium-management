import {
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
    CardSeparator,
    InfoSection,
    InfoTitle,
    InfoDescription,
    IconWrapperVisitante,
    IconWrapperEncomenda,
    CardEncomenda,
    CardVisitante,
    CardCreate,
    IconWrapperCreate,
    IconCreate,
    ChartAdjunt,
    ChartApartment,
    ChartMoradores,
    SectionOptions,
    HeaderChartTitle,
    Vector1,
    Vector2,
    Content,
    Button,
    Vector3,
    CondoUpdatesContainer,
    HeaderCondoUpdates,
    ColorSpan,
    ContainerSPAN,
    ChartApartamentSeparator,
    ColorSpanMeta,
    ColorSpanTotal,
    P,
    SectionClassifyColor,
    SpanClassifyColorInquilino,
    SpanClassifyColorEncomenda,
    SpanClassifyColorVisita
} from './newStyled';

import { MdDashboard, MdEmojiPeople, MdLocalShipping } from 'react-icons/md';
import { IoPeopleSharp } from 'react-icons/io5';
import { MoradiaChart } from './moradiaChart';
import PizzaChart from './Charts/pizzaChart';
import PieChartComponent from './Charts/PieChart';
import BarChartComponent from './Charts/BarChartComponent';
import { BiBuildings } from 'react-icons/bi';
import CondominiumUpdates from './Charts/EventAgend/EventAgend';

export const HomePage = () => {

    return (
        <>
            <Container>
                <h4> <span>Dashboard</span><MdDashboard /></h4>
                <SectionOptions>
                    <Card>
                        <IconWrapper>
                            <Icon><IoPeopleSharp size={24} /></Icon>
                        </IconWrapper>
                        <CardSeparator>
                            <Title>MORADORES</Title>
                            <Description>6 novos nos últimos 3 meses.</Description>
                        </CardSeparator>
                    </Card>
                    <CardVisitante>
                        <IconWrapperVisitante>
                            <Icon><MdEmojiPeople size={24} /></Icon>
                        </IconWrapperVisitante>
                        <CardSeparator>
                            <Title>VISITAS</Title>
                            <Description>15 agendadas para essa semana.</Description>
                        </CardSeparator>
                    </CardVisitante>
                    <CardEncomenda>
                        <IconWrapperEncomenda>
                            <Icon><MdLocalShipping size={24} /></Icon>
                        </IconWrapperEncomenda>
                        <CardSeparator>
                            <Title>ENCOMENDAS</Title>
                            <Description>112 recebidas este mês.</Description>
                        </CardSeparator>
                    </CardEncomenda>
                    <CardCreate>
                        <IconWrapperCreate>
                            <IconCreate><BiBuildings size={24} /> </IconCreate>
                        </IconWrapperCreate>
                        <CardSeparator>
                            <Title>APARTAMENTOS</Title>
                            <Description>50 de 100 disponiveis.</Description>
                        </CardSeparator>
                    </CardCreate>
                </SectionOptions>

                <Section>
                    <LeftColumn>
                        <ChartWrapper>
                            <HeaderChartTitle>
                                <SectionTitle>Tempo de moradia</SectionTitle>
                                <p>Confira abaixo o tempo de residencia dos moradores atuais.</p>
                            </HeaderChartTitle>
                            <Chart>
                                <MoradiaChart />
                            </Chart>
                        </ChartWrapper>
                        <ChartWrapper>
                            <HeaderChartTitle>
                                <SectionTitle>Apartamentos ocupados</SectionTitle>
                                <p>Confira algumas informações uteis sobre os apartamentos.</p>
                            </HeaderChartTitle>
                            <ChartApartment>
                                <ContainerSPAN>
                                    <p><ColorSpan></ColorSpan><span>Atual (82%)</span></p>
                                    <p><ColorSpanMeta></ColorSpanMeta><span>Meta (92%)</span></p>
                                    <p><ColorSpanTotal></ColorSpanTotal><span>Máximo</span></p>
                                </ContainerSPAN>
                                <ChartApartamentSeparator>
                                    <p>
                                        Distribuição de Ocupação
                                    </p>
                                    <p> dos Apartamentos</p>
                                    <PieChartComponent />
                                </ChartApartamentSeparator>
                                <ChartApartamentSeparator>
                                    <P>Moradores por apartamento</P>
                                    <BarChartComponent />
                                </ChartApartamentSeparator>
                            </ChartApartment>
                        </ChartWrapper>

                        <ChartWrapper>
                            <HeaderChartTitle>
                                <SectionTitle>Relação de moradores</SectionTitle>
                                <p>Distribuição de moradores, inquilinos e proprietários em relação às residências.</p>
                            </HeaderChartTitle>
                            <ChartApartment>
                                <PizzaChart />
                            </ChartApartment>
                        </ChartWrapper>
                        <ChartAdjunt>
                        </ChartAdjunt>
                    </LeftColumn>

                    <RightColumn>
                        <InfoSection>
                            <Vector1 />
                            <Vector2 />
                            <Vector3 />
                            <Content>
                                <InfoTitle>Algo interessante aqui que não sei o que ainda</InfoTitle>
                                <InfoDescription>Etiam facilisis ligula nec velit posuere egestas. Nunc dictum</InfoDescription>
                            </Content>
                            <Button>GoGoGo</Button>
                        </InfoSection>
                        <CondoUpdatesContainer>
                            <HeaderCondoUpdates>
                                <SectionTitle>Acompanhe o dia de hoje</SectionTitle>
                                <p>Veja as atualizações em tempo real sobre hoje.</p>
                                <SectionClassifyColor>
                                    <SpanClassifyColorInquilino>Novo inquilino</SpanClassifyColorInquilino>
                                    <SpanClassifyColorEncomenda>Nova encomenda</SpanClassifyColorEncomenda>
                                    <SpanClassifyColorVisita>Nova visita</SpanClassifyColorVisita>
                                </SectionClassifyColor>
                            </HeaderCondoUpdates>
                            <div>
                                <CondominiumUpdates />
                            </div>
                        </CondoUpdatesContainer>
                    </RightColumn>
                </Section>
            </Container>
        </>
    )
};
