import styled from "styled-components";

const Container = styled.div`
  margin: 15vh 0 0 25vh;
  padding: 4px;
`;

export const DivContainer = styled.div`
    background-color: #BAD3FF;
    padding: 2rem 5rem;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;

    box-shadow: 0 10px 8px rgba(0, 0, 0, .3); 
`;

const Content = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const Header = styled.div`
  margin-bottom: 8px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: 2.25rem;
  font-weight: bold;
  margin-top: -4rem;
  margin-bottom: 6rem;
`;

const Subtitle = styled.p`
  font-size: 1.125rem;
  color: #4a5568;
  margin-top: 8px;
  max-width: 60vh;
  text-align: justify;
`;

const Section = styled.section`
  margin-bottom: 8px;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 16px;
`;

const List = styled.ul`
  list-style-type: disc;
  padding-left: 20px;
`;

const ListItem = styled.li`
  margin-bottom: 8px;
`;

const Footer = styled.footer`
  text-align: end;
  margin-top: 32px;
`;

const FooterText = styled.p`
  color: #4a5568;
`;

const FooterLink = styled.a`
  font-weight: bold;
  font-style: italic;
  text-decoration: none;
`;

const ImageWrapper = styled.div`
  margin-left: 16px;
`;

export { Container, Content, Header, Title, Subtitle, Section, SectionTitle, List, ListItem, Footer, FooterText, FooterLink, ImageWrapper };
