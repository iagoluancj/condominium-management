// import React, { useContext, useEffect } from 'react';
// import { Container, EventCard, EventContainer, Time, TimeSlot } from './stylesEventAgend';
// import { SupaContext } from '@/Context/context';
// import { TypeEncomendas, TypeInquilinos, TypeVisit } from '@/Types/types';

// interface Event {
//     title: string;
//     startTime: string;
//     endTime?: string;
//     position: 'start' | 'middle' | 'end';
//     color: string;
// }

// // Função para converter a data e hora da visita
// const convertVisitToEvent = (visit: TypeVisit): Event => {
//     const { nomevisitante, horarioinicio, horariofim, id } = visit;
//     return {
//         title: `Visita: ${id}`,
//         startTime: horarioinicio,
//         endTime: horariofim,
//         position: 'start', // Defina a posição que desejar
//         color: '#00BC39'  // Escolha uma cor
//     };
// };

// // Função para converter a data e hora da encomenda
// const convertPackageToEvent = (encomenda: TypeEncomendas): Event => {
//     const { receivedto, datareceived, id } = encomenda;
//     const startTime = datareceived.split('T')[1].substring(0, 5); // Extrai o horário no formato HH:MM
//     return {
//         title: `Encomenda para ${id}`,
//         startTime,
//         position: 'middle', // Defina a posição que desejar
//         color: '#3C21F7' // Escolha uma cor
//     };
// };

// const convertInquilinoToEvent = (inquilino: TypeInquilinos): Event => {
//     const { id, created_at } = inquilino; // Altere 'data' para o campo correto no seu tipo
//     const startTime = new Date(created_at).toISOString().split('T')[1].substring(0, 5); // Extrai o horário no formato HH:MM
//     return {
//         title: `Inquilino: ${id}`,
//         startTime,
//         position: 'end', // Defina a posição que desejar
//         color: '#FF5733' // Escolha uma cor
//     };
// };


// const timeSlots = [
//     "00:00", "00:30", "01:00", "01:30", "02:00", "02:30", "03:00", "03:30", "04:00", "04:30", "05:00", "05:30",
//     "06:00", "06:30", "07:00", "07:30", "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
//     "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
//     "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00", "22:30", "23:00", "23:30"
// ];

// const getTodayInBrasilia = () => {
//     const now = new Date();
//     const offset = -3 * 60;
//     now.setMinutes(now.getMinutes() + offset);
//     return now.toISOString().split('T')[0];
// };

// const timeToMinutes = (time: string) => {
//     const [hours, minutes] = time.split(":").map(Number);
//     return hours * 60 + minutes;
// };

// const TimeLine = () => {
//     const { contextVisits, contextEncomendas, typeInquilinos } = useContext(SupaContext);

//     // Filtrando apenas as visitas do dia atual
//     const today = getTodayInBrasilia();

//     const todayVisits = contextVisits.filter((visit: TypeVisit) => visit.datavisita.startsWith(today));
//     const todayEncomendas = contextEncomendas.filter((encomenda: TypeEncomendas) => encomenda.datareceived.startsWith(today));
//     const todayInquilinos = typeInquilinos.filter((inquilino: TypeInquilinos) => {
//         const inquilinoDate = new Date(inquilino.created_at).toISOString().split('T')[0]; // Ajuste o campo conforme necessário
//         return inquilinoDate === today;
//     });

//     // Converter visitas e encomendas em eventos
//     const visitEvents = todayVisits.map(convertVisitToEvent);
//     const encomendaEvents = todayEncomendas.map(convertPackageToEvent);
//     const inquilinoEvents = todayInquilinos.map(convertInquilinoToEvent);

//     // Combinar todos os eventos
//     const events: Event[] = [...visitEvents, ...encomendaEvents, ...inquilinoEvents];

//     if (!todayEncomendas) {
//         console.log
//     }

//     return (
//         <Container>
//             {timeSlots
//                 .filter((time) => {
//                     const [slotHour, slotMinutes] = time.split(":").map(Number);
//                     const slotStart = slotHour * 60 + slotMinutes;
//                     const slotEnd = slotStart + 30;

//                     // Filtra os horários que têm eventos associados
//                     return events.some(event => {
//                         const eventStartMinutes = timeToMinutes(event.startTime);
//                         return eventStartMinutes >= slotStart && eventStartMinutes < slotEnd;
//                     });
//                 })
//                 .map((time) => {
//                     const [slotHour, slotMinutes] = time.split(":").map(Number);
//                     const slotStart = slotHour * 60 + slotMinutes;
//                     const slotEnd = slotStart + 30;

//                     const hasShadow = events.some(event => {
//                         const eventStartMinutes = timeToMinutes(event.startTime);
//                         return eventStartMinutes >= slotStart && eventStartMinutes < slotEnd && event.position;
//                     });

//                     return (
//                         <TimeSlot key={time} hasShadow={hasShadow}>
//                             <Time>{time}</Time>
//                             <EventContainer>
//                                 {events
//                                     .filter(event => {
//                                         const [eventHour, eventMinutes] = event.startTime.split(":").map(Number);
//                                         const eventStart = eventHour * 60 + eventMinutes;

//                                         return eventStart >= slotStart && eventStart < slotEnd;
//                                     })
//                                     .map((event, idx) => (
//                                         <EventCard key={idx} color={event.color} position={event.position}>
//                                             <h2>{event.title}</h2>
//                                             <div>
//                                                 <span>{event.startTime} e {event.endTime}</span>
//                                                 <span> / 103 - B</span>
//                                             </div>
//                                         </EventCard>
//                                     ))}
//                             </EventContainer>
//                         </TimeSlot>
//                     );
//                 })}
//         </Container>
//     );
// };

// export default TimeLine;
