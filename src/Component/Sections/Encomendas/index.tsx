import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import { FormEncomenda, Paragraph, Span, Title } from './styles';
import InputComponent from '@/Component/Input';
import { MdOutlineLocalShipping } from 'react-icons/md';
import { IoIosArrowForward } from 'react-icons/io';
import { ActionsInquilino, ActionsInquilinoRegister, BrevelyDescription, HeaderInquilinos, IconInquilino, InquilinoSection, OptionAction, OptionsActionInquilos, TitleHeader } from '../Inquilinos/styles';
import { ButtonCreateVisit } from '../Visitantes/styles';
import SupaProvider, { SupaContext } from '@/Context/context';
import { toast } from 'react-toastify';
import { TypeFuncionarios, TypeInquilinos } from '@/Types/types';
import TableEncomendas from './pending';
import EncomendasEntregues from './delivered';
import EncomendasDeletadas from './deleteds';


export default function Encomendas() {
    const [selected, setSelected] = useState('receivedEncomenda')
    const [title, setTitle] = useState('Cadastrar uma nova visita')
    const { createEncomenda, contextFuncionarios, typeInquilinos } = useContext(SupaContext);
    const [isTooLong, setIsTooLong] = useState(false);
    const [formData, setFormData] = useState({
        receivedBy: '',
        receivedTo: '',
        dataRecived: '0',
        description: '',
    });

    const getNomeFuncionarios = (contextFuncionarios: TypeFuncionarios[]): string[] => {
        return contextFuncionarios.map(funcionario => funcionario.nome);
    };

    const getNameInquilinos = (typeInquilinos: TypeInquilinos[]): string[] => {
        const result: string[] = [];
        typeInquilinos.forEach(inquilino => {
            if (!inquilino.is_deleted) {
                result.push(`${inquilino.cpf} - ${inquilino.nome}`);
            }
        });
        return result;
    };

    const funcionariosExctract = getNomeFuncionarios(contextFuncionarios)
    const inqulinosExctract = getNameInquilinos(typeInquilinos)

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = event.target;

        if (name === 'description' && value.length > 120) {
            if (!isTooLong) {
                toast.error('Mensagem muito longa');
                setIsTooLong(true);
            }
            return;
        }

        if (name === 'description' && value.length <= 120) {
            setIsTooLong(false);
        }


        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleCreate = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const currentDate = new Date().toISOString();
        //--------------------
        const extractCpf = (input: string): string | null => {
            const regexWithText = /^(\d+)\s*-\s*/;
            const matchWithText = input.match(regexWithText);

            if (matchWithText) {
                return matchWithText[1];
            }

            const regexOnlyNumbers = /^\d+$/;
            if (regexOnlyNumbers.test(input)) {
                return input;
            }

            return null;
        };

        const formDataValue = formData.receivedTo.trim();

        console.log('FormData ReceivedTo:', formDataValue);

        const cpf = extractCpf(formDataValue);

        if (cpf) {
            const selectedInquilino = typeInquilinos.find(inquilino =>
                inquilino.cpf.toString() === cpf
            );

            if (selectedInquilino) {
                console.log('Inquilino encontrado:', selectedInquilino);
            } else {
                toast.error('Inquilino não encontrado');
                return
            }
        } else {
            console.log('Formato do CPF inválido');
        }
        //------------------
        if (!formData.receivedBy || !formData.receivedTo) {
            toast.error('Preencha os campos obrigatórios.');
            return;
        }

        if (formData.dataRecived > currentDate) {
            toast.error('Data no futuro, insira uma data válida.');
            return;
        }

        const received = formData.dataRecived !== "0"
            ? formData.dataRecived
            : currentDate.slice(0, 10);

        try {
            await createEncomenda({
                receivedby: formData.receivedBy,
                receivedto: formData.receivedTo,
                datareceived: received,
                description: formData.description,
                deletedat: null,
                acknowledgmentstatus: false,
            });
            setFormData({
                receivedBy: '',
                receivedTo: '',
                dataRecived: '0',
                description: '',
            });
            console.log("Encomenda criada com sucesso!");
        } catch (error) {
            console.error("Erro ao registrar a encomenda:", error);
        }
    };

    const alterSelected = (inquilino: string) => {
        let newTitle = '';
        switch (inquilino) {
            case 'receivedEncomenda':
                newTitle = 'Registrar recebimento de nova de encomenda';
                break;
            case 'pendingEncomend':
                newTitle = 'Encomendas aguardando retirada ';
                break;
            case 'deliveredEncomenda':
                newTitle = 'Encomendas entregues';
                break;
            case 'deletedEncomenda':
                newTitle = 'Encomendas deletadas';
                break;
            default:
                newTitle = '';
        }
        setTitle(newTitle)
        setSelected(inquilino);
    };

    return (
        <>
            <InquilinoSection $isSelectedCurrent={selected === 'pendingEncomend' ? true : false} >
                <ActionsInquilino>
                    <IconInquilino>
                        <h2>Gerenciamento de Encomendas</h2>
                        <MdOutlineLocalShipping size={18} />
                    </IconInquilino>
                    <OptionsActionInquilos>
                        <OptionAction onClick={() => alterSelected('receivedEncomenda')} $isSelected={selected === 'receivedEncomenda'}>
                            <span>Registrar encomenda</span>
                            <IoIosArrowForward />
                        </OptionAction>
                        <OptionAction onClick={() => alterSelected('pendingEncomend')} $isSelected={selected === 'pendingEncomend'}>
                            <span>Aguardando retirada</span>
                            <IoIosArrowForward />
                        </OptionAction>
                        <OptionAction onClick={() => alterSelected('deliveredEncomenda')} $isSelected={selected === 'deliveredEncomenda'}>
                            <span>Encomendas entregues</span>
                            <IoIosArrowForward />
                        </OptionAction>
                        <OptionAction onClick={() => alterSelected('deletedEncomenda')} $isSelected={selected === 'deletedEncomenda'}>
                            <span>Encomendas deletadas</span>
                            <IoIosArrowForward />
                        </OptionAction>
                    </OptionsActionInquilos>
                </ActionsInquilino>
                <ActionsInquilinoRegister>
                    <HeaderInquilinos>
                        <TitleHeader>{title}</TitleHeader>
                        <BrevelyDescription>
                            <span>
                                Gerencie encomendas de forma eficiente: registre, visualize, edite e acesse registros com facilidade.
                            </span>
                        </BrevelyDescription>
                    </HeaderInquilinos>
                    {selected === 'receivedEncomenda' && (
                        <FormEncomenda onSubmit={handleCreate}>
                            <InputComponent
                                label="Recebido por: "
                                name="receivedBy"
                                value={formData.receivedBy}
                                onChange={handleChange}
                                suggestions={funcionariosExctract}
                                required
                            />
                            <InputComponent
                                label="Entrega para: "
                                name="receivedTo"
                                value={formData.receivedTo}
                                onChange={handleChange}
                                suggestions={inqulinosExctract}
                                required
                            />
                            <InputComponent
                                label="Data e hora do recebimento: "
                                type="datetime-local"
                                name="dataRecived"
                                value={formData.dataRecived}
                                onChange={handleChange}
                                required
                            />
                            <InputComponent
                                label="Descrição do pacote: "
                                type="textarea"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                height={100}
                            />
                            <ButtonCreateVisit type="submit">Registrar recebimento</ButtonCreateVisit>
                            {
                                title === 'dasfgg'
                                    ?
                                    <>
                                        <Span>
                                            Fazer isso no final - Após registrado, será enviado um email para o morador escolhido com base no email dele de cadastro, avisando sobre o recebimento.
                                        </Span>
                                        <Span>controlar isso via {`'acknowledgmentstatus'`} - Automaticamente vai para: `esperando retirada`.</Span>
                                        <Span>
                                            Dentro das páginas de encomendas, terá a opção para editar, e daí:
                                        </Span>
                                        <Paragraph>{`Clicar em 'entregue', daí vai para 'entregue ao morador'.`}</Paragraph>
                                        <Paragraph>Aqui terá uma flag, onde caso desmarcada, marca a data e hora que foi retirado.</Paragraph>
                                        <Paragraph>Caso marcada, dará dia, data e hora para selecionar a entrega.</Paragraph>
                                        <Paragraph>{`No email enviado anteriormente terá uma opção de 'confirmar recebimento'.`}</Paragraph>
                                    </>
                                    :
                                    <></>
                            }
                        </FormEncomenda>
                    )}
                    {selected === 'pendingEncomend' && (
                        <TableEncomendas />
                    )}
                    {selected === 'deliveredEncomenda' && (
                        <EncomendasEntregues />
                    )}
                    {selected === 'deletedEncomenda' && (
                        <EncomendasDeletadas />
                    )}
                </ActionsInquilinoRegister>
            </InquilinoSection >
        </>
    )
}

