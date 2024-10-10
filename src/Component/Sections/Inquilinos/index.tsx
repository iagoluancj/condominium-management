import { ChangeEvent, useContext, useState } from "react";
import { SupaContext } from "@/Context/context";
import { toast } from "react-toastify";
import { ActionsInquilino, ActionsInquilinoRegister, BrevelyDescription, HeaderInquilinos, IconInquilino, InquilinoSection, OptionAction, OptionsActionInquilos, TitleHeader, Form, Label, DivLabel, FormContainer, InputStatus, InputWrapperStatus, InputFormCarro, LabelTemCarro, StyledSelectStatus, CreateInqui, SeparationResidenc, SpanTemCarro, Button, Input, ImageDiv, H3, H3Pessoal, SeparationCarro, SeparationPessoal } from "./styles";

import { IoIosArrowForward } from "react-icons/io";
import ConfirmModal from "../../Modal/modal";
import Tables from "./table";
import DeletedInquilinosTable from "./InquilinosDeletados";
import { TypeInquilinos } from "@/Types/types";
import { IoPeopleSharp } from "react-icons/io5";
import InputComponent from "@/Component/Primitivy/Input";

export default function Inquilinos() {
    const [selected, setSelected] = useState('cadasterInquilino')
    const [possuiCar, setPossuiCar] = useState(false)
    const [title, setTitle] = useState('Cadastrar novo inquilino')
    const { updateInquilino, createInquilino, deletedInquilino, typeInquilinos, contextApartamentos, contextBlocos } = useContext(SupaContext);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [cpfToDelete, setCpfToDelete] = useState<number | null>(null);
    const [showModal, setShowModal] = useState(false);
    const obj = selected === 'currentInquilino' ? { className: 'w-[1000px]' } : {};
    const [formData, setFormData] = useState<TypeInquilinos>({
        id: 0,
        nome: "",
        cpf: 0,
        tem_carro: false,
        quantidade_carros: 0,
        modelo_carro: "",
        placa_carro: "",
        apartamento_id: "",
        status: "inquilino",
        comunicado_importante: "",
        is_deleted: false,
        bloco: '',
        created_at: ''
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
            setShowModal(false);
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

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]*$/;
        let updatedValue = value;

        if (type === "checkbox") {
            const { checked } = e.target as HTMLInputElement;
            setFormData(prevData => ({
                ...prevData,
                [name]: checked
            }));
        } else {
            if (name === "nome") {
                if (regex.test(value)) {
                    setFormData(prevData => ({
                        ...prevData,
                        [name]: value
                    }));
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
                } else {
                }

            } else {
                if (name === 'apartamento_id') {
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

                setFormData(prevData => ({
                    ...prevData,
                    [name]: updatedValue,
                }));
            }
        }
    };

    const handleCreate = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!formData.nome || !formData.cpf) {
            toast.error('Preencha os campos obrigatórios.');
            return;
        }

        const currentDate = new Date();
        currentDate.setHours(currentDate.getHours() - 3);

        const currentDateISO = currentDate.toISOString();
        try {
            await createInquilino({
                ...formData,
                apartamento_id: formData.localvisitaId || 'deu ruim',
                created_at: currentDateISO
            });
            setFormData({
                id: 0,
                nome: "",
                cpf: 0,
                tem_carro: false,
                quantidade_carros: 0,
                modelo_carro: "",
                placa_carro: "",
                apartamento_id: "",
                status: "inquilino",
                comunicado_importante: "",
                is_deleted: false,
                bloco: '',
                created_at: ''
            });
        } catch (error) {
            console.log(error)
        }
    };


    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = e.target.checked;
        const { name, type } = e.target;
        setPossuiCar(isChecked);

        if (type === "checkbox") {
            const { checked } = e.target as HTMLInputElement;
            setFormData(prevData => ({
                ...prevData,
                [name]: checked
            }));
        }
    };

    const alterSelected = (inquilino: string) => {
        console.log(typeInquilinos)
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

    return (
        <InquilinoSection $isSelectedCurrent={selected === 'currentInquilino' ? true : false}>
            <ActionsInquilino>
                <IconInquilino>
                    <h2>Gerenciamento de inquilinos
                    </h2>
                    <IoPeopleSharp size={18} />
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
                <div {...obj} >
                    {selected === 'cadasterInquilino' && (
                        <Form onSubmit={handleCreate}>
                            <FormContainer>
                                <H3Pessoal>Dados pessoais</H3Pessoal>
                                <SeparationPessoal>
                                    <InputComponent
                                        label="Nome completo"
                                        name="nome"
                                        value={formData.nome}
                                        onChange={handleChange}
                                        required
                                    />
                                    <InputComponent
                                        label="CPF"
                                        type="text"
                                        name="cpf"
                                        value={formData.cpf.toString()}
                                        onChange={handleChange}
                                        required
                                    />
                                </SeparationPessoal>
                            </FormContainer>
                            <FormContainer>
                                <DivLabel>
                                    <LabelTemCarro $selectedCar={formData.tem_carro}
                                    >
                                        <SpanTemCarro $selectedCar={formData.tem_carro}>Possui carro{possuiCar ? <span>!</span> : <span>?</span>}</SpanTemCarro>
                                        <InputFormCarro
                                            type="checkbox"
                                            name="tem_carro"
                                            checked={formData.tem_carro}
                                            onChange={handleCheckboxChange}
                                        />
                                    </LabelTemCarro>
                                </DivLabel>
                                <SeparationCarro>
                                    <DivLabel>
                                        <InputComponent
                                            label="Quantos"
                                            type="number"
                                            name="quantidade_carros"
                                            value={formData.quantidade_carros.toString()}
                                            onChange={handleChange}
                                            disabled={!formData.tem_carro}
                                        />
                                    </DivLabel>
                                    <DivLabel>
                                        <InputComponent
                                            label="Modelo"
                                            type="text"
                                            name="modelo_carro"
                                            value={formData.modelo_carro}
                                            onChange={handleChange}
                                            disabled={!formData.tem_carro}
                                        />
                                    </DivLabel>
                                    <DivLabel>
                                        <InputComponent
                                            label="Placa"
                                            type="text"
                                            name="placa_carro"
                                            value={formData.placa_carro}
                                            onChange={handleChange}
                                            disabled={!formData.tem_carro}
                                        />
                                    </DivLabel>
                                </SeparationCarro>
                            </FormContainer>
                            <FormContainer>
                                <H3>Da residencia</H3>
                                <SeparationResidenc>
                                    <InputComponent
                                        name="apartamento_id"
                                        value={formData.apartamento_id}
                                        label="* Apartamento"
                                        onChange={handleChange}
                                        suggestions={validAp.map(ap => ap.label)}
                                        required
                                    />
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
                                                    <option value="morador">Morador</option>
                                                </StyledSelectStatus>
                                            </InputWrapperStatus>
                                        </Label>
                                    </DivLabel>
                                </SeparationResidenc>
                                <DivLabel>
                                    <InputComponent
                                        type="textarea"
                                        name="comunicado_importante"
                                        value={formData.comunicado_importante}
                                        label="* Observações"
                                        onChange={handleChange}
                                        height={100}
                                    />
                                </DivLabel>
                            </FormContainer>
                            <CreateInqui type="submit">Criar Inquilino</CreateInqui>
                        </Form>
                    )}
                    {selected === 'currentInquilino' && (
                        <div className="">
                            <Tables />
                        </div>
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
