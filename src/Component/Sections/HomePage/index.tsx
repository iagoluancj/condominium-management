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
    SpanClassifyColorVisita,
    GlobalStyles,
    SeparateChart,
    ChartWrapperTwoCharts,
    ChartWrapperPizza
} from './newStyled';

import { MdDashboard, MdEmojiPeople, MdLocalShipping } from 'react-icons/md';
import { IoPeopleSharp } from 'react-icons/io5';
import { MoradiaChart } from './Charts/moradiaChart';
import PizzaChart from './Charts/pizzaChart';
import PieChartComponent from './Charts/PieChart';
import BarChartComponent from './Charts/BarChartComponent';
import { BiBuildings } from 'react-icons/bi';
import CondominiumUpdates from './Charts/EventAgend/EventAgend';
import { useContext, useEffect, useState } from 'react';
import { SupaContext } from '@/Context/context';
import { TypeApartamento } from '@/Types/types';

export const HomePage = () => {
    const { typeInquilinos, contextEncomendas, contextVisits, contextApartamentos, handleChangePage } = useContext(SupaContext)
    const [newResidents, setNewResidents] = useState(0);
    const [visitsThisWeek, setVisitsThisWeek] = useState(0);
    const [deliveriesThisMonth, setDeliveriesThisMonth] = useState(0);
    const [apartmentAvailable, setApartmentAvailable] = useState(0);

    const calculatePieData = (contextApartamentos: any[], typeInquilinos: any[]) => {
        const totalApartamentos = contextApartamentos.length;
        const ocupados = typeInquilinos.filter(inquilino => !inquilino.is_deleted).length;
        const metaAno = Math.ceil(totalApartamentos * 0.92);
        const disponivel = totalApartamentos - ocupados - (metaAno - ocupados);

        return {
            ocupados,
            metaAno,
            disponivel,
        };
    };
    const { ocupados, metaAno, disponivel } = calculatePieData(contextApartamentos, typeInquilinos);

    const toggleChangePage = (page: string) => {
        handleChangePage(page)
    };

    useEffect(() => {
        const getNewResidentsLastThreeMonths = async () => {
            const today = new Date();
            const threeMonthsAgo = new Date();
            threeMonthsAgo.setMonth(today.getMonth() - 3);

            const newResidents = typeInquilinos.filter((resident) => {
                const createdAt = new Date(resident.created_at);
                return createdAt >= threeMonthsAgo && createdAt <= today && !resident.is_deleted;
            });

            return newResidents.length;
        };

        const getVisitsThisWeek = async () => {
            const today = new Date();
            const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
            const endOfWeek = new Date(today.setDate(today.getDate() + 6));


            const visitsThisWeek = contextVisits.filter((visit) => {
                const visitDate = new Date(visit.datavisita);
                return visitDate >= startOfWeek && visitDate <= endOfWeek && !visit.deleted_at;
            });

            return visitsThisWeek.length;
        };

        const getDeliveriesThisMonth = async () => {
            const today = new Date();
            const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
            const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

            const deliveriesThisMonth = contextEncomendas.filter((delivery) => {
                const receivedDate = new Date(delivery.datareceived);
                return receivedDate >= startOfMonth && receivedDate <= endOfMonth && !delivery.deletedat;
            });

            return deliveriesThisMonth.length;
        };

        const getApartmentAvailability = async () => {
            const ocupados = typeInquilinos
                .filter(inquilino => inquilino.status === 'proprietario' || inquilino.status === 'inquilino')
                .map(inquilino => inquilino.apartamento_id);

            const apartamentosDisponiveis = contextApartamentos.filter(apartamento => !ocupados.includes(apartamento.id.toString()));

            return {
                avaliable: apartamentosDisponiveis.length,
                total: contextApartamentos.length
            };
        };

        const fetchData = async () => {
            const residentsCount = await getNewResidentsLastThreeMonths();
            const visitsCount = await getVisitsThisWeek();
            const deliveriesCount = await getDeliveriesThisMonth();
            const apartmentCount = await getApartmentAvailability();

            setNewResidents(residentsCount);
            setVisitsThisWeek(visitsCount);
            setDeliveriesThisMonth(deliveriesCount);
            setApartmentAvailable(apartmentCount.avaliable);
        };

        fetchData();
    }, [contextApartamentos, contextEncomendas, contextVisits, typeInquilinos]);


    return (
        <>
            <GlobalStyles>
                <Container>
                    <h4> <span>Dashboard</span><MdDashboard /></h4>
                    <SectionOptions>
                        <Card>
                            <IconWrapper>
                                <Icon><IoPeopleSharp size={24} /></Icon>
                            </IconWrapper>
                            <CardSeparator>
                                <Title>MORADORES</Title>
                                <Description>{newResidents} novos nos últimos 3 meses.</Description>
                            </CardSeparator>
                        </Card>
                        <CardVisitante>
                            <IconWrapperVisitante>
                                <Icon><MdEmojiPeople size={24} /></Icon>
                            </IconWrapperVisitante>
                            <CardSeparator>
                                <Title>VISITAS</Title>
                                <Description>{visitsThisWeek} agendadas para essa semana.</Description>
                            </CardSeparator>
                        </CardVisitante>
                        <CardEncomenda>
                            <IconWrapperEncomenda>
                                <Icon><MdLocalShipping size={24} /></Icon>
                            </IconWrapperEncomenda>
                            <CardSeparator>
                                <Title>ENCOMENDAS</Title>
                                <Description>{deliveriesThisMonth} recebidas este mês.</Description>
                            </CardSeparator>
                        </CardEncomenda>
                        <CardCreate>
                            <IconWrapperCreate>
                                <IconCreate><BiBuildings size={24} /> </IconCreate>
                            </IconWrapperCreate>
                            <CardSeparator>
                                <Title>APARTAMENTOS</Title>
                                <Description>{apartmentAvailable} de {contextApartamentos.length} disponíveis.</Description>
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

                            <ChartWrapperTwoCharts>
                                <HeaderChartTitle>
                                    <SectionTitle>Apartamentos ocupados</SectionTitle>
                                    <p>Confira algumas informações uteis sobre os apartamentos.</p>
                                </HeaderChartTitle>
                                <ChartApartment>
                                    <SeparateChart>
                                        <ContainerSPAN>
                                            <p><ColorSpan></ColorSpan><span>Atual ({((ocupados / contextApartamentos.length) * 100).toFixed(0)}%)</span></p>
                                            <p><ColorSpanMeta></ColorSpanMeta><span>Meta (92%)</span></p>
                                            <p><ColorSpanTotal></ColorSpanTotal><span>Máximo </span></p>
                                        </ContainerSPAN>
                                        <ChartApartamentSeparator>
                                            <p>
                                                Distribuição de Ocupação
                                            </p>
                                            <p> dos Apartamentos</p>
                                            <PieChartComponent />
                                        </ChartApartamentSeparator>
                                    </SeparateChart>
                                    <ChartApartamentSeparator>
                                        <P>Moradores por apartamento</P>
                                        <BarChartComponent />
                                    </ChartApartamentSeparator>
                                </ChartApartment>
                            </ChartWrapperTwoCharts>

                            <ChartWrapperPizza>
                                <HeaderChartTitle>
                                    <SectionTitle>Relação de moradores</SectionTitle>
                                    <p>Distribuição de moradores, inquilinos e proprietários em relação às residências.</p>
                                </HeaderChartTitle>
                                <ChartApartment>
                                    <PizzaChart />
                                </ChartApartment>
                            </ChartWrapperPizza>
                        </LeftColumn>

                        <RightColumn>
                            <InfoSection>
                                <Vector1 />
                                <Vector2 />
                                <Vector3 />
                                <Content>
                                    <InfoTitle>Acompanhe oque há de novo:</InfoTitle>
                                    <InfoDescription>Nesta última atualização, tivemos o dashboard criado, este que vós usais, e iniciado a concepção da tela de apartamentos.</InfoDescription>
                                </Content>
                                <Button onClick={() => toggleChangePage('Apartamentos')}>Acompanhe</Button>
                            </InfoSection>
                            <CondoUpdatesContainer>
                                <HeaderCondoUpdates>
                                    <SectionTitle>Acompanhe o dia de hoje</SectionTitle>
                                    <p>Veja as atualizações em tempo real sobre hoje.</p>
                                    <SectionClassifyColor>
                                        <SpanClassifyColorInquilino>Novo morador</SpanClassifyColorInquilino>
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
            </GlobalStyles>
        </>
    )
};
