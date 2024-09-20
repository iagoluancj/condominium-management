import React, { useContext } from 'react';
import { Container, EventCard, EventContainer, Time, TimeSlot } from './stylesEventAgend';
import { SupaContext } from '@/Context/context';
import { TypeEncomendas, TypeInquilinos, TypeVisit } from '@/Types/types';

interface Event {
    title: string;
    startTime: string;
    endTime?: string;
    position: 'start' | 'middle' | 'end'; 
    color: string;
}

const timeSlots = [
    "00:00", "00:30", "01:00", "01:30", "02:00", "02:30", "03:00", "03:30", "04:00", "04:30", "05:00", "05:30",
    "06:00", "06:30", "07:00", "07:30", "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
    "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00", "22:30", "23:00", "23:30"
];

const convertVisitToEvent = (visit: TypeVisit): Event => {
    const { nomevisitante, horarioinicio, horariofim, id } = visit;
    return {
        title: `${nomevisitante}`,
        startTime: horarioinicio,
        endTime: horariofim,
        position: 'start', 
        color: '#048A42'
    };
};

const convertPackageToEvent = (encomenda: TypeEncomendas): Event => {
    const { receivedto, datareceived, id } = encomenda;
    const startTime = datareceived.split('T')[1].substring(0, 5); 
    return {
        title: `${receivedto.split(' - ')[1]}`,
        startTime,
        position: 'start', 
        color: '#3F24F7'
    };
};

const convertInquilinoToEvent = (inquilino: TypeInquilinos): Event => {
    const { nome, created_at } = inquilino;
    const startTime = new Date(created_at).toISOString().split('T')[1].substring(0, 5); 
    return {
        title: `${nome}`,
        startTime,
        position: 'start', 
        color: '#FFBF08'
    };
};


const getTodayInBrasilia = () => {
    const now = new Date();
    const offset = -3 * 60;
    now.setMinutes(now.getMinutes() + offset);
    return now.toISOString().split('T')[0];
};

const timeToMinutes = (time: string) => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
};

const TimeLine = () => {
    const { contextVisits, contextEncomendas, typeInquilinos } = useContext(SupaContext);

    const today = getTodayInBrasilia();

    const todayVisits = contextVisits.filter((visit: TypeVisit) => visit.datavisita.startsWith(today));
    const todayEncomendas = contextEncomendas.filter((encomenda: TypeEncomendas) => encomenda.datareceived.startsWith(today));
    const todayInquilinos = typeInquilinos.filter((inquilino: TypeInquilinos) => {
        const inquilinoDate = new Date(inquilino.created_at).toISOString().split('T')[0];
        return inquilinoDate === today;
    });

    const visitEvents = todayVisits.map(convertVisitToEvent);
    const encomendaEvents = todayEncomendas.map(convertPackageToEvent);
    const inquilinoEvents = todayInquilinos.map(convertInquilinoToEvent);

    const events: Event[] = [...visitEvents, ...encomendaEvents, ...inquilinoEvents];

    const sortedEvents = events.sort((a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime));

    const topThreeEvents = sortedEvents.slice(0, 3).map((event, idx) => ({
        ...event,
        position: idx === 0 ? 'start' : idx === 1 ? 'middle' : 'end'
    }));

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
                                            <span>{event.startTime} e {event.endTime || '-'}</span>
                                            <span> / 103 - B</span>
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


