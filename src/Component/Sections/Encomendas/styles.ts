import styled from "styled-components";

export const EncomendasSection = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 15vh;
`;

export const Container = styled.div`
    margin: 0rem !important;
    padding: 16px;
    margin-top: 15vh;
`;

export const FormEncomenda = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Title = styled.h1`
    font-size: 24px;
`;

export const Paragraph = styled.p`
`;

export const Button = styled.button`
    background-color: #007BFF;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background-color: #0056b3;
    }
`;

export const Span = styled.span`
    display: block;
    margin-top: 16px;
    font-size: 14px;
    color: #555;
`;

export const ActionsEncomenda = styled.div`
  display: flex;
  flex-direction: column;
`;

export const IconEncomenda = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  h2 {
    font-size: 18px;
    font-weight: bold;
  }
`;

export const OptionsActionEncomendas = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const OptionAction = styled.div<{ $isSelected: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  background-color: ${({ $isSelected }) => ($isSelected ? '#f0f0f0' : '#fff')};
  border: 1px solid ${({ $isSelected }) => ($isSelected ? '#ccc' : '#e0e0e0')};
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #f5f5f5;
  }

  span {
    font-size: 16px;
  }
`;

export const ActionsEncomendaRegister = styled.div`
`;

export const HeaderEncomendas = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TitleHeader = styled.h1`
  font-size: 24px;
  font-weight: bold;
`;

export const BrevelyDescription = styled.div`
  span {
    font-size: 14px;
    color: #666;
  }
`;

//             Encomendas
//             <p>
//                 Em desenvolvimento.
//                 <p>quem recebeu</p>
//                 <p>para qum é </p>
//                 <p>Data e hora do recebimento</p>
//                 <p>descrição do que recebeu (opcional)</p>
//                 <button>Registrar recebimento</button>
//                 <span>Após registrado será enviado um email para o morador escolhido com base no email dele de cadastro aviosando sobr eo recebimetno</span>

//                 <span>Automaticamente vai para: `esperando retirada`.</span>
//                 <span>Dentro das paginas de encomendas terá opção para editar e dai:</span>

//                 <p>{`Clicar em 'entregue', dai vai para 'entregue ao morador'`}</p>
//                 <p>Aqui terá uma flag, onde caso desmarcada marca a data e hora que foi retirado.</p>
//                 <p>Caso marcada dará dia, data e hora para selecionar a entrega</p>

//                 <p>{`No enmail enviado anteriormente terá uma opç~~ao de 'confirmar recebimento'`}</p>
//             </p>