import styled, { keyframes } from "styled-components";

interface EventCardProps {
  color: string;
  position: 'start' | 'middle' | 'end';
}

interface TimeSlotProps {
  hasShadow: boolean;
}

const slideDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-50px); 
  }
  to {
    opacity: 1;
    transform: translateY(0); 
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: .5rem;

  h2 {
    font-weight: 800;
  }

  max-height: 770px;
  overflow-y: auto;

  /* Estilo para o scroll */
  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 10px;
    border: 2px solid #f1f1f1;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #555;
  }

  animation: ${slideDown} 2s ease forwards; 
`;

export const TimeSlot = styled.div<TimeSlotProps>`
  display: flex;
  align-items: center;
  justify-content: start;
  margin: 5px 0;
  font-weight: 400;
  font-size: 12px;
  padding: .5rem 0rem;
  box-shadow: ${({ hasShadow }) =>
    hasShadow ? '8px 5px 10px .1px rgba(0, 0, 0, 0.1)' : 'none'};

  border-radius: 5px;
`;

export const Time = styled.div`
  width: 60px;
  text-align: right;
  `;

export const EventContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-left: 1rem;
  /* margin-left: 10px; */
  justify-content: space-between;
  gap: .4rem;
  padding: .5rem 1rem;
`;

export const EventCard = styled.div<EventCardProps>`
  flex: 1;
  background-color: ${({ color }) => color};
  margin: ${({ position }) =>
    position === 'start' ? '0 0 0 0' :
      position === 'middle' ? '0 0 0 70px' :
        '0 0 0 150px'};

  max-width: 160px;
  border-radius: 4px;
  padding: 10px;
  color: white;
  font-size: 12px;
  /* box-shadow: ${({ position }) =>
    position ? '2px 5px 10px .1px rgba(0, 0, 0, 0.1)' : 'none'}; */
  `;
