import React, { useContext } from 'react';
import { Container, EventCard, EventContainer, Time, TimeSlot } from './stylesEventAgend';
import { SupaContext } from '@/Context/context';
import { TypeApartamento, TypeBloco, TypeEncomendas, TypeInquilinos, TypeVisit } from '@/Types/types';

interface Event {
    title: string;
    startTime: string;
    endTime?: string;
    position: 'start' | 'middle' | 'end';
    color: string;
    apartamento_id: string;
}

const timeSlots = [
    "00:00", "00:30", "01:00", "01:30", "02:00", "02:30", "03:00", "03:30", "04:00", "04:30", "05:00", "05:30",
    "06:00", "06:30", "07:00", "07:30", "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
    "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00", "22:30", "23:00", "23:30"
];

const getTodayInBrasilia = () => {
    const now = new Date();
    const offset = -3 * 60;
    now.setMinutes(now.getMinutes() + offset);
    return now.toISOString().split('T')[0];
};

const convertVisitToEvent = (visit: TypeVisit, inquilinos: TypeInquilinos[], apartamentos: TypeApartamento[], blocos: TypeBloco[]): Event => {
    const { nomevisitante, horarioinicio, horariofim, id, cpfinquilinopermissao } = visit;

    const inquilino = inquilinos.find(inquilino => String(inquilino.cpf) === cpfinquilinopermissao);
    const apartamentoId = inquilino ? inquilino.apartamento_id : 'Apartament not found';

    const apto = apartamentos.find(apto => String(apto.id) === apartamentoId);
    const bloco = apto ? blocos.find(b => b.id === apto.bloco_id) : null;
    const blocoNome = bloco ? bloco.bloco : 'Bloco não encontrado';

    return {
        title: `${nomevisitante}`,
        startTime: horarioinicio,
        endTime: horariofim,
        position: 'start',
        color: '#048A42',
        apartamento_id: apto ? `${apto.apartamento} - ${blocoNome}` : 'Ap ou bloco não encontrado',
    };
};

const convertPackageToEvent = (encomenda: TypeEncomendas, inquilinos: TypeInquilinos[], apartamentos: TypeApartamento[], blocos: TypeBloco[]): Event => {
    const { receivedto, datareceived, id } = encomenda;
    const startTime = datareceived.split('T')[1].substring(0, 5);
    const title = receivedto.includes(' - ') ? receivedto.split(' - ')[1] : receivedto;

    const cpf = receivedto.includes(' - ') ? receivedto.split(' - ')[0] : null;
    const inquilino = inquilinos.find(inquilino => String(inquilino.cpf) === cpf);
    const apartamentoId = inquilino ? inquilino.apartamento_id : 'Apartament not found';

    const apto = apartamentos.find(apto => String(apto.id) === apartamentoId);
    const bloco = apto ? blocos.find(b => b.id === apto.bloco_id) : null;
    const blocoNome = bloco ? bloco.bloco : 'Bloco não encontrado';

    return {
        title: title,
        startTime,
        position: 'start',
        color: '#3F24F7',
        apartamento_id: apto ? `${apto.apartamento} - ${blocoNome}` : 'Ap ou bloco não encontrado',
    };
};

const convertInquilinoToEvent = (inquilinos: TypeInquilinos, apartamentos: TypeApartamento[], blocos: TypeBloco[]): Event => {
    const { nome, created_at, apartamento_id } = inquilinos;
    const startTime = new Date(created_at).toISOString().split('T')[1].substring(0, 5);

    const apto = apartamentos.find(apto => String(apto.id) === apartamento_id);
    const bloco = apto ? blocos.find(b => b.id === apto.bloco_id) : null;
    const blocoNome = bloco ? bloco.bloco : 'Bloco não encontrado';

    return {
        title: `${nome}`,
        startTime,
        position: 'start',
        color: '#dea50a',
        apartamento_id: apto ? `${apto.apartamento} - ${blocoNome}` : 'Ap ou bloco não encontrado',
    };
};

const timeToMinutes = (time: string) => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
};

const TimeLine = () => {
    const { contextVisits, contextEncomendas, typeInquilinos, contextApartamentos, contextBlocos } = useContext(SupaContext);

    const today = getTodayInBrasilia();

    const todayVisits = contextVisits.filter((visit: TypeVisit) => visit.datavisita.startsWith(today));
    const todayEncomendas = contextEncomendas.filter((encomenda: TypeEncomendas) => encomenda.datareceived.startsWith(today));
    const todayInquilinos = typeInquilinos.filter((inquilino: TypeInquilinos) => {
        const inquilinoDate = new Date(inquilino.created_at).toISOString().split('T')[0];
        return inquilinoDate === today;
    });

    const visitEvents = todayVisits.map(visit =>
        convertVisitToEvent(visit, typeInquilinos, contextApartamentos, contextBlocos)
    ); 
    const encomendaEvents = todayEncomendas.map(encomenda =>
        convertPackageToEvent(encomenda, typeInquilinos, contextApartamentos, contextBlocos)
    ); 
    // const inquilinoEvents = todayInquilinos.map(convertInquilinoToEvent);
    const inquilinoEvents = todayInquilinos.map(inquilino =>
        convertInquilinoToEvent(inquilino, contextApartamentos, contextBlocos)
    ); 

    const events: Event[] = [...visitEvents, ...encomendaEvents, ...inquilinoEvents];

    // const sortedEvents = events.sort((a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime));

    // const topThreeEvents = sortedEvents.slice(0, 3).map((event, idx) => ({
    //     ...event,
    //     position: idx === 0 ? 'start' : idx === 1 ? 'middle' : 'end'
    // }));

    return (
        <Container>
            {timeSlots
                .filter((time) => {
                    const [slotHour, slotMinutes] = time.split(":").map(Number);
                    const slotStart = slotHour * 60 + slotMinutes;
                    const slotEnd = slotStart + 30;

                    return events.some(event => {
                        const eventStartMinutes = timeToMinutes(event.startTime);
                        return eventStartMinutes >= slotStart && eventStartMinutes < slotEnd;
                    });
                })
                .map((time) => {
                    const [slotHour, slotMinutes] = time.split(":").map(Number);
                    const slotStart = slotHour * 60 + slotMinutes;
                    const slotEnd = slotStart + 30;

                    const slotEvents = events
                        .filter(event => {
                            const eventStartMinutes = timeToMinutes(event.startTime);
                            return eventStartMinutes >= slotStart && eventStartMinutes < slotEnd;
                        })
                        .slice(0, 3);

                    const hasShadow = slotEvents.length > 0;

                    return (
                        <TimeSlot key={time} hasShadow={hasShadow}>
                            <Time>{time}</Time>
                            <EventContainer>
                                {slotEvents.map((event, idx) => (
                                    <EventCard
                                        key={idx}
                                        color={event.color}
                                        position={idx === 0 ? 'start' : idx === 1 ? 'middle' : 'end'}
                                    >
                                        <h2>{event.title}</h2>
                                        <div>
                                            <span>{event.startTime} {event.endTime ? `- ${event.endTime}` : ''}</span>
                                            <span> / {event.apartamento_id}</span>
                                        </div>
                                    </EventCard>
                                ))}
                            </EventContainer>
                        </TimeSlot>
                    );
                })}
        </Container>


    );
};

export default TimeLine;


