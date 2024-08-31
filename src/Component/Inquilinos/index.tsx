import { useContext, useState } from "react";
import { SupaContext } from "@/Context/context";
import { toast } from "react-toastify";
import { InputWrapper, StyledInput, ActionsInquilino, ActionsInquilinoRegister, BrevelyDescription, HeaderInquilinos, IconInquilino, InquilinoSection, OptionAction, OptionsActionInquilos, TitleHeader, Form, Label, InputForm, DivLabel, FormContainer, InputText, InputCPF, StyledInputCPF, InputWrapperCPF, InputWrapperComunicadoImportante, StyledInputComunicadoImportante, InputComunicadoImportante, StyledInputQuantidadeCarros, InputWrapperQuantidadeCarros, InputModeloCarro, StyledInputModeloCarro, InputWrapperModeloCarro, InputPlacaCarro, StyledInputPlacaCarro, InputWrapperPlacaCarro, InputApartamento, StyledInputApartamento, InputWrapperApartamento, InputStatus, StyledInputStatus, InputWrapperStatus, InputBloco, StyledInputBloco, InputWrapperBloco, InputQuantidadeCarros, InputFormCarro, LabelTemCarro, StyledSelectStatus, CreateInqui, SeparationResidenc, SpanTemCarro, Button, Input, ImageDiv } from "./styles";
import { FiEdit } from "react-icons/fi";

import { IoIosArrowForward } from "react-icons/io";
import ConfirmModal from "../Modal/modal";
import Tables from "./table";
import DeletedInquilinosTable from "./InquilinosDeletados";

export type TypeInquilinos = {
    id: number;
    nome: string;
    cpf: number;
    tem_carro: boolean;
    quantidade_carros: number;
    modelo_carro: string;
    placa_carro: string;
    apartamento: string;
    status: string;
    comunicado_importante: string;
    is_deleted: boolean;
    bloco: string
    createdAt: string;
};

type SortField = keyof TypeInquilinos;

export default function Inquilinos() {
    const [selected, setSelected] = useState('cadasterInquilino')
    const [title, setTitle] = useState('Cadastrar novo inquilino')
    const { updateInquilino, createInquilino, deletedInquilino } = useContext(SupaContext);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [cpfToDelete, setCpfToDelete] = useState<number | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState<TypeInquilinos>({
        id: 0,
        nome: "",
        cpf: 0,
        tem_carro: false,
        quantidade_carros: 0,
        modelo_carro: "",
        placa_carro: "",
        apartamento: "",
        status: "inquilino",
        comunicado_importante: "",
        is_deleted: false,
        bloco: '',
        createdAt: ''
    });

    const closeModal = () => {
        setShowModal(false);
    };

    const confirmSave = async () => {
        try {
            await updateInquilino(formData);
        } catch (error) {
            console.error("Erro ao editar o inquilino:", error);
        } finally {
            setShowModal(false); // Fecha o modal após a confirmação
        }
    };

    const confirmDelete = async () => {
        if (cpfToDelete !== null) {
            try {
                await deletedInquilino(cpfToDelete);
            } finally {
                setShowDeleteModal(false);
                setCpfToDelete(null);
            }
        }
    };

    const handleCreate = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!formData.nome || !formData.cpf) {
            toast.error('Preencha os campos obrigatórios.');
            return;
        }

        try {
            await createInquilino(formData);
            setFormData({
                id: 0,
                nome: "",
                cpf: 0,
                tem_carro: false,
                quantidade_carros: 0,
                modelo_carro: "",
                placa_carro: "",
                apartamento: "",
                status: "inquilino",
                comunicado_importante: "",
                is_deleted: false,
                bloco: '',
                createdAt: ''
            });
        } catch (error) {
            console.log(error)
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]*$/;

        if (type === "checkbox") {
            const { checked } = e.target as HTMLInputElement;
            setFormData(prevData => ({
                ...prevData,
                [name]: checked
            }));
            console.log('checado');
        } else {
            if (name === "nome") {
                if (regex.test(value)) {
                    setFormData(prevData => ({
                        ...prevData,
                        [name]: value
                    }));
                    console.log('Valor atualizado: apenas letras');
                } else {
                    console.log('Entrada inválida: apenas letras são permitidas');
                }
            } else if (name === "cpf") {
                const numericValue = value.replace(/\D/g, '');
                if (numericValue.length <= 11) {
                    setFormData(prevData => ({
                        ...prevData,
                        [name]: numericValue ? parseInt(numericValue) : 0
                    }));
                    console.log('Valor atualizado: apenas números');
                } else {
                    console.log('Entrada inválida: máximo de 11 números');
                }
            } else if (name === "quantidade_carros") {
                const numericValue = parseInt(value);
                if (!isNaN(numericValue) && numericValue <= 9) {
                    setFormData(prevData => ({
                        ...prevData,
                        [name]: numericValue
                    }));
                    console.log('Valor atualizado: quantidade de carros');
                } else {
                    console.log('Entrada inválida: o valor máximo permitido é 9');
                }
            } else {
                setFormData(prevData => ({
                    ...prevData,
                    [name]: value
                }));
                console.log('não checado');
            }
        }
    };


    const alterSelected = (inquilino: string) => {
        let newTitle = '';
        switch (inquilino) {
            case 'cadasterInquilino':
                newTitle = 'Cadastrar novo inquilino';
                break;
            case 'currentInquilino':
                newTitle = 'Inquilinos com cadastro ativo';
                break;
            case 'deletedsInquilinos':
                newTitle = 'Inquilinos deletados ou antigos';
                break;
            default:
                newTitle = '';
        }

        setTitle(newTitle)
        setSelected(inquilino);
    };

    return (
        <InquilinoSection $isSelectedCurrent={selected === 'currentInquilino' ? true : false}>
            <ActionsInquilino>
                <IconInquilino>
                    <h2>Gerenciamento de inquilinos
                    </h2>
                    <FiEdit size={18} />
                </IconInquilino>
                <OptionsActionInquilos>
                    <OptionAction onClick={() => alterSelected('cadasterInquilino')} $isSelected={selected === 'cadasterInquilino'}>
                        <span>
                            Cadastro de inquilino
                        </span>
                        <IoIosArrowForward />
                    </OptionAction>
                    <OptionAction onClick={() => alterSelected('currentInquilino')} $isSelected={selected === 'currentInquilino'}>
                        <span>
                            Inquilinos atuais
                        </span>
                        <IoIosArrowForward />
                    </OptionAction>
                    <OptionAction onClick={() => alterSelected('deletedsInquilinos')} $isSelected={selected === 'deletedsInquilinos'}>
                        <span>
                            Inquilinos deletados
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
                            Gerencie inquilinos de forma eficiente: cadastre, visualize, edite e acesse registros com facilidade.
                        </span>
                    </BrevelyDescription>
                </HeaderInquilinos>
                <div>
                    {selected === 'cadasterInquilino' && (
                        <Form onSubmit={handleCreate}>
                            <FormContainer>
                                <h3>Dados pessoais</h3>
                                <SeparationResidenc>
                                    <DivLabel>
                                        <Label>
                                            <InputWrapper>
                                                <StyledInput
                                                    type=""
                                                    placeholder="Nome completo"
                                                    name="nome"
                                                    value={formData.nome}
                                                    onChange={handleChange}
                                                    pattern="^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$"
                                                    required
                                                />
                                                <InputText>* Nome</InputText>
                                            </InputWrapper>
                                        </Label>
                                    </DivLabel>
                                    <DivLabel>
                                        <Label>
                                            <InputWrapperCPF>
                                                <StyledInputCPF
                                                    type="text"
                                                    name="cpf"
                                                    value={formData.cpf}
                                                    onChange={handleChange}
                                                    required
                                                    maxLength={12}
                                                />
                                                <InputCPF>* CPF</InputCPF>
                                            </InputWrapperCPF>
                                        </Label>
                                    </DivLabel>
                                </SeparationResidenc>
                            </FormContainer>
                            <FormContainer>
                                <DivLabel>
                                    <h3>Possui carro?</h3>
                                    <LabelTemCarro $selectedCar={formData.tem_carro}
                                    >
                                        <SpanTemCarro $selectedCar={formData.tem_carro}>Sim</SpanTemCarro>
                                        <InputFormCarro
                                            type="checkbox"
                                            name="tem_carro"
                                            checked={formData.tem_carro}
                                            onChange={handleChange}
                                        />
                                    </LabelTemCarro>
                                </DivLabel>
                                <SeparationResidenc>
                                    <DivLabel>
                                        <Label>
                                            <InputWrapperQuantidadeCarros>
                                                <StyledInputQuantidadeCarros
                                                    type="number"
                                                    name="quantidade_carros"
                                                    value={formData.quantidade_carros}
                                                    onChange={handleChange}
                                                    disabled={!formData.tem_carro}
                                                    $isDisabled={!formData.tem_carro}
                                                />
                                                <InputQuantidadeCarros $isDisabled={!formData.tem_carro}>Quantos</InputQuantidadeCarros>
                                            </InputWrapperQuantidadeCarros>
                                        </Label>
                                    </DivLabel>
                                    <DivLabel>
                                        <Label>
                                            <InputWrapperModeloCarro>
                                                <StyledInputModeloCarro
                                                    type="text"
                                                    name="modelo_carro"
                                                    value={formData.modelo_carro}
                                                    onChange={handleChange}
                                                    disabled={!formData.tem_carro}
                                                    $isDisabled={!formData.tem_carro}
                                                    maxLength={14}
                                                />
                                                <InputModeloCarro $isDisabled={!formData.tem_carro}>Modelo</InputModeloCarro>
                                            </InputWrapperModeloCarro>
                                        </Label>
                                    </DivLabel>
                                    <DivLabel>
                                        <Label>
                                            <InputWrapperPlacaCarro>
                                                <StyledInputPlacaCarro
                                                    type="text"
                                                    name="placa_carro"
                                                    value={formData.placa_carro}
                                                    onChange={handleChange}
                                                    disabled={!formData.tem_carro}
                                                    $isDisabled={!formData.tem_carro}
                                                    maxLength={7}
                                                />
                                                <InputPlacaCarro $isDisabled={!formData.tem_carro}>Placa</InputPlacaCarro>
                                            </InputWrapperPlacaCarro>
                                        </Label>
                                    </DivLabel>
                                </SeparationResidenc>
                            </FormContainer>
                            <FormContainer>
                                <h3>Da residencia</h3>
                                <SeparationResidenc>
                                    <DivLabel>
                                        <Label>
                                            <InputWrapperApartamento>
                                                <StyledInputApartamento
                                                    type="text"
                                                    name="apartamento"
                                                    value={formData.apartamento}
                                                    onChange={handleChange}
                                                    required
                                                    maxLength={5}
                                                />
                                                <InputApartamento>* Apartamento</InputApartamento>
                                            </InputWrapperApartamento>
                                        </Label>
                                    </DivLabel>
                                    <DivLabel>
                                        <Label>
                                            <InputWrapperStatus>
                                                <InputStatus>* Status</InputStatus>
                                                <StyledSelectStatus
                                                    name="status"
                                                    value={formData.status}
                                                    onChange={handleChange}
                                                    required
                                                >
                                                    <option value="inquilino">Inquilino</option>
                                                    <option value="proprietario">Proprietário</option>
                                                </StyledSelectStatus>
                                            </InputWrapperStatus>
                                        </Label>
                                    </DivLabel>
                                    <DivLabel>
                                        <Label>
                                            <InputWrapperBloco>
                                                <StyledInputBloco
                                                    type="text"
                                                    name="bloco"
                                                    value={formData.bloco}
                                                    onChange={handleChange}
                                                    maxLength={2}
                                                    required
                                                />
                                                <InputBloco>* Bloco</InputBloco>
                                            </InputWrapperBloco>
                                        </Label>
                                    </DivLabel>
                                </SeparationResidenc>
                                <DivLabel>
                                    <Label>
                                        <InputWrapperComunicadoImportante>
                                            <StyledInputComunicadoImportante
                                                type="text"
                                                name="comunicado_importante"
                                                value={formData.comunicado_importante}
                                                onChange={handleChange}
                                            />
                                            <InputComunicadoImportante>Observações</InputComunicadoImportante>
                                        </InputWrapperComunicadoImportante>
                                    </Label>
                                </DivLabel>
                            </FormContainer>
                            <CreateInqui type="submit">Criar Inquilino</CreateInqui>
                        </Form>
                    )}
                    {selected === 'currentInquilino' && (
                        <Tables />
                    )}
                    {selected === 'deletedsInquilinos' && (
                        <DeletedInquilinosTable />
                    )}
                </div>
            </ActionsInquilinoRegister>

            <ConfirmModal
                show={showModal}
                onClose={closeModal}
                onConfirm={confirmSave}
                message="Deseja prosseguir com a alteração?"
            />

            <ConfirmModal
                show={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={confirmDelete}
                message="Realmente deseja deletar este inquilino?"
            />
        </InquilinoSection>
    )
}
