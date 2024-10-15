import styled, { keyframes } from 'styled-components';

interface Selected {
  isDark: boolean;
}

export const CheckboxContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

export const Checkbox = styled.input`
  opacity: 0;
  position: absolute;
`;

export const CheckboxLabel = styled.label<Selected>`
  background-color: #111;
  width: 50px;
  height: 26px;
  border-radius: 50px;
  position: relative;
  padding: 5px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ isDark }) => (isDark ? '#fafcff' : '#333')};
  color: ${({ isDark }) => (isDark ? '#333' : '#fafcff')};
  border: 1px solid transparent;
`;

export const Ball = styled.span<Selected>`
  background-color: #fff;
  width: 22px;
  height: 22px;
  position: absolute;
  left: 2px;
  top: 1px;
  border-radius: 50%;
  left: ${({ isDark }) => (isDark ? '24px' : '2px')};
  background-color: ${({ isDark }) => (isDark ? '#333' : '#fafcff')};
  transition: .2s linear;
`;

export const CheckboxCheckedBall = styled(Ball)`
  transform: translateX(24px);
  transition: .2s linear;
`;

