// import React from 'react';
// import { Container, EventCard, EventContainer, Time, TimeSlot } from './stylesEventAgend';

// interface Event {
//     title: string;
//     startTime: string; 
//     endTime: string;
//     position: 'start' | 'middle' | 'end';
//     color: string;
// }

// const timeSlots = [
//     "00:00", "00:30", "01:00", "01:30", "02:00", "02:30", "03:00", "03:30", "04:00", "04:30", "05:00", "05:30",
//     "06:00", "06:30", "07:00", "07:30", "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
//     "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
//     "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00", "22:30", "23:00", "23:30"
// ];

// // Alguns eventos estão ficando duplicado, mas depois vejo isso - Resolvido. 
// const events: Event[] = [
//     { title: "Encomenda para Iago", startTime: "14:00", endTime: "10:10", position: 'start', color: '#3C21F7' },
//     { title: "Encomenda para Iago", startTime: "08:00", endTime: "10:10", position: 'start', color: '#3C21F7' },
//     { title: "Encomenda para Iago", startTime: "09:00", endTime: "10:10", position: 'start', color: '#3C21F7' },
//     { title: "Encomenda para Iago", startTime: "10:00", endTime: "10:10", position: 'start', color: '#3C21F7' },
//     { title: "Visita familiar", startTime: "10:20", endTime: "13:00", position: 'middle', color: '#00BC39' },
//     { title: "Encomenda para Leticia", startTime: "10:10", endTime: "10:30", position: 'middle', color: '#3C21F7' },
//     { title: "Jorge Vaz", startTime: "10:20", endTime: "10:30", position: 'end', color: '#FFBF08' },
//     { title: "Domingos Vaz", startTime: "16:21", endTime: "10:30", position: 'end', color: '#FFBF08' },
//     { title: "Ana Vaz", startTime: "16:20", endTime: "10:30", position: 'middle', color: '#FFBF08' },
//     { title: "Borges Vaz", startTime: "17:20", endTime: "10:30", position: 'end', color: '#FFBF08' },
//     { title: "Visita familiar", startTime: "12:00", endTime: "13:00", position: 'end', color: '#00BC39' }
// ];

// const timeToMinutes = (time: string) => {
//     const [hours, minutes] = time.split(":").map(Number);
//     return hours * 60 + minutes;
// };

// const TimeLine = () => {
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
