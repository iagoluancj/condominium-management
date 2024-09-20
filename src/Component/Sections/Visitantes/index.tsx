import { SupaContext } from '@/Context/context';
import { TypeInquilinos, TypeVisit } from '@/Types/types';
import React, { ChangeEvent, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import InputComponent from '@/Component/Primitivy/Input';
import { ActionsInquilino, ActionsInquilinoRegister, BrevelyDescription, DivLabel, Form, H3, H3Pessoal, HeaderInquilinos, IconInquilino, InquilinoSection, OptionAction, OptionsActionInquilos, TitleHeader } from '../Inquilinos/styles';
import { IoIosArrowForward } from 'react-icons/io';
import { IoPeopleSharp } from 'react-icons/io5';
import { ButtonCreateVisit, ContainerForm, ContainerFormStyles, InputStatus, InputVisit, InputWrapperStatus, Label, LabelVisit, SpanVisit, StyledSelectStatus } from './styles';
import DeletedVisits from './deletedVisits';
import CurrentVisits from './currentVisits';
import { MdEmojiPeople } from 'react-icons/md';

export default function Visitantes() {
    const { createVisit, typeInquilinos, contextApartamentos, contextBlocos } = useContext(SupaContext);
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
        deleted_at: "",
        tipo_visita: ""
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        let updatedValue = value;

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

        if (name === 'localvisita') {
            const selectedAp = validAp.find(ap => ap.label === value);

            if (selectedAp) {
                setFormData(prevState => ({
                    ...prevState,
                    [name]: selectedAp.label,
                    localvisitaId: selectedAp.id
                }));
                return;
            }
        }

        if (name === 'localvisita') {
            const selectedAp = validAp.find(ap => ap.label === value);

            if (selectedAp) {
                setFormData(prevState => ({
                    ...prevState,
                    [name]: selectedAp.label,
                    localvisitaId: selectedAp.id
                }));
                return;
            }
        }

        setFormData(prevState => ({
            ...prevState,
            [name]: updatedValue,
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

    const getCPFmoradores = (typeInquilinos: TypeInquilinos[]): string[] => {
        return typeInquilinos
            .filter(inquilino => !inquilino.is_deleted)
            .map(inquilino => String(inquilino.cpf));
    };

    const validCpfs = getCPFmoradores(typeInquilinos)

    const getValidAp = (contextApartamentos: { id: string; apartamento: string; bloco_id: string; }[], contextBlocos: { id: string; bloco: string; }[]): { id: string; label: string; }[] => {
        return contextApartamentos.map(apartamento => {
            const bloco = contextBlocos.find(bloco => bloco.id === apartamento.bloco_id);
            return {
                id: apartamento.id,
                label: `${apartamento.apartamento} - ${bloco?.bloco || 'Bloco desconhecido'}`
            };
        });
    };

    const validAp = getValidAp(contextApartamentos, contextBlocos);

    const handleCreate = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!formData.nomevisitante || !formData.cpfvisitante) {
            toast.error('Preencha os campos obrigatórios.');
            return;
        }

        if (!validCpfs.includes(formData.cpfinquilinopermissao)) {
            toast.error('Não existe morador com esse CPF.');
            return;
        }

        if (!formData.localvisitaId || formData.localvisitaId === '') {
            toast.error('Preencha o local da visita.');
            return;
        }

        const getBrazilDate = () => {
            const brazilTimeOffset = -3;
            const now = new Date();
            now.setHours(now.getUTCHours() + brazilTimeOffset);
            return now.toISOString().split('T')[0];
        };

        const currentDate = new Date().toISOString();
        const fimVisita = formData.fimvisita && formData.fimvisita !== "0"
            ? formData.fimvisita
            : new Date().toISOString();

        const dataVisita = (formData.horarioinicio && (formData.datavisita === '' || formData.datavisita === '0'))
            ? getBrazilDate()  // Define data atual
            : formData.datavisita;  // Mantém o valor existente

        try {
            await createVisit({
                ...formData,
                localvisita: formData.localvisitaId,
                datavisita: dataVisita,
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
                deleted_at: "",
                tipo_visita: ""
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
                        <H3Pessoal>Dados pessoais:</H3Pessoal>
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
                        <H3Pessoal>Inicio e fim:</H3Pessoal>
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
                        <H3Pessoal>Da visita:</H3Pessoal>
                        <ContainerForm>
                            <InputComponent
                                label="Local da Visita: AP - Bloco"
                                name="localvisita"
                                value={formData.localvisita}
                                onChange={handleChange}
                                suggestions={validAp.map(ap => ap.label)}
                                required
                            />
                            <InputComponent
                                label="CPF do morador aprovador"
                                name="cpfinquilinopermissao"
                                value={formData.cpfinquilinopermissao}
                                onChange={handleChange}
                                suggestions={validCpfs}
                                required
                            />
                            <DivLabel>
                                <Label>
                                    <InputWrapperStatus>
                                        <InputStatus>* Tipo da visita</InputStatus>
                                        <StyledSelectStatus
                                            name="tipo_visita"
                                            value={formData.tipo_visita}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="familiar">Familiar</option>
                                            <option value="amigo">Amigo</option>
                                            <option value="manutencao">Manutenção</option>
                                            <option value="naoInformado">Não informado</option>
                                        </StyledSelectStatus>
                                    </InputWrapperStatus>
                                </Label>
                            </DivLabel>
                        </ContainerForm>
                        <InputComponent
                            label="Observações Adicionais"
                            name="observacoes"
                            type='textarea'
                            value={formData.observacoes}
                            onChange={handleChange}
                            height={100}
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
