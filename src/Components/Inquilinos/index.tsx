import { useContext, useState } from "react";
import { TypeInquilinos } from "../Nav/Nav";
import { SupaContext } from "@/Context/context";
import { toast } from "react-toastify";
import { InputWrapper, StyledInput, ActionsInquilino, ActionsInquilinoRegister, BrevelyDescription, HeaderInquilinos, IconInquilino, InquilinoSection, OptionAction, OptionsActionInquilos, TitleHeader, Form, Label, InputForm, DivLabel, FormContainer, InputText, InputCPF, StyledInputCPF, InputWrapperCPF, InputWrapperComunicadoImportante, StyledInputComunicadoImportante, InputComunicadoImportante, StyledInputQuantidadeCarros, InputWrapperQuantidadeCarros, InputModeloCarro, StyledInputModeloCarro, InputWrapperModeloCarro, InputPlacaCarro, StyledInputPlacaCarro, InputWrapperPlacaCarro, InputApartamento, StyledInputApartamento, InputWrapperApartamento, InputStatus, StyledInputStatus, InputWrapperStatus, InputBloco, StyledInputBloco, InputWrapperBloco, InputQuantidadeCarros, InputFormCarro, LabelTemCarro, StyledSelectStatus, CreateInqui, SeparationResidenc, SpanTemCarro, Button, Input } from "./styles";
import { FiEdit } from "react-icons/fi";

import { IoIosArrowForward } from "react-icons/io";
import ConfirmModal from "../Modal/modal";
import Tables from "./table";
import InquilinosTable from "./table";
import DeletedInquilinosTable from "./InquilinosDeletados";

type SortField = keyof TypeInquilinos;

export default function Inquilinos() {
    const [selected, setSelected] = useState('cadasterInquilino')
    const [title, setTitle] = useState('Cadastrar novo inquilino')
    const [sortField, setSortField] = useState<SortField>('nome');
    const { typeInquilinos, updateInquilino, createInquilino, deletedInquilino } = useContext(SupaContext);
    const [editId, setEditId] = useState<number | null>(null);
    const [editMode, setEditMode] = useState<number | null>(null);
    const [filterTerm, setFilterTerm] = useState<string>("");
    const [filterByName, setFilterByName] = useState(false)
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
        bloco: ''
    });

    const closeModal = () => {
        setShowModal(false);
    };

    const confirmSave = async () => {
        try {
            await updateInquilino(formData);
            setEditMode(null);
            setEditId(0)
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
                bloco: ''
            });
        } catch (error) {
            console.log(error)
        }
    };

    const handleSave = async () => {
        setShowModal(true);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        if (type === "checkbox") {
            const { checked } = e.target as HTMLInputElement;
            setFormData(prevData => ({
                ...prevData,
                [name]: checked
            }));
            console.log('checado')
        } else {
            setFormData(prevData => ({
                ...prevData,
                [name]: value
            }));
            console.log('não checado')
        }
    };

    const handleDeleted = (cpf: number) => (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setCpfToDelete(cpf);
        setShowDeleteModal(true);
    };

    const handleEditTable = (inquilino: TypeInquilinos) => {
        setEditId(inquilino.id);
        setFormData(inquilino);
    }

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

    const sortedInquilinos = () => {
        if (sortField === 'bloco') {
            const groupedInquilinos: Record<string, TypeInquilinos[]> = typeInquilinos.reduce((acc, inquilino) => {
                const bloco = inquilino['bloco'];
                if (bloco) {
                    const key = (bloco as string).toUpperCase();
                    (acc[key] = acc[key] || []).push(inquilino);
                }
                return acc;
            }, {} as Record<string, TypeInquilinos[]>);

            const sortedBlocks = Object.keys(groupedInquilinos).sort();

            return sortedBlocks.flatMap(block =>
                groupedInquilinos[block].sort((a, b) => {
                    const aName = a['nome'];
                    const bName = b['nome'];
                    return typeof aName === 'string' && typeof bName === 'string'
                        ? aName.localeCompare(bName)
                        : 0;
                })
            );
        } else {
            return [...typeInquilinos].sort((a: any, b: any) => {
                const aValue = a[sortField];
                const bValue = b[sortField];
                return typeof aValue === 'string' && typeof bValue === 'string'
                    ? aValue.localeCompare(bValue)
                    : 0;
            });
        }
    };

    const getBlockColor = (colorByOrder: string) => {
        switch (colorByOrder) {
            case 'A':
                return 'lightblue';
            case 'B':
                return 'lightgreen';
            case 'C':
                return 'lightcoral';
            case 'D':
                return 'violet';
            case 'inquilino':
                return 'red';
            case 'proprietario':
                return 'blue';
            default:
                return 'lightgray';
        }
    };

    const filteredInquilinos = () => {
        const term = filterTerm.toLowerCase();
        return sortedInquilinos().filter((inquilino) =>
            !inquilino.is_deleted &&
            (inquilino.nome.toLowerCase().includes(term) || inquilino.cpf.toString().includes(term))
        );
    };

    const displayedInquilinosFindByName = filteredInquilinos();
    const displayedInquilinos = sortedInquilinos();

    return (
        <InquilinoSection>
            <ActionsInquilino>
                <IconInquilino>
                    <h2>Gerenciamento de inquilinos                     <FiEdit size={18} />
                    </h2>
                </IconInquilino>
                <OptionsActionInquilos>
                    <OptionAction onClick={() => alterSelected('cadasterInquilino')} isSelected={selected === 'cadasterInquilino'}>
                        <span>
                            Cadastro de inquilino
                        </span>
                        <IoIosArrowForward />
                    </OptionAction>
                    <OptionAction onClick={() => alterSelected('currentInquilino')} isSelected={selected === 'currentInquilino'}>
                        <span>
                            Inquilino atuais
                        </span>
                        <IoIosArrowForward />
                    </OptionAction>
                    <OptionAction onClick={() => alterSelected('deletedsInquilinos')} isSelected={selected === 'deletedsInquilinos'}>
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
                    <BrevelyDescription>Um texto bem bacana aqui</BrevelyDescription>
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
                                                    type="text"
                                                    placeholder="Nome completo"
                                                    name="nome"
                                                    value={formData.nome}
                                                    onChange={handleChange}
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
                                                    type="number"
                                                    name="cpf"
                                                    value={formData.cpf}
                                                    onChange={handleChange}
                                                    required
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
                                    <LabelTemCarro selectedCar={formData.tem_carro}
                                    >
                                        <SpanTemCarro selectedCar={formData.tem_carro}>Sim</SpanTemCarro>
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
                                                    isDisabled={!formData.tem_carro}
                                                />
                                                <InputQuantidadeCarros isDisabled={!formData.tem_carro}>Quantos</InputQuantidadeCarros>
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
                                                    isDisabled={!formData.tem_carro}

                                                />
                                                <InputModeloCarro isDisabled={!formData.tem_carro}>Modelo</InputModeloCarro>
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
                                                    isDisabled={!formData.tem_carro}
                                                />
                                                <InputPlacaCarro isDisabled={!formData.tem_carro}>Placa</InputPlacaCarro>
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
