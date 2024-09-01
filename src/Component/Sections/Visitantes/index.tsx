import { SupaContext } from '@/Context/context';
import { TypeVisit } from '@/Types/types';
import React, { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import InputComponent from '@/Component/Input';
import { ActionsInquilino, ActionsInquilinoRegister, BrevelyDescription, Form, HeaderInquilinos, IconInquilino, InquilinoSection, OptionAction, OptionsActionInquilos, TitleHeader } from '../Inquilinos/styles';
import { IoIosArrowForward } from 'react-icons/io';
import { IoPeopleSharp } from 'react-icons/io5';
import { ButtonCreateVisit, ContainerForm, ContainerFormStyles, InputVisit, LabelVisit, SpanVisit } from './styles';
import DeletedVisits from './deletedVisits';
import CurrentVisits from './currentVisits';
import { MdEmojiPeople } from 'react-icons/md';

export default function Visitantes() {
    const { createVisit } = useContext(SupaContext);
    const [selected, setSelected] = useState('cadasterVisit')
    const [visitPerHour, setVisitPerHour] = useState(false)
    const [title, setTitle] = useState('Cadastrar uma nova visita')
    const [formData, setFormData] = useState<TypeVisit>({
        id: 0,
        nomevisitante: "",
        datavisita: "0",
        fimvisita: "0",
        localvisita: "",
        cpfinquilinopermissao: "",
        horarioinicio: "0",
        horariofim: "0",
        cpfvisitante: "",
        observacoes: "",
        created_at: "",
        deleted_at: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        if (name === 'cpfvisitante' || name === 'cpfinquilinopermissao') {
            if (!/^\d*$/.test(value)) {
                return;
            }
        }

        if (name === 'cpfvisitante' && value.length > 6) {
            return;
        }

        if (name === 'nomevisitante' && value.length > 50) {
            return;
        }

        if (name === 'nomevisitante') {
            if (!/^[a-zA-Z\s]*$/.test(value)) {
                return;
            }
        }

        if (name === 'cpfinquilinopermissao' && value.length > 15) {
            return;
        }

        if (name === 'localvisita' && value.length > 15) {
            return;
        }

        if (name === 'observacoes' && value.length > 200) {
            return;
        }

        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = e.target.checked;
        setVisitPerHour(isChecked);

        const hoje = new Date().toISOString().split('T')[0];

        setFormData(prevState => ({
            ...prevState,
            fimvisita: isChecked ? hoje : prevState.fimvisita
        }));
    };

    const handleCreate = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!formData.nomevisitante || !formData.cpfvisitante) {
            toast.error('Preencha os campos obrigatórios.');
            return;
        }

        const currentDate = new Date().toISOString();

        const fimVisita = formData.fimvisita && formData.fimvisita !== "0"
            ? formData.fimvisita
            : new Date().toISOString().slice(0, 10); 

        try {
            await createVisit({
                ...formData,
                created_at: currentDate,
                fimvisita: fimVisita,
                deleted_at: "" 
            });
            setFormData({
                id: 0,
                nomevisitante: "",
                datavisita: "0",
                fimvisita: "", 
                localvisita: "",
                cpfinquilinopermissao: "",
                horarioinicio: "0",
                horariofim: "0",
                cpfvisitante: "",
                observacoes: "",
                created_at: "",
                deleted_at: ""
            });
            console.log("Visita criada com sucesso!");
        } catch (error) {
            console.error("Erro ao registrar a visita:", error);
        }
    };

    const alterSelected = (inquilino: string) => {
        let newTitle = '';
        switch (inquilino) {
            case 'cadasterVisit':
                newTitle = 'Cadastrar uma nova visita';
                break;
            case 'currentVisit':
                newTitle = 'Visitas em andamento';
                break;
            case 'finalizedVisit':
                newTitle = 'Visitas finalizadas';
                break;
            default:
                newTitle = '';
        }
        setTitle(newTitle)
        setSelected(inquilino);
    };

    return (
        <InquilinoSection $isSelectedCurrent={selected === 'currentVisit' ? true : false}>
            <ActionsInquilino>
                <IconInquilino>
                    <h2>Gerenciamento de visita
                    </h2>
                    <MdEmojiPeople size={18} />
                </IconInquilino>
                <OptionsActionInquilos>
                    <OptionAction onClick={() => alterSelected('cadasterVisit')} $isSelected={selected === 'cadasterVisit'}>
                        <span>
                            Cadastro de visitantes
                        </span>
                        <IoIosArrowForward />
                    </OptionAction>
                    <OptionAction onClick={() => alterSelected('currentVisit')} $isSelected={selected === 'currentVisit'}>
                        <span>
                            Visitas em andamento
                        </span>
                        <IoIosArrowForward />
                    </OptionAction>
                    <OptionAction onClick={() => alterSelected('finalizedVisit')} $isSelected={selected === 'finalizedVisit'}>
                        <span>
                            Visitas finalizadas
                        </span>
                        <IoIosArrowForward />
                    </OptionAction>
                </OptionsActionInquilos>
            </ActionsInquilino>
            <ActionsInquilinoRegister>
                <HeaderInquilinos>
                    <TitleHeader>{title}</TitleHeader>
                    <BrevelyDescription>
                        <span>
                            Gerencie visitas de forma eficiente: cadastre, visualize, edite e acesse registros com facilidade.
                        </span>
                    </BrevelyDescription>
                </HeaderInquilinos>
                {selected === 'cadasterVisit' && (
                    <Form onSubmit={handleCreate}>
                        <p>Dados pessoais:</p>
                        <ContainerForm>
                            <InputComponent
                                label="Nome do Visitante"
                                name="nomevisitante"
                                value={formData.nomevisitante}
                                onChange={handleChange}
                                required
                            />
                            <InputComponent
                                label="CPF do Visitante (Apenas 6 digitos)"
                                name="cpfvisitante"
                                value={formData.cpfvisitante}
                                onChange={handleChange}
                                required
                            />
                        </ContainerForm>
                        <h2>Inicio e fim:</h2>
                        <ContainerForm>
                            <LabelVisit $visitHour={visitPerHour}
                            >
                                <SpanVisit $visitHour={visitPerHour}>Diaria{visitPerHour ? <span>!</span> : <span>?</span>}</SpanVisit>
                                <InputVisit
                                    type="checkbox"
                                    name="diaria"
                                    checked={visitPerHour}
                                    onChange={handleCheckboxChange}
                                />
                            </LabelVisit>
                            {visitPerHour
                                ?
                                <span></span>
                                :
                                <ContainerFormStyles>
                                    <InputComponent
                                        label="Data da Visita"
                                        type="date"
                                        name="datavisita"
                                        value={formData.datavisita}
                                        onChange={handleChange}
                                    />
                                    <InputComponent
                                        label="Fim da Visita"
                                        type="date"
                                        name="fimvisita"
                                        value={formData.fimvisita}
                                        onChange={handleChange}
                                    />
                                </ContainerFormStyles>
                            }
                            <ContainerFormStyles>
                                <InputComponent
                                    label="Horário de Início"
                                    type="time"
                                    name="horarioinicio"
                                    value={formData.horarioinicio}
                                    onChange={handleChange}
                                    required
                                />
                                <InputComponent
                                    label="Horário de Fim"
                                    type="time"
                                    name="horariofim"
                                    value={formData.horariofim}
                                    onChange={handleChange}
                                    required
                                />
                            </ContainerFormStyles>
                        </ContainerForm>
                        <h2>Da visita:</h2>
                        <ContainerForm>
                            <InputComponent
                                label="Local da Visita: AP - Bloco"
                                name="localvisita"
                                value={formData.localvisita}
                                onChange={handleChange}
                            />
                            <InputComponent
                                label="CPF do Inquilino aprovador"
                                name="cpfinquilinopermissao"
                                value={formData.cpfinquilinopermissao}
                                onChange={handleChange}
                                required
                            />
                        </ContainerForm>
                        <InputComponent
                            label="Observações Adicionais"
                            name="observacoes"
                            type='textarea'
                            value={formData.observacoes}
                            onChange={handleChange}
                        />
                        <ButtonCreateVisit type="submit">Criar visita</ButtonCreateVisit>
                    </Form>
                )}
                {selected === 'currentVisit' && (
                    <CurrentVisits />
                )}
                {selected === 'finalizedVisit' && (
                    <DeletedVisits />
                )}
            </ActionsInquilinoRegister>
        </InquilinoSection>
    );
}
